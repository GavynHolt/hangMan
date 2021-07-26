import { useState, useEffect } from 'react';

const WordHint = ({ word }) => {
  const [definition, setDefinition] = useState('');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const apiKey = `27f927fa-fa4e-47c0-b6a8-a83eb72c66aa`;
    const url = new URL(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}`);
    url.search = new URLSearchParams({
      key: apiKey,
    });
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const randomIdx = Math.floor(Math.random() * data[0].shortdef.length);
        // get a random definition
        setDefinition(data[0].shortdef[randomIdx]);
      });
  }, [word]);

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
