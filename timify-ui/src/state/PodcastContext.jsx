import React, {createContext, useState} from "react";

export const PodcastContext = createContext();

export const PodcastProvider = ({children, value}) => {
    const [selectedPodcast, setSelectedPodcast] = useState(null);

    const selectPodcast = (podcast) => { setSelectedPodcast(podcast);};

    return (
        <PodcastContext.Provider value={{value}}>
        {children}
      </PodcastContext.Provider>
    );
}

export default PodcastProvider