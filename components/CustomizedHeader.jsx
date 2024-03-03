"use client";
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { Disclosure, Transition, Dialog } from "@headlessui/react";
import {
  XMarkIcon,
  Bars3BottomLeftIcon,
  Squares2X2Icon as Squares2X2IconOutline,
} from "@heroicons/react/24/outline";
import {
  CogIcon,
  HomeIcon,
  PhotoIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
const navigation = [
  { name: "Space", href: "#", icon: Squares2X2IconOutline, current: false },
  { name: "Celebrations", href: "#", icon: PhotoIcon, current: false },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const logout = () => {
  localStorage.removeItem("accessToken");
};
const CustomizedHeader = ({ value }) => {
  console.log("value", value);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`w-full`}>
      <div className="relative flex h-16 flex-shrink-0 border-b border-gray-200 bg-white shadow-sm">
        <button
          type="button"
          className="border-r border-gray-200 bg-userTheme px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-userTheme md:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <Disclosure as="nav" className="flex justify-end w-full bg-userTheme">
          <>
            <div className="mx-auto max-w-[82rem] px-2 w-full">
              <div className="relative flex h-16 justify-between items-center">
                <h1 className="logo text-primaryColor inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-md text-xl hover:text-gray-900 cursor-pointer font-bold">
                  <span className="text-gray-900 font-medium">SET</span>MySpace
                </h1>
                <div className="flex flex-1 items-center justify-center sm:items-stretch relative right-16 ">
                  <div className="hidden lg:ml-6 lg:flex lg:space-x-8 lg:justify-center lg:w-full">
                    <a
                      href="/admin-page/business-config"
                      className={`inline-flex items-center border-b border-transparent px-1 pt-1 text-md font-medium hover:text-primaryColor text-sm ${
                        value === 1 ? "text-primaryColor" : "text-gray-600"
                      }`}
                    >
                      Space
                    </a>
                    <a
                      href="/celebration"
                      className={`inline-flex items-center border-b border-transparent px-1 pt-1 text-md font-medium hover:text-primaryColor text-sm ${
                        value === 2 ? "text-primaryColor" : "text-gray-600"
                      }`}
                    >
                      Celebrations
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        </Disclosure>
      </div>
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4 pt-5">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute right-0 top-1 -mr-14 p-1">
                    <button
                      type="button"
                      className="flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Close sidebar</span>
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=white"
                    alt="Your Company"
                  /> */}
                  <h1 className="logo text-primaryColor inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-md text-base hover:text-gray-900 cursor-pointer font-bold">
                    <span className="text-gray-900">SET</span>
                    MySpace
                  </h1>
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto px-2">
                  <nav className="flex h-full flex-col">
                    <div className="space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-darkTheme text-white"
                              : "text-black hover:bg-darkTheme hover:text-white",
                            "group flex items-center rounded-md py-2 px-3 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-primaryColor"
                                : "text-primaryColor group-hover:text-white",
                              "mr-3 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          <span>{item.name}</span>
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </header>
  );
};

export default CustomizedHeader;
