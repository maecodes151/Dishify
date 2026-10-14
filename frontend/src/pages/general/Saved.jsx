import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BottomNavigation from "../../components/general/BottomNavigation";
import { readSavedIds, writeIds } from "./reelStorage";
import "./Saved.css";

const Saved = () => {
  const [reels, setReels] = useState([]);
  const [savedIds, setSavedIds] = useState(readSavedIds);
  const [loading, setLoading] = useState(true);

 
useEffect(() => {
  axios
    .get("http://localhost:3000/api/food/save", {
      withCredentials: true,
    })
    .then(({ data }) => {
      console.log("Saved foods from MongoDB:", data);

      const savedItems = (data.savedFoods || [])
        .map((item) => item.food)
        .filter(Boolean);

      setReels(savedItems);

      const ids = savedItems.map((food) => String(food._id));
      setSavedIds(ids);
      writeIds("dishify:saved", ids);
    })
    .catch((error) => {
      console.error(
        "Saved food API failed:",
        error.response?.status,
        error.response?.data || error.message
      );
    })
    .finally(() => setLoading(false));
}, []);


  const savedReels = reels.filter((reel) => savedIds.includes(String(reel._id)));

  const removeSaved = (id) => {
    const next = savedIds.filter((savedId) => savedId !== String(id));
    setSavedIds(next);
    writeIds("dishify:saved", next);
  };

  return (
    <main className="saved-page">
      <header className="saved-page__header">
        <Link className="saved-page__brand" to="/" aria-label="Dishify home">
          <span className="reel__brand-mark" aria-hidden="true">d</span>
          dishify
        </Link>
        <p className="saved-page__eyebrow">Your collection</p>
        <h1>Saved dishes</h1>
        <p className="saved-page__intro">
          The recipes and bites you want to come back to.
        </p>
      </header>

      <section className="saved-grid" aria-label="Saved food videos">
        {savedReels.map((reel) => (
          <article className="saved-card" key={reel._id}>
            <div className="saved-card__video">
              <video muted loop playsInline preload="metadata">
                <source src={reel.video} type="video/mp4" />
              </video>
              <button
                className="saved-card__remove"
                type="button"
                aria-label={`Remove ${reel.name || "dish"} from saved`}
                onClick={() => removeSaved(reel._id)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 3.5h12v17l-6-4-6 4z" />
                </svg>
              </button>
            </div>
            <div className="saved-card__content">
              <h2>{reel.name || "A dish to remember"}</h2>
              <p>{reel.description}</p>
              <Link
                to={`/dishify-partner/${reel.dishifyPartner}`}
                target="_blank"
                rel="noreferrer"
              >
                Visit store <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        ))}
        {!loading && savedReels.length === 0 && (
          <div className="saved-empty">
            <span className="saved-empty__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M6 3.5h12v17l-6-4-6 4z" />
              </svg>
            </span>
            <h2>Your saved dishes live here</h2>
            <p>Tap the bookmark on a food video to keep it close.</p>
            <Link to="/">Explore videos</Link>
          </div>
        )}
      </section>
      <BottomNavigation />
    </main>
  );
};

export default Saved;
