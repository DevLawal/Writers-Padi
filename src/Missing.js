import { Link } from "react-router-dom";

function Missing() {
  return (
    <div className="mt-[33vh] ml-8">
      <h2 className="text-xl text-red-500">Post Not Found</h2>
      <p>Sorry, that's disappointing...</p>
      <p
        style={{ textDecoration: "underline" }}
        className="hover:text-blue-700"
      >
        <Link to="/">Visit Our Home Page.</Link>
      </p>
    </div>
  );
}

export default Missing;
