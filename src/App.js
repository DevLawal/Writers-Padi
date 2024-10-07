import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Nav from "./Nav";
import PostPage from "./PostPage";
import NewPost from "./NewPost";
import Footer from "./Footer";
import About from "./About";
import Home from "./Home";
import Missing from "./Missing";
import EditPage from "./EditPage";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="flex  justify-center bg-gray-100">
      <DataProvider>
        <div
          style={{ border: "2px solid black" }}
          className="flex flex-col w-[448px]"
        >
          <div className="fixed">
            <Header title="Writers Padi" />
            <Nav />
          </div>
          <Routes>
            <Route path="/post" element={<NewPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
            <Route path="*" element={<Missing />} />
          </Routes>
          <Footer />
        </div>
      </DataProvider>
    </div>
  );
}

export default App;
