import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";
import Layout from "./components/Layout";
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    // container all the route
    <Routes>
      {/* root path */}
      <Route path="/" element={<Layout />}>
        {/* special route that will match the parent path */}
        <Route index element={<PostsList />} />

        {/* nested route under the root path */}
        <Route path="post">
          {/* route matches /post path */}
          <Route index element={<AddPostForm />} />
          {/* dynamic route that will match /post url with some parameter */}
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
