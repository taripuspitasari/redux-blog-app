import {useSelector} from "react-redux";
import {selectPostById} from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import {useParams, Link} from "react-router-dom";

const SinglePostPage = () => {
  const {postId} = useParams();
  console.log(postId);

  const post = useSelector(state => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article className="border-2 border-black rounded m-4 p-4 w-1/2 mx-auto">
      <h2 className="font-bold text-2xl mb-1">{post.title}</h2>
      <p>{post.body}</p>
      <div className="mt-2 flex gap-2 items-center">
        <button className="bg-black text-white rounded p-2">
          <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        </button>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </div>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
