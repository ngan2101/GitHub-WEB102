import { useState } from "react";
import { useNavigate } from "react-router-dom";

import supabase from "../config/supabaseClient";

const CreateForm = ({ userId, title, setTitle, content, setContent, imageUrl, setImageUrl }) => {
  console.log("content: ", content);
  console.log("setTitle: ", setTitle);
  const navigate = useNavigate();

  const [formError, setFormError] = useState("");
  const [flags, setFlags] = useState([]);

  const toggleAddFlag = (flag) => {
    if (flags.includes(flag)) {
      setFlags((flags) =>
        flags.filter((currentFlag) => {
          return currentFlag != flag;
        })
      );
    } else {
      setFlags((flags) => [...flags, flag]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      setFormError("Please ensure that your post has a title.");
      return;
    }

    if (!setTitle && !content) {
      setFormError("Please ensure that your repost has content.");
      return;
    }

    const { data, error } = await supabase
      .from("posts")
      .insert([{ user_id: userId, title, content, image_url: imageUrl, comments: [], flags }]);

    if (error) {
      console.log(error);
      setFormError("Please fill in all the fields correctly.");
    }
    if (data) {
      console.log(data);
      setFormError(null);
      navigate("/");
    }
  };
  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <div className="flag-options">
          <span>Set Flags:</span>
          <button
            type="button"
            style={{ backgroundColor: flags.includes("Opinion") ? "#0E7C6B" : "#12bca2" }}
            onClick={() => toggleAddFlag("Opinion")}
          >
            Opinion
          </button>
          <button
            type="button"
            style={{ backgroundColor: flags.includes("Question") ? "#0E7C6B" : "#12bca2" }}
            onClick={() => toggleAddFlag("Question")}
          >
            Question
          </button>
          <button
            type="button"
            style={{ backgroundColor: flags.includes("Off-Topic") ? "#0E7C6B" : "#12bca2" }}
            onClick={() => toggleAddFlag("Off-Topic")}
          >
            Off-Topic
          </button>
        </div>
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={setTitle ? false : true}
        />
        <textarea
          id="content"
          type="text"
          placeholder={setTitle ? "Content (Optional)" : "Content"}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          id="image-url"
          placeholder="Image URL (Optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button>Create Post</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateForm;
