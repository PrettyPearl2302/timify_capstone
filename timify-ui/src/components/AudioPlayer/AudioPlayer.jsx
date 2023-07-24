import React from "react";
import "./AudioPlayer.css";

const AudioPlayer = ({ audioUrl, fileType }) => {
  return (
    <div className="audio-wrapper">
      <audio controls>
        <source src={audioUrl} type={fileType} />
      </audio>
    </div>
  );
};

export default AudioPlayer;