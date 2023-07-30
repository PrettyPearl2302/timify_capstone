import React from 'react';
import './Comments.css';

const Comments = ({ visibleComments }) => {

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      };
    
  return (
    <div className="comments">
      <ul>
        {visibleComments.map((comment) => (
          <li key={comment.id} className="comment-item">
            <div className="comment-box">
              <p className="comment-content">{comment.content}</p>
              <span className="comment-info">
                <span className="userName">{comment.userName}</span> - <span className="timestamp">{formatTime(comment.timestamp)}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
