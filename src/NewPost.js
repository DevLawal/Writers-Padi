import { useContext, useState } from "react";
import DataContext from "./context/DataContext";
import axios from "axios";

function NewPost() {
  const { handleSubmit, postBody, postTitle, setPostBody, setPostTitle } =
    useContext(DataContext);

  const [wordCount, setWordCount] = useState(0);
  const [isEditable, setIsEditable] = useState(true);
  const [language, setLanguage] = useState("US");
  const [suggestions, setSuggestions] = useState(""); // State to hold suggestions

  // Function to count words in the text area
  const handleWordCount = (e) => {
    const text = e.target.value;
    setPostBody(text);
    const words = text.trim().split(/\s+/);
    setWordCount(text.length === 0 ? 0 : words.length);
  };

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

  // Function to handle editing text and fetching suggestions
  const handleEditing = async (e) => {
    const text = e.target.value;
    setPostBody(text);
    handleWordCount(e); // Update word count

    if (text.length > 10) {
      // Fetch suggestions if text is long enough
      const suggestion = await getSuggestionsFromOpenAI(text);
      setSuggestions(suggestion);
    } else {
      setSuggestions(""); // Clear suggestions if text is too short
    }
  };

  return (
    <div className="mt-[25vh] flex flex-col min-h-screen gap-4">
      <h2 className="text-2xl ml-4">New Post</h2>
      <form className="ml-4 flex flex-col gap-3" onSubmit={handleSubmit}>
        <label className="text-xl" htmlFor="title">
          Post Title
        </label>
        <input
          style={{ border: "1px solid black" }}
          id="title"
          required
          className="max-w-[93%] pl-4 pr-4 h-[6vh] shadow rounded"
          type="text"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <div className="flex" style={{ justifyContent: "space-between" }}>
          <div>
            <label className="text-xl" htmlFor="body">
              Post Body
            </label>
          </div>
          <div className="top-2 mr-8 text-bold text-gray-500">
            Word Count: {wordCount}
          </div>
        </div>
        <div className="flex flex-col">
          <textarea
            style={{ border: "1px solid black" }}
            id="body"
            className="max-w-[93%] pl-4 pr-4 h-[18vh] shadow rounded"
            value={postBody}
            required
            onChange={handleEditing} // Change this to handleEditing
            disabled={!isEditable}
          />
          {/* Display suggestions */}
          {suggestions && (
            <div className="mt-2 text-sm text-gray-600">
              Suggestions: {suggestions}
            </div>
          )}
        </div>

        <button
          style={{ border: "1px solid black" }}
          className="w-[94%] hover:bg-red-500 h-[6vh] bg-white-500 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewPost;
