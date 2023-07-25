import React, { useState , useContext, useRef } from "react";
import { UserContext } from '../../state/UserContext.jsx';
import "./AudioPlayer.css";

const AudioPlayer = ({ audioUrl, fileType, episodeD}) => {
    const [commentContent, setCommentContent] = useState("")
    const [timestamp, setTimestamp] = useState(null)
    const [commentPosted, setCommentPosted] = useState(false)
    const audioRef = useRef(null)

    const user = useContext(UserContext);
    const userId = user.user.id; 
    const episodeId = episodeD;

    const handleChange = (event) => {
        setCommentContent(event.target.value)
    };

    const handleTimeUpdate = () => {
        const currentTime = audioRef.current.currentTime;

        const hours = Math.floor(currentTime / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((currentTime % 3600) / 60).toString().padStart(2, '0');
        const seconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        setTimestamp(formattedTime)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const commentData = {
            content: commentContent,
            userId: userId,
            episodeId: episodeId,
            timestamp: timestamp,
        }

        try {
            const response = await fetch("http://localhost:3000/comments", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(commentData),
            });

            console.log(response)
      
            if (response.ok) {
                setCommentPosted(true);
                setCommentContent(""); 
              console.log("Comment posted successfully!");
            } else {
              console.error("Failed to post comment.");
            }
          } catch (error) {
            console.error("Error while posting comment:", error);
          }
    };
    


        return (
            <div>
              {commentPosted && <p>Your comment was shared.</p>}
            <div className="audio-wrapper">    
            <audio ref={audioRef} controls onTimeUpdate={handleTimeUpdate}>
                <source src={audioUrl} type={fileType} />
            </audio>
            </div>
           
            <div className="comment block">
                <form className="new-comment-form" onSubmit={handleSubmit}>
                    <label>
                        Leave a comment:
                        <textarea 
                            name="userComment"
                            placeholder="Your comment goes here..."
                            rows={4} cols={40} 
                            value={commentContent}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Share</button>
                </form>
            </div>
            </div>
          );
    };

export default AudioPlayer;