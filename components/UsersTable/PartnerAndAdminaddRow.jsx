"use client";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import config from "../config";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import Toggle from "../Toggle";
// import Dropdown from "./Dropdown";
import CustomDropdown from "../CustomDropdown";

const PartnerAndAdminAddRow = ({
  onAdd,
  business,
  styles,
  onToggle,
  onCancel,
  heading,
  toggleState,
  onUpdateToggle,
  handleAddUpdate,
  errorMessage,
  clearErrorMessage,
  isAdminDesign,
  isPartnerDesign,
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [enable, setEnable] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      clearErrorMessage();
      setOpen(true);
    }, 0);
  }, []);

  // Call the function to fetch options
  const handleToggle = (field) => {
    if (field === "enable") {
      setEnable((prevEnable) => {
        const newEnable = !prevEnable;
        onToggle("enable", newEnable); // Pass field name and value to onUpdateToggle
        return newEnable;
      });
    } else if (field === "active") {
      setActive((prevActive) => {
        const newActive = !prevActive;
        onToggle("active", newActive); // Pass field name and value to onUpdateToggle
        return newActive;
      });
    }
  };

  //Partneradd
  const handlePartnerAdd = async () => {
    try {
      const isNameValid = validateName(name);
      const isEmailValid = validateEmail(email);
      const isPhoneValid = validatePhone(`${phone}`);
      const isTypeValid = validateType(selectedOption);
      if (isNameValid && isEmailValid && isPhoneValid) {
        const errorMessageFromAddUpdate = await handleAddUpdate(
          enable,
          active,
          name,
          email,
          `+91${phone}`
        );

        console.log("Row added successfully!");

        if (errorMessageFromAddUpdate) {
          // If there is an error message from handleAddUpdate, keep the component open
          setOpen(false);
        } else {
          // If there is no error message, close the component
          setOpen(true);
        }
      }
    } catch (error) {
      console.error("Error adding row:", error.message);
    }
  };

  //Admin add
  const handleAdminAdd = async () => {
    try {
      const isNameValid = validateName(name);
      const isEmailValid = validateEmail(email);
      const isPhoneValid = validatePhone(`${phone}`);
      const isTypeValid = validateType(selectedOption);
      if (isNameValid && isEmailValid && isPhoneValid && isTypeValid) {
        const errorMessageFromAddUpdate = await handleAddUpdate(
          enable,
          active,
          name,
          email,
          `+91${phone}`,
          selectedOption.value
        );

        console.log("Row added successfully!");

        if (errorMessageFromAddUpdate) {
          // If there is an error message from handleAddUpdate, keep the component open
          setOpen(false);
        } else {
          // If there is no error message, close the component
          setOpen(true);
        }
      }
    } catch (error) {
      console.error("Error adding row:", error.message);
    }
  };

  const isValidEmail = (email) => {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Basic phone number validation: must be a string of 10 digits
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };
  const validateName = (value) => {
    if (!value.trim()) {
      setNameError("Please enter a valid Name.");
      return false;
    }
    setNameError("");
    return true;
  };
  const validateEmail = (value) => {
    if (!value.trim()) {
      setEmailError("Please enter a Email.");
      return false;
    } else if (!isValidEmail(value)) {
      setEmailError("Please enter a valid Email format.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePhone = (value) => {
    if (!value.trim()) {
      setPhoneError("Please enter a valid Phone Number.");
      return false;
    } else if (!isValidPhoneNumber(value)) {
      setPhoneError("Please enter a valid 10-digit Phone Number.");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validateType = (value) => {
    if (!value) {
      setTypeError("Please select a type");
      return false;
    }
    setTypeError("");
    return true;
  };

  const handleNameChange = (value) => {
    setName(value);
    validateName(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    validateEmail(value);
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    validatePhone(value);
  };

  const handleTypeChange = (option) => {
    setSelectedOption(option);
    validateType(option);
  };

  const dynamicOptions = [
    // Your dynamic options here
    { label: "TENANT_USER", value: "TENANT_USER" },
    { label: "TENANT", value: "TENANT" },
    // ...
  ];
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl rounded-l-3xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-end">
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-theme focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div
                        className={` px-5  sm:flex lg:flex-col items-center flex-col ${styles}`}
                      >
                        <h2 className="text-xl font-bold">{heading}</h2>
                        <div className="mb-10 w-[90%] text-center">
                          <label className="block font-bold mb-3 text-left ml-12 mt-6">
                            Name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Full Name"
                            value={name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            className={`side-input border-[#E1E1E1]  ${
                              nameError ? "border-red-500" : ""
                            }`}
                          />
                          {nameError && (
                            <span className="text-red-500 inline-block">
                              {nameError}
                            </span>
                          )}
                        </div>
                        <div className="mb-4 w-[90%] text-center">
                          <label className="block text-sm font-bold mb-3 text-left ml-12">
                            Email
                          </label>
                          <input
                            type="email"
                            placeholder="Enter Email Address"
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            className={`side-input border-[#E1E1E1] ${
                              emailError ? "border-red-500" : ""
                            }`}
                          />
                          {emailError && (
                            <span className="text-red-500 inline-block">
                              {emailError}
                            </span>
                          )}
                        </div>
                        <div className="mb-6x w-[88%] text-center">
                          <label className="block text-sm font-bold mb-3 text-left ml-12 mt-3">
                            Phone Number
                          </label>
                          <div className="flex items-center relative left-[40px]">
                            <span className="mr-2 px-4 py-3 absolute top-0 left-0 border-r border-solid h-[50px] bg-[#F6E1FF] rounded-l-lg font-light">
                              +91
                            </span>
                            <input
                              type="number"
                              placeholder="Enter Phone Number"
                              value={phone}
                              onChange={(e) =>
                                handlePhoneChange(e.target.value)
                              }
                              className={`w-[80%] border border-[#E1E1E1] rounded-md py-3 outline-none mb-3 pl-[70px] number-input shadow-md${
                                phoneError ? "border-red-500" : ""
                              }`}
                            />
                          </div>
                          {phoneError && (
                            <span className="text-red-500">{phoneError}</span>
                          )}
                        </div>
                        {isAdminDesign && (
                          <div className="w-[88%]">
                            <label className="block text-sm font-bold mb-3 text-left ml-12 mt-2">
                              Type
                            </label>
                            <CustomDropdown
                              options={[...dynamicOptions]}
                              selectedOption={selectedOption}
                              onSelect={(option) => {
                                setSelectedOption(option);
                                console.log("Selected options:", option.value);
                                handleTypeChange(option);
                              }}
                              styles={`h-12 ${
                                typeError ? "border-red-500" : ""
                              }`}
                              placeholder="Select an option"
                            />
                            {typeError && (
                              <span className="text-red-500 block text-center m-3">
                                {typeError}
                              </span>
                            )}
                          </div>
                        )}
                        <div className="flex flex-row lg:flex-row w-[68%] mb-7 pt-3">
                          <div className="flex items-center mb-3 mr-6">
                            <p className="mr-2 text-sm font-bold">Enable </p>
                            <Toggle
                              checked={enable}
                              onToggle={() => handleToggle("enable")}
                            />
                          </div>
                          <div className="flex w-28 items-center mb-3">
                            <p className="mr-2 text-sm font-bold"> Active </p>
                            <Toggle
                              checked={active}
                              onToggle={() => handleToggle("active")}
                            />
                          </div>
                        </div>

                        <div className="errorMessage text-red-500">
                          {errorMessage}
                        </div>
                        <div className="flex flex-row sm:flex w-[90%] text-lg ml-24">
                          {isPartnerDesign && (
                            <button
                              onClick={handlePartnerAdd}
                              className="px-7 py-2 bg-primaryColor rounded-lg text-white mr-5 md:mb-0 hover:bg-[#dd0e49] font-semibold cursor-pointer"
                            >
                              Add User
                            </button>
                          )}
                          {isAdminDesign && (
                            <button
                              onClick={handleAdminAdd}
                              className="px-7 py-2 bg-primaryColor rounded-lg text-white mr-5 md:mb-0 hover:bg-[#dd0e49] font-semibold cursor-pointer"
                            >
                              Add Admin
                            </button>
                          )}

                          <button
                            type="button"
                            className="relative focus:outline-none px-12 py-2 border-secondaryColor text-secondaryColor border hover:bg-secondaryColor hover:text-white rounded-lg"
                            onClick={() => setOpen(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PartnerAndAdminAddRow;
