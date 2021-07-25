import { useEffect, useState } from 'react';
import Game from './Game';

const wordArray = ['Bear', 'Elephant', 'Aligator', 'Wasp', 'Bumble Bee'];

function App() {
  const [charArray, setCharArray] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const startGame = () => {
    const randomIdx = Math.floor(Math.random() * wordArray.length);
    setCharArray(wordArray[randomIdx].toUpperCase().split(''));
    console.log(wordArray[randomIdx]);
    setIsGameStarted(true);
  };

  useEffect(() => {}, []);
  return (
    <div className='wrapper'>
      <header>
        <h1>Hang Man</h1>
      </header>
      <main>{!isGameStarted ? <button onClick={startGame}>Start Game</button> : <Game gameWordArray={charArray} setIsGameStarted={setIsGameStarted} />}</main>
      <footer>
        <p>
          Created at <a href='https://www.junocollege.com'>Juno College</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
