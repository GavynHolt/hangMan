import React from "react";
import PropTypes from "prop-types";

const WordHint = ({ definition, showHint, setShowHint }) => {
  return (
    <div className="hintBox">
      {!showHint ? (
        <button onClick={() => setShowHint(true)}>Show Hint (-200 pts)</button>
      ) : (
        <p>
          <span className="bold">Hint:</span> {definition}
        </p>
      )}
    </div>
  );
};

WordHint.propTypes = {
  definition: PropTypes.string,
  showHint: PropTypes.bool,
  setShowHint: PropTypes.func,
};

export default WordHint;
