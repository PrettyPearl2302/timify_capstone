import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Home from '../Home/Home';
import Footer from '../Footer/Footer';


function App() {
  const [podcastsByGenre, setPodcastsByGenre] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
      const response = await fetch('http://localhost:5000/api/home');
      const data = await response.json();
      setPodcastsByGenre(data);
      console.log({data})
      }
      catch(error) {
        console.error('Error displaying podcasts', error)
				setPodcasts({})
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
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;