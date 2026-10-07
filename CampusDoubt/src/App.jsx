import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Questions from "./pages/question";
import QuestionDetail from "./pages/questiondetail";
import AskQuestion from "./pages/askquestion";
import Profile from "./pages/profile";
import Bookmarks from "./pages/bookmarks";
import MyAnswers from "./pages/myanswer";
import SearchResults from "./pages/searchresults";
import Categories from "./pages/categories";
// import similarquestion from "./pages/similarquestion";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/question" element={<Questions />} />

        <Route
          path="/questiondetail"
          element={<QuestionDetail />}
        />

        <Route
          path="/askquestion"
          element={<AskQuestion />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/bookmarks"
          element={<Bookmarks />}
        />

        <Route
          path="/myanswer"
          element={<MyAnswers />}
        />

        <Route
          path="/searchresults"
          element={<SearchResults />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        {/* <Route
          path="/similar-questions"
          element={<similarquestion />}
        /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;