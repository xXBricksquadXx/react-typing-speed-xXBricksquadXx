import { forwardRef } from "react";

function TypingArea(props, ref) {
  return (
    <textarea
      ref={ref}
      className="bg-gray-200 focus:bg-gray-900 h-48 w-96"
      disabled
    />
  );
}

export default forwardRef(TypingArea);
