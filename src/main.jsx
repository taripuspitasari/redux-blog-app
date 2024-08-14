import "./index.css";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import {store} from "../src/app/store.js";
import {Provider} from "react-redux";
import {fetchUsers} from "./features/users/usersSlice.js";
import {fetchPosts} from "./features/posts/postsSlice.js";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

store.dispatch(fetchPosts());
store.dispatch(fetchUsers());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);
