"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import UserHeader from "@/components/UserHeader";
import InputBox from "@/components/CustomInput";
import Dropdown from "@/components/Dropdown";
import UserFooter from "@/components/UserFooter";
import config from "@/components/config";
import { useRouter } from "next/navigation";
import { FaCheck, FaAngleDown, FaPlus } from "react-icons/fa";
import { FiUpload, FiTrash2, FiCloudLightning } from "react-icons/fi";
import { EditIcon } from "../Assets/icons";
import Modal from "@/components/Modal";
import "react-image-crop/dist/ReactCrop.css";
// import "../Assets";
export default function CreateProfile() {
  const router = useRouter();
  const sections = [
    "Please Fill General Information",
    "Please Fill Contact Information",
    "Please Upload Media",
    "Please Fill Business Information",
    "Review",
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
        parseInt(localStorage.getItem("activeSection")) || 4;

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

  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accountIdParam = urlParams.get("accountId");
    setAccountId(accountIdParam);
  }, []);

  useEffect(() => {
    console.log("accountId", accountId); // Log the updated state value here
  }, [accountId]);

  // const handleValidationOne = async () => {
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
  //     try {
  //       const response = await fetch(
  //         `${config.host}/tenant/admin/v2/partner/${accountId}/business/profile`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //           body: JSON.stringify({
  //             businessName: inputValue,
  //             businessLine: selectedOption,
  //           }),
  //         }
  //       );

  //       if (response.ok) {
  //         // Move to the next section
  //         const nextSection = activeSection + 1;
  //         setActiveSection(nextSection);
  //         // Save the active section to local storage
  //         // localStorage.setItem("business-name", inputValue);
  //         // localStorage.setItem("activeSection", nextSection);
  //         window.scrollTo(350, 350);
  //       } else {
  //         // Handle error response
  //         console.error("Error saving data:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error saving data:", error.message);
  //     }
  //   }
  // };
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [businessProfileId, setBusinessProfileId] = useState(null);

  // let businessProfileId = null;
  const [profileId, setProfileId] = useState(null);

  const getAllPartner = async () => {
    try {
      if (businessProfileId !== null) {
        // If ID is already fetched, return it directly
        return businessProfileId;
      }

      const bodyData = JSON.stringify({
        partnerId: accountId,
      });

      const response = await fetch(
        `${config.host}/tenant/admin/v2/partner/business/profile/all`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: bodyData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        const businessProfileList =
          responseData.serviceResponse.businessProfileList;
        const newBusinessProfileId = businessProfileList[0].id; // Store the ID for future use
        setBusinessProfileId(newBusinessProfileId); // Update state with the fetched ID
        console.log("businessProfileId", newBusinessProfileId);
        setProfileId(newBusinessProfileId);
        return newBusinessProfileId;
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleValidationOne = async () => {
    const inputValue = document.getElementById("business-name").value;
    const isNameValid = inputValue.trim() !== "";
    setIsError(!isNameValid);
    // Check if the business line is valid
    const selectedOption = selectedOptions.options;
    console.log("Selected Option:", selectedOption);
    const isBusinessLineValid = selectedOption !== null;
    setIsDropdownError(!isBusinessLineValid);
    if (isNameValid && isBusinessLineValid) {
      try {
        let apiUrl = `${config.host}/tenant/admin/v2/partner/${accountId}/business/profile`;
        let method = "POST";

        // Check if data has been submitted before
        if (isDataSubmitted) {
          const profileId = await getAllPartner();
          if (!profileId) {
            console.error("Failed to get business profile ID");
            return;
          }
          // Use PUT API
          apiUrl += `/${profileId}`;
          method = "PUT";
        }

        const response = await fetch(apiUrl, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            businessName: inputValue,
            businessLine: selectedOption,
          }),
        });
        if (response.ok) {
          // Move to the next section
          const nextSection = activeSection + 1;
          setActiveSection(nextSection);
          // Save the active section to local storage
          // localStorage.setItem("business-name", inputValue);
          // localStorage.setItem("activeSection", nextSection);
          window.scrollTo(350, 350);
        } else {
          // Handle error response
          console.error("Error saving data:", response.statusText);
        }
        if (!isDataSubmitted) {
          setIsDataSubmitted(true);
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
      // const storedName = localStorage.getItem("business-name") || "";
      // Set the business name in the input box
      // document.getElementById("business-name").value = storedName;
    }
    if (activeSection === 2) {
      // Retrieve values from local storage
      // const storedEmail = localStorage.getItem("business-email") || "";
      // const storedPhone = localStorage.getItem("business-phone") || "";
      // const storedWhatsapp = localStorage.getItem("business-whatsapp") || "";
      // const storedAddress = localStorage.getItem("business-address") || "";
      // const storedMediaLink = localStorage.getItem("business-media-link") || "";
      // Set the business name in the input box
      // document.getElementById("business-email").value = storedEmail;
      // document.getElementById("business-phone").value = storedPhone;
      // document.getElementById("business-whatsapp").value = storedWhatsapp;
      // document.getElementById("business-address").value = storedAddress;
      // document.getElementById("business-media-link").value = storedMediaLink;
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
    // localStorage.setItem("selectedState", JSON.stringify(selectedOptionState));
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
    if (isEmailValid) {
      try {
        const profileId = await getAllPartner();
        const response = await fetch(
          `${config.host}/tenant/admin/v2/partner/${accountId}/business/profile/${profileId}`,
          {
            method: "PUT",
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
          // localStorage.setItem("business-email", inputEmailValue);
          // localStorage.setItem("business-phone", inputPhoneValue);
          // localStorage.setItem("business-whatsapp", inputWhatsappValue);
          // localStorage.setItem("business-address", inputAddressValue);
          // localStorage.setItem("business-media-link", inputMediaLinkValue);

          // // Store selected options in local storage
          // localStorage.setItem("selectedZip", JSON.stringify(selectedOptionZip));
          // localStorage.setItem("selectedCity", selectedOptionCity);
          // localStorage.setItem(
          //   "selectedState",
          //   JSON.stringify(selectedOptionState)
          // );
        } else {
          // Handle error response
          console.error("Error saving data:", response.statusText);
        }
      } catch (error) {
        console.error("Error saving data:", error.message);
      }
    }
  };

  // };

  const [businessName, setBusinessName] = useState(null);
  const [selectedBusinessLine, setSelectedBusinessLine] = useState(null);
  //firstSection
  const handleChange = (e) => {
    // Clear the error when the user starts typing
    setBusinessName(e.target.value);
    setIsError(false);
  };
  const [selectedOption, setSelectedOption] = useState({
    label: "",
    value: "",
  });

  const handleOptionClick = (selectedLabel) => {
    // Find the selected option based on the label

    console.log("selectedOption", selectedLabel);
    // Update the selected option state with the entire object
    const selectedOption = businessLineOptions.find(
      (option) => option.label === selectedLabel
    );
    setSelectedOption(selectedLabel);
    setSelectedBusinessLine(selectedLabel.label);
    // If needed, update any other state based on the selected option
    if (selectedOption) {
      setSelectedOptions({
        options: selectedOption.label,
      });
      setSelectedBusinessLine(selectedOption);
    }
  };

  //SecondSection

  const [businessEmail, setBusinessEmail] = useState(null);
  const [businessPhone, setBusinessPhone] = useState(null);
  const [businessWhatsapp, setBusinessWhatsapp] = useState(null);
  const [businessAddress, setBusinessAddress] = useState(null);
  const [businessLink, setBusinessLink] = useState(null);
  const handleEmailChange = (e) => {
    setBusinessEmail(e.target.value);
    setIsEmailError(false);
  };
  const handlePhoneChange = (e) => {
    setBusinessPhone(e.target.value);
    setIsPhoneError(false);
  };
  const handleWhatsappChange = (e) => {
    setBusinessWhatsapp(e.target.value);
    setIsWhatsappError(false);
  };
  const handleAddressChange = (e) => {
    setBusinessAddress(e.target.value);
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
  const [editSelectedPlaceOption, setEditSelectedPlaceOption] = useState(null);
  const handleZipChange = async (option) => {
    console.log("place option clicked:", option);
    // setCityDropdownDisabled(option);
    setSelectedPlaceOption(option.value);
    setEditSelectedPlaceOption(option);
  };

  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [editselectedPlace, setEditSelectedPlace] = useState(null);
  const [isPlaceDropdownDisabled, setPlaceDropdownDisabled] = useState(true);

  const handleOptionClickCity = async (option) => {
    console.log("City option clicked:", option);
    setPlaceDropdownDisabled(!option.value);
    setSelectedPlace(option.value);
    setEditSelectedPlace(option);
    // localStorage.setItem("selectedState", JSON.stringify(option));
  };
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [editSelectedState, setEditSelectedState] = useState(null);
  const [isCityDropdownDisabled, setCityDropdownDisabled] = useState(true);

  const handleOptionClickState = async (option) => {
    console.log("State option clicked:", option);
    setCityDropdownDisabled(!option.value);
    setSelectedState(option.value);
    setEditSelectedState(option);
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
  const handleMediaLinkOption = (e, index, link) => {
    setBusinessLink(e.target.value); // Update business email state
    setSocialMediaLinks((prevLinks) => {
      const updatedLinks = [...prevLinks];
      // Update the link of the specified index in the socialMediaLinks array
      updatedLinks[index].link = link;
      return updatedLinks;
    });
    setIsMediaLinkError(false); // Clear media link error
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
  //modal section
  const avatarUrl = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  const handleCoverPhotoChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setCoverPhoto(file);
  };
  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setProfileImageUrl(url);
    setProfilePhoto(file);
  };

  const handleDeleteCoverPhoto = () => {
    setCoverPhoto(null);
    setImageUrl(null);
    avatarUrl.current = null;
  };
  const handleDeleteProfilePhoto = () => {
    setProfilePhoto(null);
    setProfileImageUrl(null);
  };

  const fileSizeLimit = 5 * 1024 * 1024;

  const handleValidationThree = async () => {
    const nextSection = activeSection + 1;
    setActiveSection(nextSection);
    try {
      const profileId = await getAllPartner();

      const formData = new FormData();
      formData.append("profileImages", profilePhoto);
      formData.append("coverImages", coverPhoto);

      const response = await fetch(
        `${config.host}/tenant/admin/v2/partner/${accountId}/business/profile/${profileId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
          // body: JSON.stringify({
          //   profileImages: profilePhoto,
          //   coverImages: coverPhoto,
          // }),
        }
      );

      if (response.ok) {
        // Move to the next section
        const nextSection = activeSection + 1;
        setActiveSection(nextSection);
        // Save the active section to local storage
        window.scrollTo(350, 350);
      } else {
        // Handle error response
        console.error("Error saving data:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving data:", error.message);
    }
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
      geoLocations.sort((a, b) => a.name.localeCompare(b.name));
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
  const handleToggleDropdown = (e) => {
    e.stopPropagation(); // Prevents the event from bubbling up
    setChooseState((prevState) =>
      prevState === "chooseStates" ? null : "chooseStates"
    );
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
          const newDistrictOptions = data.serviceResponse.geoLocationList;
          newDistrictOptions.sort((a, b) => a.name.localeCompare(b.name));

          setDistrictOptions(newDistrictOptions);
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
          const newPlaceOptions = data.serviceResponse.geoLocationList;
          newPlaceOptions.sort((a, b) => a.name.localeCompare(b.name));
          setPlaceOptions(newPlaceOptions);
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
  const [businessKindId, setBusinessKindId] = useState();
  const [businessBcId, setBusinessBcId] = useState();

  const handlebusinessCategoryChange = (value) => {
    console.log(value);
    setIsBusinessBoxVisible(true);
    // Toggle the selection
    // handleValidationFour(value);
    setSelectBusinessKindOptions((prevSelectedCountries) => {
      if (prevSelectedCountries.includes(value)) {
        // If already selected, remove it
        return prevSelectedCountries.filter((place) => place !== value);
      } else {
        // If not selected, add it
        return [...prevSelectedCountries, value];
      }
    });
    // setBusinessKindId((prevBkId) => (prevBkId === value ? "" : prevBkId));
    setBusinessKindId(value);
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
    // Update businessBcId immediately after updating selectKindOptionsChange
    // setBusinessBcId((prevBcId) => (prevBcId === value ? "" : prevBcId));
    setBusinessBcId(value);
  };

  // const handleValidationFour = async () => {
  //   const profileId = await getAllPartner();
  //   const response = await fetch(
  //     `${config.host}/tenant/admin/v2/partner/${accountId}/business/profile/${profileId}`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       body: JSON.stringify({
  //         id: "ids",
  //         locationId: "locationId",
  //         name: "name",
  //       }),
  //     }
  //   );

  //   if (response.ok) {
  //     // Save the active section to local storage
  //     // localStorage.setItem("activeSection", nextSection);
  //     window.scrollTo(350, 350);

  //     const nextSection = activeSection + 1;
  //     setActiveSection(nextSection);
  //   }
  // };

  const [check, setCheck] = useState();

  const handleApi = async (value) => {
    setCheck();
  };
  // const bussinessKindObjects = { bkId: businessKindId, bcId: businessBcId };

  // selectBusinessKindOptions.forEach((bkId) => {
  //   businessMappings.push({ bkId });
  // });
  // selectKindOptionsChange.forEach((bcId) => {
  //   businessMappings.push({ bcId });
  // });

  //working for test
  // selectBusinessKindOptions.forEach((bkId) => {
  //   const correspondingBcIds = selectKindOptionsChange.map(
  //     (option) => option
  //   );
  //   correspondingBcIds.forEach((bcId) => {
  //     businessMappings.push({ bkId, bcId });
  //   });
  // });
  const handleValidationFour1 = async () => {
    const profileId = await getAllPartner();

    // Create an array to hold the selected service areas
    const serviceAreas = [];
    const businessMappings = [];

    // Iterate over selected districts to construct service areas objects
    selectPlaceOptions.forEach((option) => {
      serviceAreas.push({
        id: option.id,
        locationId: option.locationId,
        name: option.name,
      });
    });

    console.log("businessKindId", businessKindId);

    selectBusinessKindOptions.forEach((bkId) => {
      const correspondingBcIds = selectKindOptionsChange.map(
        (option) => option
      );
      correspondingBcIds.forEach((bcId) => {
        businessMappings.push({ bkId, bcId });
      });
    });
    const response = await fetch(
      `${config.host}/tenant/admin/v2/partner/${accountId}/business/profile/${profileId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          serviceAreas: serviceAreas,
          businessMappings: businessMappings,
        }),
      }
    );

    if (response.ok) {
      window.scrollTo(350, 350);
      const nextSection = activeSection + 1;
      setActiveSection(nextSection);
    }
  };

  const handleValidationFour = async () => {
    const profileId = await getAllPartner();

    // Create an array to hold the selected service areas
    const serviceAreas = [];
    const businessMappings = [];

    // Iterate over selected districts to construct service areas objects
    selectPlaceOptions.forEach((option) => {
      serviceAreas.push({
        id: option.id,
        locationId: option.locationId,
        name: option.name,
      });
    });

    // Iterate over selected business kinds and their corresponding selected options
    selectBusinessKindOptions.forEach((bkId) => {
      selectKindOptionsChange.forEach((bcId) => {
        businessMappings.push({ bkId, bcId });
      });
    });
    //   selectBusinessKindOptions.forEach((bkId) => {
    //     // Filter selectKindOptionsChange to get only the relevant bcIds for this bkId
    //     const relevantBcIds = selectKindOptionsChange.filter((option) => option.bkId === bkId);

    //     // Add each combination of bkId and bcId to businessMappings
    //     relevantBcIds.forEach((bcId) => {
    //         businessMappings.push({ bkId, bcId });
    //     });
    // });

    const response = await fetch(
      `${config.host}/tenant/admin/v2/partner/${accountId}/business/profile/${profileId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          // serviceAreas: serviceAreas,
          businessMappings: businessMappings,
        }),
      }
    );

    if (response.ok) {
      window.scrollTo(350, 350);
      const nextSection = activeSection + 1;
      setActiveSection(nextSection);
    }
  };

  //Fifth section -- review
  const [isEditing, setIsEditing] = useState(false);
  const [isSecondEditing, setSecondIsEditing] = useState(false);
  // const [editedBusinessName, setEditedBusinessName] = useState(businessName);
  // const [editedBusinessEmail, setEditedBusinessEmail] = useState(businessEmail);

  // useEffect(() => {
  //   setEditedBusinessName(businessName);
  //   setEditedBusinessEmail(businessEmail);
  // }, [businessName, businessEmail]);

  const toggleGeneralEditMode = () => {
    setIsEditing(!isEditing);
  };
  const toggleContactEditMode = () => {
    setSecondIsEditing(!isSecondEditing);
  };

  // const handleChangeName = (e) => {
  //   setEditedBusinessName(e.target.value);
  // };
  // const handleChangeEmail = (e) => {
  //   setEditedBusinessEmail(e.target.value);
  // };

  const handleGeneralSave = () => {
    setIsEditing(false);
    // setBusinessName(editedBusinessName);
  };

  const handleContactSave = () => {
    setSecondIsEditing(false);
    // setBusinessEmail(editedBusinessEmail);
  };

  //Sixth section
  const [accountIds, setAccountIds] = useState(null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accountIdParam = urlParams.get("accountId");
    setAccountIds(accountIdParam);
  }, []);

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
                      className="line min-w-[260px] h-[5px]"
                      style={{
                        backgroundColor:
                          index < activeSection - 1 ? "#DE3163" : "#D1D5DB",
                        ...customStyles.line,
                      }}
                    ></div>
                  )}
                  <p
                    className={`font-bold text-sm absolute top-10 ml-10 w-[190px] text-center ${
                      index < activeSection
                        ? "text-primaryColor"
                        : "text-gray-400"
                    }`}
                    style={{ left: `${20.3 * index}%` }}
                    onClick={() => handleSectionClick(index)}
                  >
                    {section.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>

            {/* Details */}
            <div className="flex relative left-[150px] mb-40 containerBox">
              {/* {activeSection === 1 && ( */}
              {/* Section 1 */}
              <div
                className={`general-information section w-full ml-20 ${
                  activeSection === 1 ? "block" : "hidden"
                }`}
              >
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
                    value={businessName}
                  />

                  <Dropdown
                    options={businessLineOptions}
                    labelName="Business Line"
                    placeholder="Select Business Line"
                    id="business-line"
                    ErrorMessage="Select any one Business Line"
                    isError={isDropdownError}
                    // onChange={handleOptionClick}
                    defaultOption={selectedBusinessLine}
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
              {/* )} */}
              {/* {activeSection === 2 && ( */}
              {/* Section 2 */}
              <div
                className={`general-information section w-full ml-20 left-[60px] relative ${
                  activeSection === 2 ? "block" : "hidden"
                }`}
              >
                <p className="font-semibold text-2xl">Contact Information</p>
                <div className="mt-10 flex justify-between w-[60%]">
                  <InputBox
                    Title="Business Email"
                    Placeholder="Enter Business Email"
                    InputType="email"
                    Inputname="business-email"
                    ErrorMessage="Business Email is not valid"
                    onChange={handleEmailChange}
                    value={businessEmail}
                    isError={isEmailError}
                  />
                  <InputBox
                    Title="Business Phone"
                    Placeholder="Enter Business Phone"
                    InputType="number"
                    Inputname="business-phone"
                    ErrorMessage="Business Phone cannot be empty."
                    onChange={handlePhoneChange}
                    // isError={isPhoneError}
                    className="number-input"
                    value={businessPhone}
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
                    // isError={isWhatsappError}
                    className="number-input"
                    value={businessWhatsapp}
                  />
                  <InputBox
                    Title="Business Address"
                    Placeholder="Enter Business Address"
                    InputType="text"
                    Inputname="business-address"
                    ErrorMessage="Business address cannot be empty."
                    onChange={handleAddressChange}
                    // isError={isAddressError}
                    value={businessAddress}
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
                    // isError={isDropdownErrorCountry}
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
                    defaultOption={editSelectedState}
                    // isError={isDropdownErrorState}
                    // onChange={handleOptionClickState}
                    onSelect={(option) => {
                      console.log("Selected State:", option.value);
                      handleOptionClickState(option);
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
                        ? "First select a state"
                        : "Select City"
                    }
                    id="city"
                    ErrorMessage="Select any one City"
                    defaultOption={editselectedPlace}
                    // isError={isDropdownErrorCity}
                    // onChange={handleOptionClickCity}
                    onSelect={(option) => {
                      console.log("Selected city:", option.value);
                      handleOptionClickCity(option);
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
                        ? "First select a state and city"
                        : "Select Zip Code"
                    }
                    id={`zip-code`}
                    defaultOption={editSelectedPlaceOption}
                    ErrorMessage="Select any one Pincode"
                    // isError={isZipError}
                    // onChange={handleZipChange}
                    onSelect={(option) => {
                      console.log("Selected places:", option.value);
                      handleZipChange(option);
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
                            console.log("Selected social media:", option.label);
                          }}
                        />
                        <InputBox
                          Title="Link"
                          Placeholder="Enter social handle link"
                          InputType="text"
                          Inputname={`business-media-link`}
                          ErrorMessage="link cannot be empty."
                          onChange={(e) => handleMediaLinkOption(e, index)}
                          isError={isMediaLinkError}
                          // value={businessLink}
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
              {/* )} */}
              {activeSection === 3 && (
                <div className="media section w-full relative left-[70px]">
                  <p className="font-semibold text-2xl">Media</p>
                  <div className="flex w-[65%] mt-10 justify-between">
                    <div className="cover-photo-section">
                      <p className="mb-4 font-bold text-lg">Cover Photo</p>
                      <div className="cover-photo-section">
                        {!avatarUrl.current && (
                          <div className="file-input-label hover:shadow-lg">
                            {/* <input
                            type="file"
                            className="file-input cursor-pointer h-1/2"
                            onChange={handleCoverPhotoChange}
                            accept="image/jpeg, image/png"
                            multiple
                          /> */}
                            <button
                              className="absolute w-[380px] h-[270px]"
                              title="Change photo"
                              onClick={() => setModalOpen(true)}
                            ></button>
                            <FiUpload
                              size={38}
                              className="mt-6 mx-auto w-full text-defaultTheme pointer"
                            />
                            <p className="text-center px-3 mt-3 font-semibold cursor-pointer">
                              Click to Upload Cover photo or Drag and Drop Here
                            </p>
                            {modalOpen && (
                              <Modal
                                updateAvatar={updateAvatar}
                                closeModal={() => setModalOpen(false)}
                                handleCoverPhotoChange={handleCoverPhotoChange}
                                imageUrls={imageUrls}
                                setImageUrls={setImageUrls}
                              />
                            )}
                          </div>
                        )}
                        {avatarUrl.current && (
                          <div className="relative mt-5">
                            <FiTrash2
                              size={24}
                              className="absolute top-0 right-0 text-defaultTheme bg-white  cursor-pointer"
                              onClick={handleDeleteCoverPhoto}
                            />
                            <img
                              src={avatarUrl.current}
                              alt="Selected File"
                              style={{ width: "400px", height: "270px" }}
                              className="rounded-lg mb-1"
                            />
                          </div>
                        )}
                        {imageUrl && coverPhoto.size <= fileSizeLimit && (
                          <div className="mr-4 mt-10 w-[400px] h-[270px] relative">
                            {coverPhoto && (
                              <FiTrash2
                                size={24}
                                className="absolute top-0 right-0 text-defaultTheme bg-white cursor-pointer"
                                onClick={handleDeleteCoverPhoto}
                              />
                            )}
                            <img
                              src={imageUrl}
                              alt="Selected File"
                              style={{ width: "400px", height: "270px" }}
                              className="rounded-lg mb-2"
                            />
                            {coverPhoto.size <= fileSizeLimit
                              ? `File selected: ${coverPhoto.name}`
                              : ""}
                          </div>
                        )}
                      </div>
                      {coverPhoto && coverPhoto.size > 5 * 1024 * 1024 && (
                        <p className="text-red-500 pt-3">
                          File size exceeds 5MB limit, please select different
                          photo
                        </p>
                      )}
                    </div>

                    {/* Profile section */}
                    <div className="profile-photo-section relative left-10">
                      <p className="mb-4 font-bold text-lg">Profile Photo</p>
                      <div className="file-input-label hover:shadow-lg">
                        <input
                          type="file"
                          className="file-input cursor-pointer h-1/2"
                          onChange={handleProfilePhotoChange}
                          accept="image/jpeg, image/png"
                          multiple
                        />
                        <FiUpload
                          size={38}
                          className="mt-6 mx-auto w-full text-defaultTheme pointer"
                        />
                        <p className="text-center px-3 mt-3 font-semibold cursor-pointer">
                          Click to Upload Profile photo or Drag and Drop Here
                        </p>
                      </div>
                      {profileImageUrl &&
                        profilePhoto.size <= fileSizeLimit && (
                          <div className="mr-4 mt-10 w-[400px] h-[270px] relative">
                            {profilePhoto && (
                              <FiTrash2
                                size={24}
                                className="absolute top-0 right-0 text-defaultTheme bg-white cursor-pointer"
                                onClick={handleDeleteProfilePhoto}
                              />
                            )}
                            <img
                              src={profileImageUrl}
                              alt="Selected File"
                              style={{ width: "400px", height: "270px" }}
                              className="rounded-lg mb-2"
                            />
                            {profilePhoto.size <= fileSizeLimit
                              ? `File selected: ${profilePhoto.name}`
                              : ""}
                          </div>
                        )}

                      {profilePhoto && profilePhoto.size > 5 * 1024 * 1024 && (
                        <p className="text-red-500 pt-3 h-10">
                          File size exceeds 5MB limit, please select different
                          photo
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between w-[65%]">
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
                      className="bg-primaryColor text-white text-lg font-bold px-5 py-2 rounded-md mt-24"
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
                          // checked={chooseState === "allIndia"}
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
                          // checked={chooseState === "chooseStates"}
                          onChange={() => handleStateChange("chooseStates")}
                          //   onClick={() => handleStateChange("chooseStates")} //if we click choose state that time also it will open
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
                                          // checked={
                                          //   selectedRegion ===
                                          //   filteredCountry.locationId
                                          // }
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
                                            onChange={() => {
                                              handlePlaceOption(
                                                filteredDistrict.name
                                              );
                                            }}
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
                                                      option
                                                    )}
                                                    onChange={() => {
                                                      handlePlaceChange(option);
                                                      console.log(
                                                        "selected district",
                                                        option
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
                                          checked={selectBusinessKindOptions.includes(
                                            option.bcId
                                          )}
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
                                            // setBusinessBcId((prevBcId) =>
                                            //   prevBcId === filteredCountry.bcId
                                            //     ? ""
                                            //     : filteredCountry.bcId
                                            // );
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
                    Review{" "}
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
                <div
                  className={`section w-full ml-20 ${
                    activeSection === 5 ? "block" : "hidden"
                  }`}
                >
                  {/* General section */}
                  <div className="w-[70%] mb-10">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-2xl">
                        General Information
                      </p>
                      {!isEditing && (
                        <button
                          className="user-btn flex items-center group cursor-pointer"
                          onClick={toggleGeneralEditMode}
                        >
                          <span className="text-lg font-medium mr-2 ">
                            {isEditing ? "" : "Edit Information"}
                          </span>
                          <EditIcon
                            PathClassName="fill-[red] group-hover:fill-[#fff] transition-all delay-75"
                            SvgClassName="w-6 h-6"
                          />
                        </button>
                      )}
                    </div>
                    <div className="mt-5 flex justify-between">
                      {isEditing ? (
                        <div className="flex flex-col w-full">
                          <div className="w-full p-5 bg-[#F5E7EA] rounded-lg border border-gray-300 mb-4">
                            <p className="text-lg">Business Name</p>
                            {/* <input
                              type="text"
                              value={editedBusinessName}
                              onChange={handleChangeName}
                              className="text-[#767676] font-light mb-3 w-full border-b text-lg bg-[#F5E7EA] border-gray-400 focus:outline-none"
                            /> */}
                            <InputBox
                              Placeholder="Enter Business Name"
                              InputType="text"
                              Inputname="business-name"
                              ErrorMessage="Business Name cannot be empty."
                              onChange={handleChange}
                              isError={isError}
                              value={businessName}
                            />
                          </div>
                          <div className="w-full p-5 bg-[#F5E7EA] rounded-lg border border-gray-300">
                            <p className="text-lg">Business Line</p>
                            <Dropdown
                              options={businessLineOptions}
                              placeholder="Select Business Line"
                              id="business-line"
                              ErrorMessage="Select any one Business Line"
                              isError={isDropdownError}
                              // onChange={handleOptionClick}
                              defaultOption={selectedBusinessLine || null}
                              onSelect={(option) => {
                                console.log("Option in select:", option.label);
                                handleOptionClick(option.label);
                              }}
                            />
                          </div>
                          <div className="w-full justify-end flex">
                            <button
                              className="user-btn w-[20%] mt-4 "
                              onClick={handleGeneralSave}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full">
                          <div className="w-full p-5 bg-[#F5E7EA] rounded-lg border border-gray-300 mb-4">
                            <p className="text-lg">Business Name</p>
                            <p className="text-lg text-[#767676] font-light">
                              {businessName
                                ? businessName
                                : "Add Business Name"}
                            </p>
                          </div>
                          <div className="w-full p-5 bg-[#F5E7EA] rounded-lg border border-gray-300">
                            <p className="text-lg">Business Line</p>
                            <p className="text-lg text-[#767676] font-light">
                              {selectedBusinessLine
                                ? selectedBusinessLine.label
                                : "Select Business Line"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Contact section */}
                  <div className="w-[70%]">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-2xl">
                        Contact Information
                      </p>
                      {!isSecondEditing && (
                        <button
                          className="user-btn flex items-center group cursor-pointer"
                          onClick={toggleContactEditMode}
                        >
                          <span className="text-lg font-medium mr-2 ">
                            {isSecondEditing ? "" : "Edit Information"}
                          </span>
                          <EditIcon
                            PathClassName="fill-[red] group-hover:fill-[#fff] transition-all delay-75"
                            SvgClassName="w-6 h-6"
                          />
                        </button>
                      )}
                    </div>
                    <div className="mt-5 flex justify-between">
                      {isSecondEditing ? (
                        <div className="flex flex-col w-full">
                          <div className="w-full p-5 bg-[#F5E7EA] rounded-lg border border-gray-300 mb-4">
                            <p className="text-lg">Business Email</p>
                            <InputBox
                              Placeholder="Enter Business Email"
                              InputType="email"
                              Inputname="business-email"
                              ErrorMessage="Business Email is not valid"
                              onChange={handleEmailChange}
                              value={businessEmail}
                              // isError={isEmailError}
                            />
                          </div>
                          <div className="w-full p-5 bg-[#F5E7EA] rounded-lg border border-gray-300 mb-4">
                            <p className="text-lg">Business Phone</p>
                            <InputBox
                              Placeholder="Enter Business Phone"
                              InputType="number"
                              Inputname="business-phone"
                              ErrorMessage="Business Phone cannot be empty."
                              onChange={handlePhoneChange}
                              // isError={isPhoneError}
                              className="number-input"
                              value={businessPhone}
                            />
                          </div>
                          <div className="w-full p-5 bg-[#F5E7EA] rounded-lg border border-gray-300 mb-4">
                            <p className="text-lg">Business Whatsapp</p>
                            <InputBox
                              Placeholder="Enter Business Whatsapp"
                              InputType="number"
                              Inputname="business-whatsapp"
                              ErrorMessage="Business whatsapp cannot be empty."
                              onChange={handleWhatsappChange}
                              // isError={isWhatsappError}
                              className="number-input"
                              value={businessWhatsapp}
                            />
                          </div>
                          <div className="w-full p-5 bg-[#F5E7EA] rounded-lg border border-gray-300 mb-4">
                            <p className="text-lg">Business Address</p>
                            <InputBox
                              Placeholder="Enter Business Address"
                              InputType="text"
                              Inputname="business-address"
                              ErrorMessage="Business address cannot be empty."
                              onChange={handleAddressChange}
                              // isError={isAddressError}
                              value={businessAddress}
                            />
                          </div>
                          <div className="w-full p-5 bg-[#F5E7EA] rounded-lg border border-gray-300 mb-4">
                            <p className="text-lg">Country</p>
                            <Dropdown
                              options={[{ label: "India", value: "India" }]}
                              placeholder="India"
                              id="country"
                              ErrorMessage="Select any one Country"
                              defaultOption={{ label: "India", value: "India" }}
                              // isError={isDropdownErrorCountry}
                              // onChange={handleOptionClick}
                              onSelect={(option) => {
                                console.log("Option in country:", option.label);
                                handleOptionClickCountry(option.label);
                              }}
                            />
                          </div>
                          <div className="w-full p-5 bg-[#F5E7EA] rounded-lg border border-gray-300 mb-4">
                            <p className="text-lg">State</p>
                            <Dropdown
                              options={state.map((states) => ({
                                label: states.name,
                                value: states.locationId,
                              }))}
                              placeholder="Select State"
                              id="state"
                              ErrorMessage="Select any one State"
                              defaultOption={editSelectedState}
                              // isError={isDropdownErrorState}
                              // onChange={handleOptionClickState}
                              onSelect={(option) => {
                                console.log("Selected State:", option.value);
                                handleOptionClickState(option);
                              }}
                            />
                          </div>
                          <div className="w-full p-5 bg-[#F5E7EA] rounded-lg border border-gray-300 mb-4">
                            <p className="text-lg">City</p>
                            <Dropdown
                              options={cities.map((city) => ({
                                label: city.name,
                                value: city.locationId,
                              }))}
                              placeholder={
                                isCityDropdownDisabled
                                  ? "First select a state"
                                  : "Select City"
                              }
                              id="city"
                              ErrorMessage="Select any one City"
                              // isError={isDropdownErrorCity}
                              defaultOption={editselectedPlace}
                              // onChange={handleOptionClickCity}
                              onSelect={(option) => {
                                console.log("Selected city:", option.value);
                                handleOptionClickCity(option);
                              }}
                            />
                          </div>
                          <div className="w-full p-5 bg-[#F5E7EA] rounded-lg border border-gray-300 mb-4">
                            <p className="text-lg">Zip Code</p>
                            <Dropdown
                              options={places.map((city) => ({
                                label: city.name + " - " + city.locationId,
                                value: city.locationId,
                              }))}
                              placeholder={
                                isPlaceDropdownDisabled
                                  ? "First select a state and city"
                                  : "Select Zip Code"
                              }
                              id={`zip-code`}
                              defaultOption={editSelectedPlaceOption}
                              ErrorMessage="Select any one Pincode"
                              // isError={isZipError}
                              // onChange={handleZipChange}
                              onSelect={(option) => {
                                console.log("Selected places:", option.value);
                                handleZipChange(option);
                              }}
                            />
                          </div>
                          <div className="w-full justify-end flex">
                            <button
                              className="user-btn w-[20%] mt-4 "
                              onClick={handleContactSave}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full">
                          <div className="w-full p-5 bg-[#F5E7EA] rounded-lg border border-gray-300 mb-4">
                            <p className="text-lg">Business Email</p>
                            <p className="text-lg text-[#767676] font-light">
                              {businessEmail
                                ? businessEmail
                                : "Add Business Email"}
                            </p>
                          </div>
                          <div className="w-full p-5 bg-[#F5E7EA] rounded-lg border border-gray-300 mb-4">
                            <p className="text-lg">Business Phone</p>
                            <p className="text-lg text-[#767676] font-light">
                              {businessPhone
                                ? businessPhone
                                : "Add Business PhoneNumber"}
                            </p>
                          </div>
                          <div className="w-full p-5 bg-[#F5E7EA] rounded-lg border border-gray-300 mb-4">
                            <p className="text-lg">Business Whatsapp</p>
                            <p className="text-lg text-[#767676] font-light">
                              {businessWhatsapp
                                ? businessWhatsapp
                                : "Add Business Whatsapp"}
                            </p>
                          </div>
                          <div className="w-full p-5 bg-[#F5E7EA] rounded-lg border border-gray-300 mb-4">
                            <p className="text-lg">Business Address</p>
                            <p className="text-lg text-[#767676] font-light">
                              {businessAddress
                                ? businessAddress
                                : "Add Business Address"}
                            </p>
                          </div>
                          <div className="w-full p-5 bg-[#F5E7EA] rounded-lg border border-gray-300 mb-4">
                            <p className="text-lg">Country</p>
                            <p className="text-lg text-[#767676] font-light">
                              India
                            </p>
                          </div>
                          <div className="w-full p-5 bg-[#F5E7EA] rounded-lg border border-gray-300 mb-4">
                            <p className="text-lg">State</p>
                            <p className="text-lg text-[#767676] font-light">
                              {editSelectedState
                                ? editSelectedState.label
                                : "Select State"}
                            </p>
                          </div>
                          <div className="w-full p-5 bg-[#F5E7EA] rounded-lg border border-gray-300 mb-4">
                            <p className="text-lg">City</p>
                            <p className="text-lg text-[#767676] font-light">
                              {editselectedPlace
                                ? editselectedPlace.label
                                : "Select City"}
                            </p>
                          </div>
                          <div className="w-full p-5 bg-[#F5E7EA] rounded-lg border border-gray-300 mb-4">
                            <p className="text-lg">Zip Code</p>
                            <p className="text-lg text-[#767676] font-light">
                              {editSelectedPlaceOption
                                ? editSelectedPlaceOption.label
                                : "Select Zip Code"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between w-[70%]">
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
                      className="bg-primaryColor text-white text-lg font-bold px-5 py-2 rounded-md relative  mt-24"
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
                </div>
              )}
              {activeSection === 6 && (
                <div className="finish-section w-full relative flex flex-col justify-center left-[370px]">
                  <img
                    src="./images/success.png"
                    alt="success-img"
                    className="w-[300px] h=[300px]"
                  />
                  <p className="text-2xl w-[380px] text-center font-bold relative right-[30px]">
                    Your business profile has been successfully created!
                  </p>
                  <Link
                    href={{
                      pathname: "/user-profile",
                      query: {
                        partnerId: accountIds,
                        profileId: profileId,
                      },
                    }}
                    className="bg-primaryColor text-white text-lg font-bold px-5 py-2 rounded-md relative w-[200px] mt-14 ml-14"
                  >
                    Go to Profile{" "}
                    <span
                      aria-hidden="true"
                      className="hidden transition-transform transform sm:inline-block ml-4 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </Link>
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
