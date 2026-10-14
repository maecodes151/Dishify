import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BottomNavigation from "../../components/general/BottomNavigation";
import {
  readComments,
  readLikedIds,
  readSavedIds,
  writeComments,
  writeIds,
} from "./reelStorage";
import "./Home.css";

const ActionIcon = ({ name }) => {
  if (name === "like") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.8 8.7c0 4.1-8.8 10-8.8 10S3.2 12.8 3.2 8.7a4.4 4.4 0 0 1 8.8-.2 4.4 4.4 0 0 1 8.8.2Z" />
      </svg>
    );
  }
  if (name === "save") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 3.5h12v17l-6-4-6 4z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.2 7.7L3 20.5l1.3-4.4a8.5 8.5 0 1 1 16.2-4.6Z" />
    </svg>
  );
};

const Home = () => {
  const feedRef = useRef(null);
  const [reels, setReels] = useState([]);
  const [activeReel, setActiveReel] = useState(null);
  const [likedIds, setLikedIds] = useState(readLikedIds);
  const [savedIds, setSavedIds] = useState(readSavedIds);
  const [commentsFor, setCommentsFor] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then(({ data }) => {
        if (Array.isArray(data.DishifyItems)) {
          setReels(data.DishifyItems);
          console.log(data);
        } else {
          console.error("Expected DishifyItems to be an array:", data);
        }
      })
      .catch((error) => {
        console.error(
          "Food API failed:",
          error.response?.status,
          error.response?.data || error.message,
        );
      });
  }, []);

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed || reels.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible) {
          setActiveReel(mostVisible.target.dataset.reelId);
        }
      },
      { root: feed, threshold: [0.3, 0.5, 0.65, 0.8] },
    );

    feed.querySelectorAll("[data-reel-id]").forEach((reel) => {
      observer.observe(reel);
    });

    return () => observer.disconnect();
  }, [reels]);

 

  const openComments = (reel) => {
    setCommentsFor(reel);
    setComments(readComments(reel._id));
    setCommentText("");
  };

  const submitComment = (event) => {
    event.preventDefault();
    const text = commentText.trim();
    if (!text || !commentsFor) return;

    const next = [
      ...comments,
      { id: `${Date.now()}`, text, createdAt: new Date().toISOString() },
    ];
    setComments(next);
    writeComments(commentsFor._id, next);
    setCommentText("");
  };

async function likeVideo(item) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/food/like",
      { foodId: item._id },
      { withCredentials: true }
    );

    const { like, likeCount } = response.data;
    const id = String(item._id);

    setReels((prev) =>
      prev.map((reel) =>
        reel._id === item._id
          ? { ...reel, likeCount }
          : reel
      )
    );

    setLikedIds((prev) => {
      const next = like
        ? [...new Set([...prev, id])]
        : prev.filter((likedId) => likedId !== id);

      writeIds("dishify:liked", next);
      return next;
    });
  } catch (error) {
    console.error(
      "Like failed:",
      error.response?.data || error.message
    );
  }
}

async function bookmarkVideo(item) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/food/save",
      { foodId: item._id },
      { withCredentials: true }
    );

    const saved = response.data.saved;
    const id = String(item._id);

    console.log(response.data.message);

    setSavedIds((prev) => {
      const next = saved
        ? [...new Set([...prev, id])]
        : prev.filter((savedId) => savedId !== id);

      writeIds("dishify:saved", next);
      return next;
    });
  } catch (error) {
    console.error(
      "Bookmark failed:",
      error.response?.data || error.message
    );
  }
}

















  return (
    <main className="reels-page">
      <div
        className="reels-feed"
        ref={feedRef}
        aria-label="Dishify food videos"
      >
        {reels.map((reel, index) => {
          const id = String(reel._id);
          const liked = likedIds.includes(id);
          const saved = savedIds.includes(id);
          const reelComments = readComments(id);
          const likeCount =
            Math.max(0, Number(reel.likeCount) || 0) + (liked ? 1 : 0);

          return (
            <article
              className="reel"
              key={reel._id}
              data-reel-id={id}
              aria-label={`Food video ${index + 1}`}
            >
              <video
                className="reel__video"
                autoPlay={activeReel === id}
                muted
                loop
                playsInline
                preload={activeReel === id ? "auto" : "none"}
              >
                <source src={reel.video} type="video/mp4" />
              </video>
              <div className="reel__scrim" aria-hidden="true" />

              <header className="reel__header">
                <a className="reel__brand" href="/" aria-label="Dishify home">
                  <span className="reel__brand-mark" aria-hidden="true">
                    d
                  </span>
                  dishify
                </a>
                <span className="reel__counter">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(reels.length).padStart(2, "0")}
                </span>
              </header>

              <div className="reel__actions" aria-label="Video actions">
                <button
                  className={`reel__action${liked ? " is-active" : ""}`}
                  type="button"
                  aria-label={liked ? "Unlike this dish" : "Like this dish"}
                  aria-pressed={liked}
                onClick={() => likeVideo(reel)}  
                >


                  <ActionIcon name="like" />
                  <span>{likeCount}</span>
                  <small>Likes</small>
                </button>

                <button
                  className={`reel__action${saved ? " is-active" : ""}`}
                  type="button"
                  aria-label={saved ? "Remove from saved" : "Save this dish"}
                  aria-pressed={saved}
                onClick={()=>bookmarkVideo(reel)}
                                >
                  <ActionIcon name="save" />
                 <span>{saved ? "Saved" : "Save"}</span>
                
                </button>
                <button
                  className="reel__action"
                  type="button"
                  aria-label={`View ${reelComments.length} comments`}
                  onClick={() => openComments(reel)}
                >
                  <ActionIcon name="comment" />
                  <span>{reelComments.length}</span>
                  <small>Comments</small>
                </button>
              </div>

              <div className="reel__content">
                <p className="reel__description">{reel.description}</p>
                <Link
                  className="reel__store-link"
                  to={`/dishify-partner/${reel.dishifyPartner}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit store <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          );
        })}
        {reels.length === 0 && (
          <div className="reels-empty">
            <span className="reels-empty__mark" aria-hidden="true">
              d
            </span>
            <h1>Good food is on the way</h1>
            <p>Check back soon for delicious videos from Dishify creators.</p>
          </div>
        )}
      </div>

      <BottomNavigation />

      {commentsFor && (
        <div
          className="comments-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setCommentsFor(null);
          }}
        >
          <section
            className="comments-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="comments-title"
          >
            <div className="comments-sheet__handle" aria-hidden="true" />
            <header className="comments-sheet__header">
              <div>
                <p className="comments-sheet__eyebrow">Dishify community</p>
                <h2 id="comments-title">Comments</h2>
              </div>
              <button
                className="comments-sheet__close"
                type="button"
                aria-label="Close comments"
                onClick={() => setCommentsFor(null)}
              >
                ×
              </button>
            </header>
            <div className="comments-sheet__list">
              {comments.length ? (
                comments.map((comment) => (
                  <p className="comments-sheet__comment" key={comment.id}>
                    {comment.text}
                  </p>
                ))
              ) : (
                <p className="comments-sheet__empty">
                  No comments yet. Be the first to share a thought.
                </p>
              )}
            </div>
            <form className="comments-sheet__form" onSubmit={submitComment}>
              <input
                aria-label="Write a comment"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
              />
              <button type="submit" disabled={!commentText.trim()}>
                Post
              </button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
};

export default Home;
