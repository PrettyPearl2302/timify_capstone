import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function PodcastDetail () {

    const [podcastInfo, setPodcastInfo] = useState([])

    const {uuid} = useParams();

    useEffect(() => {
        const fetchPodcastInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/podcast?id=${uuid}`);
                setPodcastInfo(response.data.podcastSeries);
            }
            catch (err) {
                console.error(err);
            }
        };
        fetchPodcastInfo();
    }, [uuid]);


    return (
        <div>
            {podcastInfo.map((podcast) => (
                <div key={podcast.uuid}>{podcast.name}</div>
            ))}
        </div>
    );
 }
   


export default PodcastDetail