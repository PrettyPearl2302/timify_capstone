import React from "react";
import "./AudioPlayer.css";

const AudioPlayer = ({ audioUrl, fileType }) => {
  return (
    <div>
    <div className="audio-wrapper">
      <audio controls>
        <source src={audioUrl} type={fileType} />
      </audio>
    </div>

    <div className="comment block">
        <form className="new-comment-form">
            <label>
                Leave a comment:
                <textarea 
                    name="userComment"
                    placeholder="Your comment goes here..."
                    rows={4} cols={40} 
                />
            </label>
            <button type="submit">Post Comment</button>
        </form>
    </div>
    </div>
  );
};

export default AudioPlayer;