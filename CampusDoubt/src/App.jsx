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

        <Route path="/questions" element={<Questions />} />

        <Route
          path="/question-detail"
          element={<QuestionDetail />}
        />

        <Route
          path="/ask-question"
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
          path="/my-answers"
          element={<MyAnswers />}
        />

        <Route
          path="/search-results"
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