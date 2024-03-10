"use client";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import config from "../config";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import CustomDropdown from "./CustomDropdown";
import Toggle from "../Toggle";
import Select from "react-select";
// import { colors } from 'react-select/dist/declarations/src/theme';

const AddRow = ({
  onAdd,
  business,
  styles,
  onToggle,
  onCancel,
  heading,
  toggleState,
  businessLineOptions,
  onUpdateToggle,
  fetchBusinessKindOptions,
  businessKindOptions,
  handleAddUpdate,
  businessNames,
  addButtonName,
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [businessLine, setBusinessLine] = useState("");
  const [bkIds, setBusinessCategory] = useState([]);
  const [enable, setEnable] = useState(false);
  const [active, setActive] = useState(false);
  const [nameError, setNameError] = useState("");
  const [businessLineError, setBusinessLineError] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 0);
    // fetchBusinessKindOptions("");
  }, []);

  // const [businessKindOptions, setBusinessKindOptions] = useState([]);
  const [selectedBusinessCategory, setSelectedBusinessCategory] =
    useState(null);

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

  const validateName = (value) => {
    if (!value.trim()) {
      setNameError("Please enter a valid Name.");
      return false;
    }
    setNameError("");
    return true;
  };
  const validateBusinessLine = (value) => {
    if (!value) {
      setBusinessLineError("Please select a valid BusinessLine.");
      return false;
    }
    setBusinessLineError("");
    return true;
  };
  const handleNameChange = (value) => {
    setName(value);
    validateName(value);
  };

  const handleBusinessLineChange = (value) => {
    setBusinessLine(value);
    validateBusinessLine(value);
    setSelectedBusinessCategory([]);
  };

  // Add similar functions for other fields as needed

  const handleAdd = async () => {
    try {
      const isNameValid = validateName(name);
      const isBusinessLineValid = validateBusinessLine(businessLine);
      if (isNameValid && isBusinessLineValid) {
        // ... (rest of the code)
        // Log success or additional information if needed
        handleAddUpdate(
          enable,
          active,
          name,
          businessLine,
          selectedBusinessCategory
        );

        console.log("Row added successfully!");
      }
    } catch (error) {
      console.error("Error adding row:", error.message);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      position: "relative",
      left: "10%",
      width: "350px",
      padding: "6px",
      boxShadow: "none",
      border: "1px solid #E1E1E1",
      outline: "none",
      borderRadius: "8px",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    }),
    menu: (provided) => ({
      ...provided,
      position: "relative",
      left: "10%",
      width: "350px",
      borderRadius: "8px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#8E44AD" : "inherit",
      color: state.isFocused ? "#fff" : "#000",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#F6E1FF",
      color: "#DE3163",
      borderRadius: "100px",
      padding: "2px 3px",
      marginRight: "5px",
    }),
  };

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
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-theme  focus:ring-offset-2"
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
                        className={` px-5  sm:flex lg:flex-col items-center  space-y-10 flex-col ${styles}`}
                      >
                        <h2 className="text-xl font-bold">{heading}</h2>
                        <div className="mb-10 w-[90%] text-center">
                          <label className="block font-bold mb-3 text-left ml-12 mt-6">
                            Name
                          </label>
                          <input
                            type="text"
                            value={name}
                            placeholder="Enter Business Name"
                            onChange={(e) => handleNameChange(e.target.value)}
                            className={`side-input border-[#E1E1E1]  ${
                              nameError ? "border-red-500" : ""
                            }`}
                          />
                          {nameError && (
                            <span className="text-red-500 block text-left ml-12">
                              {nameError}
                            </span>
                          )}
                        </div>
                        <div className="mb-4 w-[90%]">
                          <label className="block font-bold mb-3 text-left ml-12 ">
                            Business Line
                          </label>
                          {/* <CustomDropdown
                            options={[
                              { label: 'SPACE', value: 'SPACE' },
                              { label: 'CELEBRATION', value: 'CELEBRATION' },
                            ]}
                            selectedOption={{ label: businessLine, value: businessLine }}
                            onSelect={(option) => setBusinessLine(option.value)}
                            styles="h-12"
                          /> */}
                          <CustomDropdown
                            options={businessLineOptions}
                            selectedOption={{
                              label: businessLine,
                              value: businessLine,
                            }}
                            onSelect={(option) => {
                              console.log(
                                "Selected businessLineOption:",
                                option.value
                              );
                              handleBusinessLineChange(option.label);
                              setBusinessLine(option.label);
                              // Trigger the fetch of filtered business kind options with the selected blId
                              fetchBusinessKindOptions(option.value);
                            }}
                            styles={`h-12 ${
                              businessLineError ? "border-red-500" : ""
                            }`}
                            placeholder="Select Business Line"
                          />
                          {businessLineError && (
                            <span className="text-red-500 mt-3 block text-left ml-12 ">
                              {businessLineError}
                            </span>
                          )}
                        </div>
                        <div className="mb-4 w-[88%] mt-3 text-center">
                          <label className="block font-bold mb-3 text-left ml-12 mt-2">
                            {business}{" "}
                            <span className="text-sm text-theme font-normal">
                              (Optional)
                            </span>
                          </label>
                          {/* <TagsInput
                            value={businessCategory}
                            onChange={(tags) => setBusinessCategory(tags)}
                            inputProps={{
                              className: 'side-input',
                            }}
                            options={businessKindOptions}
                          /> */}
                          <Select
                            isMulti
                            value={selectedBusinessCategory}
                            onChange={(selectedOption) => {
                              setSelectedBusinessCategory(selectedOption);
                              console.log("getoptions", selectedOption);
                              selectedOption.forEach((option) => {
                                console.log(
                                  "Selected Business Category bcId:",
                                  option.bkId
                                );
                              });
                            }}
                            options={businessKindOptions}
                            placeholder={
                              businessKindOptions.length === 0
                                ? "Please select the Business Line first"
                                : businessNames
                            }
                            styles={customStyles}
                          />
                        </div>
                        <div className="flex flex-row lg:flex-row w-[68%] mb-7 pt-2">
                          <div className="flex items-center mb-3 mr-6">
                            <p className="mr-2 text-sm font-bold">Enable </p>
                            <Toggle
                              checked={enable}
                              onToggle={() => handleToggle("enable")}
                            />
                            {/* <Toggle checked={toggleState.enable} onToggle={(value) => { onToggle('enable', value); setEnable(value); }} /> */}
                          </div>
                          <div className="flex w-28 items-center mb-3">
                            <p className="mr-2 text-sm font-bold"> Active </p>
                            <Toggle
                              checked={active}
                              onToggle={() => handleToggle("active")}
                            />
                            {/* <Toggle checked={toggleState.active} onToggle={(value) => { onToggle('active', value); setEnable(value); }} /> */}
                          </div>
                        </div>
                        <div className="flex flex-row sm:flex w-[90%] text-lg ml-24">
                          <button
                            onClick={handleAdd}
                            className="px-12 py-2 bg-primaryColor rounded-lg text-white mr-5 md:mb-0 hover:bg-[#dd0e49] font-semibold cursor-pointer"
                          >
                            Add {addButtonName}
                          </button>

                          <button
                            type="button"
                            className="relative focus:outline-none px-12 py-2 border-secondaryColor text-secondaryColor border hover:bg-secondaryColor hover:text-white rounded-lg"
                            onClick={() => setOpen(false)}
                            // onClick={onCancel}
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

export default AddRow;
