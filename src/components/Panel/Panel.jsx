import { NavLink } from "react-router-dom";
import { useContext } from "react";

import PostContext from "../../Context/PostContext";
import Error from "../Pages/Error";
import Loading from "../Pages/Loading";

export default function Panel() {
  const { error, loading } = useContext(PostContext);
  return (
    <>
      <div className="panel-header">
        <NavLink to="/posts/new" className={"create-post-link"}>
          Создать пост
        </NavLink>
      </div>
      {error ||
        (loading && (
          <div className="message-block">
            {error && <Error message={error} />}
            {loading && <Loading />}
          </div>
        ))}
    </>
  );
}
