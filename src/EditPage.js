import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import DataContext from "./context/DataContext";
import { format } from "date-fns";
import api from "./api/posts";
import axios from "axios"; // Import axios

function EditPage() {
  const { posts, setPosts } = useContext(DataContext);
  const [editBody, setEditBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [suggestions, setSuggestions] = useState(""); // State for suggestions
  const navigate = useNavigate();
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post]);

  // Update word count whenever editBody changes
  useEffect(() => {
    setWordCount(editBody.trim().split(/\s+/).length);
  }, [editBody]);

  // Function to get suggestions from OpenAI
  const getSuggestionsFromOpenAI = async (text) => {
    const API_KEY = "YOUR_OPENAI_API_KEY"; // Replace with your OpenAI API key
    const url = "https://api.openai.com/v1/chat/completions";

    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Please suggest edits and improvements for the following text: "${text}"`,
        },
      ],
      max_tokens: 100,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(url, data, config);
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching suggestions from OpenAI:", error);
      return null;
    }
  };

  // Handle Edit submission
  const handleEdit = async (id) => {
    const lastEdited = format(new Date(), "MMMM dd, yyyy pp"); // Update only lastEdited
    const updatedPost = {
      ...post, // Keep original post values, such as datetime
      title: editTitle,
      body: editBody,
      lastEdited, // Update lastEdited field only
      wordCount,
    };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) =>
          post.id.toString() === id ? { ...response.data } : post
        )
      );
      setEditBody("");
      setEditTitle("");
      setWordCount(0);
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  // Function to fetch suggestions on edit body change
  const handleBodyChange = async (e) => {
    const text = e.target.value;
    setEditBody(text);
    // Fetch suggestions if body length exceeds a threshold
    if (text.length > 10) {
      const suggestion = await getSuggestionsFromOpenAI(text);
      setSuggestions(suggestion);
    } else {
      setSuggestions(""); // Clear suggestions if text is too short
    }
  };

  return (
    <div className="mt-[25vh] min-h-screen pl-4">
      {editTitle && (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl ml-4">Edit Post</h2>
          <form
            className="ml-4 flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label className="text-xl" htmlFor="title">
              Post Title
            </label>
            <input
              style={{ border: "1px solid black" }}
              id="title"
              required
              className="max-w-[93%] pl-4 pr-4 h-[6vh] shadow rounded"
              type="text"
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value);
              }}
            />
            <div className="flex" style={{ justifyContent: "space-between" }}>
              <div>
                <label className="text-xl" htmlFor="body">
                  Edit Body
                </label>
              </div>
              <div className="top-2 mr-8 text-bold text-gray-500">
                Word Count: {wordCount}
              </div>
            </div>
            <textarea
              style={{ border: "1px solid black" }}
              id="body"
              className="max-w-[93%] pl-4 pr-4 h-[18vh] shadow rounded"
              value={editBody}
              required
              onChange={handleBodyChange} // Use handleBodyChange here
            />
            {/* Display suggestions */}
            {suggestions && (
              <div className="mt-2 text-sm text-gray-600">
                Suggestions: {suggestions}
              </div>
            )}

            <button
              style={{ border: "1px solid black" }}
              className="w-[94%] hover:bg-red-500 h-[6vh] bg-white-500 rounded"
              type="submit"
              onClick={() => handleEdit(post.id)}
            >
              Submit
            </button>
          </form>
        </div>
      )}
      {!editTitle && (
        <div>
          <h2 className="text-xl text-red-500">Post Not Found</h2>
          <p>Sorry, that's disappointing...</p>
          <p
            style={{ textDecoration: "underline" }}
            className="hover:text-blue-700"
          >
            <Link to="/">Visit Our Home Page.</Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default EditPage;
