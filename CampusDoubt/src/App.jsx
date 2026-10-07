import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Questions from "./pages/question";
import QuestionDetail from "./pages/questiondetail";
import AskQuestion from "./pages/askquestion";
import Profile from "./pages/profile";
import Bookmarks from "./pages/bookmarks";

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;