import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import { UserContext } from '../../state/UserContext';
import Home from '../Home/Home';
import Footer from '../Footer/Footer';
import PodcastDetail from '../PodcastDetail/PodcastDetail';
import EpisodeDetail from '../EpisodeDetail/EpisodeDetail';
import SearchResults from '../SearchResult/SearchResult';
import LoginForm from '../LoginForm/LoginForm';
import Signup from '../SignUp/SignUp';
import EpisodeDisplay from '../EpisodeDisplay/EpisodeDisplay';



function App() {
  const [user, setUser] = useState(() => {
  
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  useEffect(() => {
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
                <Route path="/podcast/episode/:id" element={<EpisodeDisplay />} />
                <Route path="/search/:term" element={<SearchResults />} />
            </Routes>
            <Footer />
        </Router>
        </UserContext.Provider>
    </div>
  );
}

export default App;
