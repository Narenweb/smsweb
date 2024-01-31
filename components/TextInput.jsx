// TextInput.js
"use client"
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { IoEye as EyeIcon, IoEyeOff as EyeOffIcon } from 'react-icons/io5';

const TextInput = ({ control, errors, name, label, placeholder, type, rules, showPasswordToggle = false, styles, errorMessage }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return (

        <div className="txt_field relative mt-12 w-full">
            <label
                className={`absolute left-2 transform${isFocused || hasValue ? '-translate-y-3/4 text-base' : 'text-sm'
                    } pointer-events-none transition duration-500 ${isFocused || errors[name] ? 'text-theme -translate-y-full font-semibold' : 'text-gray-500 -translate-y-2/3 font-semibold'
                    }`}
            >
                {label}
            </label>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field }) => (
                    <div>
                        <input
                            type={type === 'password' && isPasswordVisible ? 'text' : type}
                            {...field}
                            className={`w-full number-input p-2 border-b-2 ${styles} border-gray-300 focus:outline-none ${errors[name] ? 'border-lightTheme' : 'focus:border-theme'
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
                            inputMode={type === 'number' ? 'numeric' : 'text'} // Set input mode to numeric for number input
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const form = e.target.form;
                                  const index = Array.prototype.indexOf.call(form, e.target);
                                  form.elements[index + 1].focus();
                                }
                              }}
                        />

                        {(errors[name] || errorMessage) && (
                            <p id="error" className="text-red-500 text-sm mt-3 font-bold pl-2">
                                {errors[name]?.message || errorMessage}
                            </p>
                        )}


                        {/* {type === 'password' && showPasswordToggle && (
                            <button
                                type="button"
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
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
                        )} */}

                    </div>
                )}
            />

        </div>
    );
};




export default TextInput;
