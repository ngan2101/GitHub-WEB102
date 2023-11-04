import CreateForm from "../components/CreateForm";
import { useState } from "react";

const Create = ({ userId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  return (
    <CreateForm
      userId={userId}
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      imageUrl={imageUrl}
      setImageUrl={setImageUrl}
    />
  );
};

export default Create;