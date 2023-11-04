import { Link } from "react-router-dom";

const NavBar = ({ userId, searchQuery, setSearchQuery }) => {
  return (
    <nav>
      <h1>
        <Link to="/">HistoryHub</Link>
      </h1>
      <input
        className="search-input"
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        <span>Hello, @{userId}!</span>
        <Link to="/">Home</Link>
        <Link to="/create">Create New Post</Link>
      </div>
    </nav>
  );
};

export default NavBar;
