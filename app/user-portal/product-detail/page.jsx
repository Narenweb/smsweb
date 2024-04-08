"use client";
import UserHeader from "@/components/UserHeader";
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/20/solid";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import config from "@/components/config";
import Testimonials from "@/components/Carousel";
import UserFooter from "@/components/UserFooter";
import Link from "next/link";
import { AddUserIcon, BannerIcon, CheckIcon } from "../../Assets/icons";
import CustomizedSideNav from "@/components/CustomizedSideNav";
import Image from "next/image";
import BirthdayPic from "../../../public/images/birthday-pic.png";
import LoginImage from "../../../public/images/login.png";
import LandingImage from "../../../public/images/Landing-bg.png";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import "../Assets";
export default function Myprofile() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState({});
  const [activeSection, setActiveSection] = useState(null);
  const [accountIds, setAccountIds] = useState(null);
  const [businessProfiles, setBusinessProfiles] = useState([]);

  const checkAuthentication = () => {
    const isAuthenticated = Boolean(localStorage.getItem("accessToken"));
    return isAuthenticated;
  };

  //   useEffect(() => {
  //     // Check if running on the client side
  //     if (typeof window !== "undefined") {
  //       const storedAccessToken = localStorage.getItem("accessToken");
  //       const storedActiveSection =
  //         parseInt(localStorage.getItem("activeSection")) || 1;

  //       setAccessToken(storedAccessToken);
  //       setActiveSection(storedActiveSection);
  //     }
  //   }, []);

  //   useEffect(() => {
  //     if (accountIds) {
  //       fetchData();
  //     }
  //     const isAuthenticated = checkAuthentication();
  //     if (!isAuthenticated) {
  //       router.push("/admin/login");
  //     }
  //   }, [accountIds, accessToken]);

  //   useEffect(() => {
  //     const queryString = window.location.search;
  //     const urlParams = new URLSearchParams(queryString);
  //     const accountIdParam = urlParams.get("accountId");
  //     setAccountIds(accountIdParam);
  //   }, []);

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `${config.host}/tenant/admin/user/v2/partner/${accountIds}/business/profile`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (response.ok) {
  //         const data = await response.json();
  //         setBusinessProfiles(data.serviceResponse.businessProfileList || []);
  //         return data;
  //       } else {
  //         console.error("Failed to fetch data:", response.status);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error.message);
  //     }
  //   };

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

  const [childActiveSection, childSetActiveSection] = useState("Photos");
  const handleChildSectionClick = (section) => {
    childSetActiveSection(section);
  };
  //Image slider

  const desktopSliderSettings = {
    dots: true,
    infinite: true,
    speed: 900,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };
  const images = [BirthdayPic, LoginImage, BirthdayPic, LandingImage];
  ////

  const paragraphs = [
    "Birthday Special Decors",
    "Birthday Balloon Decors",
    "Birthday Cakes",
    "Birthday Surprises",
    "Birthday Photography",
    "Birthday Special Dinner",
  ];

  const posts = [
    {
      id: 1,
      title: "Pastel and Gold Birthday Decor",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      price: "Rs. 1900",
    },
    {
      id: 2,
      title: "Flamingo Themed Birthday Decor",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      price: "Rs. 2900",
    },
    {
      id: 3,
      title: "Black and Gold Birthday Decor",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      price: "Rs. 2400",
    },
    {
      id: 4,
      title: "Flamingo Themed Birthday Decor",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      price: "Rs. 4000",
    },
    {
      id: 5,
      title: "Black and Gold Birthday Decor",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      price: "Rs. 4000",
    },
  ];

  return (
    <>
      <div className="flex h-full bg-userTheme">
        <UserHeader isLoginPage value1={true} />

        <div className="flex flex-1 flex-col overflow-hidden h-auto top-[80px] relative mb-10 sm:mb-20">
          <section className="flex containerBox mb-10">
            <div className="content-sections mt-5 lg:ml-6 w-full">
              <div className="flex items-center">
                <a
                  href="/user-portal"
                  className="items-center text-sm font-medium cursor-pointer hover:bg-gray-200 rounded-full w-6 h-6 relative group mr-1"
                >
                  <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                    <ArrowLongLeftIcon
                      className="h-5 w-5 text-theme group-hover:text-primaryColor"
                      aria-hidden="true"
                    />
                  </span>
                </a>
                <p className="text-primaryColor font-extrabold">Back</p>
              </div>
              <div className="flex my-6">
                <div
                  className={`border-2 border-theme rounded-l-lg border-r-0 text-theme py-2 px-16 hover:bg-theme hover:text-white transition ease delay-75 cursor-pointer  ${
                    childActiveSection === "Photos"
                      ? "text-white bg-theme"
                      : "border-theme text-theme bg-transparent"
                  }`}
                  onClick={() => handleChildSectionClick("Photos")}
                >
                  Photos
                </div>
                <div
                  className={`border-2 rounded-r-lg border-theme text-theme py-2 px-16 hover:bg-theme hover:text-white transition ease delay-75 cursor-pointer   ${
                    childActiveSection === "Videos"
                      ? "text-white bg-theme"
                      : "border-theme text-theme bg-transparent"
                  }`}
                  onClick={() => handleChildSectionClick("Videos")}
                >
                  Videos
                </div>
              </div>

              {childActiveSection === "Photos" && (
                <>
                  <div className="flex justify-between mb-2">
                    <div className="w-[57%]">
                      <Slider {...desktopSliderSettings}>
                        {images.map((image, index) => (
                          <div key={index}>
                            <Image
                              src={image}
                              alt="avatar-img"
                              className="w-[800px] h-[480px] rounded-lg"
                            />
                          </div>
                        ))}
                      </Slider>

                      <p className="font-semibold text-2xl mt-10">
                        Product Description
                      </p>
                      <div className="text-[#626262] font-light text-xl">
                        <p className="mt-5">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur.{" "}
                        </p>
                        <p className="mt-5">
                          Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur.
                          Excepteur sint occaecat cupidatat non proident, sunt
                          in culpa qui officia deserunt mollit anim id est
                          laborum.
                        </p>
                      </div>
                    </div>
                    <div className="w-[40%]">
                      <h4 className="font-semibold text-4xl max-w-[530px]">
                        Pastel and Gold Birthday Decor
                      </h4>
                      <div className="relative mt-4 flex items-center gap-x-2">
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt="profile-img"
                          className="h-7 w-7 rounded-full bg-gray-100 border-2"
                        />
                        <p className="text-[#626262] text-sm">
                          <span className="absolute inset-0" />
                          Narayanan
                        </p>

                        <div className="flex items-center">
                          <>
                            <img
                              src="https://i.ibb.co/gSYSQsY/star-1.png"
                              alt="star-1"
                              border="0"
                              className="w-4 h-4"
                            />
                            <p className="ml-1 text-sm">
                              4.9
                              <span className="text-[#767676] ml-1">(256)</span>
                            </p>
                          </>
                        </div>
                      </div>
                      <div className="bg-theme w-full py-5 flex items-center justify-between rounded-xl mt-5 text-white px-6 text-xl cursor-pointer">
                        <div className="flex items-center">
                          <BannerIcon />
                          <p className="pl-3">Price</p>
                        </div>
                        <p className="font-semibold">Rs. 1900</p>
                      </div>
                      <div className="bg-primaryColor w-full py-3 rounded-xl mt-5 text-white text-xl cursor-pointer text-center">
                        Explore more from Suresh Sitharaman
                      </div>
                      <div className="bg-white shadow-lg w-full rounded-xl mt-5 px-6 cursor-pointer py-5">
                        <p className="font-semibold text-xl">Service Areas</p>
                        <div className="mt-2 space-y-1 ">
                          <p className="font-light">Andhra Pradesh</p>
                          <p>Arunachal Pradesh</p>
                          <p>Chattisgarh</p>
                        </div>
                      </div>
                      <div className="text-secondaryColor mt-6 flex flex-wrap">
                        {paragraphs.map((text, index) => (
                          <a
                            href=""
                            key={index}
                            className="px-5 py-2 border rounded-lg border-secondaryColor ml-3 mb-3  hover:bg-secondaryColor hover:text-white transition-all delay-50 ease-in"
                          >
                            {text}
                          </a>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="bg-[#2ECC71] w-[48%] p-5 rounded-xl mt-5 text-xl space-y-2 min-h-[240px]">
                          <p className="text-xl font-semibold text-white ">
                            Inclusions
                          </p>
                          <div className="flex items-center">
                            <CheckIcon />
                            <p className="text-[#AEFFD0] ml-2">Table adorned</p>
                          </div>
                          <div className="flex items-center">
                            <CheckIcon />
                            <p className="text-[#AEFFD0] ml-2">2 Mocktails</p>
                          </div>
                          <div className="flex items-center">
                            <CheckIcon />
                            <p className="text-[#AEFFD0] ml-2">5 Course Meal</p>
                          </div>
                          <div className="flex items-center">
                            <CheckIcon />
                            <p className="text-[#AEFFD0] ml-2"> Multicuisine</p>
                          </div>
                          <div className="flex items-center">
                            <CheckIcon />
                            <p className="text-[#AEFFD0] ml-2">
                              Butler to serve the food
                            </p>
                          </div>
                        </div>
                        <div className="bg-[#E74C3C] w-[48%] p-5 rounded-xl mt-5 text-xl space-y-2 min-h-[274px]">
                          <p className="text-xl font-semibold text-white ">
                            Exclusions
                          </p>
                          <div className="flex items-center">
                            <CheckIcon />
                            <p className="text-[#FFBBB4] ml-2">
                              Pickup and Drop
                            </p>
                          </div>
                          <div className="flex items-center">
                            <CheckIcon />
                            <p className="text-[#FFBBB4] ml-2">Alchol</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-10">
                    <p className="font-semibold text-xl mb-5">
                      Others from Suresh Sitharaman
                    </p>
                    <div className="mx-auto grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 sm:gap-y-20 xl:mx-0 xl:max-w-none lg:grid-cols-2 xl:grid-cols-5">
                      {posts.map((post) => (
                        <article
                          key={post.id}
                          className="flex flex-col items-start justify-between rounded-lg bg-white lg:w-[250px] shadow-xl hover:bg-userTheme1 cursor-pointer transition-all delay-75"
                        >
                          <div className="relative w-full">
                            {post.label && (
                              <div
                                className={`category-list rounded-lg px-8 bg-primaryColor absolute z-10 mt-7 cursor-pointer text-white py-1 mx-3`}
                              >
                                {post.label}
                              </div>
                            )}
                            <img
                              src={post.imageUrl}
                              alt=""
                              className="aspect-[16/9] w-full bg-gray-100 rounded-lg rounded-b-none object-cover sm:aspect-[2/1] lg:aspect-[3/2] h-[150px] "
                            />
                          </div>

                          <div className="max-w-xl w-full cursor-pointer">
                            <div className="group relative  pb-3 ">
                              <div className="flex relative pl-5">
                                <h3 className="text-lg mt-3 font-semibold leading-6 text-gray-900 group-hover:text-gray-600 w-[200px]">
                                  <a href={post.href}>
                                    <span className="absolute inset-0" />
                                    {post.title}
                                  </a>
                                </h3>
                                {post.price && (
                                  <div className="font-bold rounded-tl-xl text-white bg-lightTheme py-2 min-w-fit absolute bottom-[60px] right-0 px-5">
                                    {post.price}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>

                  <div className="mb-14">
                    <p className="font-semibold text-xl mb-5">
                      Similar from other partners
                    </p>
                    <div className="mx-auto grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 sm:gap-y-20 xl:mx-0 xl:max-w-none lg:grid-cols-2 xl:grid-cols-5">
                      {posts.map((post) => (
                        <article
                          key={post.id}
                          className="flex flex-col items-start justify-between rounded-lg bg-white lg:w-[250px] shadow-xl hover:bg-userTheme1 cursor-pointer transition-all delay-75"
                        >
                          <div className="relative w-full">
                            {post.label && (
                              <div
                                className={`category-list rounded-lg px-8 bg-primaryColor absolute z-10 mt-7 cursor-pointer text-white py-1 mx-3`}
                              >
                                {post.label}
                              </div>
                            )}
                            <img
                              src={post.imageUrl}
                              alt=""
                              className="aspect-[16/9] w-full bg-gray-100 rounded-lg rounded-b-none object-cover sm:aspect-[2/1] lg:aspect-[3/2] h-[150px] "
                            />
                          </div>

                          <div className="max-w-xl w-full cursor-pointer">
                            <div className="group relative  pb-3 ">
                              <div className="flex relative pl-5">
                                <h3 className="text-lg mt-3 font-semibold leading-6 text-gray-900 group-hover:text-gray-600 w-[200px]">
                                  <a href={post.href}>
                                    <span className="absolute inset-0" />
                                    {post.title}
                                  </a>
                                </h3>
                                {post.price && (
                                  <div className="font-bold rounded-tl-xl text-white bg-lightTheme py-2 min-w-fit absolute bottom-[60px] right-0 px-5">
                                    {post.price}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {childActiveSection === "Videos" && <p className="text-center text-primaryColor text-4xl h-screen">Video section</p>}
            </div>
          </section>
          <UserFooter />
        </div>
      </div>
    </>
  );
}
