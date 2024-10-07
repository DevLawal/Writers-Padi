import { Link } from "react-router-dom";

function Post({ post }) {
  return (
    <article
      style={{ borderBottom: "0.1px solid gray" }}
      className="h-[18vh] w-[100%] gap-2 p-4 flex flex-col justify-center"
    >
      <Link to={`/post/${post.id}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl">
            {post.title.length <= 30
              ? post.title
              : `${post.title.slice(0, 30)}...`}
          </h2>
          <span className="text-sm text-gray-700">{post.wordCount} words</span>{" "}
          {/* Word count displayed here */}
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-700">Created: {post.datetime}</p>
          <p className="text-sm text-gray-700">
            Last Edited: {post.lastEdited}
          </p>{" "}
          {/* Updated to match the correct field name */}
        </div>
      </Link>
      <p>
        {post.body.length <= 50 ? post.body : `${post.body.slice(0, 50)}...`}
      </p>
    </article>
  );
}

export default Post;
