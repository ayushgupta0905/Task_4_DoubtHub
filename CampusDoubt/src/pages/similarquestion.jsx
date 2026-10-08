import React from "react";
import { Link } from "react-router-dom";

function SimilarQuestions({ questions = [], currentQuestionId }) {
  // Remove the current question and show maximum 5 questions
  const similarQuestions = questions
    .filter((question) => question.id !== currentQuestionId)
    .slice(0, 5);

  return (
    <section className="similar-questions-card">
      <div className="similar-questions-header">
        <div className="similar-title">
          <span className="similar-icon">◉</span>
          <h2>Similar Questions</h2>
        </div>

        <Link to="/questions" className="see-all-link">
          See all →
        </Link>
      </div>

      {similarQuestions.length === 0 ? (
        <div className="no-similar-questions">
          <p>No similar questions found.</p>
        </div>
      ) : (
        <div className="similar-question-list">
          {similarQuestions.map((question) => (
            <Link
              key={question.id}
              to={`/question/${question.id}`}
              className="similar-question-item"
            >
              <div className="similar-question-icon">
                💬
              </div>

              <div className="similar-question-content">
                <h3>{question.title}</h3>

                <div className="similar-question-meta">
                  <span>
                    {question.answers ?? 0} answers
                  </span>

                  <span>•</span>

                  <span>
                    {question.time ?? "Recently"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default SimilarQuestions;