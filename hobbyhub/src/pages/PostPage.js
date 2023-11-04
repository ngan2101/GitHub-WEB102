import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import PostCard from "../components/PostCard";
import CommentSection from "../components/CommentSection";

import supabase from "../config/supabaseClient";

const Post = ({ userId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState("");
  const [referencedPost, setReferencedPost] = useState("");
  console.log("referencedPost: ", referencedPost);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("posts").select().eq("id", id).single();

      if (error) {
        navigate("/", { replace: true });
      }

      // Current post data
      if (data) {
        setPost(data);

        // Referenced post data
        if (data.referenced_post) {
          const { data: referencedData, error } = await supabase.from("posts").select().eq("id", data.referenced_post).single();

          if (error) {
            navigate("/");
          }

          if (referencedData) {
            setReferencedPost(referencedData);
          }
        } else {
          setReferencedPost("");
        }
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  const handleUpvote = async () => {
    setPost((post) => ({
      ...post,
      upvotes: post.upvotes + 1,
    }));

    const { data, error } = await supabase
      .from("posts")
      .update({ upvotes: post.upvotes + 1 })
      .eq("id", post.id);

    if (error) {
      console.log("error: ", error);
      navigate("/");
    }
  };

  if (loading) {
    return <div className="loader"></div>;
  } else {
    return (
      <div className="page">
        <PostCard
          postId={post.id}
          userId={userId}
          author={post.user_id}
          title={post.referenced_post ? "Re: " + post.title : post.title}
          content={post.content}
          imageUrl={post.image_url}
          createdAt={post.created_at}
          upvotes={post.upvotes}
          handleUpvote={handleUpvote}
          flags={post.flags}
        />
        <CommentSection userId={userId} comments={post.comments} setPost={setPost} postId={post.id} />
        {referencedPost && (
          <>
            <h3>Replying to...</h3>
            <Link to={"/" + referencedPost.id}>
              <PostCard
                postId={referencedPost.id}
                userId={userId}
                author={referencedPost.user_id}
                title={referencedPost.referenced_post ? "Re: " + referencedPost.title : referencedPost.title}
                content={referencedPost.content}
                imageUrl={referencedPost.image_url}
                createdAt={referencedPost.created_at}
                upvotes={referencedPost.upvotes}
                flags={referencedPost.flags}
              />
            </Link>
          </>
        )}
      </div>
    );
  }
};

export default Post;