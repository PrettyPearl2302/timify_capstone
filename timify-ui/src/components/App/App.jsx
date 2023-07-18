import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Home from '../Home/Home';
import Footer from '../Footer/Footer';
import PodcastDetail from '../PodcastDetail/PodcastDetail';
import SearchResults from '../SearchResult/SearchResult';


function App() {
  const [podcastsByGenre, setPodcastsByGenre] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/home');
        const data = await response.json();
        setPodcastsByGenre(data);
    
      } catch(error) {
        console.error('Error displaying podcasts', error)
      }
    }
    fetchPodcasts();
  }, []);

  return (
    <div className="app">
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Home podcastsByGenre={podcastsByGenre} setPodcastsByGenre={setPodcastsByGenre} />}
                />
                <Route path="/podcast/:id" element={<PodcastDetail />} />
                <Route path="/search/:term" element={<SearchResults />} />
            </Routes>
            <Footer />
        </Router>
    </div>
  );
}

export default App;
