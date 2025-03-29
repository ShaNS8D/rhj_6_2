import PostContext from "./PostContext";
import { useState, useEffect, useCallback } from "react";

const PostProvider = (props) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (url, options) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });
      if (!response.ok)
        throw new Error(
          `${response.url} ${response.status} ${response.statusText}`
        );
      if (response.status === 204 || response.headers.get("Content-Length") === "0") {
        return;
      }
      const contentType = response.headers.get("Content-Type");
      if (!contentType?.includes("application/json")) {
        throw new Error(`Ожидался JSON, но получен ${contentType}`);
      }
      if (options.method === "DELETE") {
        return;
      }
      const data = await response.json();

      setData(data);
    } catch (error) {
      console.log(error, "error");
      setError(error.message || "Что-то пошло не так!");
    } finally {
      setLoading(false);
    }    
  }, []);

  useEffect(() => {   
    fetchData(process.env.REACT_APP_BASE_URL + "/posts", {});
  }, [fetchData]);

  const handleAdd = (post) => {
    fetchData(process.env.REACT_APP_BASE_URL + "/posts", {
      method: "POST",
      body: JSON.stringify(post),
    });
  };

  const onClickEdit = (post) => {
    fetchData(process.env.REACT_APP_BASE_URL + `/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify(post),
    });
  };

  const onClickDelete = (id) => {
    setData((prevState) => prevState.filter((item) => item.id !== +id));
    fetchData(process.env.REACT_APP_BASE_URL + `/posts/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <PostContext.Provider
      value={{ data, loading, error, handleAdd, onClickEdit, onClickDelete }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostProvider;