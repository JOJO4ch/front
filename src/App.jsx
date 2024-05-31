// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';
import GPTForm from './Pages/GPTform';
import './BackgroundAnimation.css'; // Import the CSS file


// import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <div className="app-container">
    <div className="rolling-background"></div>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/GPT" element={<GPTForm />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
