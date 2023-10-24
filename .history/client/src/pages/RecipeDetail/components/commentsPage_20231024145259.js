
import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentList from "./CommentList";

const CommentsPage = (props) => {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`/api/posts/${props.match.params.id}`);
      setPost(response.data.post);
      setIsLoading(false);
    };

    fetchPost();
  }, [props.match.params.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <CommentList postId={post.id} />
    </div>
  );
};

export default CommentsPage;