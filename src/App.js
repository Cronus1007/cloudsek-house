import './App.css';
import Home from "./components/Home"
import Layout from "./components/layout"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <React.StrictMode>
      <ToastContainer />
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/layout" element={<Layout />} />
      </Routes>
    </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
