
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CreateEditArticleForm from './Pages/CreateEditArticleForm';
import SearchArticles from './Pages/SearchArticles';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateGPTConstructForm from './Pages/CreateGPTConstructForm';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import './BackgroundVideo';
import './BackgroundAnimation.css'; 
import AdminPanel from './Pages/AdminPanel';
import SearchConstructs from './Pages/SearchConstructs';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  
  const token = localStorage.getItem('jwtToken');
  let username = '';
  let isSuperuser = false;

  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      username = decodedToken.username; 
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  React.useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    
      <div className="app-container">
       
         <div className="rolling-background"></div> 
        <Header isAuthenticated={isAuthenticated} username={username} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/article/create_edit_article" element={isAuthenticated ? <CreateEditArticleForm /> : <Navigate to="/" />} />
           <Route path="/article/search" element={isAuthenticated ? <SearchArticles /> : <Navigate to="/" />} />
           <Route path="/create_gpt_construct" element={<CreateGPTConstructForm/>} />
           <Route path="/adminPanel" element={<AdminPanel/>} />
           <Route path="/search_constructs" element={isAuthenticated ? <SearchConstructs userId={username} isSuperuser={isSuperuser} /> : <Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    
  );
};

export default App;
