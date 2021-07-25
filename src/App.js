import { useState } from 'react';
import GameSummaryModal from './GameSummaryModal';
import Game from './Game';
import Leaderboard from './Leaderboard';

// const wordArray = ['Bear', 'Elephant', 'Alligator', 'Wasp', 'Bumble Bee'];

function App() {
  const [charArray, setCharArray] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const startGame = async () => {
    // Get a random word from random-word-api
    const url = new URL(`http://random-word-api.herokuapp.com/word`);
    url.search = new URLSearchParams({
      swear: 1,
      number: 1,
    });
    const res = await fetch(url);
    const data = await res.json();
    console.log(data[0]);
    setCharArray(data[0].toUpperCase().split(''));
    setIsGameStarted(true);
  };

  return (
    <div className='wrapper'>
      <header>
        <h1>Hang Man</h1>
      </header>
      <main>
        {!isGameStarted ? (
          <button onClick={startGame}>Start Game</button>
        ) : (
          <Game gameWordArray={charArray} setIsGameStarted={setIsGameStarted} setShowModal={setShowModal} setModalMessage={setModalMessage} />
        )}
        {showModal ? <GameSummaryModal message={modalMessage} setShowModal={setShowModal} /> : null}
        <Leaderboard />
      </main>
      <footer>
        <p>
          Created at <a href='https://www.junocollege.com'>Juno College</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
