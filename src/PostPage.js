import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";

function PostPage() {
  const { posts, handleDelete } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  return (
    <main className="mt-[30vh] w-[100%] h-screen">
      <article>
        {post && (
          <div className="w-[90%] flex flex-col gap-4 ml-4 mr-4">
            <div>
              <h2 className="text-xl break-words">{post.title}</h2>
              <p className="text-sm text-gray-700">
                Created: {post.datetime}
              </p>{" "}
              {/* Creation date */}
              <p className="text-sm text-gray-700">
                Last Edited: {post.lastEdited}
              </p>{" "}
              {/* Last edited date */}
            </div>
            <p className="break-words">{post.body}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(post.id)}
                className="rounded p-1 hover:bg-red-400 bg-red-500 w-[25vw]"
              >
                Delete
              </button>
              <Link to={`/edit/${id}`}>
                <button className="rounded p-1 hover:bg-gray-400 bg-gray-500 w-[25vw]">
                  Edit
                </button>
              </Link>
            </div>
          </div>
        )}
        {!post && (
          <>
            <h2 className="text-xl text-red-500">Post Not Found</h2>
            <p>Sorry, that's disappointing...</p>
            <p
              style={{ textDecoration: "underline" }}
              className="hover:text-blue-700"
            >
              <Link to="/">Visit Our Home Page.</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
}

export default PostPage;
