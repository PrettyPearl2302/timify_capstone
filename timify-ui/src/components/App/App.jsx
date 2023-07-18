import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Home from '../Home/Home';
import Footer from '../Footer/Footer';
import PodcastDetail from '../PodcastDetail/PodcastDetail';
import { PodcastProvider} from '../../state/PodcastContext';
import SearchResults from '../SearchResult/SearchResult';
import Search from '../Search/Search';


function App() {
  const [podcastsByGenre, setPodcastsByGenre] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

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
				setPodcastsByGenre({})
      }
    }
    fetchPodcasts();
  
  }, []);

  const selectPodcast = (podcast) => { setSelectedPodcast(podcast);};


  return (
    <div className="app">
      <PodcastProvider value={{podcastsByGenre, selectPodcast, setSelectedPodcast}}>
          <Router>
          <Search />
              <Routes>
                  <Route
                      path="/"
                      element={<Home />}
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