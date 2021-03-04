import { calcWPM } from "lib";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import Form from "./Form";
import Info from "./Info";
function TimerForm({ textareaRef }) {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [wpm, setWpm] = useState(null);
  const initialTimeRef = useRef(null);

  useEffect(() => {
    if (timeRemaining) {
      const intervalId = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
    }
  }, [timeRemaining]);

  useEffect(() => {
    if (textareaRef.current.value && !timeRemaining) {
      setWpm(() => calcWPM(textareaRef.current.value, initialTimeRef.current));
      textareaRef.current.blur();
      textareaRef.current.disabled = true;
    }
  }, [textareaRef, timeRemaining]);

  function handleSubmit(event) {
    event.preventDefault();
    const testTime = event.target.elements[0].value;
    initialTimeRef.current = testTime;
    setTimeRemaining(testTime);

    textareaRef.current.value = "";
    textareaRef.current.disabled = false;
    textareaRef.current.focus();
  }

  return (
    <>
      <Form handler={handleSubmit} />
      <Info secs={Number(timeRemaining)} wpm={wpm} />
    </>
  );
}

TimerForm.propTypes = {
  textareaRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
};

export default TimerForm;
