"use client";
import UserHeader from "@/components/UserHeader";
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/20/solid";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import Testimonials from "@/components/Carousel";
import UserFooter from "@/components/UserFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import SideNav from "@/components/SideNav";
import { MailIcon, CallIcon } from "../Assets/icons";
import CustomizedSideNav from "@/components/CustomizedSideNav";
import Image from "next/image";
import AvatarImage from "../../public/images/avatar-img.png";
import Profile from "../../public/images/profile.jpg";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
// import "../Assets";
export default function UserPortal() {
  const [activeSection, setActiveSection] = useState(
    (typeof window !== "undefined" &&
      sessionStorage.getItem("activeSection")) ||
      "Product"
  );

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
    },
    {
      id: 2,
      title: "Pastel and Gold Birthday Decor",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      price: "Rs. 1900",
    },
  ];
  const ReadMoreContent = ({ initialLines = 3, content }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleReadMore = () => {
      setExpanded(!expanded);
      window.scrollTo(0, 0);
    };

    return (
      <div className="py-5 border-b">
        <p className={`mb-2 text-[#767676] ${expanded ? "" : "clamp-3"}`}>
          {content}
        </p>
        <a
          href="#"
          className="text-theme cursor-pointer"
          onClick={toggleReadMore}
        >
          {expanded ? "Read Less" : "Read More"}
        </a>
      </div>
    );
  };
  const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id.";

  return (
    <>
      <div className="flex h-full bg-userTheme">
        <UserHeader value2={true} />

        <div className="flex flex-1 flex-col overflow-hidden">
          {/* hero section */}
          <section className=" w-full h-auto top-[65px] relative mb-10 sm:mb-20 lg:h-[261px] bg-userTheme  my-profile-hero ">
            <div className="containerBox relative left-14">
              <div className=" pt-0 flex flex-col mt-36  ">
                <div className="rounded-full border-4 border-white w-[150px] h-[150px] relative bg-gray-50 top-10  overflow-hidden">
                  <Image
                    src={Profile}
                    alt="profile-img"
                    className="w-[150px] h-[140px] rounded-full"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="flex containerBox mb-10">
            {/* <CustomizedSideNav
              value3={true}
              customeClass="top-[-230px] h-full"
              parentClass="max-h-[800px]"
            /> */}
            <div className="flex flex-col text-[#626262] rounded-xl bg-white max-w-[220px] w-full max-h-[320px] h-auto lg:max-h-[290px] md:max-h-[300px] mt-[92px] ml-5">
              <div className="border-b border-solid pb-4">
                <p className="font-semibold text-lg pt-6 px-4">Narayanan</p>
                <div className="flex items-center px-4 pt-3">
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
                </div>
                <div className="px-4 pt-3 flex items-center">
                  <img
                    src="https://i.ibb.co/kJVB30y/location.png"
                    alt="location"
                    border="0"
                    className="w-4 h-4"
                  ></img>
                  <p className="font-light text-sm ml-1">Bangalore</p>
                </div>
              </div>
              <div className="border-b border-solid p-4 flex items-center">
                <MailIcon />
                <p className="font-semibold text-sm ml-2">Email Me</p>
              </div>
              <div className="border-b border-solid p-4 flex items-center">
                <CallIcon />
                <p className="font-semibold text-sm ml-2">Call Me</p>
              </div>
            </div>
            <div className="content-sections mt-10 ml-6 w-full">
              {activeSection === "Product" && (
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <a
                        href="/"
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
                        About Me
                      </p>
                    </div>
                  </div>
                  {Users.map(() => (
                    <div className="bg-white shadow-xl rounded-lg mt-5 mb-10 px-6 pt-4 pb-10 min-h-[500px]">
                      <ReadMoreContent content={loremIpsum} />

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
                                {posts.map((post) => (
                                  <article
                                    key={post.id}
                                    className="flex flex-col items-start justify-between rounded-lg bg-white shadow-lg"
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
                                        className="aspect-[16/9] w-full bg-gray-100 rounded-lg rounded-b-none object-cover sm:aspect-[2/1] lg:aspect-[3/2] h-[300px] "
                                      />
                                      <div className="absolute inset-0  rounded-lg ring-1 ring-inset ring-gray-900/10" />
                                    </div>
                                    <div className="max-w-xl w-full hover:bg-userTheme1 cursor-pointer transition-all delay-50 ease-in pb-10">
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
                        </div>
                      </div>
                    </div>
                  ))}
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
