"use client";
import UserHeader from "@/components/UserHeader";
import Link from "next/link";
import config from "@/components/config";
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/20/solid";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import Testimonials from "@/components/Carousel";
import UserFooter from "@/components/UserFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import SideNav from "@/components/SideNav";
import {
  BoxIcon,
  MediaIcon,
  EditIcon,
  InfoIcon,
  ContactIcon,
  BusinessIcon,
  SwitchIcon,
} from "../Assets/icons";
import CustomizedSideNav from "@/components/CustomizedSideNav";
import Image from "next/image";
import AvatarImage from "../../public/images/avatar-img.png";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
// import "../Assets";
export default function UserPortal() {
  const [activeSection, setActiveSection] = useState(
    "Product"
    // (typeof window !== "undefined" &&
    //   sessionStorage.getItem("activeSection")) ||
    //   "Product"
  );
  // useEffect(() => {
  //   sessionStorage.setItem("activeSection", activeSection);
  // }, [activeSection]);

  useEffect(() => {
    // Check if running on the client side
    const storedSection =
      typeof window !== "undefined" &&
      sessionStorage.setItem("activeSection", activeSection);

    if (storedSection) {
      typeof window !== "undefined" &&
        sessionStorage.setItem("activeSection", activeSection);
    }
  }, []);
  const [childActiveSection, childSetActiveSection] = useState("Products");
  const handleSectionClick = (section) => {
    setActiveSection(section);
  };
  const handleChildSectionClick = (section) => {
    childSetActiveSection(section);
  };

  const Users = [
    {
      detail: {
        name: "Michael Foster",
        href: "#",
        rating: "4.9",
        ratingConunt: "(256)",
        city: "Tirupur",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'",
      },
    },
  ];
  //cards product
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (postId) => {
    // Toggle the favorite status for a post
    setFavorites((prevFavorites) =>
      prevFavorites.includes(postId)
        ? prevFavorites.filter((id) => id !== postId)
        : [...prevFavorites, postId]
    );
  };
  const posts = [
    {
      id: 1,
      title: "Pastel and Gold Birthday Decor",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      price: "Rs. 1900",
      category: { title: "Marketing", href: "#" },
      detail: {
        name: "Narayanan",
        href: "#",
        rating: "4.9",
        ratingConunt: "(256)",
        city: "Tirupur",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
        imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      labels: ["Premium", "New Arrival"],
    },
    {
      id: 2,
      title: "Pastel and Gold Birthday Decor",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      price: "Rs. 1900",
      category: { title: "Marketing", href: "#" },
      detail: {
        name: "Narayanan",
        href: "#",
        rating: "4.9",
        ratingConunt: "(256)",
        city: "Tirupur",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
        imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      labels: ["New Arrival"],
    },
  ];

  //about me section
  const [isEditing, setIsEditing] = useState(false);
  const initialAboutMeText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
  adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
  est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
  ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
  esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
  in culpa qui officia deserunt mollit anim id est laborum.`;
  const [aboutMeText, setAboutMeText] = useState(initialAboutMeText);
  const [editedText, setEditedText] = useState("");
  const handleEditButtonClick = () => {
    setIsEditing(true);
    setEditedText(aboutMeText);
  };

  const handleSaveButtonClick = () => {
    setIsEditing(false);
    window.scrollTo(150, 150);
  };
  const handleCancelButtonClick = () => {
    setIsEditing(false);
    setAboutMeText(editedText);
  };
  const handleInputChange = (event) => {
    setAboutMeText(event.target.value);
  };

  //contact section
  const [storedEmail, setStoredEmail] = useState(
    (typeof window !== "undefined" && localStorage.getItem("business-email")) ||
      "NA"
  );
  const [storedPhone, setStoredPhone] = useState(
    (typeof window !== "undefined" && localStorage.getItem("business-phone")) ||
      "NA"
  );
  const [storedWhatsapp, setStoredWhatsapp] = useState(
    (typeof window !== "undefined" &&
      localStorage.getItem("business-whatsapp")) ||
      "NA"
  );
  const [storedAddress, setStoredAddress] = useState(
    (typeof window !== "undefined" &&
      localStorage.getItem("business-address")) ||
      "NA"
  );
  const [isContactEditing, setIsContactEditing] = useState(false);
  const handleEditClick = () => {
    setIsContactEditing(true);
  };

  const handleCancelClick = () => {
    setIsContactEditing(false);
  };
  const [editedEmail, setEditedEmail] = useState(storedEmail);
  const [editedPhone, setEditedPhone] = useState(storedPhone);
  const [editedWhatsapp, setEditedWhatsapp] = useState(storedWhatsapp);
  const [editedAddress, setEditedAddress] = useState(storedAddress);
  const handleUpdateClick = () => {
    setIsContactEditing(false);
    setStoredEmail(editedEmail);
    const storedEmail =
      typeof window !== "undefined" &&
      localStorage.setItem("business-email", editedEmail);
    if (storedEmail) {
      localStorage.setItem("business-email", editedEmail);
    }
    setStoredPhone(editedPhone);
    const storedPhone =
      typeof window !== "undefined" &&
      localStorage.setItem("business-phone", editedPhone);
    if (storedPhone) {
      localStorage.setItem("business-phone", editedPhone);
    }
    // if (typeof window !== "undefined") {
    //   localStorage.setItem("business-phone", editedPhone);
    // }
    setStoredWhatsapp(editedWhatsapp);
    const storedWhatsapp =
      typeof window !== "undefined" &&
      localStorage.setItem("business-whatsapp", editedWhatsapp);
    if (storedWhatsapp) {
      localStorage.setItem("business-whatsapp", editedWhatsapp);
    }
    // if (typeof window !== "undefined") {
    //   localStorage.setItem("business-whatsapp", editedWhatsapp);
    // }
    setStoredAddress(editedAddress);
    const storedAddress =
      typeof window !== "undefined" &&
      localStorage.setItem("business-address", editedAddress);
    if (storedAddress) {
      localStorage.setItem("business-address", editedAddress);
    }
    // if (storedAddress) {
    //   localStorage.setItem("business-address", editedAddress);
    // }
  };

  //Business section
  const [isBusinessEditing, setIsBusinessEditing] = useState(false);
  const handleBusinessClick = () => {
    setIsBusinessEditing(true);
  };
  const handleBusinessCancel = () => {
    setIsBusinessEditing(false);
  };
  const handleBusinessUpdate = () => {
    setIsBusinessEditing(false);
  };

  //contact section
  const [storedCountry, setStoredCountry] = useState(
    (typeof window !== "undefined" &&
      localStorage.getItem("selectedCountries")) ||
      "NA"
  );
  useEffect(() => {
    const countryFromLocalStorage =
      (typeof window !== "undefined" &&
        localStorage.getItem("selectedCountries")) ||
      "NA";
    setStoredCountry(countryFromLocalStorage);
  }, []);

  //Last section switch profile
  const [accountIds, setAccountIds] = useState(null);
  const [profileIds, setProfileIds] = useState(null);
  const [accessToken, setAccessToken] = useState({});

  const checkAuthentication = () => {
    const isAuthenticated = Boolean(localStorage.getItem("accessToken"));
    return isAuthenticated;
  };

  useEffect(() => {
    // Check if running on the client side
    const storedAccessToken =
      typeof window !== "undefined" && localStorage.getItem("accessToken");
    console.log("accesstoken", storedAccessToken);
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
    const isAuthenticated = checkAuthentication();
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [accessToken]);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accountIdParam = urlParams.get("partnerId");
    const profileIdParam = urlParams.get("profileId");
    setAccountIds(accountIdParam);
    setProfileIds(profileIdParam);
  }, []);

  useEffect(() => {
    console.log("accountIds:", accountIds);
    console.log("profileIds:", profileIds);
    if (accountIds && profileIds) {
      goToProductProfile();
    }
    const isAuthenticated = checkAuthentication();
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [accountIds, profileIds, accessToken]);

  const goToProductProfile = async () => {
    try {
      const response = await fetch(
        `${config.host}/tenant/admin/user/v2/partner/${accountIds}/business/profile/${profileIds}/product`,
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
        setBusinessProfiles(data.serviceResponse.businessProfileList || []);
        return data;
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  //api.urbanbarrow.com/tenant/admin/user/v2/partner/24929081-5916-4a49-b169-11d5b3206c5b/business/profile/646601a4-81ec-40c2-a89b-b49a4885de63/product

  return (
    <>
      <div className="flex h-full bg-userTheme">
        {/* <SideNav value1={true} className="absolute" /> */}
        <UserHeader />

        <div className="flex flex-1 flex-col overflow-hidden">
          {/* hero section */}
          <section className=" w-full h-auto top-[65px] relative mb-10 sm:mb-20 lg:h-[261px] bg-userTheme  my-profile-hero ">
            <div className="containerBox relative md:left-20 lg:left-32">
              <div className=" pt-0 flex flex-col mt-36  ">
                <div className="rounded-full border-4 border-white w-[150px] h-[150px] relative bg-gray-50 top-10 left-[40px] overflow-hidden">
                  <Image
                    src={AvatarImage}
                    alt="avatar-img"
                    className="w-[150px] h-[140px] rounded-full"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="flex containerBox mb-10">
            <CustomizedSideNav
              value3={true}
              customeClass="top-[-230px] h-full"
              parentClass="max-h-[800px]"
            />
            <div className="flex flex-col text-[#626262] rounded-xl bg-white w-[290px] h-[370px] max-h-auto mt-28 ml-5">
              <div
                className={`profile-sec flex items-center py-6 pl-4 border-b cursor-pointer hover:bg-lightViolet hover:text-theme transition-all ease-in delay-75 rounded-t-lg  ${
                  activeSection === "Product" ? "bg-lightViolet text-theme" : ""
                }`}
                onClick={() => handleSectionClick("Product")}
              >
                <MediaIcon
                  PathClassName={
                    activeSection === "Product" ? "active-icon" : ""
                  }
                />
                <p className="ml-3">Product</p>
              </div>
              <div
                className={`profile-sec flex items-center py-6 pl-4 border-b cursor-pointer hover:bg-lightViolet hover:text-theme transition-all ease-in delay-75 ${
                  activeSection === "About Me"
                    ? "bg-lightViolet text-theme"
                    : ""
                }`}
                onClick={() => handleSectionClick("About Me")}
              >
                <InfoIcon
                  PathClassName={
                    activeSection === "About Me" ? "active-icon" : ""
                  }
                />
                <p className="ml-3">About Me</p>
              </div>

              <div
                className={`profile-sec flex items-center py-6 pl-4 border-b cursor-pointer hover:bg-lightViolet hover:text-theme transition-all ease-in delay-75 ${
                  activeSection === "Contact Information"
                    ? "bg-lightViolet text-theme"
                    : ""
                }`}
                onClick={() => handleSectionClick("Contact Information")}
              >
                <ContactIcon
                  PathClassName={
                    activeSection === "Contact Information" ? "active-icon" : ""
                  }
                />
                <p className="ml-3">Contact Information</p>
              </div>
              <div
                className={`profile-sec flex items-center py-6 pl-4 border-b cursor-pointer hover:bg-lightViolet hover:text-theme transition-all ease-in delay-75 rounded-b-lg ${
                  activeSection === "Business Information"
                    ? "bg-lightViolet text-theme"
                    : ""
                }`}
                onClick={() => handleSectionClick("Business Information")}
              >
                <BusinessIcon
                  PathClassName={
                    activeSection === "Business Information"
                      ? "active-icon"
                      : ""
                  }
                />
                <p className="ml-3">Business Information</p>
              </div>
              <Link
                href={{
                  pathname: "./users-page/my-profile",
                  query: { accountId: accountIds },
                }}
                className={`profile-sec flex items-center py-6 pl-4 border-b cursor-pointer hover:bg-lightViolet hover:text-theme transition-all ease-in delay-75 rounded-b-lg ${
                  activeSection === "Switch Profile"
                    ? "bg-lightViolet text-theme"
                    : ""
                }`}
                onClick={() => handleSectionClick("Switch Profile")}
              >
                <SwitchIcon
                  PathClassName={
                    activeSection === "Switch Profile" ? "active-icon" : ""
                  }
                />
                <p className="ml-3">Switch Profile</p>
              </Link>
            </div>
            <div className="content-sections mt-10 ml-6 w-full">
              {activeSection === "Product" && (
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <a
                        href="#"
                        className="items-center text-sm font-medium cursor-pointer hover:bg-gray-200 rounded-full w-6 h-6 relative group mr-1"
                      >
                        <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                          <ArrowLongLeftIcon
                            className="h-5 w-5 text-theme group-hover:text-primaryColor"
                            aria-hidden="true"
                          />
                        </span>
                      </a>
                      <p className="text-primaryColor font-extrabold text-2xl">
                        Product
                      </p>
                    </div>
                  </div>
                  {Users.map((post) => (
                    <div className="bg-white shadow-xl rounded-lg mt-5 mb-10 px-6 pt-4 pb-10 min-h-[500px]">
                      <div>
                        <div className="flex mt-6">
                          <div
                            className={`border-2 border-theme rounded-l-lg border-r-0 text-theme py-2 px-16 hover:bg-theme hover:text-white transition ease delay-75 cursor-pointer hover:border-l-white ${
                              childActiveSection === "Products"
                                ? "text-white bg-theme"
                                : "border-theme text-theme bg-transparent"
                            }`}
                            onClick={() => handleChildSectionClick("Products")}
                          >
                            Products
                          </div>
                          <div
                            className={`border-2 rounded-r-lg border-theme text-theme py-2 px-16 hover:bg-theme hover:text-white transition ease delay-75 cursor-pointer   ${
                              childActiveSection === "Packages"
                                ? "text-white bg-theme"
                                : "border-theme text-theme bg-transparent"
                            }`}
                            onClick={() => handleChildSectionClick("Packages")}
                          >
                            Packages
                          </div>
                        </div>
                        <div className="contents">
                          {childActiveSection === "Products" && (
                            <div className="mt-10">
                              <div className="mx-auto grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 sm:gap-y-10 xl:mx-0 xl:max-w-none lg:grid-cols-2 xl:grid-cols-3">
                                <article className="flex flex-col items-start justify-between rounded-lg  shadow-lg bg-userTheme border-2 border-[#E4BDF4] cursor-pointer">
                                  <Link
                                    className="relative w-full flex justify-center items-center h-full flex-col"
                                    href="/add-product"
                                  >
                                    <BoxIcon />
                                    <p className="text-2xl font-semibold w-[200px] text-center text-theme mt-3">
                                      + Add Another Product
                                    </p>
                                  </Link>
                                </article>
                                {posts.map((post) => (
                                  <article
                                    key={post.id}
                                    className="flex flex-col items-start justify-between rounded-lg bg-white shadow-lg"
                                  >
                                    <div className="relative w-full">
                                      <div
                                        className={`faviroute-icon rounded-full w-10 h-10 bg-[#FFF2F5] absolute z-10 mt-7 cursor-pointer text-primaryColor right-5`}
                                        onClick={() => toggleFavorite(post.id)}
                                      >
                                        <svg
                                          fill={
                                            favorites.includes(post.id)
                                              ? "#DE3163"
                                              : "transparent"
                                          }
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          viewBox="0 0 24 24"
                                          className="w-6 h-6 relative left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]"
                                        >
                                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                        </svg>
                                      </div>
                                      {post.label && (
                                        <div
                                          className={`category-list rounded-lg px-8 bg-primaryColor absolute z-10 mt-7 cursor-pointer text-white py-1 mx-3`}
                                        >
                                          {post.label}
                                        </div>
                                      )}
                                      {post.labels && (
                                        <div className="flex absolute z-10 mt-7 cursor-pointer">
                                          {post.labels.map((label) => (
                                            <div
                                              key={label}
                                              className={`category-list rounded-lg px-5 bg-primaryColor text-white py-1 mx-2 font-bold`}
                                            >
                                              {label}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                      <img
                                        src={post.imageUrl}
                                        alt=""
                                        className="aspect-[16/9] w-full bg-gray-100 rounded-lg rounded-b-none object-cover sm:aspect-[2/1] lg:aspect-[3/2] h-[300px] "
                                      />
                                      <div className="absolute inset-0  rounded-lg ring-1 ring-inset ring-gray-900/10" />
                                    </div>
                                    <div className="max-w-xl w-full hover:bg-userTheme1 cursor-pointer transition-all delay-50 ease-in">
                                      <div className="group relative">
                                        <div className="flex relative pl-5">
                                          <h3 className="text-lg mt-3 font-semibold leading-6 text-gray-900 group-hover:text-gray-600 w-[200px]">
                                            <a href={post.href}>
                                              <span className="absolute inset-0" />
                                              {post.title}
                                            </a>
                                          </h3>
                                          {post.price && (
                                            <div className="font-bold rounded-es-xl text-white bg-lightTheme py-2 min-w-fit absolute right-0 px-5">
                                              {post.price}
                                            </div>
                                          )}
                                        </div>
                                        <div className="border-b border-[#E6E6E6] my-3"></div>
                                        <p className="text-[#626262] text-sm mb-5 max-w-[300px] pl-5">
                                          {post.detail.desc}
                                        </p>
                                        <div className="pl-5">
                                          <button className="text-center border border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white px-5 py-2 rounded-lg w-[94%] transition-all ease-in delay-50 mb-7">
                                            Edit
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </article>
                                ))}
                              </div>
                            </div>
                          )}
                          {childActiveSection === "Packages" && (
                            <div className="mt-40 text-3xl font-bold text-theme flex items-center justify-center ">
                              Packages contents
                            </div>
                          )}
                          {/* {childActiveSection === "Albums" && (
                          <div className="mt-40 text-3xl font-bold text-theme flex items-center justify-center ">
                            Albums contents
                          </div>
                        )} */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* about me */}
              {activeSection === "About Me" && (
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <a
                        href="#"
                        className="items-center text-sm font-medium cursor-pointer hover:bg-gray-200 rounded-full w-6 h-6 relative group mr-1"
                      >
                        <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                          <ArrowLongLeftIcon
                            className="h-5 w-5 text-theme group-hover:text-primaryColor"
                            aria-hidden="true"
                          />
                        </span>
                      </a>
                      <p className="text-primaryColor font-extrabold text-2xl">
                        {isEditing ? "Edit Information " : "About Me"}
                      </p>
                    </div>
                    <div>
                      {isEditing ? (
                        ""
                      ) : (
                        <button
                          className="user-btn flex items-center group cursor-pointer"
                          onClick={handleEditButtonClick}
                        >
                          <EditIcon
                            PathClassName="fill-[red] group-hover:fill-[#fff] transition-all delay-75"
                            SvgClassName="w-6 h-6"
                          />
                          <span className="text-lg font-medium ml-2 ">
                            Edit Information
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="bg-white shadow-xl rounded-lg mt-5 mb-10 px-6 py-4 h-auto  overflow-auto">
                    <div className="contents">
                      <div>
                        <div className="mx-auto max-w-2xl  xl:mx-0 xl:max-w-none px-7 py-10 mb-10">
                          {isEditing ? (
                            <textarea
                              className="text-[#767676] font-light w-full py-5 px-4 border border-gray-200 rounded-md min-h-[450px] h-auto shadow-xl outline-primaryColor"
                              value={aboutMeText}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <p className="text-[#767676] font-light mb-3">
                              {aboutMeText}
                            </p>
                          )}
                          {isEditing && (
                            <div className="flex mt-6">
                              <button
                                className="flex items-center group cursor-pointer  bg-primaryColor text-white py-2 px-5 rounded-lg border hover:border-primaryColor hover:bg-transparent hover:text-primaryColor mr-4"
                                onClick={handleSaveButtonClick}
                              >
                                <span className="text-lg font-medium">
                                  Update
                                </span>
                              </button>
                              <button
                                type="button"
                                className="relative focus:outline-none py-2 px-5  border-secondaryColor rounded-lg text-secondaryColor border hover:bg-secondaryColor hover:text-white"
                                onClick={handleCancelButtonClick}
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* contacts */}
              {activeSection === "Contact Information" && (
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <a
                        href="#"
                        className="items-center text-sm font-medium cursor-pointer hover:bg-gray-200 rounded-full w-6 h-6 relative group mr-1"
                      >
                        <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                          <ArrowLongLeftIcon
                            className="h-5 w-5 text-theme group-hover:text-primaryColor"
                            aria-hidden="true"
                          />
                        </span>
                      </a>
                      <p className="text-primaryColor font-extrabold text-2xl">
                        {isContactEditing
                          ? "Edit Information "
                          : "Contact Information"}
                      </p>
                    </div>
                    <div>
                      {isContactEditing ? (
                        ""
                      ) : (
                        <button
                          className="user-btn flex items-center group cursor-pointer"
                          onClick={handleEditClick}
                        >
                          <EditIcon
                            PathClassName="fill-[red] group-hover:fill-[#fff] transition-all delay-75"
                            SvgClassName="w-6 h-6"
                          />
                          <span className="text-lg font-medium ml-2 ">
                            Edit Information
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="bg-white shadow-xl rounded-lg mt-5 mb-10 px-6 py-4 h-auto  overflow-auto">
                    <div className="contact-contents">
                      <div>
                        <div className="mx-auto max-w-2xl  xl:mx-0 xl:max-w-none px-7 py-10 mb-10">
                          {isContactEditing ? (
                            <div>
                              <div className="mb-6">
                                <p className="mb-1">Business Email</p>
                                <input
                                  type="text"
                                  value={editedEmail}
                                  onChange={(e) => {
                                    setEditedEmail(e.target.value);
                                  }}
                                  className="text-[#767676] font-light mb-3 w-full border-b border-gray-300 focus:outline-none"
                                />
                              </div>
                              <div className="mb-6">
                                <p className="mb-1">Business Phone</p>
                                <input
                                  type="text"
                                  value={editedPhone}
                                  onChange={(e) =>
                                    setEditedPhone(e.target.value)
                                  }
                                  className="text-[#767676] font-light mb-3 w-full border-b border-gray-300 focus:outline-none"
                                />
                              </div>
                              <div className="mb-6">
                                <p className="mb-1">Business Whatsapp</p>
                                <input
                                  type="text"
                                  value={editedWhatsapp}
                                  onChange={(e) =>
                                    setEditedWhatsapp(e.target.value)
                                  }
                                  className="text-[#767676] font-light mb-3 w-full border-b border-gray-300 focus:outline-none"
                                />
                              </div>
                              <div>
                                <p className="mb-1">Business Address</p>
                                <input
                                  type="text"
                                  value={editedAddress}
                                  onChange={(e) =>
                                    setEditedAddress(e.target.value)
                                  }
                                  className="text-[#767676] font-light mb-3 w-full border-b border-gray-300 focus:outline-none"
                                />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="mb-6">
                                <p className="mb-1">Business Email</p>
                                <p className="text-[#767676] font-light mb-3">
                                  {storedEmail}
                                </p>
                              </div>
                              <div className="mb-6">
                                <p className="mb-1">Business Phone</p>
                                <p className="text-[#767676] font-light mb-3">
                                  {storedPhone}
                                </p>
                              </div>
                              <div className="mb-6">
                                <p className="mb-1">Business Whatsapp</p>
                                <p className="text-[#767676] font-light mb-3">
                                  {storedWhatsapp}
                                </p>
                              </div>
                              <div>
                                <p className="mb-1">Business Address</p>
                                <p className="text-[#767676] font-light mb-3 w-[300px]">
                                  {storedAddress}
                                </p>
                              </div>
                            </div>
                          )}
                          {isContactEditing && (
                            <div className="flex mt-6">
                              <button
                                onClick={handleUpdateClick}
                                className="flex items-center group cursor-pointer bg-primaryColor text-white py-2 px-5 rounded-lg border hover:border-primaryColor hover:bg-transparent hover:text-primaryColor mr-4"
                              >
                                <span className="text-lg font-medium">
                                  Update
                                </span>
                              </button>
                              <button
                                onClick={handleCancelClick}
                                type="button"
                                className="relative focus:outline-none py-2 px-5  border-secondaryColor rounded-lg text-secondaryColor border hover:bg-secondaryColor hover:text-white"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeSection === "Business Information" && (
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <a
                        href="#"
                        className="items-center text-sm font-medium cursor-pointer hover:bg-gray-200 rounded-full w-6 h-6 relative group mr-1"
                      >
                        <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                          <ArrowLongLeftIcon
                            className="h-5 w-5 text-theme group-hover:text-primaryColor"
                            aria-hidden="true"
                          />
                        </span>
                      </a>
                      <p className="text-primaryColor font-extrabold text-2xl">
                        {isBusinessEditing
                          ? "Edit Information "
                          : "Business Information"}
                      </p>
                    </div>
                    <div>
                      {isBusinessEditing ? (
                        ""
                      ) : (
                        <button
                          className="user-btn flex items-center group cursor-pointer"
                          onClick={handleBusinessClick}
                        >
                          <EditIcon
                            PathClassName="fill-[red] group-hover:fill-[#fff] transition-all delay-75"
                            SvgClassName="w-6 h-6"
                          />
                          <span className="text-lg font-medium ml-2 ">
                            Edit Information
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="bg-white shadow-xl rounded-lg mt-5 mb-10 px-6 py-4 h-auto  overflow-auto">
                    <div className="contact-contents">
                      <div>
                        <div className="mx-auto max-w-2xl  xl:mx-0 xl:max-w-none px-7 py-10 mb-10">
                          {isBusinessEditing ? (
                            <div className="flex justify-between">
                              <div className="mb-6">
                                <p className="text-lg mb-1">Service Area</p>
                              </div>
                              <div className="mb-6">
                                <p className="text-lg mb-1">
                                  Business Mappings
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between">
                              <div className="mb-6 w-1/2">
                                <p className="text-lg mb-4">Service Area</p>
                                <div className="bg-[#edd2f8] w-full p-4 rounded-md flex justify-between">
                                  <span className="font-bold">
                                    {storedCountry}
                                  </span>
                                  <span className="text-primaryColor">All</span>
                                </div>
                                <div className="bg-[#edd2f8] w-full p-4 rounded-md flex justify-between mt-2">
                                  <span className="font-bold">Andaman</span>
                                  <span className="text-primaryColor">All</span>
                                </div>
                              </div>
                              <div className="mb-6 w-1/2 ml-5">
                                <p className="text-lg mb-1">
                                  Business Mappings
                                </p>
                              </div>
                            </div>
                          )}
                          {isBusinessEditing && (
                            <div className="flex mt-6">
                              <button
                                onClick={handleBusinessUpdate}
                                className="flex items-center group cursor-pointer bg-primaryColor text-white py-2 px-5 rounded-lg border hover:border-primaryColor hover:bg-transparent hover:text-primaryColor mr-4"
                              >
                                <span className="text-lg font-medium">
                                  Update
                                </span>
                              </button>
                              <button
                                onClick={handleBusinessCancel}
                                type="button"
                                className="relative focus:outline-none py-2 px-5  border-secondaryColor rounded-lg text-secondaryColor border hover:bg-secondaryColor hover:text-white"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
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
