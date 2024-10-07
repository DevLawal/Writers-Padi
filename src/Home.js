import Feed from "./Feed";
import { useContext } from "react";
import DataContext from "./context/DataContext";

function Home() {
  const { searchResults } = useContext(DataContext);

  return (
    <div className="mt-[25vh]">
      {searchResults.length ? (
        <Feed posts={searchResults} />
      ) : (
        <p className="pt-[2rem] h-[100vh] ml-4 text-xl">No Post to Display.</p>
      )}
    </div>
  );
}

export default Home;
