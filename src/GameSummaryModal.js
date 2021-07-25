const GameSummaryModal = ({ message, setShowModal }) => {
  const handleClick = () => {
    setShowModal(false);
  };

  return (
    <div className='modal'>
      <h2>Game finished! {message}</h2>
      <p>Please view the leader board to see how you compare</p>
      <button onClick={handleClick}>Close</button>
    </div>
  );
};

export default GameSummaryModal;
