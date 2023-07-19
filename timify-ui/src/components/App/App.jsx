import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import { UserContext } from '../../state/UserContext';
import Home from '../Home/Home';
import Footer from '../Footer/Footer';
import PodcastDetail from '../PodcastDetail/PodcastDetail';
import SearchResults from '../SearchResult/SearchResult';
import LoginForm from '../LoginForm/LoginForm';
import Signup from '../SignUp/SignUp';



function App() {
  const [user, setUser] = useState(() => {
    // Retrieve the user data from storage or set it to null if not found
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  useEffect(() => {
    // Save the user data to storage whenever the user state changes
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <div className="app">
       <UserContext.Provider value={{ user, updateUser }}>
        <Router>
            <Routes>
                <Route path="/" element={user ? <Home /> : <LoginForm />} /> 
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/podcast/:id" element={<PodcastDetail />} />
                <Route path="/search/:term" element={<SearchResults />} />
            </Routes>
            <Footer />
        </Router>
        </UserContext.Provider>
    </div>
  );
}

export default App;
