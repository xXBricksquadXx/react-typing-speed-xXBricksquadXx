import { useRef } from "react";
import TimerForm from "./TimerForm";
import TypingArea from "./TypingArea";

function Main() {
  const textareaRef = useRef();

  return (
    <main className="flex flex-col gap-4 items-center mx-auto w-96">
      <TimerForm textareaRef={textareaRef} />
      <TypingArea ref={textareaRef} />
    </main>
  );
}

export default Main;
