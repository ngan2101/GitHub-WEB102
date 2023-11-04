import { Link, useNavigate, useParams } from "react-router-dom";
import { parseDate } from "../utils/Utils";

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

import supabase from "../config/supabaseClient";

const PostCard = ({ userId, postId, author, title, createdAt, upvotes, content, imageUrl, handleUpvote, flags }) => {
  console.log("flags: ", flags);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    const { data, error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) {
      console.log("error: ", error);
      navigate("/");
    }
    if (data) {
      navigate("/");
    }
  };
  return (
    <div className="post-card">
      <p>
        Posted by {author == userId ? "You" : "@" + author} - {parseDate(createdAt)}
      </p>
      <h3>{title}</h3>
      {content ? <p>{content}</p> : null}
      {imageUrl ? <img src={imageUrl} /> : null}
      <div className="flags">
        {flags && flags.length > 0
          ? flags.map((flag) => (
              <span className="flag" key={flag}>
                {flag}
              </span>
            ))
          : null}
      </div>
      <div className="buttons">
        <div className="upvotes">
          {id == postId ? (
            <button className="upvote-button" onClick={() => handleUpvote(postId)}>
              <ThumbUpOutlinedIcon />
            </button>
          ) : null}
          <span>{upvotes == 1 ? upvotes + " upvote" : upvotes + " upvotes"} </span>
        </div>
        <div>
          {id == postId && author == userId ? (
            <span>
              <Link to={"/update/" + postId}>
                <i className="material-icons">edit</i>
              </Link>
              <i className="material-icons" onClick={handleDelete}>
                delete
              </i>
            </span>
          ) : null}
          {id == postId ? (
            <Link to={"/repost/" + postId}>
              <i className="material-icons" title="repost">
                reply
              </i>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PostCard;