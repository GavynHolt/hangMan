import { useState, useEffect } from 'react';
import WordHint from './WordHint';
import KeyboardLetter from './KeyboardLetter';
import StrikethroughLetter from './StrikethroughLetter';
import GameWordLetter from './GameWordLetter';
import GameSummaryModal from './GameSummaryModal';

const Game = ({ gameWordArray, setIsGameRunning, definition }) => {
  const [unusedLettersArray, setUnusedLettersArray] = useState([]);
  const [usedLettersArray, setUsedLettersArray] = useState([]);
  const [emptyWordArray, setEmptyWordArray] = useState([]);
  const [turnsLeft, setTurnsLeft] = useState(0);
  const [isWinner, setIsWinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const checkLetter = (e) => {
    const currentLetter = e.target.textContent;
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

    // Update emptyWordArray with found letters version
    setEmptyWordArray(updatedWordArray);

    if (gameWordArray.join('') === updatedWordArray.join('')) {
      setIsWinner(true);
      setShowModal(true);
    }

    if (updatedTurnsLeft === 0) {
      setShowModal(true);
    }
  };

  useEffect(() => {
    // Multiply word length by turns left, minus 200 points for using word hint.
    const baseScore = gameWordArray.length * turnsLeft * 100;
    const wordHintPenalty = showHint ? 200 : 0;
    setScore(baseScore - wordHintPenalty);

    // When component is closed via back button press, setIsGameRunning to false
    return () => {
      window.onpopstate = () => {
        setIsGameRunning(false);
      };
    };
  }, [gameWordArray.length, showHint, turnsLeft, setIsGameRunning]);

  // Fixes issue where user refreshes page. Page refresh will load and display a new word, and reset all fields to default.
  useEffect(() => {
    setIsGameRunning(true);
    setUsedLettersArray([]);
    setTurnsLeft(6);
    setUnusedLettersArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
    setEmptyWordArray(gameWordArray.map((char) => (char === ' ' ? ' ' : '_')));
  }, [gameWordArray, setIsGameRunning]);

  return (
    <section className='gameContainer'>
      <div className='dashboard'>
        <div>
          <p>Tries Left: {turnsLeft}</p>
        </div>
        <div>
          <p>Score: {score}</p>
        </div>
      </div>
      <WordHint definition={definition} showHint={showHint} setShowHint={setShowHint} />
      <div className='container'>
        {emptyWordArray.map((char, index) => (
          <GameWordLetter char={char} index={index} />
        ))}
      </div>
      <div className='usedLettersContainer'>
        {usedLettersArray.map((letter) => (
          <StrikethroughLetter letter={letter} />
        ))}
      </div>
      <div className='unusedLettersContainer'>
        {unusedLettersArray.map((letter) => (
          <KeyboardLetter letter={letter} checkLetter={checkLetter} />
        ))}
      </div>
      {showModal ? (
        <GameSummaryModal setIsGameRunning={setIsGameRunning} isWinner={isWinner} setShowModal={setShowModal} score={score} word={gameWordArray.join('')} />
      ) : null}
    </section>
  );
};

export default Game;
