import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./auth/signUp";

import { CreateDetails } from "./pages/CreateDetails";
import ShowDetails from "./pages/ShowDetails";
import UpdateDetails from "./pages/UpdateDetails";
import Login from "./auth/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/CreateDetails" element={<CreateDetails />} />
        <Route path="/showDetails" element={<ShowDetails />} />
        <Route path="/updateDetails" element={<UpdateDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
