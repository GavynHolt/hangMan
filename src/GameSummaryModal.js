const GameSummaryModal = ({ message }) => {
  const handleClick = () => {
    console.log('close clicked');
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
