import "./App.css";
import "./components/Panel/panel.css";
import "./components/Pages/post.css";
import "./components/Form/form.css";
import PostProvider from "./Context/ContextPropvider";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Panel from "./components/Panel/Panel";
import PostsList from "./components/Pages/PostsList";
import PostsView from "./components/Pages/PostView";
import PostEdit from "./components/Pages/PostEdit";
import PostsNew from "./components/Pages/PostNew";
import Error from "./components/Pages/Error";


const App = () => {
  return (
    <PostProvider>
      <BrowserRouter>
        <div className="container">
          <Panel />
          <Routes>
            <Route
              exact
              path="/"
              element={<PostsList />}
            />
            <Route
              path="/posts/:id"
              element={<PostsView type={"post-view"} />}
            ></Route>
             <Route
              path="/posts/:id/edit"
              element={<PostEdit type={"post-edit"} />}
            />
            <Route
              path="/posts/new"
              element={<PostsNew type={"post-new"} />}
            /> 
            <Route
              path="/*"
              element={<Error message={"Page not found"} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </PostProvider>
  );
}

export default App;
