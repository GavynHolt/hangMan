import { useState, useEffect } from 'react';
import Header from './Header';
import GameSummaryModal from './GameSummaryModal';
import Game from './Game';
import Leaderboard from './Leaderboard';
import Footer from './Footer';

// const wordArray = ['Bear', 'Elephant', 'Alligator', 'Wasp', 'Bumble Bee'];

function App() {
  const [charArray, setCharArray] = useState([]);
  const [definition, setDefinition] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const startGame = async () => {
    setIsGameStarted(true);
  };

  useEffect(() => {
    // if game is not yet started or previous game has been stopped, fetch new data
    if (!isGameStarted) {
      // Get a random word from random-word-api
      const randomWordUrl = new URL(`https://random-word-api.herokuapp.com/word`);
      randomWordUrl.search = new URLSearchParams({
        swear: 1,
        number: 1,
      });
      const fetchData = (count) => {
        count++;
        fetch(randomWordUrl)
          .then((res) => res.json())
          .then((data) => {
            console.log('gameword: ', data[0]);
            // Set word to the charArray
            setCharArray(data[0].toUpperCase().split(''));
            // Get the definition of the word
            const apiKey = `27f927fa-fa4e-47c0-b6a8-a83eb72c66aa`;
            const definitionUrl = new URL(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${data[0]}`);
            definitionUrl.search = new URLSearchParams({
              key: apiKey,
            });
            fetch(definitionUrl)
              .then((res) => res.json())
              .then((data) => {
                // if there is no definition for the word
                if (data[0].shortdef === undefined) {
                  throw new Error('No Defintion found for word.');
                }
                // get a random definition
                const randomIdx = Math.floor(Math.random() * data[0].shortdef.length);
                console.log(data[0].shortdef[randomIdx]);
                setDefinition(data[0].shortdef[randomIdx]);
              })
              .catch((error) => {
                console.log(error);
                setDefinition(`${error}`);
                // Try again with recursion if no definition is found.
                if (count <= 3) {
                  fetchData();
                }
              });
          });
      };
      fetchData(0);
    }
  }, [isGameStarted]);

  return (
    <div className='wrapper'>
      <Header />
      <main>
        {!isGameStarted ? (
          <button onClick={startGame}>Start Game</button>
        ) : (
          <Game
            gameWordArray={charArray}
            setIsGameStarted={setIsGameStarted}
            setShowModal={setShowModal}
            setModalMessage={setModalMessage}
            definition={definition}
          />
        )}
        {showModal ? <GameSummaryModal message={modalMessage} setShowModal={setShowModal} /> : null}
        <Leaderboard />
      </main>
      <Footer />
    </div>
  );
}

export default App;
