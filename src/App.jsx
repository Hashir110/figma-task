import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./auth/login";
import SignIn from "./auth/signUp";

import { CreateDetails } from "./pages/CreateDetails";

import ShowDetails from "./pages/ShowDetails";

import UpdateDetails from "./pages/UpdateDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/CreateDetails" element={<CreateDetails />} />

        <Route path="/showDetails" element={<ShowDetails />} />
        <Route path="/updateDetails" element={<UpdateDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
