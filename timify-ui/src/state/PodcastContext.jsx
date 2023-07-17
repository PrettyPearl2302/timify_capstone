import React, {createContext, useState} from "react";

export const PodcastContext = createContext();

export const PodcastProvider = ({children}) => {
    const [selectedPodcast, setSelectedPodcast] = useState(null);

    const selectPodcast = (podcast) => { setSelectedPodcast(podcast);};

    return (
        <PodcastContext.Provider value={{selectedPodcast, selectPodcast }}>
        {children}
      </PodcastContext.Provider>
    );
}

export default PodcastProvider