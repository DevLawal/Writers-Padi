import Post from "./Post";

function Feed({ posts }) {
  return (
    <div
      style={{ overflowY: "scroll" }}
      className="pb-[40vh] h-[100vh] scrollbar-hidden"
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;
