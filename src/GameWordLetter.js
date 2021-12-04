import { React } from "react";
import PropTypes from "prop-types";

const GameWordLetter = ({ char, index }) => {
  return (
    <span className="wordBox" key={index}>
      {char}
    </span>
  );
};

GameWordLetter.propTypes = {
  char: PropTypes.string,
  index: PropTypes.number,
};

export default GameWordLetter;
