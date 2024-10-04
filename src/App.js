import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./scrollToTop.js";
import Main from "./main.js";

function App() {
  const location = useLocation();
  // useEffect(() => {
  //   const page = location.pathname;
  // }, [location]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
