import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {addNewPost} from "./postsSlice";
import {selectAllUsers} from "../users/usersSlice";
import {useNavigate} from "react-router-dom";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);

  const onTitleChanged = event => setTitle(event.target.value);
  const onContentChanged = event => setContent(event.target.value);
  const onAuthorChanged = event => setUserId(event.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSaveSubmit = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({title, body: content, userId})).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (err) {
        console.log("failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className="border-2 border-black rounded m-4 p-4 w-1/2 mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Add a New Post</h2>
      <form className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label htmlFor="postTitle" className="w-1/4 text-right pr-4">
            Post Title:
          </label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
            className="w-3/4 bg-slate-50 rounded outline-none p-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="postAuthor" className="w-1/4 text-right pr-4">
            Author:
          </label>
          <select
            id="postAuthor"
            value={userId}
            onChange={onAuthorChanged}
            className="w-3/4 bg-slate-50 rounded outline-none p-2"
          >
            <option value=""></option>
            {usersOptions}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="postContent" className="w-1/4 text-right pr-4">
            Post Content:
          </label>
          <input
            type="text"
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
            className="w-3/4 bg-slate-50 rounded outline-none p-2"
          />
        </div>

        <button
          type="button"
          onClick={onSaveSubmit}
          disabled={!canSave}
          className="bg-black text-white rounded p-2 mt-4 self-center w-1/2"
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
