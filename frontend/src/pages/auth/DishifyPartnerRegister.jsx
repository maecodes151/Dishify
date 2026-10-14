import AuthPage from "../../components/auth/AuthPage";
import FormField from "../../components/auth/FormField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DishifyPartnerRegister() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const businessName = event.target.elements["business-name"].value;

    const contactPersonName =
      event.target.elements["contact-person-name"].value;

    const contactNumber = event.target.elements["contact-number"].value;

    const email = event.target.elements["email"].value;

    const password = event.target.elements["password"].value;

    const businessAddress = event.target.elements["business-address"].value;

    const response = await axios
      .post(
        "http://localhost:3000/api/auth/dishify-partner/register",
        {
          name: businessName,
          contactName: contactPersonName,
          phone: contactNumber,
          email,
          password,
          Address: businessAddress,
        },
        {
          withCredentials: true,
        },
      )

      .then((response) => {
        console.log(response.data);
        navigate("/create-dishify");
      })

      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  return (
    <AuthPage audience="partner" mode="register" onSubmit={handleSubmit}>
      <FormField
        id="business-name"
        label="Business Name"
        placeholder="Your restaurant or business"
        autoComplete="organization"
      />
      <FormField
        id="contact-person-name"
        label="Contact Person Name"
        placeholder="Full name"
        autoComplete="name"
      />
      <FormField
        id="contact-number"
        label="Contact Number"
        type="tel"
        placeholder="Your phone number"
        autoComplete="tel"
      />
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
      <FormField
        id="business-address"
        label="Business Address"
        placeholder="Street, city, and postal code"
        autoComplete="street-address"
        multiline
      />
    </AuthPage>
  );
}

export default DishifyPartnerRegister;
