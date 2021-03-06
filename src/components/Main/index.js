import db from "db";
import { calcWPM } from "lib";
import { useEffect, useRef, useState } from "react";
import Form from "./Form";

function Main() {
  const [secsRemaining, setSecsRemaining] = useState(null);
  const [WPM, setWPM] = useState(0);

  // Keep a reference in between the renders
  const inputRef = useRef(null);
  const textareaRef = useRef(null);
  const startingSecs = useRef(null);

  useEffect(() => {
    // Run the timer as long as there are secsRemaining
    if (secsRemaining) {
      // We are creating a new interval every second...
      const intervalID = setInterval(() => {
        setSecsRemaining((prev) => prev - 1);
      }, 1000);

      // Clean up the current interval to avoid memory leaks
      return () => clearInterval(intervalID);
    } else {
      setWPM(() => calcWPM(textareaRef.current.value, startingSecs.current));
      textareaRef.current.blur();
      textareaRef.current.disabled = true;
    }
  }, [secsRemaining]);

  /**
   * When there is a WPM value,
   * the appropriate `<input>` will be rendered from `<Form />
   *
   * At this point, and only at this point,
   * will `inputref.current` be non-null.
   */
  useEffect(() => {
    inputRef.current?.focus();
  }, [WPM]);

  function handleKeyUp({ target }) {
    target.value = target.value.toUpperCase();
    target.value = target.value.slice(0, 3);
  }

  function handleInitials(event) {
    event.preventDefault();

    // Add a new document with a generated id.
    db.collection("scores")
      .add({ initials: event.target.elements[0].value, WPM })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  function handleTimeStart(event) {
    event.preventDefault();

    setWPM(() => 0);

    const secs = Number(event.target.elements[0].value);

    setSecsRemaining(() => secs);
    startingSecs.current = secs;
    textareaRef.current.value = "";
    textareaRef.current.disabled = false;
    textareaRef.current.focus();
  }

  return (
    <main className="flex flex-col gap-4 items-center mx-auto w-96">
      <Form
        submitHandler={handleTimeStart}
        label="How Long Should the Test Run?"
        type="number"
        placeholder="secs"
        buttonTxt="Go!"
      />
      <p className="text-2xl">{WPM ? `${WPM} words/min` : secsRemaining}</p>
      <textarea
        className="bg-gray-200 h-48 w-96 focus:bg-gray-900"
        disabled
        ref={textareaRef}
      />

      {WPM ? (
        <Form
          submitHandler={handleInitials}
          keyUpHandler={handleKeyUp}
          label="Enter Ur Initials"
          type="text"
          buttonTxt="Submit!"
          // ⚠️ THIS IS NOT A PROP!
          ref={inputRef}
        />
      ) : null}
    </main>
  );
}

export default Main;