"use client";
import UserHeader from "@/components/UserHeader";
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/20/solid";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Testimonials from "@/components/Carousel";
import UserFooter from "@/components/UserFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {
  BoxIcon,
  MediaIcon,
  EditIcon,
  InfoIcon,
  ContactIcon,
  BusinessIcon,
  AddUserIcon,
} from "../../Assets/icons";
import CustomizedSideNav from "@/components/CustomizedSideNav";
import Image from "next/image";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
// import "../Assets";
export default function Myprofile() {
  const router = useRouter();
  const [accountIds, setAccountId] = useState(null);

  useEffect(() => {
    // Accessing window.location.search to get the query string part of the URL
    const queryString = window.location.search;

    // Using URLSearchParams to parse the query string and get the value of the 'accountId' parameter
    const urlParams = new URLSearchParams(queryString);
    const accountIdParam = urlParams.get("accountId");

    // Setting the value of accountId in the component state
    setAccountId(accountIdParam);
  }, []);
  console.log("accountId-myprofile", accountIds);
  const [activeSection, setActiveSection] = useState(
    (typeof window !== "undefined" &&
      sessionStorage.getItem("activeSection")) ||
      "Product"
  );
  useEffect(() => {
    typeof window !== "undefined" &&
      sessionStorage.setItem("activeSection", activeSection);
  }, [activeSection]);
  const [childActiveSection, childSetActiveSection] = useState("Products");
  const handleSectionClick = (section) => {
    setActiveSection(section);
  };
  const handleChildSectionClick = (section) => {
    childSetActiveSection(section);
  };

  //cards product
  const [isProduct, setIsProduct] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const handleProductEditButton = () => {
    setIsProduct(true);
    setEditedText(aboutMeText);
  };
  const toggleFavorite = (postId) => {
    // Toggle the favorite status for a post
    setFavorites((prevFavorites) =>
      prevFavorites.includes(postId)
        ? prevFavorites.filter((id) => id !== postId)
        : [...prevFavorites, postId]
    );
  };

  const handleSaveButtonClick = () => {
    setIsEditing(false);
    window.scrollTo(150, 150);
  };
  const handleCancelButtonClick = () => {
    setIsEditing(false);
    setIsProduct(false);
    setAboutMeText(editedText);
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

  const posts = [
    {
      id: 1,
      title: "Pastel and Gold Birthday Decor",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
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
      category: { title: "Marketing", href: "#" },
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
      labels: ["New Arrival"],
    },
  ];

  return (
    <>
      <div className="flex h-full bg-userTheme">
        <UserHeader />

        <div className="flex flex-1 flex-col overflow-hidden h-auto top-[80px] relative mb-10 sm:mb-20">
          <section className="flex containerBox mb-10">
            <CustomizedSideNav
              value3={true}
              customeClass="top-[-230px] h-full"
              parentClass="max-h-[800px]"
            />

            <div className="content-sections mt-10 ml-6 w-full">
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
                      Profiles
                    </p>
                  </div>
                </div>
                {Users.map((post) => (
                  <div className="bg-white shadow-xl rounded-lg mt-5 mb-10 px-6 pt-4 pb-10 min-h-[500px]">
                    <div>
                      <div className="contents">
                        <div className="mt-10">
                          <div className="mx-auto grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 sm:gap-y-10 xl:mx-0 xl:max-w-none lg:grid-cols-2 xl:grid-cols-3 ">
                            <Link
                              href={{
                                pathname: "../create-profile",
                                query: { accountId: accountIds },
                              }}
                              className="flex flex-col items-start justify-between rounded-lg  shadow-md bg-[#f2e9f6] border-2 border-[#E4BDF4] cursor-pointer h-full max-h-[644px]  hover:shadow-xl"
                            >
                              <div className="relative w-full flex justify-center items-center h-full flex-col">
                                <AddUserIcon />
                                <p className="text-2xl font-semibold text-center text-theme mt-3">
                                  + Add Profile
                                </p>
                              </div>
                            </Link>
                            {posts.map((post) => (
                              <article
                                key={post.id}
                                className="flex flex-col items-start justify-between rounded-lg bg-white lg:w-[375px] shadow-xl"
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
                                  <div className="group relative  pb-6 ">
                                    <div className="flex relative pl-5">
                                      <h3 className="text-lg mt-6 font-semibold leading-6 text-gray-900 group-hover:text-gray-600 w-[200px]">
                                        <a href={post.href}>
                                          <span className="absolute inset-0" />
                                          {post.title}
                                        </a>
                                      </h3>
                                      {/* {post.price && (
                                        <div className="font-bold rounded-es-xl text-white bg-lightTheme py-2 min-w-fit absolute right-0 px-5">
                                          {post.price}
                                        </div>
                                      )} */}
                                    </div>
                                    <div className="relative mt-4 flex items-center gap-x-3 pl-5">
                                      <img
                                        src={post.detail.imageUrl}
                                        alt=""
                                        className="h-7 w-7 rounded-full bg-gray-100 border-2"
                                      />
                                      <p className="text-[#626262] text-sm">
                                        <a href={post.detail.href}>
                                          <span className="absolute inset-0" />
                                          {post.detail.name}
                                        </a>
                                      </p>
                                    </div>
                                    <div className="mt-3 flex items-center pl-5">
                                      <div className="flex items-center">
                                        {post.detail.rating && (
                                          <>
                                            <img
                                              src="https://i.ibb.co/gSYSQsY/star-1.png"
                                              alt="star-1"
                                              border="0"
                                              className="w-4 h-4"
                                            />
                                            <p className="ml-1 text-sm">
                                              {post.detail.rating + " "}
                                              <span className="text-[#767676]">
                                                {post.detail.ratingConunt}
                                              </span>
                                            </p>
                                          </>
                                        )}
                                      </div>
                                      {post.detail.city && (
                                        <div className="ml-3 flex items-center">
                                          <img
                                            src="https://i.ibb.co/kJVB30y/location.png"
                                            alt="location"
                                            border="0"
                                            className="w-4 h-4"
                                          ></img>
                                          <p className="font-light text-xs ml-1">
                                            {post.detail.city}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                    <div className="border-b border-[#E6E6E6] my-5"></div>
                                    <p className="text-[#626262] text-sm mb-7 max-w-[300px] pl-5">
                                      {post.detail.desc}
                                    </p>
                                    <div className="pl-5">
                                      <Link
                                        href={{
                                          pathname: "/user-profile",
                                        }}
                                      >
                                        <button className="text-center border border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white px-5 py-2 rounded-lg w-[94%] transition-all ease-in delay-50">
                                          Go to Profile
                                        </button>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </article>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <UserFooter />
        </div>
      </div>
    </>
  );
}
