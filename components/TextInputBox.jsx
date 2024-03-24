// TextInput.js
"use client";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { IoEye as EyeIcon, IoEyeOff as EyeOffIcon } from "react-icons/io5";

const TextInput = ({
  control,
  errors,
  name,
  label,
  placeholder,
  type,
  rules,
  showPasswordToggle = false,
  styles,
  errorMessage,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <div className="txt_field relative mt-12 w-full">
      <label
        className={`absolute font-medium transform text-[15px] ${
          isFocused || hasValue ? "-translate-y-3/4" : ""
        } pointer-events-none transition duration-500  leading-6  ${
          isFocused || errors[name]
            ? "text-primaryColor -translate-y-full font-semibold"
            : "text-gray-600 -translate-y-[65%] font-semibold"
        }`}
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <div
            className={`relative mt-2 rounded-md  
            }`}
          >
            <input
              type={type === "password" && isPasswordVisible ? "text" : type}
              {...field}
              className={`input-box input-box-place block rounded-md border-0 py-2.5 pr-10 ring-1 ring-inset mt-3 pl-5 w-full max-w-[370px] focus:ring-inset outline-none text-[#767676] shadow-md text-[15px] ${styles}  ${
                errors[name] ? "ring-red-500" : "ring-[#E1E1E1]"
              }`}
              autoComplete="off"
              onFocus={() => {
                setIsFocused(true);
                setHasValue(!!field.value);
              }}
              onBlur={() => {
                setIsFocused(false);
                setHasValue(!!field.value);
              }}
              placeholder={placeholder}
              inputMode={type === "number" ? "numeric" : "text"} // Set input mode to numeric for number input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  const form = e.target.form;
                  const index = Array.prototype.indexOf.call(form, e.target);
                  form.elements[index + 1].focus();
                }
              }}
            />

            {(errors[name] || errorMessage) && (
              <p
                id="error"
                className="text-red-500 text-sm mt-3 font-bold pl-2"
              >
                {errors[name]?.message || errorMessage}
              </p>
            )}

            {type === "password" && showPasswordToggle && (
              <button
                type="button"
                className="absolute top-[60%] right-2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  setIsPasswordVisible(!isPasswordVisible);
                }}
              >
                {isPasswordVisible ? (
                  <EyeOffIcon className="h-5 w-5 relative bottom-[5px] text-gray-500 hover:text-red-400" />
                ) : (
                  <EyeIcon className="h-10 w-5 text-gray-500 relative bottom-[5px] hover:text-green-400" />
                )}
              </button>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default TextInput;
