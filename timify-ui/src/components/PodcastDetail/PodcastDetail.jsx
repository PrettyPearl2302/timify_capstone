import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function PodcastDetail () {

    const [podcastInfo, setPodcastInfo] = useState([])

    const {id} = useParams();

    useEffect(() => {
        const fetchPodcastInfo = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/podcast?id=${id}`);
                const data = await response.json
                console.log(response)
                console.log(data)
                setPodcastInfo(data.data);
            }
            catch (err) {
                console.error(err);
            }
        };
        fetchPodcastInfo();
    }, [id]);


    return (
        <div>
            {podcastInfo.map((podcast) => (
                <div key={podcast.uuid}>{podcast.name}</div>
            ))}
        </div>
    );
 }
   


export default PodcastDetail