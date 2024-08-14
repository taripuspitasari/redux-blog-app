import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {selectPostById, updatePost, deletePost} from "./postsSlice";
import {useParams, useNavigate} from "react-router-dom";

import {selectAllUsers} from "../users/usersSlice";

const EditPostForm = () => {
  const {postId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector(state => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = event => setTitle(event.target.value);
  const onContentChanged = event => setContent(event.target.value);
  const onAuthorChanged = event => setUserId(Number(event.target.value));

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSaveSubmit = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.log("failed to save the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({id: post.id})).unwrap();
      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (error) {
      console.error("failed to delete the post", err);
    } finally {
      setRequestStatus("idle");
    }
  };

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
            defaultValue={userId}
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

        <div className="flex justify-evenly">
          <button
            type="button"
            onClick={onSaveSubmit}
            disabled={!canSave}
            className="bg-black text-white rounded p-2 mt-4 self-center w-1/3"
          >
            Save Post
          </button>

          <button
            type="button"
            onClick={onDeletePostClicked}
            className="bg-rose-800 text-white rounded p-2 mt-4 self-center w-1/3"
          >
            Delete Post
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditPostForm;
