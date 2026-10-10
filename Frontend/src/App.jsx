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
import Trending from "./pages/trending";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Questions Feed */}
        <Route path="/question" element={<Questions />} />
        <Route path="/questions" element={<Questions />} />

        {/* Question Detail (supports path param or query param) */}
        <Route path="/questiondetail/:id" element={<QuestionDetail />} />
        <Route path="/questiondetail" element={<QuestionDetail />} />

        {/* Similar Questions / ML Recommender */}
        <Route path="/similarquestion/:id" element={<SimilarQuestion />} />
        <Route path="/similarquestion" element={<SimilarQuestion />} />

        {/* Ask Question */}
        <Route path="/askquestion" element={<AskQuestion />} />
        <Route path="/ask-question" element={<AskQuestion />} />

        {/* User Profile, Bookmarks, Answers */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/myanswers" element={<MyAnswers />} />

        {/* Search */}
        <Route path="/searchresults" element={<SearchResults />} />

        {/* Categories */}
        <Route path="/categories" element={<Categories />} />

        {/* Trending */}
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;