import React, { useState } from "react";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, onChange, errorMessage, id, ...inputProps } = props;

  const onBlur = (event) => setFocused(true);
  return (
    <div className="flex flex-col w-[90%] m-auto justify-center px-[1rem]  space-y-2 mb-[10px] rounded-sm">
      <label className=" text-[0.9rem] ">{label}</label>
      <input
        className="outline-none w-full py-2 px-[10px] invalid:block "
        {...inputProps}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={() =>
          inputProps.name === "confirmPassword" ? setFocused(true) : null
        }
        focused={focused.toString()}
      />
      
    </div>
  );
};

export default FormInput;
