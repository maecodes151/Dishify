import { Link } from "react-router-dom";

const audienceCopy = {
  user: {
    label: "CUSTOMER",
    eyebrow: "GOOD FOOD, RIGHT AROUND THE CORNER",
    description:
      "Find your next favorite, order in a few taps, and make every meal a little easier.",
    loginPath: "/user/login",
    registerPath: "/user/register",
    otherPath: "/dishify-partner/login",
    otherPrompt: "Run a food business?",
    otherLink: "Login as Dishify Partner",
  },

  partner: {
    label: "DISHIFY PARTNER",
    eyebrow: "GROW YOUR BUSINESS WITH DISHIFY",
    description:
      "Meet more hungry customers and bring the flavors you love to more tables.",
    loginPath: "/dishify-partner/login",
    registerPath: "/dishify-partner/register",
    otherPath: "/user/login",
    otherPrompt: "Just here to order?",
    otherLink: "Login as a customer",
  },
};

export default function AuthPage({
  audience,
  mode,
  children,
  onSubmit,
}) {
  const copy = audienceCopy[audience];

  const isPartner = audience === "partner";
  const isRegistering = mode === "register";

  const pageTitle = isRegistering
    ? "Create your account"
    : "Welcome back";

  return (
    <main className={`auth-page auth-page--${audience}`}>
      <section
        className="auth-shell"
        aria-label={`${copy.label} ${mode}`}
      >

        <aside className="auth-aside">

          <Link
            className="brand"
            to="/"
            aria-label="Dishify home"
          >
            <span
              className="brand-mark"
              aria-hidden="true"
            >
              d
            </span>

            <span>dishify</span>
          </Link>

          <div className="aside-copy">

            <span className="eyebrow">
              {copy.eyebrow}
            </span>

            <h1>
              Good things
              <br />
              are on the menu.
            </h1>

            <p>
              {copy.description}
            </p>

          </div>

          <div className="aside-footer">

            <span
              className="status-dot"
              aria-hidden="true"
            />

            Made for the love of good food

          </div>

          <span
            className="decorative-orbit decorative-orbit--one"
            aria-hidden="true"
          />

          <span
            className="decorative-orbit decorative-orbit--two"
            aria-hidden="true"
          />

        </aside>

        <div className="auth-main">

          <div className="mobile-brand">

            <Link
              className="brand"
              to="/"
              aria-label="Dishify home"
            >
              <span
                className="brand-mark"
                aria-hidden="true"
              >
                d
              </span>

              <span>dishify</span>
            </Link>

          </div>

          <div className="auth-content">

            <div className="auth-heading">

              <span className="account-label">
                {copy.label} ACCOUNT
              </span>

              <h2>{pageTitle}</h2>

              <p>
                {isRegistering
                  ? isPartner
                    ? "Tell us a little about your business to get started."
                    : "A few details and you’re ready to go."
                  : "Sign in to pick up right where you left off."}
              </p>

            </div>

            {/* FORM START */}
            <form
              className="auth-form"
              onSubmit={onSubmit}
            >

              {children}

              <button
                className="submit-button"
                type="submit"
              >
                {isRegistering
                  ? "Create account"
                  : "Sign in"}

                <span aria-hidden="true">
                  →
                </span>
              </button>

            </form>
            {/* FORM END */}

            <p className="auth-switch">

              {isRegistering
                ? "Already have an account?"
                : "New to Dishify?"}{" "}

              <Link
                to={
                  isRegistering
                    ? copy.loginPath
                    : copy.registerPath
                }
              >
                {isRegistering
                  ? "Sign in"
                  : "Create an account"}
              </Link>

            </p>

            <div className="audience-switch">

              <span>
                {copy.otherPrompt}
              </span>

              <Link to={copy.otherPath}>
                {copy.otherLink}

                <span aria-hidden="true">
                  {" "}↗
                </span>

              </Link>

            </div>

          </div>

          <footer className="auth-legal">

            <span>
              © 2026 Dishify
            </span>

            <span>
              Made with care, served with flavor.
            </span>

          </footer>

        </div>

      </section>
    </main>
  );
}