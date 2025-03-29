import { useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import PostContext from "../../Context/PostContext";
import { Link } from "react-router-dom";
import { Li } from "../Atoms/Atoms";
import Post from "./Post";

const PostsList = () => {
  const { data } = useContext(PostContext);

  if (!data) {
    return (
      <>Постов пока нет</>
    );
  }

  return (
    <ul className="posts-list">
      {data &&
        data.map((item) => {
          return (
            <Link key={uuidv4()} to={`/posts/${item.id}`}>
              <Li key={uuidv4()} className="posts-list">
                <Post key={uuidv4()} {...item} className="post" />
              </Li>
            </Link>
          );
        })}
    </ul>
  );
};

export default PostsList;
