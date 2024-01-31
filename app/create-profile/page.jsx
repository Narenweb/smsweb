"use client";
import React, { useState, useEffect } from "react";
import UserHeader from "@/components/UserHeader";
import InputBox from "@/components/CustomInput";
import Dropdown from "@/components/Dropdown";
import UserFooter from "@/components/UserFooter";
import config from "@/components/config";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
export default function CreateProfile() {
  const router = useRouter();
  const sections = [
    "Fill General Information",
    "Fill Contact Information",
    "Upload Media",
    "Fill Business Information",
  ];
  const [accessToken, setAccessToken] = useState({});
  const [activeSection, setActiveSection] = useState(null);
  // const accessToken = localStorage.getItem("accessToken");
  const checkAuthentication = () => {
    const isAuthenticated = Boolean(localStorage.getItem("accessToken"));
    return isAuthenticated;
  };

  useEffect(() => {
    // Check if running on the client side
    if (typeof window !== "undefined") {
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedActiveSection =
        parseInt(localStorage.getItem("activeSection")) || 1;

      setAccessToken(storedAccessToken);
      setActiveSection(storedActiveSection);
    }
  }, []);

  // const [activeSection, setActiveSection] = useState(
  //   parseInt(localStorage.getItem("activeSection")) || 1
  // );

  const [businessLineNamesMap, setBusinessLineNamesMap] = useState({});
  const businessLineOptions = Object.keys(businessLineNamesMap).map((blId) => ({
    label: businessLineNamesMap[blId],
    value: blId,
  }));
  useEffect(() => {
    fetchBusinessLineNames();
    const isAuthenticated = checkAuthentication();
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [accessToken]);

  const handleSectionClick = (index) => {
    // Handle click on pipeline section
    setActiveSection(index);
  };

  const fetchBusinessLineNames = async () => {
    try {
      const businessLineNamesResponse = await fetch(
        `${config.host}/tenant/admin/v2/business/line/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (businessLineNamesResponse.ok) {
        const businessLineNamesData = await businessLineNamesResponse.json();

        if (
          businessLineNamesData &&
          businessLineNamesData.serviceResponse &&
          businessLineNamesData.serviceResponse.businessLineList
        ) {
          // Extracting businessLineList from the response
          const businessLineList =
            businessLineNamesData.serviceResponse.businessLineList;

          // Creating a mapping between blId and name
          const businessLineMap = businessLineList.reduce((map, line) => {
            map[line.blId] = line.name;
            return map;
          }, {});

          setBusinessLineNamesMap(businessLineMap);
        } else {
          console.error(
            "Invalid business line names response:",
            businessLineNamesData
          );
        }
      } else {
        console.error(
          "Failed to fetch business line names:",
          businessLineNamesResponse.status
        );
      }
    } catch (error) {
      console.error("Error fetching business line names:", error.message);
    }
  };
  const customStyles = {
    line: {
      transition: "background-color 0.3s ease",
    },
  };
  //First section
  const [isError, setIsError] = useState(false);
  const [isDropdownError, setIsDropdownError] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    options: null,
  });
  //secondSection
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [isWhatsappError, setIsWhatsappError] = useState(false);
  const [isAddressError, setIsAddressError] = useState(false);
  const [isZipError, setIsZipError] = useState(false);
  const [isDropdownErrorCountry, setIsDropdownErrorCountry] = useState(false);
  const [isDropdownErrorCity, setIsDropdownErrorCity] = useState(false);
  const [isDropdownErrorState, setIsDropdownErrorState] = useState(false);
  const [selectedStateOptions, setSelectedStateOptions] = useState({
    options: null,
  });
  const [selectedCityOptions, setSelectedCityOptions] = useState({
    options: null,
  });
  const [selectedCountryOptions, setSelectedCountryOptions] = useState({
    options: null,
  });

  const handleForceReload = () => {
    window.location.reload();
  };
  const handleValidationOne = () => {
    const inputValue = document.getElementById("business-name").value;
    const isNameValid = inputValue.trim() !== "";
    setIsError(!isNameValid);

    // Check if the business line is valid
    const selectedOption = selectedOptions.options;
    console.log("Selected Option:", selectedOption);
    const isBusinessLineValid = selectedOption !== null;
    setIsDropdownError(!isBusinessLineValid);

    // Check if both validations pass before moving to the next section
    if (isNameValid && isBusinessLineValid) {
      // Save entered data to local storage
      localStorage.setItem("business-name", inputValue);
      localStorage.setItem(
        "selected-business-line",
        JSON.stringify(selectedOption)
      );

      // Move to the next section
      const nextSection = activeSection + 1;
      setActiveSection(nextSection);
      // Save the active section to local storage
      localStorage.setItem("activeSection", nextSection);
    }
    // localStorage.getItem("business-name", inputValue);
    // localStorage.getItem(
    //   "selected-business-line",
    //   JSON.stringify(selectedOption)
    // );
  };

  const handleBack = () => {
    // Handle click on the back button
    const previousSection = activeSection - 1;
    setActiveSection(previousSection);
    localStorage.setItem("activeSection", previousSection);
  };
  const handleValidationTwo = () => {
    const inputEmailValue = document.getElementById("business-email").value;
    const isEmailValid = inputEmailValue.trim() !== "";
    setIsEmailError(!isEmailValid);
    const inputPhoneValue = document.getElementById("business-phone").value;
    const isPhoneValid = inputPhoneValue.trim() !== "";
    setIsPhoneError(!isPhoneValid);
    const inputWhatsappValue =
      document.getElementById("business-whatsapp").value;
    const isWhatsappValid = inputWhatsappValue.trim() !== "";
    setIsWhatsappError(!isWhatsappValid);
    const inputAddressValue = document.getElementById("business-address").value;
    const isAddressValid = inputAddressValue.trim() !== "";
    setIsAddressError(!isAddressValid);
    const inputZipValue = document.getElementById("business-zipCode").value;
    const isZipValid = inputZipValue.trim() !== "";
    setIsZipError(!isZipValid);
    //country
    const selectedOptionCountry = selectedCountryOptions.options;
    console.log("Selected Option country:", selectedOptionCountry);
    const isCountryValid = selectedOptionCountry !== null;
    setIsDropdownErrorCountry(!isCountryValid);
    //City
    const selectedOptionCity = selectedCityOptions.options;
    console.log("Selected Option city:", selectedOptionCity);
    const isCityValid = selectedOptionCity !== null;
    setIsDropdownErrorCity(!isCityValid);
    //State
    const selectedOptionState = selectedStateOptions.options;
    console.log("Selected Option state:", selectedOptionState);
    const isStateValid = selectedOptionState !== null;
    setIsDropdownErrorState(!isStateValid);

    // Check if both validations pass before moving to the next section
    if (
      isEmailValid &&
      isPhoneValid &&
      isWhatsappValid &&
      isAddressValid &&
      isZipValid &&
      isCountryValid &&
      isCityValid &&
      isStateValid
    ) {
      // Move to the next section
      const nextSection = activeSection + 1;
      setActiveSection(nextSection);
      // Save the active section to local storage
      localStorage.setItem("activeSection", nextSection);
    }
  };

  //firstSection
  const handleChange = () => {
    // Clear the error when the user starts typing
    setIsError(false);
  };
  const handleOptionClick = (option) => {
    // Check if the selected option is different from the current state
    if (selectedOptions.label !== option) {
      setSelectedOptions({
        ...selectedOptions,
        options: option,
      });
    }
  };

  //SecondSection
  const handleEmailChange = () => {
    setIsEmailError(false);
  };
  const handlePhoneChange = () => {
    setIsPhoneError(false);
  };
  const handleWhatsappChange = () => {
    setIsWhatsappError(false);
  };
  const handleAddressChange = () => {
    setIsAddressError(false);
  };
  const handleZipChange = () => {
    setIsZipError(false);
  };
  const handleOptionClickCountry = (option) => {
    console.log("Country option clicked:", option);
    if (selectedCountryOptions.label !== option) {
      setSelectedCountryOptions({
        ...selectedCountryOptions,
        options: option,
      });
    }
  };
  const handleOptionClickCity = (option) => {
    console.log("City option clicked:", option);
    if (selectedCityOptions.label !== option) {
      setSelectedCityOptions({
        ...selectedCityOptions,
        options: option,
      });
    }
  };

  const handleOptionClickState = (option) => {
    console.log("State option clicked:", option);
    if (selectedStateOptions.label !== option) {
      setSelectedStateOptions({
        ...selectedStateOptions,
        options: option,
      });
    }
  };

  //Third section Media
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    setCoverPhoto(file);
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
  };
  const handleDeleteCoverPhoto = () => {
    setCoverPhoto(null);
  };
  const handleDeleteProfilePhoto = () => {
    setProfilePhoto(null);
  };
  const fileSizeLimit = 5 * 1024 * 1024;

  const handleValidationThree = () => {
    const nextSection = activeSection + 1;
    setActiveSection(nextSection);
    // Save the active section to local storage
    localStorage.setItem("activeSection", nextSection);
  };

  //Fourth section Business
  const [chooseState, setChooseState] = useState("allIndia");
  const [geoLocations, setGeoLocations] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [choosePlace, setChoosePlace] = useState([]);
  const [isSecondBoxVisible, setIsSecondBoxVisible] = useState(false);
  const [isThirdBoxVisible, setIsThirdBoxVisible] = useState(false);
  const [placeOptions, setPlaceOptions] = useState([]);
  const [selectPlaceOptions, setSelectPlaceOptions] = useState([]);

  //statebox
  const fetchGeoLocations = async () => {
    try {
      const response = await fetch(
        `${config.host}/v1/public/geoLocation?parentId=91&pageNo=0&pageSize=1000`
      );
      const data = await response.json();
      const geoLocations = data.serviceResponse.geoLocationList;
      return geoLocations;
    } catch (error) {
      console.error("Error fetching geo locations:", error);
      return [];
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const locations = await fetchGeoLocations();
      setGeoLocations(locations);
    };

    fetchData();
  }, []);

  const handleStateChange = async (option) => {
    const locations = await fetchGeoLocations();
    setGeoLocations(locations);
    setChooseState(option);
    setSelectedCountry([]);
    setSelectedDistrict([]);
  };

  const handleOptionChange = (value) => {
    console.log(value);
    setIsSecondBoxVisible(true);

    // Toggle the selection
    setSelectedCountry((prevSelectedCountries) => {
      if (prevSelectedCountries.includes(value)) {
        // If already selected, remove it
        return prevSelectedCountries.filter((country) => country !== value);
      } else {
        // If not selected, add it
        return [...prevSelectedCountries, value];
      }
    });
  };
  //districtbox-second section
  const handleRegionChange = async (selectedState) => {
    setSelectedRegion(selectedState);
    if (selectedState) {
      try {
        const response = await fetch(
          `https://api.urbanbarrow.com/v1/public/geoLocation?parentId=${selectedState}&pageNo=0&pageSize=1000`
        );
        const data = await response.json();
        if (
          data.successful &&
          data.serviceResponse &&
          data.serviceResponse.geoLocationList
        ) {
          setDistrictOptions(data.serviceResponse.geoLocationList);
          setIsSecondBoxVisible(true);
        }
      } catch (error) {
        console.error("Error fetching district options:", error);
      }
    }
  };

  const handleAllRegionChange = async (selectedState) => {
    setSelectedRegion(selectedState);
    // handleRegionChange(selectedState);
  };

  const handleDistrictChange = (value) => {
    console.log(value);
    setIsThirdBoxVisible(true);

    // Toggle the selection
    setSelectedDistrict((prevSelectedCountries) => {
      if (prevSelectedCountries.includes(value)) {
        // If already selected, remove it
        return prevSelectedCountries.filter((country) => country !== value);
      } else {
        // If not selected, add it
        return [...prevSelectedCountries, value];
      }
    });
  };

  //place third section
  const handlePlaceOption = async (selectedDistrict) => {
    setChoosePlace(selectedDistrict);
    setIsThirdBoxVisible(true);
    console.log("selected district by hadlePlaceOption", selectedDistrict);
    if (selectedDistrict) {
      try {
        const response = await fetch(
          `${config.host}/v1/public/geoLocation?parentId=${selectedDistrict}&pageNo=0&pageSize=1000`
        );
        const data = await response.json();

        if (
          data.successful &&
          data.serviceResponse &&
          data.serviceResponse.geoLocationList
        ) {
          setPlaceOptions(data.serviceResponse.geoLocationList);
          setIsThirdBoxVisible(true);
        }
      } catch (error) {
        console.error("Error fetching places options:", error);
      }
    }
  };

  const handlePlaceChange = (value) => {
    console.log(value);
    setIsThirdBoxVisible(true);
    // Toggle the selection
    setSelectPlaceOptions((prevSelectedCountries) => {
      if (prevSelectedCountries.includes(value)) {
        // If already selected, remove it
        return prevSelectedCountries.filter((place) => place !== value);
      } else {
        // If not selected, add it
        return [...prevSelectedCountries, value];
      }
    });
  };

  return (
    <>
      <div className="flex h-full">
        <div className="flex flex-1 flex-col overflow-hidden">
          <UserHeader />
          <section className="w-full h-auto top-0 relative  lg:h-[390px] bg-[#DCDCDC]">
            <div className="containerBox relative md:left-20 lg:left-32">
              <h1 className="font-bold text-4xl mt-[200px] text-dark">
                Create Business Profile
              </h1>
            </div>
          </section>
          {/* Pipeline */}
          <section className="bg-userTheme pt-10 sm:pt-20">
            <div className="pipeline mb-40 flex justify-center items-center relative containerBox">
              {sections.map((section, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`rounded-full w-6 h-6 outline outline-2 z-10 ${
                      index < activeSection
                        ? "bg-primaryColor outline-violet-800"
                        : "bg-gray-300 outline-transparent"
                    }`}
                  >
                    {index + 1 < activeSection ? (
                      // Check icon for completed sections
                      <FaCheck className="text-white relative left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] h-3" />
                    ) : (
                      ""
                    )}
                  </div>
                  {index < sections.length - 1 && (
                    <div
                      className="line w-[260px] h-[5px]"
                      style={{
                        backgroundColor:
                          index < activeSection - 1 ? "#DE3163" : "#D1D5DB",
                        ...customStyles.line,
                      }}
                    ></div>
                  )}
                  <p
                    className={`font-bold text-sm absolute top-10 w-[190px] text-center ${
                      index < activeSection
                        ? "text-primaryColor"
                        : "text-gray-400"
                    }`}
                    style={{ left: `${13.5 + 20 * index}%` }}
                    onClick={() => handleSectionClick(index)}
                  >
                    PLEASE {section.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>

            {/* Details */}
            <div className="flex relative left-[150px] mb-40 containerBox">
              {activeSection === 1 && (
                <div className="general-information section w-full ml-20">
                  <p className="font-semibold text-2xl">General Information</p>
                  <div className="mt-10 flex justify-between w-[60%]">
                    <InputBox
                      Title="Business Name"
                      Placeholder="Enter Business Name"
                      InputType="text"
                      Inputname="business-name"
                      ErrorMessage="Business Name cannot be empty."
                      onChange={handleChange}
                      isError={isError}
                    />

                    <Dropdown
                      options={businessLineOptions}
                      labelName="Business Line"
                      placeholder="Select Business Line"
                      id="business-line"
                      ErrorMessage="Select any one Business Line"
                      isError={isDropdownError}
                      // onChange={handleOptionClick}
                      onSelect={(option) => {
                        console.log("Option in select:", option.label);
                        handleOptionClick(option.label);
                      }}
                    />
                  </div>
                  <button
                    className="bg-primaryColor text-white text-lg font-bold px-5 py-2 rounded-md relative left-[48%] mt-24"
                    onClick={handleValidationOne}
                  >
                    Continue{" "}
                    <span
                      aria-hidden="true"
                      className="hidden transition-transform transform sm:inline-block ml-2 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </button>
                </div>
              )}
              {activeSection === 2 && (
                <div className="general-information section w-full left-[60px] relative">
                  <p className="font-semibold text-2xl">Contact Information</p>
                  <div className="mt-10 flex justify-between w-[60%]">
                    <InputBox
                      Title="Business Email"
                      Placeholder="Enter Business Email"
                      InputType="email"
                      Inputname="business-email"
                      ErrorMessage="Business Email cannot be empty."
                      onChange={handleEmailChange}
                      isError={isEmailError}
                    />
                    <InputBox
                      Title="Business Phone"
                      Placeholder="Enter Business Phone"
                      InputType="number"
                      Inputname="business-phone"
                      ErrorMessage="Business Phone cannot be empty."
                      onChange={handlePhoneChange}
                      isError={isPhoneError}
                      className="number-input"
                    />
                  </div>
                  <div className="mt-10 flex justify-between w-[60%]">
                    <InputBox
                      Title="Business Whatsapp"
                      Placeholder="Enter Business Whatsapp"
                      InputType="number"
                      Inputname="business-whatsapp"
                      ErrorMessage="Business whatsapp cannot be empty."
                      onChange={handleWhatsappChange}
                      isError={isWhatsappError}
                      className="number-input"
                    />
                    <InputBox
                      Title="Business Address"
                      Placeholder="Enter Business Address"
                      InputType="text"
                      Inputname="business-address"
                      ErrorMessage="Business address cannot be empty."
                      onChange={handleAddressChange}
                      isError={isAddressError}
                    />
                  </div>
                  <div className="mt-10 flex justify-between w-[60%]">
                    <Dropdown
                      options={[
                        { label: "India", value: "India" },
                        { label: "USA", value: "USA" },
                      ]}
                      labelName="Country"
                      placeholder="Select Country"
                      id="country"
                      ErrorMessage="Select any one Country"
                      isError={isDropdownErrorCountry}
                      // onChange={handleOptionClick}
                      onSelect={(option) => {
                        console.log("Option in country:", option.label);
                        handleOptionClickCountry(option.label);
                      }}
                    />
                    <Dropdown
                      options={[
                        { label: "Bangalore", value: "Bangalore" },
                        { label: "Chennai", value: "Chennai" },
                      ]}
                      labelName="City"
                      placeholder="Select Code"
                      id="city"
                      ErrorMessage="Select any one City"
                      isError={isDropdownErrorCity}
                      onChange={handleOptionClickCity}
                      onSelect={(option) => {
                        console.log("Selected city:", option.label);
                        handleOptionClickCity(option.label);
                      }}
                    />
                  </div>
                  <div className="mt-10 flex justify-between w-[60%]">
                    <Dropdown
                      options={[
                        { label: "Tamil Nadu", value: "Tamil Nadu" },
                        { label: "Kerala", value: "Kerala" },
                      ]}
                      labelName="State"
                      placeholder="Select State"
                      id="state"
                      ErrorMessage="Select any one State"
                      isError={isDropdownErrorState}
                      onChange={handleOptionClickState}
                      onSelect={(option) => {
                        console.log("Selected State:", option.label);
                        handleOptionClickState(option.label);
                      }}
                    />
                    <InputBox
                      Title="Zip Code"
                      Placeholder="Enter Zip Code"
                      InputType="number"
                      Inputname="business-zipCode"
                      ErrorMessage="Zip code cannot be empty."
                      onChange={handleZipChange}
                      isError={isZipError}
                      className="number-input"
                    />
                  </div>
                  <button
                    className="bg-primaryColor text-white text-lg font-bold px-9 py-2 rounded-md relative left-[34.5%] mt-24"
                    onClick={handleBack}
                  >
                    <span
                      aria-hidden="true"
                      className="hidden transition-transform transform sm:inline-block mr-3 group-hover:translate-x-1"
                    >
                      &larr;
                    </span>
                    Back{" "}
                  </button>
                  <button
                    className="bg-primaryColor text-white text-lg font-bold px-5 py-2 rounded-md relative left-[38.5%] mt-24"
                    onClick={handleValidationTwo}
                  >
                    Continue{" "}
                    <span
                      aria-hidden="true"
                      className="hidden transition-transform transform sm:inline-block ml-2 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </button>
                </div>
              )}
              {activeSection === 3 && (
                <div className="media section w-full relative left-[70px]">
                  <p className="font-semibold text-2xl">Media</p>
                  <div className="flex w-[65%] mt-10 justify-between">
                    <div className="cover-photo-section">
                      <p className="mb-4 font-bold text-lg">Cover Photo</p>
                      {coverPhoto ? (
                        <div className="file-input-label hover:shadow-lg">
                          {coverPhoto.size <= fileSizeLimit ? (
                            ""
                          ) : (
                            <>
                              <FiUpload
                                size={38}
                                className="mt-6 mx-auto w-full text-defaultTheme pointer"
                              />
                              <input
                                type="file"
                                className="file-input pointer h-1/2"
                                onChange={handleCoverPhotoChange}
                              />
                            </>
                          )}
                          <p className="text-center px-3 mt-8 font-semibold">
                            {coverPhoto.size <= fileSizeLimit
                              ? `File selected: ${coverPhoto.name}`
                              : "Click to Upload Cover photo or Drag and Drop Here"}
                          </p>
                          {coverPhoto.size <= fileSizeLimit && (
                            <FiTrash2
                              size={38}
                              className="mt-6 mx-auto w-full text-defaultTheme pointer"
                              onClick={handleDeleteCoverPhoto}
                            />
                          )}
                        </div>
                      ) : (
                        <label className="file-input-label hover:shadow-lg">
                          <input
                            type="file"
                            className="file-input"
                            onChange={handleCoverPhotoChange}
                          />
                          <FiUpload
                            size={38}
                            className="mt-6 mx-auto w-full text-defaultTheme pointer"
                          />
                          <p className="text-center px-3 mt-3 font-semibold">
                            Click to Upload Cover photo or Drag and Drop Here
                          </p>
                        </label>
                      )}

                      {coverPhoto && coverPhoto.size > 5 * 1024 * 1024 && (
                        <p className="text-red-500 pt-3">
                          File size exceeds 5MB limit, please select different
                          photo
                        </p>
                      )}
                    </div>

                    {/* Profile section */}
                    <div className="profile-photo-section hover:shadow-lg">
                      <p className="mb-4 font-bold text-lg">Profile Photo</p>
                      {profilePhoto ? (
                        <div className="file-input-label hover:shadow-lg">
                          {profilePhoto.size <= fileSizeLimit ? (
                            ""
                          ) : (
                            <>
                              <FiUpload
                                size={38}
                                className="mt-6 mx-auto w-full text-defaultTheme pointer"
                              />
                              <input
                                type="file"
                                className="file-input pointer h-1/2"
                                onChange={handleProfilePhotoChange}
                              />
                            </>
                          )}
                          <p className="text-center px-3 mt-8 font-semibold">
                            {profilePhoto.size <= fileSizeLimit
                              ? `File selected: ${profilePhoto.name}`
                              : "Click to Upload Cover photo or Drag and Drop Here"}
                          </p>
                          {profilePhoto.size <= fileSizeLimit && (
                            <FiTrash2
                              size={38}
                              className="mt-6 mx-auto w-full text-defaultTheme pointer"
                              onClick={handleDeleteProfilePhoto}
                            />
                          )}
                        </div>
                      ) : (
                        <label className="file-input-label hover:shadow-lg">
                          <input
                            type="file"
                            className="file-input"
                            onChange={handleProfilePhotoChange}
                          />
                          <FiUpload
                            size={38}
                            className="mt-6 mx-auto w-full text-defaultTheme pointer"
                          />
                          <p className="text-center px-3 mt-3 font-semibold">
                            Click to Upload Profile photo or Drag and Drop Here
                          </p>
                        </label>
                      )}

                      {profilePhoto && profilePhoto.size > 5 * 1024 * 1024 && (
                        <p className="text-red-500 pt-3 h-10">
                          File size exceeds 5MB limit, please select different
                          photo
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    className="bg-primaryColor text-white text-lg font-bold px-9 py-2 rounded-md relative left-[40%] mt-24"
                    onClick={handleBack}
                  >
                    <span
                      aria-hidden="true"
                      className="hidden transition-transform transform sm:inline-block mr-3 group-hover:translate-x-1"
                    >
                      &larr;
                    </span>
                    Back{" "}
                  </button>
                  <button
                    className="bg-primaryColor text-white text-lg font-bold px-5 py-2 rounded-md relative left-[46%] mt-24"
                    onClick={handleValidationThree}
                  >
                    Continue{" "}
                    <span
                      aria-hidden="true"
                      className="hidden transition-transform transform sm:inline-block ml-2 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </button>
                </div>
              )}
              {activeSection === 4 && (
                <div className="business-information section relative left-[60px] w-full">
                  <p className="font-semibold text-2xl">Business Information</p>
                  <p className="mt-10 text-lg">Service App</p>
                  <div className="flex text-dark w-[75%] justify-between">
                    <div className="first-box flex flex-col mt-5 w-[265px] rounded">
                      <div className="pb-3 flex items-center px-5 py-5 bg-[#edd2f8] ">
                        <input
                          type="radio"
                          name="country"
                          id="country"
                          className="transform scale-125 cursor-pointer"
                          checked={chooseState === "allIndia"}
                          onChange={() => handleStateChange("allIndia")}
                        />
                        <label
                          htmlFor="country"
                          className="ml-3 font-light cursor-pointer"
                        >
                          All of India
                        </label>
                      </div>
                      <div className="flex items-center px-5 pb-5 bg-[#edd2f8]">
                        <input
                          type="radio"
                          name="country"
                          id="choose-country"
                          className="transform scale-125 cursor-pointer"
                          checked={chooseState === "chooseStates"}
                          onChange={() => handleStateChange("chooseStates")}
                        />
                        <label
                          htmlFor="choose-country"
                          className="ml-3 font-light cursor-pointer relative"
                        >
                          Choose States
                          <FaAngleDown
                            className={`ml-2 transition-transform duration-300 absolute text-theme right-[-55px] h-6 top-0 ${
                              chooseState === "chooseStates" ? "rotate-180" : ""
                            }`}
                          />
                        </label>
                      </div>
                      {/* options */}
                      {chooseState === "chooseStates" && (
                        <div
                          className={`option flex flex-col px-5 py-5 bg-[#fff] rounded ${
                            chooseState === "chooseStates" ? "active" : ""
                          }`}
                        >
                          {geoLocations.map((location) => (
                            <div
                              key={location.locationId}
                              className="pb-4 flex items-center transition-all delay-200 ease-in-out"
                            >
                              <input
                                type="checkbox"
                                name={`country-option-${location?.name}`}
                                className="transform scale-125 cursor-pointer"
                                checked={selectedCountry.includes(
                                  location.name
                                )}
                                onChange={() =>
                                  handleOptionChange(location.name)
                                }
                              />
                              <label className="ml-3 font-light">
                                {location.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Second box */}
                    <div className="second-box-container flex flex-col mt-5 bg-white overflow-y-auto h-[45%] max-h-[520px] w-[265px]">
                      {selectedCountry &&
                        selectedCountry.map((country, index) => (
                          <div key={index} className="second-box-cover">
                            {isSecondBoxVisible && (
                              <div className="second-box flex flex-col mb-2  rounded">
                                {geoLocations
                                  .filter((location) => {
                                    // console.log(
                                    //   "location.name-country",
                                    //   location
                                    // );
                                    return location.name === country;
                                  })
                                  .map((filteredCountry) => (
                                    <React.Fragment
                                      key={filteredCountry.locationId}
                                    >
                                      <div
                                        key={filteredCountry.locationId}
                                        className="pb-3 flex items-center px-5 py-5 bg-[#edd2f8]"
                                      >
                                        <input
                                          type="radio"
                                          name={`state-${filteredCountry?.name}`}
                                          id={`state-${filteredCountry?.name}`}
                                          className="transform scale-125 cursor-pointer"
                                          // checked={
                                          //   selectedRegion ===
                                          //   filteredCountry.value
                                          // }
                                          onChange={() => {
                                            handleRegionChange(
                                              filteredCountry.name
                                            );
                                            console.log(
                                              "selected one",
                                              filteredCountry.locationId
                                            );
                                          }}
                                        />

                                        <label
                                          htmlFor={`state-${filteredCountry.name}`}
                                          className="ml-3 font-light cursor-pointer"
                                        >
                                          {`All of ${filteredCountry.name}`}
                                        </label>
                                      </div>
                                      <div className="flex items-center px-5 pb-5 bg-[#edd2f8]">
                                        <input
                                          type="radio"
                                          name={`state-${filteredCountry.name}`}
                                          id={`choose-state-${filteredCountry.locationId}`}
                                          className="transform scale-125 cursor-pointer"
                                          checked={
                                            selectedRegion ===
                                            filteredCountry.locationId
                                          }
                                          onChange={() => {
                                            handleRegionChange(
                                              filteredCountry.locationId
                                            );
                                            console.log(
                                              "selected country locationId",
                                              filteredCountry.locationId
                                            );
                                          }}
                                        />
                                        <label
                                          htmlFor={`choose-state-${filteredCountry.locationId}`}
                                          className="ml-3 font-light cursor-pointer relative"
                                        >
                                          Choose District
                                          <FaAngleDown
                                            className={`ml-2 transition-transform duration-300 absolute text-theme right-[-55px] h-6 top-0 ${
                                              selectedRegion ===
                                              filteredCountry.locationId
                                                ? "rotate-180"
                                                : ""
                                            }`}
                                          />
                                        </label>
                                      </div>

                                      {/* options */}
                                      {selectedRegion ===
                                        filteredCountry.locationId && (
                                        <div
                                          className={`option flex flex-col px-5 py-5 bg-[#fff] rounded ${
                                            selectedRegion ===
                                            filteredCountry.locationId
                                              ? "active"
                                              : ""
                                          }`}
                                        >
                                          {districtOptions.map((option) => (
                                            <div
                                              key={option.locationId}
                                              className="pb-4 flex items-center transition-all delay-200 ease-in-out"
                                            >
                                              <input
                                                type="checkbox"
                                                name={`country-option-${option.name}`}
                                                className="transform scale-125 cursor-pointer"
                                                onChange={() => {
                                                  handleDistrictChange(
                                                    option.name
                                                  );
                                                  console.log(
                                                    "selected district",
                                                    option.locationId
                                                  );
                                                }}
                                                checked={selectedDistrict.includes(
                                                  option.name
                                                )}
                                              />
                                              <label className="ml-3 font-light">
                                                {option.name}
                                              </label>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </React.Fragment>
                                  ))}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                    {/* Third box */}
                    <div className="third-box-container flex flex-col mt-5 bg-white overflow-y-auto h-[45%] max-h-[520px] w-[265px]">
                      {selectedDistrict &&
                        selectedDistrict.map((district, index) => (
                          <div key={index} className="third-box-cover">
                            {isThirdBoxVisible && (
                              <div className="second-box flex flex-col mb-2 rounded">
                                {districtOptions
                                  .filter((location) => {
                                    console.log("location-district", district);
                                    console.log(
                                      "location.name-district",
                                      location.name
                                    );
                                    return location.name === district;
                                  })
                                  .map((filteredDistrict) => (
                                    <React.Fragment
                                      key={filteredDistrict.locationId}
                                    >
                                      <div
                                        key={filteredDistrict.locationId}
                                        className="pb-3 flex items-center px-5 py-5 bg-[#edd2f8]"
                                      >
                                        <input
                                          type="radio"
                                          name={`state-${filteredDistrict?.name}`}
                                          id={`state-${filteredDistrict?.name}`}
                                          className="transform scale-125 cursor-pointer"
                                          // checked={
                                          //   selectedRegion ===
                                          //   filteredDistrict.value
                                          // }
                                          onChange={() =>
                                            handlePlaceOption(
                                              filteredDistrict?.name
                                            )
                                          }
                                        />

                                        <label
                                          htmlFor={`state-${filteredDistrict.name}`}
                                          className="ml-3 font-light cursor-pointer"
                                        >
                                          {`All of ${filteredDistrict.name}`}
                                        </label>
                                      </div>
                                      <div className="flex items-center px-5 pb-5 bg-[#edd2f8]">
                                        <input
                                          type="radio"
                                          name={`state-${filteredDistrict.name}`}
                                          id={`choose-state-${filteredDistrict.locationId}`}
                                          className="transform scale-125 cursor-pointer"
                                          // checked={
                                          //   selectedRegion ===
                                          //   filteredDistrict.label
                                          // }
                                          onChange={() => {
                                            handlePlaceOption(
                                              filteredDistrict.locationId
                                            );
                                            console.log(
                                              "selected locationId for district",
                                              filteredDistrict.locationId
                                            );
                                          }}
                                        />
                                        <label
                                          htmlFor={`choose-state-${filteredDistrict.locationId}`}
                                          className="ml-3 font-light cursor-pointer relative"
                                        >
                                          Choose Places
                                          <FaAngleDown
                                            className={`ml-2 transition-transform duration-300 absolute text-theme right-[-55px] h-6 top-0 ${
                                              choosePlace ===
                                              filteredDistrict.locationId
                                                ? "rotate-180"
                                                : ""
                                            }`}
                                          />
                                        </label>
                                      </div>

                                      {/* options */}
                                      {choosePlace ===
                                        filteredDistrict.locationId && (
                                        <div
                                          className={`option flex flex-col px-5 py-5 bg-[#fff] rounded ${
                                            choosePlace ===
                                            filteredDistrict.locationId
                                              ? "active"
                                              : ""
                                          }`}
                                        >
                                          {placeOptions.map((option, index) => (
                                            <div
                                              key={index}
                                              className="pb-4 flex items-center transition-all delay-200 ease-in-out"
                                            >
                                              <input
                                                type="checkbox"
                                                name={`country-option-${option.name}`}
                                                className="transform scale-125 cursor-pointer"
                                                checked={selectPlaceOptions.includes(
                                                  option.name
                                                )}
                                                onChange={() => {
                                                  handlePlaceChange(
                                                    option.name
                                                  );
                                                  console.log(
                                                    "selected district",
                                                    option.locationId
                                                  );
                                                }}
                                              />
                                              <label className="ml-3 font-light">
                                                {`${option.name} - ${option.locationId}`}
                                              </label>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </React.Fragment>
                                  ))}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
          <UserFooter />
        </div>
      </div>
    </>
  );
}
