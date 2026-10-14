import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./CreateDishify.css";
import { useNavigate } from "react-router-dom";



const CreateDishify = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoPreviewRef = useRef("");



 const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (videoPreviewRef.current) {
        URL.revokeObjectURL(videoPreviewRef.current);
      }
    };
  }, []);

  const updateSelectedVideo = (file) => {
    if (videoPreviewRef.current) {
      URL.revokeObjectURL(videoPreviewRef.current);
    }

    const previewUrl = file ? URL.createObjectURL(file) : "";
    videoPreviewRef.current = previewUrl;
    setVideoPreview(previewUrl);
    setVideoFile(file);
  };

  const handleVideoChange = (event) => {
    const file = event.target.files?.[0];
    setError("");
    setSuccess("");

    if (file && !file.type.startsWith("video/")) {
      event.target.value = "";
      updateSelectedVideo(null);
      setError("Choose a video file to continue.");
      return;
    }

    updateSelectedVideo(file ?? null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!videoFile) {
      setError("Add a video of your dish before publishing.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("video", videoFile);

    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:3000/api/food/", formData, {
        withCredentials: true,
      });
       
  navigate("/")

      form.reset();
      updateSelectedVideo(null);
      setSuccess("Your dish has been published.");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ??
          "We couldn't publish your dish. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
     
    }
  };

  return (
    <main className="create-dish-page">
      <section className="create-dish-card" aria-labelledby="create-dish-title">
        <header className="create-dish-header">
          <p className="create-dish-eyebrow">Share something delicious</p>
          <h1 className="create-dish-title" id="create-dish-title">
            Create a dish
          </h1>
          <p className="create-dish-intro">
            Add a short video and tell everyone what makes it special.
          </p>
        </header>

        <form className="create-dish-form" onSubmit={handleSubmit}>
          <div className="create-dish-field">
            <label className="create-dish-label" htmlFor="dish-video">
              Dish video <span aria-hidden="true">*</span>
            </label>
            <div className="create-dish-upload">
              {videoPreview ? (
                <>
                  <video
                    className="create-dish-preview"
                    src={videoPreview}
                    controls
                    playsInline
                    aria-label="Selected dish video preview"
                  />
                  <label
                    className="create-dish-change-video"
                    htmlFor="dish-video"
                  >
                    Choose a different video
                  </label>
                </>
              ) : (
                <label
                  className="create-dish-upload-prompt"
                  htmlFor="dish-video"
                >
                  <span className="create-dish-upload-icon" aria-hidden="true">
                    +
                  </span>
                  <span className="create-dish-upload-title">Choose a video</span>
                  <span className="create-dish-upload-hint">Tap to browse your files</span>
                </label>
              )}
              <input
                className="create-dish-file-input"
                id="dish-video"
                name="video"
                type="file"
                accept="video/*"
                required
                onChange={handleVideoChange}
                aria-describedby="dish-video-hint"
              />
            </div>
            <p className="create-dish-hint" id="dish-video-hint">
              {videoFile
                ? videoFile.name
                : "Upload a video that shows your dish at its best."}
            </p>
          </div>

          <div className="create-dish-field">
            <label className="create-dish-label" htmlFor="dish-name">
              Dish name <span aria-hidden="true">*</span>
            </label>
            <input
              className="create-dish-input"
              id="dish-name"
              name="name"
              type="text"
              placeholder="e.g. Creamy mushroom pasta"
              maxLength={100}
              autoComplete="off"
              required
            />
          </div>

          <div className="create-dish-field">
            <label className="create-dish-label" htmlFor="dish-description">
              Description <span aria-hidden="true">*</span>
            </label>
            <textarea
              className="create-dish-input create-dish-textarea"
              id="dish-description"
              name="description"
              placeholder="Share the ingredients, flavors, or story behind this dish..."
              maxLength={1000}
              rows={5}
              required
            />
            <p className="create-dish-hint">
              Keep it inviting and let the flavors speak for themselves.
            </p>
          </div>

          {error && (
            <p className="create-dish-message create-dish-message-error" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p
              className="create-dish-message create-dish-message-success"
              role="status"
            >
              {success}
            </p>
          )}

          <button
            className="create-dish-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing…" : "Publish dish"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default CreateDishify;
