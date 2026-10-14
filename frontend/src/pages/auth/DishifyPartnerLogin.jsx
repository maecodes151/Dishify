
import AuthPage from "../../components/auth/AuthPage";
import FormField from "../../components/auth/FormField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DishifyPartnerLogin() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.currentTarget.elements["email"].value;
    const password = event.currentTarget.elements["password"].value;

    try {
      console.log("Login started");

      const response = await axios.post(
        "http://localhost:3000/api/auth/dishify-partner/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("Login successful:", response.data);

      navigate("/create-dishify");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.status,
        error.response?.data || error.message
      );
    }
  };

  return (
    <AuthPage
      audience="partner"
      mode="login"
      onSubmit={handleSubmit}
    >
      <FormField
        id="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
      />

      <FormField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        autoComplete="current-password"
      />
    </AuthPage>
  );
}

export default DishifyPartnerLogin;
