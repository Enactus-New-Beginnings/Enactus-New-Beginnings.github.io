import React, { useEffect, useState } from "react";

const QuizPage = ({ courseId }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const data = await import(`../courses/${courseId}/quizzes.json`);
      setQuizzes(data.default);
    };
    fetchQuizzes();
  }, [courseId]);

  return (
    <div className="quizzes">
      <h1>Quizzes</h1>
      {quizzes.map((quiz) => (
        <div key={quiz.id} className="card">
          <h3>{quiz.title}</h3>
          <p>{quiz.description}</p>
          <button>Take Quiz</button>
        </div>
      ))}
    </div>
  );
};

export default QuizPage;
