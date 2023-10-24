import React from "react";
import axios from "axios";

function CommentList(props) {
    const [comments, setComments] = React.useState([]);
  
    React.useEffect(() => {
      const fetchComments = async () => {
        const response = await axios.get(`/api/posts/${props.postId}/comments`);
        setComments(response.data.comments);
      };
  
      fetchComments();
    }, [props.postId]);
  
    return (
      <div>
        {/* contenu du composant */}
      </div>
    );
  }
    return (
      <div>
        {/* contenu du composant */}
      </div>
    );
  }