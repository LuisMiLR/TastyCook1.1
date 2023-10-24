import React, { useState } from "react";
import axios from "axios";

const CommentList = ({ comments, onCommentSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onCommentSubmit(content);
    setContent("");
  };

  return (
    <div>
      <h2>Commentaires</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Ajouter un commentaire</button>
      </form>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.descripcomment}</p>
          <p>Par {comment.User.username}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;