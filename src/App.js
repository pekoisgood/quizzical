import React, { useState, useEffect } from "react";
import "./App.css";
import Cover from "./component/Cover";
import Quiz from "./component/Quiz";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

const url = "https://opentdb.com/api.php?amount=10";
const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

function App() {
  const [quizData, setQuizData] = useState({});
  const [startQuiz, setStartQuiz] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [allCheck, setAllCheck] = useState(true);

  useEffect(() => {
    async function getData() {
      const res = await fetch(url);
      const data = await res.json();
      const quizList = [];
      data.results.forEach((question) => {
        quizList.push({
          id: nanoid(),
          question: decode(question.question),
          correct_answer: decode(question.correct_answer),
          selected: null,
          checked: false,
          answers: shuffleArray([
            ...question.incorrect_answers.map((ans) => decode(ans)),
            decode(question.correct_answer),
          ]),
        });
      });
      setQuizData(quizList);
    }
    getData();
  }, []);

  function start() {
    setStartQuiz(true);
  }

  function handleClickAnswer(id, answer) {
    setQuizData((questions) =>
      questions.map((question) => {
        return question.id === id
          ? { ...question, selected: answer, checked: true }
          : question;
      })
    );
  }

  function checkScore() {
    let checked = null;
    quizData.forEach((questions) => {
      if (questions.selected === null) {
        checked = false;
      }
    });
    if (checked === false) {
      setAllCheck(false);
    } else if (checked === null) {
      setShowScore((prev) => !prev);
      quizData.forEach((questions) => {
        return questions.selected === questions.correct_answer
          ? setScore((prevScore) => prevScore + 1)
          : score;
      });
    }
  }

  function playAgain() {
    setQuizData((questions) =>
      questions.map((question) => {
        return { ...question, selected: null, checked: false };
      })
    );
    setScore(0);
    setShowScore((prev) => !prev);
    setStartQuiz((prev) => !prev);
    setAllCheck(true);
  }

  return quizData.length > 0 ? (
    <main>
      <div className="container">
        <div className="bg-yellow-block"></div>
        {startQuiz ? (
          <Quiz
            quizData={quizData}
            showScore={showScore}
            handleClickAnswer={handleClickAnswer}
            score={score}
            checkScore={checkScore}
            playAgain={playAgain}
            allCheck={allCheck}
          />
        ) : (
          <Cover start={start} />
        )}
        <div className="bg-blue-block"></div>
      </div>
    </main>
  ) : (
    <main>
      <div className="container">
        <div className="bg-yellow-block"></div>
        <div className="load">
          <h1>Loading...</h1>
        </div>
        <div className="bg-blue-block"></div>
      </div>
    </main>
  );
}

export default App;
