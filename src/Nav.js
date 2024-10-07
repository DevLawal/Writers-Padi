import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";

function Nav() {
  const { search, setSearch } = useContext(DataContext);
  return (
    <div className="bg-blue-300">
      <form
        className="w-[443px] pl-4 pt-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="hidden" htmlFor="search">
          Search
        </label>
        <input
          style={{ outline: "none" }}
          className="w-[350px] pl-4 h-8"
          id="search"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </form>
      <ul className="flex flex-row space-x-4 pl-4 h-8">
        <li className="hover:bg-blue-500 p-1">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:bg-blue-500 p-1">
          <Link to="/post">Post</Link>
        </li>
        <li className="hover:bg-blue-500 p-1">
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
