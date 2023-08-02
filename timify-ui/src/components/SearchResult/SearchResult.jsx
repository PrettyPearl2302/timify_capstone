import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineLoading } from "react-icons/ai";
import SearchResultCard from '../SearchResultCard/SearchResultCard';
import './SearchResult.css';


const SearchResults = () => {
    const [podcastsByGenre, setPodcastsByGenre] = useState([]);
    const {term} = useParams();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/search?term=${term}`);
                setPodcastsByGenre(response.data.podcastSeries);
                setIsLoading(false)
            }
            catch (err) {
                console.error(err);
                setIsLoading(false)
            }
        };
        fetchPodcasts();
    }, [term]);

    if (isLoading) {
        return <div className='loading-state'>
          <div><AiOutlineLoading /></div>
          Loading...</div>
      }


    return (
        <div className='all-podcast'>
            {podcastsByGenre.map((podcast) => (
             <SearchResultCard key={podcast.uuid} podcast={podcast} />
            ))}
        </div>
    );
}

export default SearchResults;
