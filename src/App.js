import { useEffect, useState } from 'react';

const wordArray = ['Bear', 'Elephant', 'Aligator', 'Wasp', 'Bumble Bee'];

function App() {
  const [wordToDisplay, setWordToDisplay] = useState('');

  const startGame = () => {
    const randomIdx = Math.floor(Math.random() * wordArray.length);
    setWordToDisplay(wordArray[randomIdx]);
    console.log(wordArray[randomIdx]);
  };

  useEffect(() => {}, []);
  return (
    <div className='wrapper'>
      <h1>Project 3</h1>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default App;
