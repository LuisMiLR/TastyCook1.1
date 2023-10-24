import React, { useEffect, useState } from "react";
import { getComments } from "../../../api/comment";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    getComments(postId)
      .then((res) => {
        setComments(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [postId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    createComment({ content: commentContent, postId })
      .then((res) => {
        setComments([...comments, res]);
        setCommentContent("");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <h2>Comments</h2>
      {Array.isArray(comments) && comments?.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          <p>By {comment.author}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;