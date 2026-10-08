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
import SimilarQuestion from "./pages/similarquestion";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Questions */}
        <Route
          path="/question"
          element={<Questions />}
        />

        <Route
          path="/questiondetail"
          element={<QuestionDetail />}
        />

        <Route
          path="/similarquestion"
          element={<SimilarQuestion />}
        />

        {/* Ask Question */}
        <Route
          path="/askquestion"
          element={<AskQuestion />}
        />

        {/* User */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/bookmarks"
          element={<Bookmarks />}
        />

        <Route
          path="/myanswers"
          element={<MyAnswers />}
        />

        {/* Search */}
        <Route
          path="/searchresults"
          element={<SearchResults />}
        />

        {/* Categories */}
        <Route
          path="/categories"
          element={<Categories />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;