import React, {createContext, useState} from "react";

export const PodcastContext = createContext();

export const ProductProvider = ({children}) => {
    const [selectedPodcast, setSelectedPodcast] = useState(null);

    return (
        <PodcastContext.Provider value={{ selectedPodcast, setSelectedPodcast }}>
        {children}
      </PodcastContext.Provider>
    );
}