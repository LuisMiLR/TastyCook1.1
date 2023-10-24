import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentList from "./CommentList";

const CommentsPage = (props) => {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`/post/one/${props.match.params.id}`);
      setPost(response.data.post);
      setIsLoading(false);
    };

    const fetchComments = async () => {
      const response = await axios.get(`/comments/${props.match.params.id}`);
      setComments(response.data.comments);
    };

    fetchPost();
    fetchComments();
  }, [props.match.params.id]);

  const handleCommentSubmit = async (content) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `/comments/create/${props.match.params.id}`,
      { content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setComments([...comments, response.data.comment]);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <CommentList comments={comments} onCommentSubmit={handleCommentSubmit} />
    </div>
  );
};

export default CommentsPage;