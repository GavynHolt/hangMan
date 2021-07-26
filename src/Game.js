import { useState, useEffect } from 'react';
import WordHint from './WordHint';

const Game = ({ gameWordArray, setIsGameStarted, setModalMessage, setShowModal, definition }) => {
  const [unusedLettersArray, setUnusedLettersArray] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
  const [usedLettersArray, setUsedLettersArray] = useState([]);
  const [emptyWordArray, setEmptyWordArray] = useState(gameWordArray.map((char) => (char === ' ' ? ' ' : '_')));
  const [turnsLeft, setTurnsLeft] = useState(6);

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
      setModalMessage('You win! :)');
      setShowModal(true);
      setIsGameStarted(false);
    }

    if (updatedTurnsLeft === 0) {
      setModalMessage('You lose :(');
      setShowModal(true);
      setIsGameStarted(false);
    }
  };

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
      <WordHint word={gameWordArray.join('')} definition={definition} />
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
    </section>
  );
};

export default Game;
