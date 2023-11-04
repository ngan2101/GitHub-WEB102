import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PostCard from "../components/PostCard";

import supabase from "../config/supabaseClient";

const Home = ({ userId, orderBy, setOrderBy, filterBy, setFilterBy, searchQuery }) => {
  const [fetchError, setFetchError] = useState(null);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("posts").select().order(orderBy, { ascending: false });

      if (error) {
        setFetchError("Could not fetch the posts");
        setPosts(null);
      }
      if (data) {
        setPosts(data);
        setFetchError(null);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [orderBy]);

  const toggleFlag = (flag) => {
    if (filterBy == flag) {
      setFilterBy("");
    } else {
      setFilterBy(flag);
    }
  };

  if (loading) {
    return <div className="loader"></div>;
  } else {
    return (
      <div className="page home">
        <div className="options">
          <div className="order-by">
            <span>Order by:</span>
            <button style={{ backgroundColor: orderBy == "created_at" ? "#0E7C6B" : "#12bca2" }} onClick={() => setOrderBy("created_at")}>
              Newest
            </button>
            <button style={{ backgroundColor: orderBy == "upvotes" ? "#0E7C6B" : "#12bca2" }} onClick={() => setOrderBy("upvotes")}>
              Most Popular
            </button>
          </div>
          <div className="filter-by">
            <span>Filter by:</span>
            <button style={{ backgroundColor: filterBy == "Opinion" ? "#0E7C6B" : "#12bca2" }} onClick={() => toggleFlag("Opinion")}>
              Opinion
            </button>
            <button style={{ backgroundColor: filterBy == "Question" ? "#0E7C6B" : "#12bca2" }} onClick={() => toggleFlag("Question")}>
              Question
            </button>
            <button style={{ backgroundColor: filterBy == "Off-Topic" ? "#0E7C6B" : "#12bca2" }} onClick={() => toggleFlag("Off-Topic")}>
              Off-Topic
            </button>
          </div>
        </div>
        {fetchError && <p>{fetchError}</p>}
        {posts && (
          <div className="posts">
            <div className="post-grid">
              {posts
                .filter((post) => post.title.toLowerCase().includes(searchQuery))
                .filter((post) => {
                  if (!filterBy) {
                    return true;
                  } else if (post.flags.length > 0 && post.flags.includes(filterBy)) {
                    return true;
                  } else {
                    return false;
                  }
                })
                .map((post) => (
                  <Link to={"/" + post.id} key={post.id}>
                    <PostCard
                      postId={post.id}
                      userId={userId}
                      author={post.user_id}
                      title={post.referenced_post ? "Re: " + post.title : post.title}
                      createdAt={post.created_at}
                      upvotes={post.upvotes}
                      flags={post.flags}
                    />
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Home;