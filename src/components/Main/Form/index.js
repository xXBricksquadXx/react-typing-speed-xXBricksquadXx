import { removeNonLettersAndSpaces, toKebabCase } from "lib";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const Form = forwardRef(function Form(
  { submitHandler, keyUpHandler, label, type, placeholder, buttonTxt },
  ref
) {
  const kebab = toKebabCase(removeNonLettersAndSpaces(label));

  return (
    <form className="flex flex-col gap-3 items-center" onSubmit={submitHandler}>
      <label htmlFor={kebab} className="text-2xl">
        {label}
      </label>
      <input
        onKeyUp={keyUpHandler}
        type={type}
        id={kebab}
        placeholder={placeholder}
        className="w-24 focus:bg-gray-900"
        ref={ref}
      />
      <button className="bg-neon-green cursor-pointer h-16 p-2 rounded text-2xl  text-gray-700 w-32 hover:animate-pulse focus:animate-pulse">
        {buttonTxt}
      </button>
    </form>
  );
});

Form.propTypes = {
  buttonTxt: PropTypes.string,
  keyUpHandler: PropTypes.func,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  submitHandler: PropTypes.func.isRequired,
  type: PropTypes.string,
};

Form.defaultProps = {
  type: "text",
  placeholder: "",
  buttonTxt: "Submit",
  keyUpHandler: () => {},
};

export default Form;
