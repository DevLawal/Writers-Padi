import { createContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "../api/posts";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  // Fetching posts from the server
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        const sortedPosts = response.data.sort(
          (a, b) => new Date(b.datetime) - new Date(a.datetime)
        );
        setPosts(sortedPosts);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    fetchPosts();
  }, []);

  // Updating word count whenever postBody changes
  useEffect(() => {
    setWordCount(postBody.trim().split(/\s+/).length);
  }, [postBody]);

  // Handle new post submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const lastEdited = "";
    const newPost = {
      id,
      title: postTitle,
      body: postBody,
      datetime,
      lastEdited,
    };
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      const sortedPosts = allPosts.sort(
        (a, b) => new Date(b.datetime) - new Date(a.datetime)
      );
      setPosts(sortedPosts);
      setPostTitle("");
      setPostBody("");
      setWordCount(0);
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  // Handle editing a post
  const handleEdit = async (id, updatedPost) => {
    try {
      const response = await api.put(`/posts/${id}`, {
        ...updatedPost,
        lastEdited: format(new Date(), "MMMM dd, yyyy pp"),
      });
      const updatedPosts = posts.map((post) =>
        post.id === id ? { ...response.data } : post
      );
      const sortedPosts = updatedPosts.sort(
        (a, b) => new Date(b.lastEdited) - new Date(a.lastEdited)
      );
      setPosts(sortedPosts);
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  // Handle search functionality
  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [search, posts]);

  // Handle post deletion
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postList = posts.filter((post) => post.id !== id);
      const sortedPosts = postList.sort(
        (a, b) => new Date(b.datetime) - new Date(a.datetime)
      );
      setPosts(sortedPosts);
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <DataContext.Provider
      value={{
        searchResults,
        search,
        setSearch,
        handleSubmit,
        handleEdit, // Expose handleEdit for editing posts
        postBody,
        postTitle,
        setPostBody,
        setPostTitle,
        wordCount,
        posts,
        setPosts,
        handleDelete,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
