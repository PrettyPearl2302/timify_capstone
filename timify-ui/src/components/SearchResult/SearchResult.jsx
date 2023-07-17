import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const SearchResults = () => {
    const [podcastsByGenre, setPodcastsByGenre] = useState([]);
    const {term}= useParams();
    console.log({term})

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/search?term=${term}`);
                console.log(response);
                //highly incorrect route (or not)
                setPodcastsByGenre(response.data.podcastSeries);
            }
            catch (err) {
                console.error(err);
            }
        };
        fetchPodcasts();
    }, [term]);

    return (
        <div>
            {podcastsByGenre.map((podcast) => (
                <div key={podcast.uuid}>{podcast.name}</div>
            ))}
        </div>
    );
}

export default SearchResults;
