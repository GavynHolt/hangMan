import { React } from "react";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="gameDescription">
      <h2>A Word Guessing Game</h2>
      <p>
        Try to guess the letters in an unknown word. A hint is available for a price, and up to 6 wrong guess are
        allowed. To begin, press Start Game below!
      </p>
      <Link className="buttonLink" to="/game">
        Start Game
      </Link>
      <Link className="buttonLink" to="/leaderboard">
        Leaderboard
      </Link>
    </div>
  );
};

export default Home;
