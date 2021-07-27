import { Link } from 'react-router-dom';
import { useState } from 'react';
import firebase from './firebaseConfig.js';

const GameSummaryModal = ({ isWinner, setShowModal, setIsGameRunning, score, word }) => {
  const [userInput, setUserInput] = useState('');
  const [showForm, setShowForm] = useState(true);

  const handleClose = () => {
    setIsGameRunning(false);
    setShowModal(false);
  };

  const todayArray = new Date().toDateString().split(' ');
  const myDate = `${todayArray[1]} ${todayArray[2]}, ${todayArray[3]}`;

  const addToLeaderboard = (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref();
    dbRef.push({
      username: userInput,
      score: score,
      date: myDate,
      word: word,
    });
    setShowForm(false);
  };

  return (
    <div className='modalRoot'>
      <div className='modal'>
        <h2>{isWinner ? 'You did it!' : 'Thanks for playing! Please try again.'}</h2>
        <p>Your game word was: </p>
        <p className='featureText'>{word}</p>
        {isWinner && showForm ? (
          <div>
            <p>Your finished with a score of:</p>
            <p className='featureText'>{score}</p>
            <form className='leaderboardForm' onSubmit={addToLeaderboard}>
              <label htmlFor='leaderboardName'>Enter your name for the leaderboard:</label>
              <input type='text' id='leaderboardName' value={userInput} onChange={(e) => setUserInput(e.target.value)} />
              <button type='submit'>Submit</button>
            </form>
          </div>
        ) : isWinner ? (
          <div className='formConfirmation'>
            <p>Thank you! Your entry of </p>
            <p>
              username: <span>{userInput}</span>
            </p>{' '}
            <p>
              score: <span>{score}</span>
            </p>{' '}
            <p> has been added to the leaderboard.</p>
          </div>
        ) : null}
        <Link to='/leaderboard' className='buttonLink' onClick={handleClose}>
          To Leaderboard
        </Link>
      </div>
    </div>
  );
};

export default GameSummaryModal;
