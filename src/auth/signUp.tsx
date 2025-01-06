import React, { useState, useRef } from "react";
import logo from "../assets/Logo.svg";
import "boxicons";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
const SignIn = () => {
  const [fullname, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    fullnameValue: false,
    role: false,
  });
  const roleOptions = ["Intern", "Frontend", "Web Developer", "App Developer"];

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const validationSchema = yup.object().shape({
    fullname: yup
      .string()
      .required("Full Name is required")
      .max(30, "Full Name should not exceed 30 characters")
      .matches(/^[A-Za-z\s]+$/, "Only alphabets and spaces are allowed"),

    role: yup.string().required("Role is required"),

    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@(gmail\.com|[a-zA-Z0-9.-]+\.[a-zA-Z]+[gmail]{2,4})$/,
        "Email must be in a valid format"
      ),

    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleSignup = async () => {
    try {
      setErrors({});
      setAlertMessage(null);

      await validationSchema.validate(
        { fullname, role, email, password },
        { abortEarly: false }
      );

      localStorage.setItem("fullname", fullname);
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      setOpen(true);
      setEmail("");
      setPassword("");
      setFullName("");
      setRole("");
      setOpen(false);
      setTimeout(() => navigate("/"), 2000);
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

  const handleFullnameChange = (e) => {
    const fullnameValue = e.target.value;
    setFullName(fullnameValue);

    try {
      validationSchema.fields.fullname.validateSync(fullnameValue);
      setErrors((prevErrors) => ({ ...prevErrors, fullname: null }));
    } catch (err) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fullname: err.message,
      }));
    }
  };

  const handleRoleChange = (e) => {
    const roleValue = e.target.value;
    setRole(roleValue);

    try {
      validationSchema.fields.role.validateSync(roleValue);
      setErrors((prevErrors) => ({ ...prevErrors, role: null }));
    } catch (err) {
      setErrors((prevErrors) => ({ ...prevErrors, role: err.message }));
    }
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setDropdownOpen(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const isFormValid = () => {
    return (
      fullname &&
      role &&
      email &&
      password &&
      !errors.fullname &&
      !errors.role &&
      !errors.email &&
      !errors.password
    );
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="border-2 border-gray-300 w-full sm:w-96 h-auto p-8 bg-white rounded-lg shadow-lg mx-4 sm:mx-0">
        <a href="#" className="block text-center mb-4">
          <img src={logo} alt="Logo" className="mx-auto" />
        </a>
        <h2 className="text-gray-800 text-2xl font-semibold mb-6">
          Welcome to Taska!
        </h2>

        {alertMessage && (
          <Alert severity={alertMessage.type} className="mb-4">
            {alertMessage.text}
          </Alert>
        )}

        <div className="mb-4">
          <input
            value={fullname}
            onChange={handleFullnameChange}
            onBlur={() => setTouched((prev) => ({ ...prev, fullname: true }))}
            type="text"
            placeholder="Full Name"
            maxLength="30"
            className={`w-full p-3 border ${
              errors.fullname ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
          )}
        </div>

        <div className="mb-4 relative" ref={dropdownRef}>
          <input
            value={role}
            onChange={handleRoleChange}
            onBlur={() => setTouched((prev) => ({ ...prev, role: true }))}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            type="text"
            placeholder="Select Role"
            className={`w-full p-3 border ${
              errors.role ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <i className="bx bx-chevron-down absolute right-3 top-3 text-2xl text-gray-500 cursor-pointer"></i>
          {dropdownOpen && (
            <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10">
              {roleOptions.map((option, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer hover:bg-blue-100"
                  onClick={() => handleRoleSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            value={email}
            onChange={handleEmailChange}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            type="text"
            placeholder="Email"
            autoComplete="off"
            className={`w-full p-3 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.email && (
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
          <i
            onClick={togglePasswordVisibility}
            className={`bx ${
              passwordVisible ? "bx-show" : "bx-low-vision"
            } absolute right-3 top-3 text-2xl text-gray-500 cursor-pointer`}
          ></i>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          onClick={handleSignup}
          className={`w-full p-3 rounded-md text-white text-lg font-semibold ${
            isFormValid()
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isFormValid()}
        >
          SIGN UP
        </button>

        <p className="mt-5 text-center text-gray-600">
          Already have an account? {""}
          <a
            href="#"
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Signup Successful</DialogTitle>
        <DialogContent>
          <p>You have signed up successfully!</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            color="primary"
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignIn;
