"use client";
import React, { useState, useEffect, useRef } from "react";
import UserHeader from "@/components/UserHeader";
import InputBox from "@/components/CustomInput";
import Dropdown from "@/components/Dropdown";
import UserFooter from "@/components/UserFooter";
import config from "@/components/config";
import { useRouter } from "next/navigation";
import { FaCheck, FaAngleDown, FaPlus } from "react-icons/fa";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { InfoIconfilled } from "../Assets/icons";
import ReactCrop from "react-image-crop";
// import "../Assets";
export default function AddProduct() {
  const router = useRouter();
  const sections = [
    "Please Fill General Information",
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
  const [selectedKindOptions, setSelectedKindOptions] = useState({
    options: null,
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);
  const handleClickOutside = (event) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setShowTooltip(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTooltip = () => {
    setShowTooltip((prevState) => !prevState);
  };
  const [showInclusionTooltip, setShowInclusionTooltip] = useState(null);
  const toggleInclusionTooltip = (index) => {
    setShowInclusionTooltip((prevIndex) =>
      prevIndex === index ? null : index
    );
  };
  const [showExclusionTooltip, setShowExclusionTooltip] = useState(null);
  const toggleExclusionTooltip = (index) => {
    setShowExclusionTooltip((prevIndex) =>
      prevIndex === index ? null : index
    );
  };
  const [profileId, setProfileId] = useState(null);
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [isDescError, setIsDescError] = useState(false);
  const [isCategoryError, setIsCategoryError] = useState(false);
  const [isBusinessKindError, setIsBusinessKindError] = useState(false);
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accountIdParam = urlParams.get("profileId");
    setProfileId(accountIdParam);
  }, [profileId]);

  const handleValidationOne = async () => {
    const productName = document.getElementById("Product-name").value;
    const isProductNameValid = productName.trim() !== "";
    setIsError(!isProductNameValid);
    const productDesc = document.getElementById("Product-Description").value;
    const isProductDescValid = productDesc.trim() !== "";
    setIsDescError(!isProductDescValid);

    const selectedOption = selectedOptions.options;
    const selectedKindOption = selectedKindOptions.options;
    const isBusinessCategoryValid = selectedOption !== null;
    setIsCategoryError(!isBusinessCategoryValid);
    const isBusinessKindValid = selectedKindOption !== null;
    setIsBusinessKindError(!isBusinessKindValid);
    if (true) {
      try {
        let apiUrl = `${config.host}/tenant/admin/v2/partner/${accountId}/business/profile/${profileId}/product`;
        // https://api.urbanbarrow.com/tenant/admin/user/v2/partner/24929081-5916-4a49-b169-11d5b3206c5b/business/profile/646601a4-81ec-40c2-a89b-b49a4885de63/product
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
            businessName: productName,
            businessLine: productDesc,
            businessCategory: selectedOption,
            businessKind: selectedKindOption,
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
  //secondSection

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

  const [businessProfileId, setBusinessProfileId] = useState(null);

  // let businessProfileId = null;

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
        return newBusinessProfileId;
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
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
  // };
  const [productName, setProductName] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  //firstSection
  const handleChange = (e) => {
    setProductName(e.target.value);
    setIsError(false);
  };

  const handleDescriptionChange = (e) => {
    // Clear the error when the user starts typing
    setProductDescription(e.target.value);
    setIsDescError(false);
  };

  const handlePriceChange = (e) => {
    // Clear the error when the user starts typing
    setProductPrice(e.target.value);
    setIsError(false);
  };
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (selectedLabel) => {
    // Find the selected option based on the label

    console.log("selectedOption", selectedLabel);
    // Update the selected option state with the entire object
    const selectedOption = businessLineOptions.find(
      (option) => option.label === selectedLabel
    );
    setSelectedOption(selectedLabel);

    // If needed, update any other state based on the selected option
    if (selectedOption) {
      setSelectedOptions({
        options: selectedOption.label,
      });
    }
  };

  //dummy
    const handleKindOptionClick = (selectedLabel) => {

    console.log("selectedOption", selectedLabel);
    const selectedOption = businessLineOptions.find(
      (option) => option.label === selectedLabel
    );
    setSelectedOption(selectedLabel);

    // If needed, update any other state based on the selected option
    if (selectedOption) {
      setSelectedKindOptions({
        options: selectedOption.label,
      });
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

  const handleRemoveInclusion = (index) => {
    setInclusionLinks((prevLinks) => {
      const updatedLinks = [...prevLinks];
      updatedLinks.splice(index, 1);
      return updatedLinks;
    });
  };
  const handleRemoveExclusion = (index) => {
    setExclusionLinks((prevLinks) => {
      const updatedLinks = [...prevLinks];
      updatedLinks.splice(index, 1);
      return updatedLinks;
    });
  };
  const [inclusionLinks, setInclusionLinks] = useState([
    { type: "", link: "" },
  ]);
  const [exclusionLinks, setExclusionLinks] = useState([
    { type: "", link: "" },
  ]);
  const handleAddInclusionLink = () => {
    setInclusionLinks((prevLinks) => [...prevLinks, { type: "", link: "" }]);
  };

  const handleAddExclusionLink = () => {
    setExclusionLinks((prevLinks) => [...prevLinks, { type: "", link: "" }]);
  };

  const handleRemoveInclusionLink = (index) => {
    setInclusionLinks((prevLinks) => {
      const updatedLinks = [...prevLinks];
      updatedLinks.splice(index, 1);
      return updatedLinks;
    });
  };

  const handleRemoveExclusionLink = (index) => {
    setExclusionLinks((prevLinks) => {
      const updatedLinks = [...prevLinks];
      updatedLinks.splice(index, 1);
      return updatedLinks;
    });
  };

  //Third section Media

  const [coverPhotos, setCoverPhotos] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [hasLargeFile, setHasLargeFile] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleCheckboxChange = (index) => {
    setSelectedImageIndex(index);
  };
  const handleCoverPhotoChange = (event) => {
    const files = event.target.files;

    const newCoverPhotos = [...coverPhotos];
    const newImageUrls = [...imageUrls];
    let hasLargeFile = false;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      newCoverPhotos.push(file);
      newImageUrls.push(url);

      // Check if the file exceeds the size limit
      if (file.size > 5 * 1024 * 1024) {
        hasLargeFile = true;
      }
    }
    // Update the state to reflect if a large file is found
    setHasLargeFile(hasLargeFile);

    setCoverPhotos(newCoverPhotos);
    setImageUrls(newImageUrls);
  };

  const handleDeleteCoverPhoto = (index) => {
    const newCoverPhotos = [...coverPhotos];
    const newImageUrls = [...imageUrls];

    newCoverPhotos.splice(index, 1);
    newImageUrls.splice(index, 1);

    setCoverPhotos(newCoverPhotos);
    setImageUrls(newImageUrls);
  };
  const fileSizeLimit = 5 * 1024 * 1024;

  const handleValidationTwo = async () => {
    const nextSection = activeSection + 1;
    setActiveSection(nextSection);
    window.scrollTo(350, 350);
    // try {
    //   const profileId = await getAllPartner();

    //   const formData = new FormData();
    //   formData.append("coverImages", coverPhoto);

    //   const response = await fetch(
    //     `${config.host}/tenant/admin/v2/partner/${accountId}/business/profile/${profileId}`,
    //     {
    //       method: "PUT",
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //       body: formData,
    //       // body: JSON.stringify({
    //       //   profileImages: profilePhoto,
    //       //   coverImages: coverPhoto,
    //       // }),
    //     }
    //   );

    //   if (response.ok) {
    //     // Move to the next section
    //     const nextSection = activeSection + 1;
    //     setActiveSection(nextSection);
    //     window.scrollTo(350, 350);
    //   } else {
    //     // Handle error response
    //     console.error("Error saving data:", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("Error saving data:", error.message);
    // }
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

  const handleValidationThree = () => {
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
          <section className="add-product w-full h-auto top-[65px] relative lg:h-[320px]">
            <div className="containerBox relative md:left-20 lg:left-32">
              <h1 className="font-bold text-4xl pt-[140px] text-dark">
                Add Product
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
                    className={`font-bold text-sm absolute top-10 w-[190px] text-center ml-[180px] ${
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
            <div
              className={`${
                activeSection === 2 ? "" : "left-[150px]"
              } flex relative  mb-40 containerBox`}
            >
              {/* Section 1 */}
              <div
                className={`general-information section w-full ml-20 left-[60px] relative ${
                  activeSection === 1 ? "block" : "hidden"
                }`}
              >
                <p className="font-semibold text-2xl">General Information</p>
                <div className="mt-10 flex justify-between w-[60%]">
                  <InputBox
                    Title="Name"
                    Placeholder="Enter Product Name"
                    InputType="text"
                    Inputname="Product-name"
                    ErrorMessage="Product Name cannot be empty."
                    onChange={handleChange}
                    isError={isError}
                    value={productName}
                    isExtraSize
                  />
                </div>
                <div className="mt-10 flex justify-between w-[60%]">
                  <InputBox
                    Title="Description"
                    Placeholder="Enter Product Description"
                    InputType="text"
                    Inputname="Product-Description"
                    ErrorMessage="Product Description cannot be empty."
                    onChange={handleDescriptionChange}
                    isError={isDescError}
                    value={productDescription}
                    isDesc
                  />
                </div>
                <div className="mt-10 flex justify-between w-[60%]">
                  <div className="flex relative">
                    <Dropdown
                      options={businessLineOptions}
                      labelName="Business Category"
                      placeholder="Select Business Category"
                      id="business-category"
                      ErrorMessage="Select any one Business category"
                      isError={isCategoryError}
                      // onChange={handleOptionClick}
                      defaultOption={selectedOption}
                      onSelect={(option) => {
                        console.log("Option in select:", option.label);
                        handleOptionClick(option.label);
                      }}
                    />
                    <InfoIconfilled
                      onClick={toggleTooltip}
                      SvgClassName="cursor-pointer absolute left-[140px] top-1"
                    />
                    {showTooltip && (
                      <div
                        className="absolute top-[-30px] left-[40%] transform -translate-x-1/2"
                        ref={tooltipRef}
                      >
                        <div className=" bg-white border border-theme text-[#7C7C7C] text-xs py-1 px-2 rounded-md pointer-events-none transition-opacity duration-200 ease-in-out opacity-100">
                          <div className="font-normal">
                            Tooltip content goes here
                          </div>
                          <div className="absolute top-[23px] left-1/2 transform -translate-x-1/2 -translate-y-1 bg-white border border-theme border-t-0 border-l-0 w-3 h-3 rotate-45"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <Dropdown
                    options={businessLineOptions}
                    labelName="Business Type"
                    placeholder="Select Business Type"
                    id="business-type"
                    ErrorMessage="Select any one Business Line"
                    isError={isBusinessKindError}
                    // onChange={handleOptionClick}
                    defaultOption={selectedOption}
                    onSelect={(option) => {
                      console.log("Option in select:", option.label);
                      handleOptionClick(option.label);
                    }}
                  />
                </div>
                {/* Second slide items */}
                {/* <div className="mt-10 flex justify-between w-[60%]">
                  <Dropdown
                    options={businessLineOptions}
                    labelName="Price Type"
                    placeholder="Variable"
                    id="business-line"
                    ErrorMessage="Select any one price"
                    isError={isDropdownError}
                    // onChange={handleOptionClick}
                    defaultOption={selectedOption}
                    onSelect={(option) => {
                      console.log("Option in select:", option.label);
                      handleOptionClick(option.label);
                    }}
                  />
                </div> */}
                {/* <div className="mt-10 flex justify-between w-[60%]">
                  <InputBox
                    Title="Maximum Price"
                    Placeholder="Enter Maximum Price"
                    InputType="number"
                    Inputname="Product-price-maximum"
                    ErrorMessage="Product maximum price cannot be empty."
                    onChange={handlePriceChange}
                    //   isError={isError}
                    value={productPrice}
                    className="number-input"
                  />
                  <InputBox
                    Title="Minimum Price"
                    Placeholder="Enter Minimum Price"
                    InputType="number"
                    Inputname="Product-price-Minimum"
                    ErrorMessage="Product minimum price cannot be empty."
                    onChange={handlePriceChange}
                    //   isError={isError}
                    // value={productPrice}
                    className="number-input"
                  />
                </div> */}
                <div className="mt-10 flex justify-between w-[60%]">
                  <Dropdown
                    options={businessLineOptions}
                    labelName="Price Type"
                    placeholder="Fixed"
                    id="business-line"
                    ErrorMessage="Select any one price"
                    isError={isDropdownError}
                    // onChange={handleOptionClick}
                    defaultOption={selectedKindOptions}
                    onSelect={(option) => {
                      console.log("Option in select:", option.label);
                      handleKindOptionClick(option.label);
                    }}
                  />
                  <InputBox
                    Title="Price"
                    Placeholder="Enter Price"
                    InputType="number"
                    Inputname="Product-price"
                    ErrorMessage="Product price cannot be empty."
                    onChange={handlePriceChange}
                    //   isError={isError}
                    // value={productPrice}
                    className="number-input"
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
              {/* Section 2 */}
              <div
                className={`media section w-full relative ${
                  activeSection === 2 ? "block" : "hidden"
                }`}
              >
                <p className="font-semibold text-2xl relative left-[220px]">
                  Media
                </p>
                <div className="flex w-[65%] mt-10 justify-center relative left-[220px] ">
                  <div className="cover-photo-section">
                    <div className="image-input hover:shadow-lg p-2 cursor-pointer w-[400px] h-[270px] border-2 border-dotted border-theme rounded-lg flex justify-center items-center flex-col">
                      <input
                        type="file"
                        className="file-input cursor-pointer h-1/2"
                        onChange={handleCoverPhotoChange}
                        accept="image/jpeg, image/png"
                        multiple
                      />
                      <FiUpload
                        size={38}
                        className="mx-auto w-full text-defaultTheme cursor-pointer"
                      />
                      <p className="text-center px-3 mt-3 font-semibold cursor-pointer">
                        Click to Upload Cover photo or Drag and Drop Here
                      </p>
                    </div>
                    {hasLargeFile && (
                      <p className="text-red-500 pt-3 flex items-start">
                        File size exceeds 5MB limit, please select different
                        photo
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-10 justify-center">
                  {imageUrls.map(
                    (url, index) =>
                      coverPhotos[index].size <= fileSizeLimit && (
                        <div key={index} className="relative">
                          <FiTrash2
                            size={24}
                            className="absolute top-0 right-0 text-defaultTheme bg-white  cursor-pointer"
                            onClick={() => handleDeleteCoverPhoto(index)}
                          />
                          <img
                            src={url}
                            alt="Selected File"
                            style={{ width: "500px", height: "270px" }}
                            className="rounded-lg mb-1"
                          />
                          {coverPhotos[index].size <= fileSizeLimit
                            ? `File selected: ${coverPhotos[index].name}`
                            : ""}
                          <div className="flex items-center gap-2 mt-2">
                            <input
                              type="checkbox"
                              name={"product-image"}
                              className="transform scale-125 cursor-pointer"
                              checked={selectedImageIndex === index}
                              onChange={() => handleCheckboxChange(index)}
                            />
                            <p className="font-bold text-[#767676]">
                              Make this profile picture
                            </p>
                          </div>
                        </div>
                      )
                  )}
                </div>
                <div className="relative left-[220px]">
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
              </div>
              {/* Section 3 */}
              <div
                className={`business-information section relative left-[60px] w-full ${
                  activeSection === 3 ? "block" : "hidden"
                }`}
              >
                <p className="font-semibold text-2xl">Business Information</p>
                <div className="relative">
                  <div className="flex w-[60%] justify-between">
                    <div className="social-links flex items-center relative flex-col">
                      {inclusionLinks.map((socialMedia, index) => (
                        <div key={index} className="relative mt-10">
                          <InputBox
                            Title="Inclusion"
                            Placeholder="Enter Inclusion"
                            InputType="text"
                            Inputname="Inclusion"
                            ErrorMessage="Inclusion cannot be empty."
                            onChange={handleChange}
                            isError={isError}
                            value={productName}
                          />
                          <InfoIconfilled
                            onClick={() => toggleInclusionTooltip(index)}
                            SvgClassName="cursor-pointer absolute left-[18%] top-[4%] top-1"
                          />
                          {showInclusionTooltip === index && (
                            <div
                              className="absolute left-[20.3%] -top-8 transform -translate-x-1/2"
                              ref={tooltipRef}
                            >
                              <div className=" bg-white border border-theme text-[#7C7C7C] text-xs py-1 px-2 rounded-md pointer-events-none transition-opacity duration-200 ease-in-out opacity-100">
                                <div className="font-normal">
                                  Tooltip content goes here
                                </div>
                                <div className="absolute top-[23px] left-1/2 transform -translate-x-1/2 -translate-y-1 bg-white border border-theme border-t-0 border-l-0 w-3 h-3 rotate-45"></div>
                              </div>
                            </div>
                          )}
                          {index > 0 && (
                            <span
                              className="absolute bottom-3 left-full ml-4 text-xl text-red-400 cursor-pointer"
                              onClick={() => handleRemoveInclusion(index)}
                            >
                              x
                            </span>
                          )}
                        </div>
                      ))}

                      <div>
                        <button
                          className="add-social-media hover:shadow-lg mt-8 text-center cursor-pointer"
                          onClick={handleAddInclusionLink}
                        >
                          <img
                            src="https://i.ibb.co/xhwrNWs/add.png"
                            alt="add image"
                            className="w-8 h-8 relative left-8 top-[6px]"
                          ></img>
                          <span className="text-center px-3 font-bold relative bottom-[20px]">
                            Add Another Inclusion
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="social-links flex items-center relative flex-col">
                      {exclusionLinks.map((socialMedia, index) => (
                        <div key={index} className="relative mt-10">
                          <InputBox
                            Title="Exclusions"
                            Placeholder="Enter Exclusions"
                            InputType="text"
                            Inputname="Exclusions"
                            ErrorMessage="Exclusions cannot be empty."
                            onChange={handleChange}
                            isError={isError}
                            value={productName}
                          />
                          <InfoIconfilled
                            onClick={() => toggleExclusionTooltip(index)}
                            SvgClassName="cursor-pointer absolute left-[22%] top-[5%] top-1"
                          />
                          {showExclusionTooltip === index && (
                            <div
                              className="absolute left-[24%] -top-8  transform -translate-x-1/2"
                              ref={tooltipRef}
                            >
                              <div className=" bg-white border border-theme text-[#7C7C7C] text-xs py-1 px-2 rounded-md pointer-events-none transition-opacity duration-200 ease-in-out opacity-100">
                                <div className="font-normal">
                                  Tooltip content goes here
                                </div>
                                <div className="absolute top-[23px] left-1/2 transform -translate-x-1/2 -translate-y-1 bg-white border border-theme border-t-0 border-l-0 w-3 h-3 rotate-45"></div>
                              </div>
                            </div>
                          )}
                          {index > 0 && (
                            <span
                              className="absolute bottom-3 left-full ml-4 text-xl text-red-400 cursor-pointer"
                              onClick={() => handleRemoveExclusion(index)}
                            >
                              x
                            </span>
                          )}
                        </div>
                      ))}
                      <div>
                        <button
                          className="add-social-media hover:shadow-lg mt-8 text-center cursor-pointer"
                          onClick={handleAddExclusionLink}
                        >
                          <img
                            src="https://i.ibb.co/xhwrNWs/add.png"
                            alt="add image"
                            className="w-8 h-8 relative left-8 top-[6px]"
                          ></img>
                          <span className="text-center px-3 font-bold relative bottom-[20px]">
                            Add Another Exclusion
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-14 text-lg">Service Area</p>
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
                              chooseState === "chooseStates" ? "rotate-180" : ""
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
                              checked={selectedCountry.includes(location.name)}
                              onChange={() => handleOptionChange(location.name)}
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
                                            JSON.stringify(filteredCountry.name)
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
                                          {placeOptions.map((option, index) => (
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
                                                <div>{option.locationId}</div>
                                              </label>
                                            </div>
                                          ))}
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
                  onClick={handleValidationThree}
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
              {/* Section 4 */}
              <div
                className={`finish-section w-full relative flex flex-col justify-center left-[370px] ${
                  activeSection === 4 ? "block" : "hidden"
                }`}
              >
                <img
                  src="./images/illustration.png"
                  alt="success-img"
                  className="w-[300px] h=[300px]"
                />
                <p className="text-2xl w-[380px] text-center font-semibold relative right-[30px] mt-12">
                  Your product has been successfully added !
                </p>
                {/* <a
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
                  </a> */}
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
            </div>
          </section>
          <UserFooter />
        </div>
      </div>
    </>
  );
}
