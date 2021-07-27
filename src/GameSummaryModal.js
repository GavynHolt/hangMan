import { Link } from 'react-router-dom';
import { useState } from 'react';

const GameSummaryModal = ({ isWinner, setShowModal, setIsGameRunning }) => {
  const [userInput, setUserInput] = useState('');
  const handleClose = () => {
    setIsGameRunning(false);
    setShowModal(false);
  };

  const addToLeaderboard = (e) => {
    e.preventDefault();
  };

  return (
    <div className='modalRoot'>
      <div className='modal'>
        <h2>{isWinner ? 'Congratulations! You did it!' : 'Thanks for playing! Please try again.'}</h2>
        {isWinner ? (
          <form className='leaderboardForm' onSubmit={addToLeaderboard}>
            <label htmlFor='leaderboardName'>Enter your name for the leaderboard:</label>
            <input type='text' id='leaderboardName' value={userInput} onChange={(e) => setUserInput(e.target.value)} />
            <button type='submit'>Submit</button>
          </form>
        ) : null}
        <p>Be sure to check out the leaderboard!</p>
        <Link to='/leaderboard' className='buttonLink' onClick={handleClose}>
          Close
        </Link>
      </div>
    </div>
  );
};

export default GameSummaryModal;
