"use client";
import React, { useState, useEffect } from "react";
import UserHeader from "@/components/UserHeader";
import InputBox from "@/components/CustomInput";
import Dropdown from "@/components/Dropdown";
import UserFooter from "@/components/UserFooter";
import config from "@/components/config";
import { useRouter } from "next/navigation";
import { FaCheck, FaAngleDown, FaPlus } from "react-icons/fa";
import { FiUpload, FiTrash2 } from "react-icons/fi";
// import "../Assets";
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
    fetchBusinessCategories();
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
  const [isSocialMediaError, setIsSocialMediaError] = useState(false);
  const [selectedSocialMediaOptions, setSelectedSocialMediaOptions] = useState({
    options: null,
  });
  const [isMediaLinkError, setIsMediaLinkError] = useState(false);
  const [selectedStateOptions, setSelectedStateOptions] = useState({
    options: null,
  });
  const [selectedCityOptions, setSelectedCityOptions] = useState({
    options: null,
  });
  const [selectedCountryOptions, setSelectedCountryOptions] = useState({
    options: null,
  });
  const [selectedZipOptions, setSelectedZipOptions] = useState({
    options: null,
  });

  const handleForceReload = () => {
    window.location.reload();
  };
  // const handleValidationOne = () => {
  //   const inputValue = document.getElementById("business-name").value;
  //   const isNameValid = inputValue.trim() !== "";
  //   setIsError(!isNameValid);

  //   // Check if the business line is valid
  //   const selectedOption = selectedOptions.options;
  //   console.log("Selected Option:", selectedOption);
  //   const isBusinessLineValid = selectedOption !== null;
  //   setIsDropdownError(!isBusinessLineValid);

  //   // Check if both validations pass before moving to the next section
  //   if (isNameValid && isBusinessLineValid) {
  //     // Save entered data to local storage
  //     localStorage.setItem("business-name", inputValue);
  //     localStorage.setItem("selectedbusinessLine", selectedOption);
  //     // Move to the next section
  //     const nextSection = activeSection + 1;
  //     setActiveSection(nextSection);
  //     // Save the active section to local storage
  //     localStorage.setItem("activeSection", nextSection);
  //     window.scrollTo(350, 350);
  //   }
  // };
  const handleValidationOne = async () => {
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
      try {
        const response = await fetch(
          `${config.host}/tenant/admin/v2/partner/business/profile/all`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              businessName: inputValue,
              businessLine: selectedOption,
            }),
          }
        );

        if (response.ok) {
          // Move to the next section
          const nextSection = activeSection + 1;
          setActiveSection(nextSection);
          // Save the active section to local storage
          localStorage.setItem("business-name", inputValue);
          // localStorage.setItem("activeSection", nextSection);
          window.scrollTo(350, 350);
        } else {
          // Handle error response
          console.error("Error saving data:", response.statusText);
        }
      } catch (error) {
        console.error("Error saving data:", error.message);
      }
    }
  };

  useEffect(() => {
    // Check if the component is in the first section
    if (activeSection === 1) {
      // Retrieve values from local storage
      const storedName = localStorage.getItem("business-name") || "";

      // Set the business name in the input box
      document.getElementById("business-name").value = storedName;
    }
    if (activeSection === 2) {
      // Retrieve values from local storage
      const storedEmail = localStorage.getItem("business-email") || "";
      const storedPhone = localStorage.getItem("business-phone") || "";
      const storedWhatsapp = localStorage.getItem("business-whatsapp") || "";
      const storedAddress = localStorage.getItem("business-address") || "";
      const storedMediaLink = localStorage.getItem("business-media-link") || "";

      // Set the business name in the input box
      document.getElementById("business-email").value = storedEmail;
      document.getElementById("business-phone").value = storedPhone;
      document.getElementById("business-whatsapp").value = storedWhatsapp;
      document.getElementById("business-address").value = storedAddress;
      document.getElementById("business-media-link").value = storedMediaLink;
    }
  }, [activeSection]);

  const handleBack = () => {
    // Handle click on the back button
    const previousSection = activeSection - 1;
    setActiveSection(previousSection);
    localStorage.setItem("activeSection", previousSection);
    window.scrollTo(350, 350);
  };
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  const handleValidationTwo = async () => {
    const inputEmailValue = document.getElementById("business-email").value;
    const isEmail = inputEmailValue.trim() !== "";
    setIsEmailError(!isEmail);
    const isEmailValid = validateEmail(inputEmailValue);
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
    // const selectedOptionZip = selectedZipOptions.options;

    const selectedOptionZip = selectedPlaceOption;
    const selectedOptionCity = selectedPlace;
    const selectedOptionState = selectedState;
    localStorage.setItem("selectedState", JSON.stringify(selectedOptionState));
    const isZipValid = selectedOptionZip !== "";
    setIsZipError(!isZipValid);
    console.log("Selected Option Zipcode:", selectedOptionZip);
    console.log("Selected Option city:", selectedOptionCity);
    console.log("Selected Option state:", selectedOptionState);
    //country
    const selectedOptionCountry = selectedCountryOptions.options;
    console.log("Selected Option country:", selectedOptionCountry);
    // const isCountryValid = selectedOptionCountry !== null;
    // setIsDropdownErrorCountry(!isCountryValid);
    //City

    // const selectedOptionCity = selectedCityOptions.options;
    // console.log("Selected Option city:", selectedOptionCity);
    const isCityValid = selectedOptionCity !== "";
    setIsDropdownErrorCity(!isCityValid);
    //State
    // const selectedOptionState = selectedStateOptions.options;
    // console.log("Selected Option state:", selectedOptionState);
    const isStateValid = selectedOptionState !== "";
    setIsDropdownErrorState(!isStateValid);
    //social media
    const selectedSocialMediaState = selectedSocialMediaOptions.options;
    console.log("Selected Social Media:", selectedSocialMediaState);
    // const isMediaValid = selectedSocialMediaState !== null;
    // setIsSocialMediaError(!isMediaValid);
    //Social Media Link
    const countryDefaultValue = "India";
    const inputMediaLinkValue =
      document.getElementById(`business-media-link`).value;
    // const isMediaLinkValid = inputMediaLinkValue.trim() !== "";
    // setIsMediaLinkError(!isMediaLinkValid);

    // Check if both validations pass before moving to the next section
    if (
      isEmailValid &&
      isEmail &&
      isPhoneValid &&
      isWhatsappValid &&
      isAddressValid &&
      isZipValid &&
      isCityValid &&
      isStateValid
    ) {
      try {
        const response = await fetch(
          `${config.host}/tenant/admin/v2/partner/business/profile/all`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
              // Add any additional headers if needed
            },
            body: JSON.stringify({
              businessEmail: inputEmailValue,
              businessPhone: inputPhoneValue,
              businessWhatsapp: inputWhatsappValue,
              businessAddress: inputAddressValue,
              country: countryDefaultValue,
              state: selectedOptionState,
              city: selectedOptionCity,
              zipCode: selectedOptionZip,
            }),
          }
        );

        if (response.ok) {
          // Move to the next section
          const nextSection = activeSection + 1;
          setActiveSection(nextSection);
          // Save the active section to local storage
          window.scrollTo(350, 350);

          //   // Save the active section to local storage
          // localStorage.setItem("activeSection", nextSection);
          localStorage.setItem("business-email", inputEmailValue);
          localStorage.setItem("business-phone", inputPhoneValue);
          localStorage.setItem("business-whatsapp", inputWhatsappValue);
          localStorage.setItem("business-address", inputAddressValue);
          localStorage.setItem("business-media-link", inputMediaLinkValue);

          // Store selected options in local storage
          localStorage.setItem(
            "selectedZip",
            JSON.stringify(selectedOptionZip)
          );
          localStorage.setItem("selectedCity", selectedOptionCity);
          localStorage.setItem(
            "selectedState",
            JSON.stringify(selectedOptionState)
          );
        } else {
          // Handle error response
          console.error("Error saving data:", response.statusText);
        }
      } catch (error) {
        console.error("Error saving data:", error.message);
      }
    }
    // if (
    //   isEmailValid &&
    //   isEmail &&
    //   isPhoneValid &&
    //   isWhatsappValid &&
    //   isAddressValid &&
    //   isZipValid &&
    //   isCityValid &&
    //   isStateValid
    // ) {
    //   // Move to the next section
    //   const nextSection = activeSection + 1;
    //   setActiveSection(nextSection);
    //   // Save the active section to local storage
    //   localStorage.setItem("activeSection", nextSection);
    //   localStorage.setItem("business-email", inputEmailValue);
    //   localStorage.setItem("business-phone", inputPhoneValue);
    //   localStorage.setItem("business-whatsapp", inputWhatsappValue);
    //   localStorage.setItem("business-address", inputAddressValue);
    //   localStorage.setItem("business-media-link", inputMediaLinkValue);

    //   // Store selected options in local storage
    //   localStorage.setItem("selectedZip", JSON.stringify(selectedOptionZip));
    //   localStorage.setItem("selectedCity", selectedOptionCity);
    //   localStorage.setItem(
    //     "selectedState",
    //     JSON.stringify(selectedOptionState)
    //   );
    //   window.scrollTo(350, 350);
    // }
  };

  //firstSection
  const handleChange = () => {
    // Clear the error when the user starts typing
    setIsError(false);
  };
  const handleOptionClick = (selectedLabel) => {
    // Check if the selected option is different from the current state
    const selectedOption = businessLineOptions.find(
      (option) => option.label === selectedLabel
    );
    if (selectedOption) {
      setSelectedOptions({
        options: selectedOption.label,
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
  // const handleZipChange = () => {
  //   setIsZipError(false);
  // };

  const handleOptionClickCountry = (option) => {
    console.log("Country option clicked:", option);
    console.log("Country label clicked:", selectedCountryOptions.label);

    if (selectedCountryOptions.label !== option) {
      setSelectedCountryOptions({
        ...selectedCountryOptions,
        options: option,
      });
    }
  };
  const [selectedPlaceOption, setSelectedPlaceOption] = useState("");
  const handleZipChange = async (option) => {
    console.log("place option clicked:", option);
    // setCityDropdownDisabled(option);
    setSelectedPlaceOption(option);
  };

  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [isPlaceDropdownDisabled, setPlaceDropdownDisabled] = useState(true);

  const handleOptionClickCity = async (option) => {
    console.log("City option clicked:", option);
    setPlaceDropdownDisabled(option);
    setSelectedPlace(option);
    // localStorage.setItem("selectedState", JSON.stringify(option));
  };
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [isCityDropdownDisabled, setCityDropdownDisabled] = useState(true);

  const handleOptionClickState = async (option) => {
    console.log("State option clicked:", option);
    setCityDropdownDisabled(option);
    setSelectedState(option);
    // Save selected state to local storage
  };

  const fetchCityData = async () => {
    try {
      const response = await fetch(
        `https://api.urbanbarrow.com/v1/public/geoLocation?parentId=${selectedState}&pageNo=0&pageSize=1000`
      );

      const data = await response.json();
      const citiesData = data.serviceResponse.geoLocationList;

      setCities(citiesData);
    } catch (error) {
      console.error("Error fetching cities:", error);
      // Handle errors appropriately
    }
  };
  const fetchPlaceData = async () => {
    try {
      const response = await fetch(
        `https://api.urbanbarrow.com/v1/public/geoLocation?parentId=${selectedPlace}&pageNo=0&pageSize=1000`
      );

      const data = await response.json();
      const placesData = data.serviceResponse.geoLocationList;

      setPlaces(placesData);
    } catch (error) {
      console.error("Error fetching places:", error);
      // Handle errors appropriately
    }
  };
  useEffect(() => {
    // Check if there is a selected state in local storage
    const storedSelectedState = localStorage.getItem("selectedState");

    if (storedSelectedState) {
      // Parse and set the selected state from local storage
      const parsedSelectedState = JSON.parse(storedSelectedState);
      setSelectedState(parsedSelectedState);
      console.log("parsedSelectedState", parsedSelectedState);

      // Fetch city data based on the selected state
      // fetchCityData(parsedSelectedState.value);
    }
  }, []);

  useEffect(() => {
    fetchCityData();
    fetchPlaceData();
    if (selectedState) {
      fetchCityData();
    }
    if (selectedPlace) {
      fetchPlaceData();
    }
  }, [selectedState, selectedPlace]);

  const handleSocialMediaOption = (option) => {
    console.log("social media option clicked:", option);
    if (selectedSocialMediaOptions.label !== option) {
      setSelectedSocialMediaOptions({
        ...selectedSocialMediaOptions,
        options: option,
      });
    }
  };
  const handleMediaLinkOption = (index, link) => {
    setSocialMediaLinks((prevLinks) => {
      const updatedLinks = [...prevLinks];
      updatedLinks[index].link = link;
      return updatedLinks;
    });
    setIsMediaLinkError(false);
  };
  const handleRemoveSocialMedia = (index) => {
    setSocialMediaLinks((prevLinks) => {
      const updatedLinks = [...prevLinks];
      updatedLinks.splice(index, 1);
      return updatedLinks;
    });
  };
  const [socialMediaLinks, setSocialMediaLinks] = useState([
    { type: "", link: "" },
  ]);
  const handleAddSocialMedia = () => {
    setSocialMediaLinks((prevLinks) => [...prevLinks, { type: "", link: "" }]);
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
    // localStorage.setItem("activeSection", nextSection);
    window.scrollTo(350, 350);
  };

  //Fourth section Business
  const [chooseState, setChooseState] = useState("allIndia");
  const [geoLocations, setGeoLocations] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [selectedDistrictOptions, setSelectedDistrictOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [choosePlace, setChoosePlace] = useState([]);
  const [isSecondBoxVisible, setIsSecondBoxVisible] = useState(false);
  const [isThirdBoxVisible, setIsThirdBoxVisible] = useState(false);
  const [placeOptions, setPlaceOptions] = useState([]);
  const [selectPlaceOptions, setSelectPlaceOptions] = useState([]);

  //statebox
  const [state, setState] = useState([]);
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
      setState(locations);
    };

    fetchData();
  }, []);

  const handleStateChange = async (option) => {
    const newOption = chooseState === option ? null : option;
    const locations =
      newOption === "chooseStates" ? await fetchGeoLocations() : [];
    setGeoLocations(locations);
    setChooseState(newOption);
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
  const [allSelectedDistrict, setAllSelectedDistrict] = useState([]);
  //districtbox-second section
  //New changes with prop
  const handleRegionChange = async (selectedState) => {
    setSelectedRegion((prevSelectedRegion) => {
      return prevSelectedRegion === selectedState ? null : selectedState;
    });

    if (selectedState) {
      try {
        const response = await fetch(
          `${config.host}/v1/public/geoLocation?parentId=${selectedState}&pageNo=0&pageSize=1000`
        );
        const data = await response.json();
        if (
          data.successful &&
          data.serviceResponse &&
          data.serviceResponse.geoLocationList
        ) {
          setDistrictOptions(data.serviceResponse.geoLocationList);
          setAllSelectedDistrict((prevOptions) => {
            // Assuming data.serviceResponse.geoLocationList is an array of options
            const newOptions = data.serviceResponse.geoLocationList;

            // Assuming there is a unique identifier (e.g., locationId) for each option
            const existingOptionIds = prevOptions.map(
              (option) => option.locationId
            );

            const filteredNewOptions = newOptions.filter(
              (newOption) => !existingOptionIds.includes(newOption.locationId)
            );

            // Combine the existing options with the new ones
            return [...prevOptions, ...filteredNewOptions];
          });

          setIsSecondBoxVisible(true);
        }
      } catch (error) {
        console.error("Error fetching district options:", error);
      }
    }
  };

  // const handleAllRegionChange = (locationIdToRemove) => {
  //   // Remove selected districts under the specified locationIdToRemove
  //   console.log("locationIdToRemove", locationIdToRemove);
  //   console.log("districtOptions", districtOptions);
  //   if (selectedRegion === locationIdToRemove) {
  //     setSelectedRegion(null);
  //   }
  //   setSelectedDistrict((prevSelectedDistricts) =>
  //     prevSelectedDistricts.filter(
  //       (district) =>
  //         district.locationId &&
  //         district.locationId.startsWith(locationIdToRemove)
  //     )
  //   );
  // };

  // const handleAllRegionChange = (locationIdToRemove) => {
  //   // Remove selected districts under the specified locationIdToRemove
  //   console.log("locationIdToRemove", locationIdToRemove);
  //   districtOptions.forEach((option) => {
  //     console.log("selected district parentId", option.parentId);
  //     if (option.parentId === locationIdToRemove) {
  //       setSelectedDistrict([]);
  //     }
  //   });
  //   if (selectedRegion === locationIdToRemove) {
  //     setSelectedRegion(null);
  //   }
  //   // setSelectedDistrict((prevSelectedDistricts) =>
  //   //   prevSelectedDistricts.filter(
  //   //     (district) =>
  //   //       district.locationId &&
  //   //       !district.locationId.startsWith(locationIdToRemove)
  //   //   )
  //   // );
  // };

  const handleAllRegionChange = (locationIdToRemove) => {
    // Filter out districts with matching parentId
    const updatedSelectedDistrict = allSelectedDistrict.filter(
      (district) => district.parentId !== locationIdToRemove
    );
    if (selectedRegion === locationIdToRemove) {
      setSelectedRegion(null);
    }

    // Set the updated selected districts
    setAllSelectedDistrict(updatedSelectedDistrict);
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrictOptions(value);

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
    setChoosePlace((prevChoosePlace) => {
      return prevChoosePlace === selectedDistrict ? null : selectedDistrict;
    });
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

  //business fifth section
  const [businessOptions, setBusinessOptions] = useState([]);
  const [isBusinessBoxVisible, setIsBusinessBoxVisible] = useState(false);
  const [selectBusinessKindOptions, setSelectBusinessKindOptions] = useState(
    []
  );
  const [checkKindOptions, setCheckKindOptions] = useState([]);
  const [selectKindOptions, setSelectKindOptions] = useState([]);
  const [selectKindOptionsChange, setSelectKindOptionsChange] = useState([]);

  const fetchBusinessCategories = async () => {
    try {
      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/category/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (
        data.successful &&
        data.serviceResponse &&
        data.serviceResponse.businessCategoryList
      ) {
        setBusinessOptions(data.serviceResponse.businessCategoryList);
      }
    } catch (error) {
      console.error("Error fetching business categories:", error);
    }
  };

  const handlebusinessCategoryChange = (value) => {
    console.log(value);
    setIsBusinessBoxVisible(true);
    // Toggle the selection
    setSelectBusinessKindOptions((prevSelectedCountries) => {
      if (prevSelectedCountries.includes(value)) {
        // If already selected, remove it
        return prevSelectedCountries.filter((place) => place !== value);
      } else {
        // If not selected, add it
        return [...prevSelectedCountries, value];
      }
    });
  };
  // const handleBusinessKindChange = async (selectedState) => {
  //   setCheckKindOptions((prevCheckKindOptions) => {
  //     return prevCheckKindOptions === selectedState ? null : selectedState;
  //   });

  //   if (selectedState) {
  //     // Fetch data and update state as needed
  //     try {
  //       const response = await fetch(
  //         `${config.host}/tenant/admin/v2/business/kind/all`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       if (
  //         data.successful &&
  //         data.serviceResponse &&
  //         data.serviceResponse.businessKindList
  //       ) {
  //         setSelectKindOptions(data.serviceResponse.businessKindList);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching businessKind:", error);
  //     }
  //   }
  // };

  const fetchBusinessKind = async () => {
    try {
      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/kind/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.serviceResponse.businessKindList;
      } else {
        console.error("Failed to fetch business categories:", response.status);
        return [];
      }
    } catch (error) {
      console.error("Error fetching business categories:", error.message);
      return [];
    }
  };
  const handleBusinessKindChange = async (row) => {
    setCheckKindOptions((prevCheckKindOptions) => {
      return prevCheckKindOptions === row ? null : row;
    });

    let bkIdToNameMap = {};

    try {
      // Fetch business categories
      const businessKind = await fetchBusinessKind();

      // Make a GET request to fetch the detailed information for the business kind
      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/category/${row}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const businessKindDetails = await response.json();

        // Map bcId to corresponding names
        bkIdToNameMap = businessKind.reduce((map, kind) => {
          map[kind.bkId] = kind.name;
          return map;
        }, {});

        // Check if bcIds is not null before mapping
        const bkIds = businessKindDetails.serviceResponse.bkIds || [];

        // Set EditRow state
        setSelectKindOptions({
          bkIds: bkIds,
          bkNames: bkIds.map((bcId) => bkIdToNameMap[bcId] || "N/A"),
        });
        // setSelectKindOptions(bkIds);
        // Log bcIds and bcNames
        console.log("bkIds", bkIds);
        console.log(
          "bkNames",
          bkIds.map((bcId) => bkIdToNameMap[bcId] || "N/A")
        );
      } else {
        // Handle error
        console.error(
          "Failed to fetch business kind details:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching business kind details:", error.message);
    }
  };

  const BusinessKindOptionsChange = (value) => {
    console.log("Kind value", value);
    // setIsThirdBoxVisible(true);

    // Toggle the selection
    setSelectKindOptionsChange((prevSelectedCountries) => {
      if (prevSelectedCountries.includes(value)) {
        // If already selected, remove it
        return prevSelectedCountries.filter((country) => country !== value);
      } else {
        // If not selected, add it
        return [...prevSelectedCountries, value];
      }
    });
  };

  const handleValidationFour = () => {
    const nextSection = activeSection + 1;
    setActiveSection(nextSection);
    // Save the active section to local storage
    // localStorage.setItem("activeSection", nextSection);
    window.scrollTo(350, 350);
  };
  return (
    <>
      <div className="flex h-full">
        <div className="flex flex-1 flex-col overflow-hidden">
          <UserHeader />
          <section className="business-profile w-full h-auto top-[65px] relative lg:h-[320px]">
            <div className="containerBox relative md:left-20 lg:left-32">
              <h1 className="font-bold text-4xl pt-[140px] text-dark">
                Create Business Profile
              </h1>
            </div>
          </section>
          {/* Pipeline */}
          <section className="bg-userTheme pt-10 sm:pt-40">
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
                      ErrorMessage="Business Email is not valid"
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
                      options={[{ label: "India", value: "India" }]}
                      labelName="Country"
                      placeholder="India"
                      id="country"
                      ErrorMessage="Select any one Country"
                      defaultOption={{ label: "India", value: "India" }}
                      isError={isDropdownErrorCountry}
                      // onChange={handleOptionClick}
                      onSelect={(option) => {
                        console.log("Option in country:", option.label);
                        handleOptionClickCountry(option.label);
                      }}
                    />
                    <Dropdown
                      options={state.map((states) => ({
                        label: states.name,
                        value: states.locationId,
                      }))}
                      labelName="State"
                      placeholder="Select State"
                      id="state"
                      ErrorMessage="Select any one State"
                      isError={isDropdownErrorState}
                      // onChange={handleOptionClickState}
                      onSelect={(option) => {
                        console.log("Selected State:", option.value.value);
                        handleOptionClickState(option.value.value);
                      }}
                    />
                  </div>
                  <div className="mt-10 flex justify-between w-[60%]">
                    <Dropdown
                      options={cities.map((city) => ({
                        label: city.name,
                        value: city.locationId,
                      }))}
                      labelName="City"
                      placeholder={
                        isCityDropdownDisabled
                          ? "Select City"
                          : "First select a state"
                      }
                      id="city"
                      ErrorMessage="Select any one City"
                      isError={isDropdownErrorCity}
                      onChange={handleOptionClickCity}
                      onSelect={(option) => {
                        console.log("Selected city:", option.value.value);
                        handleOptionClickCity(option.value.value);
                      }}
                    />
                    <Dropdown
                      options={places.map((city) => ({
                        label: city.name + " - " + city.locationId,
                        value: city.locationId,
                      }))}
                      labelName="Zip Code"
                      placeholder={
                        isPlaceDropdownDisabled
                          ? "Select Zip Code"
                          : "First select a state and city"
                      }
                      id={`zip-code`}
                      ErrorMessage="Select any one Pincode"
                      isError={isZipError}
                      onChange={handleZipChange}
                      onSelect={(option) => {
                        console.log("Selected places:", option.value.value);
                        handleZipChange(option.value.value);
                      }}
                    />
                  </div>
                  <p className="font-semibold text-2xl mt-12">
                    Enter Social Links
                  </p>
                  <div className="relative">
                    {socialMediaLinks.map((socialMedia, index) => (
                      <>
                        <div
                          key={index}
                          className="social-links mt-10 flex justify-between w-[60%] items-center relative"
                        >
                          <Dropdown
                            options={[
                              { label: "Instagram", value: "Instagram" },
                              { label: "Linkedin", value: "Linkedin" },
                              { label: "Youtube", value: "Youtube" },
                            ]}
                            labelName="Socail Media"
                            placeholder="Select Social Media"
                            id={`social-media-${index}`}
                            ErrorMessage="Select any one social media"
                            isError={isSocialMediaError}
                            // onChange={handleSocialMediaOption}
                            onChange={(type) =>
                              handleSocialMediaOption(index, type)
                            }
                            onSelect={(option) => {
                              console.log(
                                "Selected social media:",
                                option.label
                              );
                            }}
                          />
                          <InputBox
                            Title="Link"
                            Placeholder="Enter social handle link"
                            InputType="text"
                            Inputname={`business-media-link`}
                            ErrorMessage="link cannot be empty."
                            onChange={(link) =>
                              handleMediaLinkOption(index, link)
                            }
                            isError={isMediaLinkError}
                            className=""
                          />
                        </div>
                        {index > 0 && (
                          <span
                            className="bottom-10 text-xl close-mark text-red-400 cursor-pointer"
                            onClick={() => handleRemoveSocialMedia(index)}
                          >
                            x
                          </span>
                        )}
                      </>
                    ))}
                  </div>
                  <div>
                    <button
                      className="add-social-media hover:shadow-lg mt-8 text-center cursor-pointer"
                      onClick={handleAddSocialMedia}
                    >
                      <img
                        src="https://i.ibb.co/xhwrNWs/add.png"
                        alt="add image"
                        className="w-8 h-8 relative left-8 top-[6px]"
                      ></img>
                      <span className="text-center px-3 font-bold relative bottom-[20px]">
                        Add Another Social Media
                      </span>
                    </button>
                  </div>

                  <button
                    className="bg-primaryColor text-white text-lg font-bold px-6 py-2 rounded-md relative mt-24 curser-pointer"
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
                    className="bg-primaryColor text-white text-lg font-bold px-5 py-2 rounded-md relative left-[40%] mt-24 curser-pointer"
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
                    <div className="profile-photo-section">
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
                                className="file-input pointer h-[45%] relative bottom-40 w-[380px]"
                                onChange={handleProfilePhotoChange}
                              />
                            </>
                          )}
                          <p className="text-center px-3 mt-8 font-semibold cursor-pointer">
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
                    className="bg-primaryColor text-white text-lg font-bold px-6 py-2 rounded-md relative mt-24 curser-pointer"
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
                    {/* First box */}
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
                          <button
                            onClick={() => handleStateChange("chooseStates")}
                          >
                            <FaAngleDown
                              className={`ml-2 transition-transform duration-300 absolute text-theme right-[-55px] h-6 top-0 ${
                                chooseState === "chooseStates"
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>
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
                                className="transform scale-125 cursor-pointer "
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
                                            handleAllRegionChange(
                                              filteredCountry.locationId
                                            );
                                            localStorage.setItem(
                                              "selectedCountries",
                                              JSON.stringify(
                                                filteredCountry.name
                                              )
                                            );
                                            console.log(
                                              "selected one for all region",
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
                                            console.log(
                                              "selected country checked",
                                              selectedRegion ===
                                                filteredCountry.locationId
                                            );
                                          }}
                                        />
                                        <label
                                          htmlFor={`choose-state-${filteredCountry.locationId}`}
                                          className="ml-3 font-light cursor-pointer relative"
                                        >
                                          Choose District
                                          <button
                                            onClick={() =>
                                              handleRegionChange(
                                                filteredCountry.locationId
                                              )
                                            }
                                          >
                                            <FaAngleDown
                                              className={`ml-2 transition-transform duration-300 absolute text-theme right-[-55px] h-6 top-0 ${
                                                selectedRegion ===
                                                filteredCountry.locationId
                                                  ? "rotate-180"
                                                  : ""
                                              }`}
                                            />
                                          </button>
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
                    <div
                      className={`third-box-container flex flex-col mt-5 overflow-y-auto h-[45%] max-h-[520px] w-[265px]`}
                    >
                      {selectedDistrict &&
                        selectedDistrict.map((district, index) => (
                          <div key={index} className="third-box-cover bg-white">
                            {isThirdBoxVisible && (
                              <div className="third-box flex flex-col rounded">
                                {allSelectedDistrict
                                  .filter((location) => {
                                    return location.name === district;
                                  })
                                  .map((filteredDistrict) => (
                                    <div className="mb-2">
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
                                                filteredDistrict.name
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
                                            //   filteredDistrict.locationId
                                            // }
                                            onChange={() => {
                                              handlePlaceOption(
                                                filteredDistrict.locationId
                                              );
                                              console.log(
                                                "selectedRegion1",
                                                selectedRegion
                                              );
                                              console.log(
                                                "filteredDistrict",
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
                                            <button
                                              onClick={() =>
                                                handlePlaceOption(
                                                  filteredDistrict.locationId
                                                )
                                              }
                                            >
                                              <FaAngleDown
                                                className={`ml-2 transition-transform duration-300 absolute text-theme right-[-55px] h-6 top-0 ${
                                                  choosePlace ===
                                                  filteredDistrict.locationId
                                                    ? "rotate-180"
                                                    : ""
                                                }`}
                                              />
                                            </button>
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
                                            {placeOptions.map(
                                              (option, index) => (
                                                <div
                                                  key={index}
                                                  className="pb-4 flex items-center transition-all delay-200 ease-in-out"
                                                >
                                                  <input
                                                    type="checkbox"
                                                    name={`country-option-${option.name}`}
                                                    className="transform scale-125 cursor-pointer custom-checkbox relative bottom-2"
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
                                                    <div>{option.name}</div>
                                                    <div>
                                                      {option.locationId}
                                                    </div>
                                                  </label>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        )}
                                      </React.Fragment>
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                  {/* business category */}
                  <div className="flex mt-10 items-start justify-between w-[60%]">
                    <div>
                      <p className="text-lg">Business Mappings</p>
                      <div className="business-box-container flex flex-col mt-5 bg-white overflow-y-auto h-[45%] max-h-[520px]  w-[305px]">
                        <div className="business-box-cover">
                          <div className="business-box flex flex-col mb-2 rounded">
                            {
                              <>
                                <React.Fragment>
                                  {/* options */}
                                  <div className="mt-3">
                                    {businessOptions.map((option, index) => (
                                      <div
                                        key={index}
                                        className="pb-4 flex items-center transition-all delay-200 ease-in-out px-5 py-1"
                                      >
                                        <input
                                          type="checkbox"
                                          name={`country-option-${option.name}`}
                                          className="transform scale-125 cursor-pointer custom-checkbox"
                                          onChange={() => {
                                            handlebusinessCategoryChange(
                                              option.bcId
                                            );
                                            console.log(
                                              "selected business category",
                                              option.bcId
                                            );
                                          }}
                                        />
                                        <label className="ml-3 font-light">
                                          {option.name}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                </React.Fragment>
                              </>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Kind box */}
                    <div className="kind-box-container flex flex-col mt-12 bg-white overflow-y-auto h-[45%] max-h-[520px] w-[305px]">
                      {selectBusinessKindOptions &&
                        selectBusinessKindOptions.map((country, index) => (
                          <div key={index} className="kind-box-cover">
                            {isBusinessBoxVisible && (
                              <div className="kind-box flex flex-col mb-2 rounded">
                                {businessOptions
                                  .filter((location) => {
                                    // console.log(
                                    //   "locaation bcId",
                                    //   location.bcId
                                    // );
                                    // console.log("country bcId", country);
                                    return location.bcId === country;
                                  })
                                  .map((filteredCountry) => (
                                    <React.Fragment key={filteredCountry.bcId}>
                                      <div className="flex items-center px-5 py-5 bg-[#edd2f8] relative">
                                        <input
                                          type="checkbox"
                                          name={`state-${filteredCountry.bcId}`}
                                          id={`choose-state-${filteredCountry.bcId}`}
                                          className="transform scale-125 cursor-pointer opacity-0  custom-checkbox check"
                                          checked={
                                            checkKindOptions ===
                                            filteredCountry.bcId
                                          }
                                          onChange={() => {
                                            handleBusinessKindChange(
                                              filteredCountry.bcId
                                            );
                                            console.log(
                                              "selected checkKindOptions",
                                              checkKindOptions ===
                                                filteredCountry.bcId
                                            );
                                            console.log(
                                              "selected bcId",
                                              filteredCountry.bcId
                                            );
                                            console.log(
                                              "selected selectKindOptions",
                                              selectKindOptions
                                            );
                                          }}
                                        />
                                        <label
                                          htmlFor={`choose-state-${filteredCountry.bcId}`}
                                          className="ml-3 font-light cursor-pointer relative capitalize"
                                        >
                                          {filteredCountry.name}
                                        </label>
                                        <FaAngleDown
                                          className={`ml-2 transition-transform duration-300 absolute text-theme right-[15px] top-[30%] h-6 pointer-events-none ${
                                            checkKindOptions ===
                                            filteredCountry.bcId
                                              ? "rotate-180"
                                              : ""
                                          }`}
                                        />
                                      </div>

                                      {/* options */}
                                      {checkKindOptions ===
                                        filteredCountry.bcId && (
                                        <div
                                          className={`option flex flex-col px-5 py-5 bg-[#fff] rounded h-auto max-h-[220px] ${
                                            checkKindOptions ===
                                            filteredCountry.bcId
                                              ? "active"
                                              : ""
                                          }`}
                                        >
                                          {selectKindOptions.bkNames &&
                                            selectKindOptions.bkNames.map(
                                              (bkName, index) => {
                                                const selectedBkId =
                                                  selectKindOptions.bkIds[
                                                    index
                                                  ];
                                                return (
                                                  <div
                                                    key={index}
                                                    className="pb-4 flex items-center transition-all delay-200 ease-in-out"
                                                  >
                                                    <input
                                                      type="checkbox"
                                                      name={`country-option-${bkName}`}
                                                      className="transform scale-125 cursor-pointer custom-checkbox"
                                                      onChange={() => {
                                                        BusinessKindOptionsChange(
                                                          selectedBkId
                                                        );
                                                        console.log(
                                                          "selected bkId",
                                                          selectedBkId
                                                        );
                                                      }}
                                                      checked={selectKindOptionsChange.includes(
                                                        selectedBkId
                                                      )}
                                                    />
                                                    <label
                                                      htmlFor={`state-${bkName}`}
                                                      className="ml-3 font-light capitalize"
                                                    >
                                                      {bkName}
                                                    </label>
                                                  </div>
                                                );
                                              }
                                            )}
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
                  <button
                    className="bg-primaryColor text-white text-lg font-bold px-6 py-2 rounded-md relative mt-24 curser-pointer"
                    onClick={handleBack}
                  >
                    <span
                      aria-hidden="true"
                      className="transition-transform transform sm:inline-block mr-3 group-hover:translate-x-1"
                    >
                      &larr;
                    </span>
                    Back{" "}
                  </button>
                  <button
                    className="bg-primaryColor text-white text-lg font-bold px-5 py-2 rounded-md relative left-[46%] mt-24"
                    onClick={handleValidationFour}
                  >
                    Finish{" "}
                    <span
                      aria-hidden="true"
                      className="transition-transform transform sm:inline-block ml-2 group-hover:translate-x-1 relative top-[2px]"
                    >
                      <FaCheck />
                    </span>
                  </button>
                </div>
              )}
              {activeSection === 5 && (
                <div className="finish-section w-full relative flex flex-col justify-center left-[370px]">
                  <img
                    src="./images/success.png"
                    alt="success-img"
                    className="w-[300px] h=[300px]"
                  />
                  <p className="text-2xl w-[380px] text-center font-bold relative right-[30px]">
                    Your business profile has been successfully created!
                  </p>
                  <a
                    className="bg-primaryColor text-white text-lg font-bold px-5 py-2 rounded-md relative w-[200px] mt-14 ml-14"
                    href="./user-profile"
                  >
                    Go to Profile{" "}
                    <span
                      aria-hidden="true"
                      className="hidden transition-transform transform sm:inline-block ml-4 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </a>
                  <div className="w-[400px]">
                    <button
                      className="bg-primaryColor text-white text-lg font-bold px-[50px] py-2 rounded-md relative left-[60px] mt-10 curser-pointer"
                      onClick={handleBack}
                    >
                      <span
                        aria-hidden="true"
                        className="transition-transform transform sm:inline-block relative right-5 group-hover:translate-x-1"
                      >
                        &larr;
                      </span>
                      Go Back{" "}
                    </button>
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
