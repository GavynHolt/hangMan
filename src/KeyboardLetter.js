const KeyboardLetter = ({ checkLetter, letter }) => {
  return (
    <button className='keyboardLetter' onClick={checkLetter} key={letter}>
      {letter}
    </button>
  );
};

export default KeyboardLetter;
