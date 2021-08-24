import { useState, useEffect, useCallback } from 'react';
import WordHint from './WordHint';
import KeyboardLetter from './KeyboardLetter';
import StrikethroughLetter from './StrikethroughLetter';
import GameWordLetter from './GameWordLetter';
import GameSummaryModal from './GameSummaryModal';

const Game = () => {
  const [unusedLettersArray, setUnusedLettersArray] = useState([]);
  const [usedLettersArray, setUsedLettersArray] = useState([]);
  const [emptyWordArray, setEmptyWordArray] = useState([]);
  const [turnsLeft, setTurnsLeft] = useState(0);
  const [isWinner, setIsWinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gameWordArray, setGameWordArray] = useState([]);
  const [definition, setDefinition] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const checkLetter = useCallback(
    (e) => {
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

      // Update emptyWordArray with found letters version
      setEmptyWordArray(updatedWordArray);

      if (gameWordArray.join('') === updatedWordArray.join('')) {
        setIsWinner(true);
        setShowModal(true);
      }

      if (updatedTurnsLeft === 0) {
        setShowModal(true);
      }
    },
    [emptyWordArray, gameWordArray, turnsLeft, unusedLettersArray, usedLettersArray]
  );

  // On page load, generate a new word and word hint(definition)
  useEffect(() => {
    if (!showModal) {
      // Get a random word from random-word-api
      const randomWordUrl = new URL(`https://random-word-api.herokuapp.com/word`);
      randomWordUrl.search = new URLSearchParams({
        swear: 1,
        number: 1,
      });
      const fetchData = (count = 0) => {
        // Increment count
        count++;
        fetch(randomWordUrl)
          .then((res) => res.json())
          .then((data) => {
            // Set word to the charArray
            setGameWordArray(data[0].toUpperCase().split(''));
            // Get the definition of the word
            const apiKey = `27f927fa-fa4e-47c0-b6a8-a83eb72c66aa`;
            const definitionUrl = new URL(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${data[0]}`);
            definitionUrl.search = new URLSearchParams({
              key: apiKey,
            });
            fetch(definitionUrl)
              .then((res) => res.json())
              .then((data) => {
                // If there is no definition for the word
                if (data[0].shortdef === undefined) {
                  throw new Error('No Definition found for word.');
                }
                // Get a random definition
                const randomIdx = Math.floor(Math.random() * data[0].shortdef.length);
                setDefinition(data[0].shortdef[randomIdx]);
                // Set isLoaded state
                setIsLoaded(true);
              })
              .catch((error) => {
                setDefinition(`${error}`);
                // Try again with recursion if no definition is found.
                if (count <= 3) {
                  fetchData(count);
                }
              });
          });
      };
      fetchData();
    }
  }, [showModal]);

  useEffect(() => {
    // Multiply word length by turns left, minus 200 points for using word hint.
    const baseScore = gameWordArray.length * turnsLeft * 100;
    const wordHintPenalty = showHint ? 200 : 0;
    setScore(baseScore - wordHintPenalty);
  }, [gameWordArray.length, showHint, turnsLeft]);

  // Fixes issue where user refreshes page. Page refresh will load and display a new word, and reset all fields to default.
  useEffect(() => {
    setUsedLettersArray([]);
    setTurnsLeft(6);
    setShowHint(false);
    setUnusedLettersArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
    setEmptyWordArray(gameWordArray.map((char) => (char === ' ' ? ' ' : '_')));
  }, [gameWordArray, isLoaded]);

  useEffect(() => {
    if (!showModal) {
      const checkKeydown = (e) => {
        const keyToCheck = e.key.toUpperCase();
        if (unusedLettersArray.includes(keyToCheck)) {
          checkLetter(e);
        }
      };

      document.addEventListener('keydown', checkKeydown);
      return () => {
        document.removeEventListener('keydown', checkKeydown);
      };
    }
  }, [checkLetter, showModal, unusedLettersArray]);

  return (
    <section className='gameContainer'>
      <div className='dashboard'>
        <div>
          <p>Tries Left: {turnsLeft}</p>
        </div>
        <div>
          <p>Score: {isLoaded ? score : 'Loading...'}</p>
        </div>
      </div>
      <WordHint definition={definition} showHint={showHint} setShowHint={setShowHint} />
      <div className='container'>
        {!isLoaded ? <p className='loadingText'>Loading...</p> : emptyWordArray.map((char, index) => <GameWordLetter char={char} index={index} key={index} />)}
      </div>
      <div className='usedLettersContainer'>
        {usedLettersArray.map((letter) => (
          <StrikethroughLetter letter={letter} key={letter} />
        ))}
      </div>
      <div className='unusedLettersContainer'>
        {unusedLettersArray.map((letter) => (
          <KeyboardLetter letter={letter} checkLetter={checkLetter} key={letter} />
        ))}
      </div>
      {showModal ? (
        <GameSummaryModal setIsLoaded={setIsLoaded} isWinner={isWinner} setShowModal={setShowModal} score={score} word={gameWordArray.join('')} />
      ) : null}
    </section>
  );
};

export default Game;
