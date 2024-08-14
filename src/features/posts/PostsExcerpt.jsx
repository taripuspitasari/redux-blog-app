import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import {Link} from "react-router-dom";

const PostsExcerpt = ({post}) => {
  return (
    <article className="mb-3 border-2 border-slate-600 rounded p-3">
      <h2 className="font-bold text-xl">{post.title}</h2>
      <p className="italic">{post.body.substring(0, 70)}...</p>
      <div className="flex gap-1 mt-2 flex-col md:flex-row">
        <Link to={`post/${post.id}`} className="underline text-blue-500">
          View Post
        </Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </div>
      <ReactionButtons post={post} />
    </article>
  );
};
export default PostsExcerpt;
