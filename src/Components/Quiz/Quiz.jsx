
import React, { useRef, useState } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(0); // Start at 0 to match array indices
  const [question, setQuestion] = useState(data[0]); // Start with the first question
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
const [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add('correct');
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add('wrong');
        option_array[question.ans - 1].current.classList.add('correct');
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {

if(index === data.length - 1){
  setResult(true);
  return 0;
}

      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1;

        if (newIndex < data.length) {
          setQuestion(data[newIndex]);
          setLock(false);

          option_array.forEach((option) => {
            option.current.classList.remove('wrong');
            option.current.classList.remove('correct');
          });

          return newIndex;
        } else {
          // Handle end of quiz, e.g., show score or reset
          alert(`Quiz finished! Your score: ${score}/${data.length}`);
          return prevIndex; // Do not increment further
        }
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setLock(false);
    setScore(0);
    setResult(false);
  };

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {result?<></>:<> <h2>{index + 1}. {question.question}</h2>
      <ul>
        <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
        <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
        <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
        <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
      </ul>
      <button onClick={next}>Next</button>
      <div className="index">{index + 1} of {data.length} questions</div></>}

      {result?<> <h2>You Scored {score} out of {data.length}</h2>
      <button onClick={reset}>Reset</button></>:<></>}

     
     
    </div>
  );
};

export default Quiz;
