import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/login"
import Signup from "./pages/signup"
import Home from "./pages/home"
import AskQuestion from "./pages/askquestion"
import QuestionDetail from "./pages/questiondetail"
import SearchResults from "./pages/searchresult"
import SimilarQuestions from "./pages/similarquestions"
import Profile from "./pages/profile"

import "./App.css"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<Home />} />

        <Route path="/ask-question" element={<AskQuestion />} />

        <Route path="/question" element={<QuestionDetail />} />

        <Route path="/search" element={<SearchResults />} />

        <Route path="/similar" element={<SimilarQuestions />} />

        <Route path="/profile" element={<Profile />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App