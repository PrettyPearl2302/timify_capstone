import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Home from '../Home/Home';
import Footer from '../Footer/Footer';
import PodcastDetail from '../PodcastDetail/PodcastDetail';
import { PodcastProvider} from '../../state/PodcastContext';
import SearchResults from '../SearchResult/SearchResult';


function App() {
  const [podcastsByGenre, setPodcastsByGenre] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
      const response = await fetch('http://localhost:5000/api/home');
      const data = await response.json();
      setPodcastsByGenre(data);
      console.log(data)
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
      <PodcastProvider>
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
      </PodcastProvider>
    </div>
  );
}

export default App;