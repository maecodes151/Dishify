import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [videoStates, setVideoStates] = useState({});

useEffect(() => {
  axios
    .get(`http://localhost:3000/api/dishify-partner/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      setProfile(response.data.dishifyPartner);
      setVideos(response.data.dishifyPartner.foodItems);
    });
}, [id]);


  return (
    <>
      <style>{`
        .partner-profile-page {
          min-height: 100dvh;
          background: var(--color-page);
        }

        .partner-profile-card {
          width: min(100%, 60rem);
          min-height: 100dvh;
          margin-inline: auto;
          background: var(--color-surface);
          border-inline: 1px solid var(--color-border);
        }

        .partner-profile-header {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          align-items: center;
          gap: clamp(1.5rem, 7vw, 4rem);
          padding: clamp(1.5rem, 6vw, 4rem);
          border-bottom: 1px solid var(--color-border);
        }

        .partner-profile-avatar {
          width: clamp(5rem, 15vw, 9rem);
          height: clamp(5rem, 15vw, 9rem);
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--color-accent);
          box-shadow: inset 0 0 0 1px rgb(255 255 255 / 10%);
        }

        .partner-profile-meta {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
          gap: 0.5rem;
          color: var(--color-ink);
        }

        .partner-profile-title,
        .partner-profile-address {
          margin: 0;
          overflow: hidden;
          color: inherit;
          font-weight: var(--font-weight-semibold);
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .partner-profile-title {
          font-size: clamp(1rem, 2.2vw, 1.3rem);
        }

        .partner-profile-address {
          font-size: var(--font-size-sm);
          color: var(--color-muted);
        }

        .partner-profile-stats {
          display: grid;
          grid-template-columns: repeat(2, max-content);
          gap: clamp(1rem, 4vw, 2rem);
          margin-top: 1.25rem;
        }

        .partner-profile-stat {
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
          min-width: 0;
          color: var(--color-ink);
        }

        .partner-profile-stat-label {
          color: var(--color-muted);
          font-size: var(--font-size-sm);
        }

        .partner-profile-stat-value {
          font-size: 1rem;
          font-weight: var(--font-weight-bold);
        }

        .partner-profile-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(0.25rem, 1vw, 0.75rem);
          padding: clamp(0.75rem, 2vw, 1.25rem);
          border-top: 1px solid var(--color-border);
        }

        .partner-profile-grid-item {
          position: relative;
          overflow: hidden;
          aspect-ratio: 1;
          border-radius: 0.5rem;
          background: var(--color-accent-soft);
          color: var(--color-ink);
          font-size: clamp(0.7rem, 1.5vw, 0.9rem);
          letter-spacing: 0.02em;
          isolation: isolate;
          box-shadow: 0 1px 3px rgb(0 0 0 / 10%);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .partner-profile-grid-item:hover {
          z-index: 1;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgb(0 0 0 / 16%);
        }

        .partner-profile-video {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: var(--color-accent-soft);
          opacity: 0;
          transition: opacity 240ms ease;
        }

        .partner-profile-grid-item[data-state="ready"] .partner-profile-video {
          opacity: 1;
        }

        .partner-profile-video-placeholder {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: grid;
          place-items: center;
          padding: 1rem;
          background: linear-gradient(
            110deg,
            var(--color-accent-soft) 8%,
            var(--color-surface) 18%,
            var(--color-accent-soft) 33%
          );
          background-size: 200% 100%;
          color: var(--color-muted);
          font-size: var(--font-size-sm);
          text-align: center;
          animation: partner-profile-video-shimmer 1.5s linear infinite;
        }

        .partner-profile-grid-item[data-state="ready"] .partner-profile-video-placeholder {
          visibility: hidden;
          opacity: 0;
          transition: opacity 240ms ease, visibility 240ms ease;
        }

        .partner-profile-grid-item[data-state="error"] .partner-profile-video-placeholder {
          background: var(--color-accent-soft);
          animation: none;
        }

        @keyframes partner-profile-video-shimmer {
          to {
            background-position-x: -200%;
          }
        }

        @media (max-width: 600px) {
          .partner-profile-card {
            border-inline: 0;
          }

          .partner-profile-header {
            grid-template-columns: 5rem minmax(0, 1fr);
            gap: 1.25rem;
            padding: 1.5rem 1rem;
          }

          .partner-profile-avatar {
            width: 5rem;
            height: 5rem;
          }

          .partner-profile-stats {
            grid-column: 1 / -1;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.5rem;
            margin-top: 0.25rem;
          }

          .partner-profile-stat {
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.25rem;
          }

          .partner-profile-stat-label {
            font-size: var(--font-size-xs);
          }

          .partner-profile-grid {
            gap: 0.25rem;
            padding: 0.75rem;
          }

          .partner-profile-grid-item {
            border-radius: 0.35rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .partner-profile-grid-item,
          .partner-profile-video,
          .partner-profile-grid-item[data-state="ready"] .partner-profile-video-placeholder {
            transition: none;
          }

          .partner-profile-video-placeholder {
            animation: none;
          }
        }
      `}</style>


      <div className="partner-profile-page">
        <div className="partner-profile-card">
          <div className="partner-profile-header">
            <div
              className="partner-profile-avatar"
              aria-label="Business avatar"
              aria-hidden="true"

            />

            
            <div className="partner-profile-meta">
              <p className="partner-profile-title">{profile?.name}
              </p>
              <p className="partner-profile-address">{profile?.Address}</p>
            </div>

            <div className="partner-profile-stats">
              <div className="partner-profile-stat">
                <span className="partner-profile-stat-value">{profile?.totalMeal}</span>
                <span className="partner-profile-stat-label">total meals</span>
              </div>
              <div className="partner-profile-stat">
                <span className="partner-profile-stat-value">{profile?.customersServerd}</span>
                <span className="partner-profile-stat-label">
                  customer served
                </span>
              </div>
            </div>
          </div>

          <div className="partner-profile-grid" aria-label="Video tiles">
            {videos.map((video, index) => {
              const videoKey = `${video.video}-${index}`;
              const state = videoStates[videoKey] ?? "loading";

              return (
                <div
                  key={videoKey}
                  className="partner-profile-grid-item"
                  data-state={state}
                >
                  <video
                    className="partner-profile-video"
                    src={video.video}
                    muted
                    controls
                    playsInline
                    preload="metadata"
                    loading="lazy"
                    onLoadedData={() =>
                      setVideoStates((current) => ({
                        ...current,
                        [videoKey]: "ready",
                      }))
                    }
                    onError={() =>
                      setVideoStates((current) => ({
                        ...current,
                        [videoKey]: "error",
                      }))
                    }
                    aria-label={`Partner video ${index + 1}`}
                  />
                  {state !== "ready" && (
                    <span
                      className="partner-profile-video-placeholder"
                      role={state === "error" ? "status" : undefined}
                    >
                      {state === "error" ? "Video unavailable" : "Loading video…"}
                    </span>
                  )}
                </div>
              );
            })}





          </div>
        </div>
      </div>
    </>
  );
};

export { Profile };
export default Profile;
