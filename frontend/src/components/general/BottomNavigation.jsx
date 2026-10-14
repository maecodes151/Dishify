import { NavLink } from "react-router-dom";
import "./BottomNavigation.css";

const BottomNavigation = () => (
  <nav className="bottom-navigation" aria-label="Main navigation">
    <NavLink
      className={({ isActive }) =>
        `bottom-navigation__link${isActive ? " is-active" : ""}`
      }
      to="/"
      end
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m3.5 10.5 8.5-7 8.5 7v9a1 1 0 0 1-1 1h-5.25v-6.25h-4.5V20H4.5a1 1 0 0 1-1-1z" />
      </svg>
      <span>Home</span>
    </NavLink>
    <NavLink
      className={({ isActive }) =>
        `bottom-navigation__link${isActive ? " is-active" : ""}`
      }
      to="/saved"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 3.5h12v17l-6-4-6 4z" />
      </svg>
      <span>Saved</span>
    </NavLink>
  </nav>
);

export default BottomNavigation;
