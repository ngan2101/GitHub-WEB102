import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import Create from "./pages/Create";
import Update from "./pages/Update";
import Repost from "./pages/Repost";

function App() {
  const [userId] = useState("user" + Math.floor(100000 + Math.random() * 900000));
  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState("created_at");
  const [filterBy, setFilterBy] = useState("");

  return (
    <BrowserRouter>
      <NavBar userId={userId} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              userId={userId}
              searchQuery={searchQuery}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />
          }
        />
        <Route path="/:id" element={<PostPage userId={userId} />} />
        <Route path="/create" element={<Create userId={userId} />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/repost/:id" element={<Repost userId={userId} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;