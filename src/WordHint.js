import { useState } from 'react';

const WordHint = ({ word, definition }) => {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className='hintBox'>
      {!showHint ? (
        <button onClick={() => setShowHint(true)}>Show Hint</button>
      ) : (
        <p>
          <span className='bold'>Hint:</span> {definition}
        </p>
      )}
    </div>
  );
};

export default WordHint;
