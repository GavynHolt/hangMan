const StrikethroughLetter = ({ letter }) => {
  return (
    <span className='strikethrough' key={letter}>
      {letter}
    </span>
  );
};

export default StrikethroughLetter;
