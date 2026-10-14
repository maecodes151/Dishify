import AuthPage from "../../components/auth/AuthPage";
import FormField from "../../components/auth/FormField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function UserLogin() {
   const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.elements["email"].value;
    const password = event.target.elements["password"].value;

    const response = await axios.post(
      "http://localhost:3000/api/auth/user/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    console.log(response.data);

    navigate("/");
  };
  
  return (
    <AuthPage audience="user" mode="login" onSubmit={handleSubmit}>
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

export default UserLogin;
