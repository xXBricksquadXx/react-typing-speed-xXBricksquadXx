import PropTypes from "prop-types";

function renderContent(remaining, speed) {
  if (remaining) {
    return <p className="text-2xl">Time Remaining: {remaining}</p>;
  }

  if (speed) {
    return <p className="text-2xl">{speed} Words/min.</p>;
  }

  return <p>Enter the number of seconds and press &lsquo;Go!&rsquo;</p>;
}

function Info({ secs, wpm }) {
  return renderContent(secs, wpm);
}

Info.propTypes = { secs: PropTypes.number, wpm: PropTypes.number };

Info.defaultProps = { secs: 0, wpm: 0 };

export default Info;
