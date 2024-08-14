import {useDispatch} from "react-redux";
import {reactionAdded} from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons = ({post}) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        onClick={() =>
          dispatch(reactionAdded({postId: post.id, reaction: name}))
        }
        className="hover:bg-slate-100 rounded p-1"
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div className="flex gap-2">{reactionButtons}</div>;
};

export default ReactionButtons;
