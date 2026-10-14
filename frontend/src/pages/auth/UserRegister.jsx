import AuthPage from "../../components/auth/AuthPage";
import FormField from "../../components/auth/FormField";
import axios from "axios";
import { useNavigate } from "react-router-dom";





function UserRegister() {

   const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const firstName = event.target.elements["first-name"].value;
    const lastName = event.target.elements["last-name"].value;
    const email = event.target.elements["email"].value;
    const password = event.target.elements["password"].value;

    const response = await axios.post(
      "http://localhost:3000/api/auth/user/register",
      {
        fullname: firstName + " " + lastName,
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
    <AuthPage audience="user" mode="register" onSubmit={handleSubmit}>
      <div className="name-fields">
        <FormField
          id="first-name"
          label="First Name"
          placeholder="First name"
          autoComplete="given-name"
        />

        <FormField
          id="last-name"
          label="Last Name"
          placeholder="Last name"
          autoComplete="family-name"
        />
      </div>

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
        autoComplete="new-password"
      />
    </AuthPage>
  );
}
export default UserRegister;
