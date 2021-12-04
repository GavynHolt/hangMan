import { React } from "react";
import PropTypes from "prop-types";

const StrikethroughLetter = ({ letter }) => {
  return (
    <span className="strikethrough" key={letter}>
      {letter}
    </span>
  );
};

StrikethroughLetter.propTypes = {
  letter: PropTypes.string,
};

export default StrikethroughLetter;
