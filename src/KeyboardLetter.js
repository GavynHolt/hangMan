import { React } from "react";
import PropTypes from "prop-types";

const KeyboardLetter = ({ checkLetter, letter }) => {
  return (
    <button className="keyboardLetter" onClick={checkLetter} key={letter}>
      {letter}
    </button>
  );
};

KeyboardLetter.propTypes = {
  checkLetter: PropTypes.func,
  letter: PropTypes.string,
};

export default KeyboardLetter;
