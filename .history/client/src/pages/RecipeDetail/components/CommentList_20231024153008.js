import React, { useEffect, useState } from "react";
import { getComments } from "../../";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(postId)
      .then((res) => {
        setComments(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [postId]);

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