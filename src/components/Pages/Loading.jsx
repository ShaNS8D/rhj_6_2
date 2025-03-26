import { useContext } from "react";

import PostContext from "../../Context/PostContext";

const Loading = () => {
  const { loading } = useContext(PostContext);
  return (
    <div className="loading-block block">
      {loading && <span className="loading-text text">Loading...</span>}
    </div>
  );
};
export default Loading;
