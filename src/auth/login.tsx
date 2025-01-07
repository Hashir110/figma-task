import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";
import * as yup from "yup";
import "boxicons";
import { Alert } from "@mui/material";
import WavingHandIcon from "@mui/icons-material/WavingHand";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setErrors({});
      setAlertMessage(null);

      await validationSchema.validate(
        { email, password },
        { abortEarly: false }
      );

      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");

      if (email === storedEmail && password === storedPassword) {
        setAlertMessage({ type: "success", text: "Login successful!" });

        setEmail("");
        setPassword("");

        setTimeout(() => {
          navigate("/CreateDetails");
        }, 2000);
      } else {
        setAlertMessage({ type: "error", text: "Invalid email or password" });
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errorObj = {};
        err.inner.forEach((e) => {
          errorObj[e.path] = e.message;
        });
        setErrors(errorObj);
      }
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    try {
      validationSchema.fields.email.validateSync(emailValue);
      setErrors((prevErrors) => ({ ...prevErrors, email: null }));
    } catch (err) {
      setErrors((prevErrors) => ({ ...prevErrors, email: err.message }));
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    try {
      validationSchema.fields.password.validateSync(passwordValue);
      setErrors((prevErrors) => ({ ...prevErrors, password: null }));
    } catch (err) {
      setErrors((prevErrors) => ({ ...prevErrors, password: err.message }));
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@(gmail\.com|[a-zA-Z0-9.-]+\.[a-zA-Z]+)$/,
        "Email must be in a valid format"
      ),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const isFormValid = () => {
    return email && password && !errors.email && !errors.password;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="border-2 border-gray-300 w-full sm:w-96 h-auto p-8 bg-white rounded-lg shadow-lg mx-4 sm:mx-0">
        <a href="#" className="block text-center mb-4">
          <img src={logo} alt="Logo" className="mx-auto" />
        </a>

        <h2 className="text-gray-800 text-2xl font-semibold mb-6">
          Welcome to Taska <WavingHandIcon className="text-yellow-300"/>
        </h2>

        {/* Alert Message */}
        {alertMessage && (
          <Alert severity={alertMessage.type} className="mb-4">
            {alertMessage.text}
          </Alert>
        )}

        <div className="mb-4">
          <input
            value={email}
            onChange={handleEmailChange}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            type="text"
            placeholder="Email"
            className={`w-full p-3 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <input
            value={password}
            onChange={handlePasswordChange}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            className={`w-full p-3 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.password && touched.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
          <i
            onClick={togglePasswordVisibility}
            className={`bx ${
              passwordVisible ? "bx-show" : "bx-low-vision"
            } absolute right-3 top-3 text-2xl text-gray-500 cursor-pointer`}
          ></i>
        </div>

        <button
          onClick={handleLogin}
          className={`w-full p-3 rounded-md text-white text-lg font-semibold ${
            isFormValid()
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isFormValid()}
        >
          LOGIN
        </button>
        <p className="mt-5 text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="#"
            onClick={() => navigate("/signin")}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
