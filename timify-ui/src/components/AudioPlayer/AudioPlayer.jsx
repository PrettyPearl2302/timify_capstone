import React, { useState , useContext, useRef, useEffect} from "react";
import { UserContext } from '../../state/UserContext.jsx';
import "./AudioPlayer.css";

const AudioPlayer = ({ audioUrl, fileType, episodeD}) => {
    const [commentContent, setCommentContent] = useState("")
    const [timestamp, setTimestamp] = useState(null)
    const [commentPosted, setCommentPosted] = useState(false)
    const [audioPlaying, setAudioPlaying] = useState(false)
    const [comments, setComments] = useState([{}]);
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

    const handleAudioPlay = () => {
        setAudioPlaying(true);
      };
    
    const handleAudioPause = () => {
        setAudioPlaying(false);
      };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!audioPlaying)
         {
            return;
         }

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

      
      useEffect(() => {

        const fetchCommentsByEpisodeId = async () => {
          try {
            const response = await fetch(`http://localhost:3000/comments/${episodeId}`);
            if (response.ok) {
              const data = await response.json();
              setComments(data)
            } else {
              console.error("Failed to fetch comments");
            }
          } catch (error) {
            console.error("Error while fetching comments", error);
          }
        };
  

        fetchCommentsByEpisodeId();
      }, [episodeId]);
      

        return (
            <div>
              {commentPosted && <p>Your comment was shared.</p>}
            <div className="audio-wrapper">    
            <audio
             ref={audioRef} 
             controls
             onTimeUpdate={handleTimeUpdate} 
             onPlay={handleAudioPlay}
             onPause={handleAudioPause}
             >
                <source src={audioUrl} type={fileType} />   
            </audio>
            </div>
           
            <div className="comment block">
                <form className="new-comment-form" onSubmit={handleSubmit}>
                    <label>
                        Leave a comment:
                        <textarea 
                            name="userComment"
                            placeholder={
                                audioPlaying
                                  ? "Your comment goes here..."
                                  : "Please start the audio to leave a comment."
                              }
                            rows={4} cols={40} 
                            value={commentContent}
                            onChange={handleChange}
                            disabled={!audioPlaying}
                        />
                    </label>
                    <button type="submit" disabled={!audioPlaying}>Share</button>
                </form>
            </div>

            <div className="comments">
            <h2>Comments</h2>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>{comment.content} {comment.timestamp}</li>
              ))}
            </ul>
          </div>
            </div>
          );
    };

export default AudioPlayer;