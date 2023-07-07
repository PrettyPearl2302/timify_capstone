import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Home from '../Home/Home';


function App() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
      const response = await fetch('http://localhost:3000/podcasts');
      const data = await response.json();
      setPodcasts(data);
      console.log({data})
      }
      catch(error) {
        console.error('Error displaying podcasts')
				setPodcasts(false)
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
            element={<Home podcasts={podcasts} setPodcasts={setPodcasts} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;