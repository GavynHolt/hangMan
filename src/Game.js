import { useState, useEffect } from 'react';
import WordHint from './WordHint';
import GameSummaryModal from './GameSummaryModal';

const Game = ({ gameWordArray, setIsGameRunning, definition }) => {
  const [unusedLettersArray, setUnusedLettersArray] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
  const [usedLettersArray, setUsedLettersArray] = useState([]);
  const [emptyWordArray, setEmptyWordArray] = useState(gameWordArray.map((char) => (char === ' ' ? ' ' : '_')));
  const [turnsLeft, setTurnsLeft] = useState(6);
  const [isWinner, setIsWinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const checkLetter = (e) => {
    const currentLetter = e.type === 'keydown' ? e.key.toUpperCase() : e.target.textContent;
    // Remove letter from unusedLettersArray
    setUnusedLettersArray([...unusedLettersArray].filter((letter) => letter !== currentLetter));
    // Check letter in charArray and return wordArray to include found letter in place of underscores
    let letterFoundInWord = false;
    const updatedWordArray = emptyWordArray.map((char, index) => {
      if (gameWordArray[index] === currentLetter) {
        letterFoundInWord = true;
        return gameWordArray[index];
      } else {
        return char;
      }
    });

    // Decrement turnsLeft if letter was incorrect
    const updatedTurnsLeft = turnsLeft - 1;
    if (!letterFoundInWord) {
      setTurnsLeft(updatedTurnsLeft);
      // Add letter to usedLettersArray
      setUsedLettersArray([...usedLettersArray, currentLetter]);
    }

    setEmptyWordArray(updatedWordArray);
    if (gameWordArray.join('') === updatedWordArray.join('')) {
      setIsWinner(true);
      setShowModal(true);
    }

    if (updatedTurnsLeft === 0) {
      setIsWinner(false); //redundant?
      setShowModal(true);
    }
  };

  useEffect(() => {
    // multiply word length by turns left, minus 200 points for using word hint.
    const baseScore = gameWordArray.length * turnsLeft * 100;
    const wordHintPenalty = showHint ? 200 : 0;
    setScore(baseScore - wordHintPenalty);

    // when component is closed via back button press, setIsGameRunning to false
    return () => {
      window.onpopstate = () => {
        console.log('back button pressed');
        setIsGameRunning(false);
      };
    };
  }, [gameWordArray.length, showHint, turnsLeft, setIsGameRunning]);
  // const checkKeyDown = (e) => {
  //   if (/^[a-z]$/i.test(e.key)) {
  //     checkLetter(e);
  //   }
  //   console.log(e);
  // };

  // useEffect(() => {
  //   window.addEventListener('keydown', checkKeyDown);
  //   return () => {
  //     window.removeEventListener('keydown', checkKeyDown);
  //   };
  // }, []);

  return (
    <section className='gameContainer'>
      <h2>Tries Left: {turnsLeft}</h2>
      <p>Score: {score}</p>
      <WordHint definition={definition} showHint={showHint} setShowHint={setShowHint} />
      <div className='container'>
        {emptyWordArray.map((char, index) => {
          return (
            <span className='wordBox' key={index}>
              {char}
            </span>
          );
        })}
      </div>
      <div className='usedLettersContainer'>
        {usedLettersArray.map((letter) => {
          return (
            <span className='strikethrough' key={letter}>
              {letter}
            </span>
          );
        })}
      </div>
      <div className='unusedLettersContainer'>
        {unusedLettersArray.map((letter) => {
          return (
            <button onClick={checkLetter} key={letter}>
              {letter}
            </button>
          );
        })}
      </div>
      {showModal ? <GameSummaryModal setIsGameRunning={setIsGameRunning} isWinner={isWinner} setShowModal={setShowModal} score={score} /> : null}
    </section>
  );
};

export default Game;
