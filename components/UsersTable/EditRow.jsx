// components/EditRow.js
"use client";
// components/EditRow.js
import CustomDropdown from "./CustomDropdown";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import Toggle from "../Toggle";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Select, { components } from "react-select";
import CreatableSelect from "react-select/creatable";
export default function EditRow({
  id,
  name: initialName,
  blId,
  businessLine: initialBusinessLine,
  businessCategory: InitialBusinessCategory,
  onUpdate,
  onCancel,
  business,
  bcIds,
  initialEnable,
  initialActive,
  styles,
  onToggle,
  heading,
  toggleState,
  businessLineOptions,
  fetchBusinessKindOptions,
  businessKindOptions,
  handleUpdateRow,
  businessNames,
  bcNames,
  updateBcNames,
}) {
  const [name, setName] = useState(initialName);
  const [businessLine, setBusinessLine] = useState(initialBusinessLine);
  const formattedBcNames = bcNames.map((name) => ({
    value: name,
    label: name,
  }));
  //label need to be value
  const [selectedBusinessCategory, setSelectedBusinessCategory] =
    useState(bcNames);
  useEffect(() => {
    console.log("useEffect triggered");
    setSelectedBusinessCategory(bcNames);
  }, []);
  console.log("exact bcNames", bcNames);
  console.log("formattedBcNames", formattedBcNames);
  const [enable, setEnable] = useState(initialEnable);
  const [active, setActive] = useState(initialActive);
  const [open, setOpen] = useState(false);
  const [nameError, setNameError] = useState("");
  const [businessLineError, setBusinessLineError] = useState("");
  // const [selectedOptions, setSelectedOptions] = useState({
  //   selectedBusinessCategory: bcNames,
  // });
  // const validateForm = () => {
  //   // Reset previous errors
  //   setNameError("");
  //   setBusinessLineError("");

  //   let isValid = true;

  //   if (!name.trim()) {
  //     setNameError("Please enter a valid Name.");
  //     isValid = false;
  //   }

  //   if (!businessLine.trim()) {
  //     // Fix: Use businessLine instead of email
  //     setBusinessLineError("Please select a valid BusinessLine");
  //     isValid = false;
  //   }

  //   // Additional checks can be added based on your requirements

  //   return isValid;
  // };
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
    console.log("valuevalue", value);
    //Experiemental
    if (initialBusinessLine === value) {
      setSelectedBusinessCategory(bcNames);
      console.log("bcNames...", bcNames);
    } else {
      setSelectedBusinessCategory([]);
    }
  };

  useEffect(() => {
    if (
      initialName ||
      initialBusinessLine ||
      InitialBusinessCategory ||
      initialEnable ||
      initialActive
    ) {
      setOpen(true);
      fetchBusinessKindOptions(blId);
      console.log("initialBusinessLine", initialBusinessLine);
    }

    // Fetch options based on the initial business line only if options are not already populated
    console.log("initial business line", initialBusinessLine);
    console.log("businessLineOptions", businessLineOptions[1].value);
    // Set initial state of toggles to false
  }, [
    initialName,
    initialBusinessLine,
    InitialBusinessCategory,
    initialEnable,
    initialActive,
  ]);
  const handleUpdate = () => {
    const isNameValid = validateName(name);
    const isBusinessLineValid = validateBusinessLine(businessLine);
    if (isNameValid && isBusinessLineValid) {
      handleUpdateRow(
        id,
        name,
        businessLine,
        enable,
        active,
        selectedBusinessCategory,
        bcNames
      );
    }
    // handleAddUpdate(enable, active, name, businessLine, selectedBusinessCategory);
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
  const handleBusinessCategoryChange = (selectedOption) => {
    console.log("selectedoptions", selectedOption);
    setSelectedBusinessCategory(selectedOption);

    // Extract the labels of the selected options
    const selectedLabels = selectedOption.map((option) => option.bkId);

    // Additional logic to handle the removal of specific bcNames
    const removedBcNames = bcNames.filter((name) => {
      // Check if the name exists in the selected options
      const isSelected = selectedOption.some((option) => option.label === name);

      // Return true if the name is not selected and should be removed
      return !isSelected;
    });

    // Use `removedBcNames` as needed
    console.log("Removed bcNames:", removedBcNames);
    console.log("selectedLabels:", selectedLabels);

    // Use the updateBcNames function from props to update the bcNames state in the parent component
    updateBcNames(selectedOption);
    const result = updateBcNames(selectedOption);
    console.log("Update Bc Names Result:", result);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={setOpen}
        onClick={() => setOpen(false)}
      >
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
                        className={`  px-5  sm:flex lg:flex-col items-center  space-y-10 flex-col ${styles}`}
                      >
                        <h2 className="text-xl font-bold">{heading}</h2>
                        <div className="mb-4 w-[90%] text-center">
                          <label className="block font-bold mb-3 text-left ml-12 mt-8">
                            Name
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            className={`side-input  border-[#E1E1E1] ${
                              nameError ? "border-red-500" : ""
                            }`}
                          />
                          {nameError && (
                            <span className="text-red-500 inline-block text-left ml-12 w-full ">
                              {nameError}
                            </span>
                          )}
                        </div>
                        <div className="mb-4 w-[90%]">
                          <label className="block font-bold mb-3 text-left ml-12">
                            Business Line
                          </label>
                          {/* <CustomDropdown
                            options={businessLineOptions}
                            selectedOption={{
                              label: businessLine,
                              value: businessLine,
                            }}
                            onSelect={(option) => setBusinessLine(option.label)}
                            styles="h-12"
                          /> */}
                          <CustomDropdown
                            options={businessLineOptions}
                            selectedOption={{
                              label: businessLine,
                              value: businessLine,
                            }}
                            onSelect={(option) => {
                              //   console.log(
                              //     "Selected businessLineOption:",
                              //     option.value
                              //   );
                              handleBusinessLineChange(option.label);
                              setBusinessLine(option.label);
                              // Trigger the fetch of filtered business kind options with the selected blId
                              fetchBusinessKindOptions(option.value);
                            }}
                            styles={`h-12 ${
                              businessLineError ? "border-red-500" : ""
                            }`}
                          />
                          {businessLineError && (
                            <span className="text-red-500 inline-block text-left ml-12 w-full ">
                              {businessLineError}
                            </span>
                          )}
                        </div>
                        <div className="mb-4 w-[88%] text-center">
                          <label className="block font-bold mb-3 text-left ml-12 mt-2">
                            {business}
                          </label>
                          {/* <Select
                            isMulti
                            value={selectedBusinessCategory}
                            onChange={(selectedOption) => {
                              setSelectedBusinessCategory(selectedOption);
                              console.log("getoptions", selectedOption);
                              selectedOption.forEach((option) => {
                                console.log(
                                  "Selected Business Category bkId:",
                                  option.bcId
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
                          /> */}
                          <Select
                            isMulti
                            value={selectedBusinessCategory}
                            onChange={handleBusinessCategoryChange}
                            options={businessKindOptions}
                            placeholder={
                              businessKindOptions.length === 0
                                ? "Please select the Business Line first"
                                : businessNames
                            }
                            styles={customStyles}
                            // components={{ ClearIndicator: null }}
                          />
                          {/* <CreatableSelect
                            isMulti
                            value={selectedBusinessCategory}
                            onChange={handleBusinessCategoryChange}
                            options={businessKindOptions}
                            placeholder={
                              businessKindOptions.length === 0
                                ? "Please select the Business Line first"
                                : businessNames
                            }
                            styles={customStyles}
                            components={{ ClearIndicator: null }}
                          /> */}
                        </div>
                        <div className="flex flex-row md:flex-row  w-[68%] mb-7 pt-2">
                          <div className="flex items-center mb-3 mr-6">
                            <p className="mr-2 text-sm font-bold">Enable </p>
                            <Toggle
                              checked={toggleState.enable}
                              onToggle={(value) => {
                                onToggle("enable", value);
                                setEnable(value);
                              }}
                            />
                          </div>
                          <div className="flex w-28 items-center mb-3">
                            <p className="mr-2 text-sm font-bold"> Active </p>
                            <Toggle
                              checked={toggleState.active}
                              onToggle={(value) => {
                                onToggle("active", value);
                                setActive(value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex flex-row sm:flex w-[90%] text-lg ml-24">
                          <button
                            onClick={handleUpdate}
                            className="px-12 py-2 bg-primaryColor rounded-lg text-white mr-5 md:mb-0 hover:bg-[#dd0e49] font-semibold cursor-pointer"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => setOpen(false)}
                            className="relative focus:outline-none px-12 py-2 border-secondaryColor rounded-lg text-secondaryColor border hover:bg-secondaryColor hover:text-white"
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
}
