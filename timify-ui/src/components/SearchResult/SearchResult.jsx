import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SearchResultCard from '../SearchResultCard/SearchResultCard';
import './SearchResult.css';


const SearchResults = () => {
    const [podcastsByGenre, setPodcastsByGenre] = useState([]);
    const {term} = useParams();

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/search?term=${term}`);
                setPodcastsByGenre(response.data.podcastSeries);
            }
            catch (err) {
                console.error(err);
            }
        };
        fetchPodcasts();
    }, [term]);

    return (
        <div className='all-podcast'>
            {podcastsByGenre.map((podcast) => (
             <SearchResultCard key={podcast.uuid} podcast={podcast} />
            ))}
        </div>
    );
}

export default SearchResults;
