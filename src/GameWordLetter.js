const GameWordLetter = ({ char, index }) => {
  return (
    <span className='wordBox' key={index}>
      {char}
    </span>
  );
};

export default GameWordLetter;
