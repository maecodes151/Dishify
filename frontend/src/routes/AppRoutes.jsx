import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import DishifyPartnerRegister from "../pages/auth/DishifyPartnerRegister";
import DishifyPartnerLogin from "../pages/auth/DishifyPartnerLogin";
import Home from "../pages/general/Home";
import Saved from "../pages/general/Saved";
import CreateDishify from "../pages/dishify-partner/CreateDishify";
import Profile from "../pages/dishify-partner/Profile";


const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Navigate to="/user/login" replace />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<UserLogin />} />

      <Route path="/dishify-partner/register" element={<DishifyPartnerRegister />} />
      <Route path="/dishify-partner/login" element={<DishifyPartnerLogin />} />
      <Route path="/dishify-partner/:id" element={<Profile />} />
      <Route path="/create-dishify" element={<CreateDishify />} />
      <Route path="/" element={<Home />} />
      <Route path="/saved" element={<Saved />} />
     
    </Routes>
  </Router>
);

export default AppRoutes;
