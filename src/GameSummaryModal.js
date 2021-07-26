import { Link } from 'react-router-dom';

const GameSummaryModal = ({ message, setShowModal, setIsGameStarted }) => {
  const handleClose = () => {
    setIsGameStarted(false);
    setShowModal(false);
  };

  return (
    <div className='modalRoot'>
      <div className='modal'>
        <h2>Game finished! {message}</h2>
        <p>Please view the leader board to see how you compare</p>
        <Link to='/leaderboard' className='buttonLink' onClick={handleClose}>
          Close
        </Link>
      </div>
    </div>
  );
};

export default GameSummaryModal;
