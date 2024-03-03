"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
  CogIcon,
  HomeIcon,
  PhotoIcon,
  RectangleStackIcon,
  Squares2X2Icon as Squares2X2IconOutline,
  UserGroupIcon,
  XMarkIcon,
  SideNavCustomeClass,
} from "@heroicons/react/24/outline";
import { Squares2X2Icon as Squares2X2IconMini } from "@heroicons/react/20/solid";
import Link from "next/link";
import {
  PartnerIcon,
  UserIcon,
  BuildingIcon,
  DashboardIcon,
} from ".././app/Assets/icons";

const SideNav = ({
  value1,
  value2,
  value3,
  value4,
  customeClass,
  parentClass,
}) => {
  const handleClick = (href) => {
    console.log(href);
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const Dashboard = () => (
    <DashboardIcon PathClassName={value1 ? "active-icon" : ""} />
  );
  const Business = () => (
    <BuildingIcon PathClassName={value2 ? "active-icon" : ""} />
  );
  const User = () => <UserIcon PathClassName={value3 ? "active-icon" : ""} />;
  const Partner = () => (
    <PartnerIcon PathClassName={value4 ? "active-icon" : ""} />
  );

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Dashboard,
      current: value1,
    },
    {
      name: "Business Config",
      href: "/admin-page/business-config",
      icon: Business,
      current: value2,
    },
    {
      name: "User Setting",
      href: "/users-page/partner",
      icon: User,
      current: value3,
    },
    {
      name: "Partner Setting",
      href: "/partner",
      icon: Partner,
      current: value4,
    },
  ];

  return (
    <div className={`flex relative top-[10px] ${customeClass}`}>
      <div
        className={`hidden w-28 overflow-y-auto bg-white md:block rounded-2xl border-[#E6E6E6] border-2 border-solid min-h-[500px] ${parentClass}`}
      >
        <div className="flex w-full flex-col items-center py-6 ">
          <div className="w-full flex-1 space-y-4 px-2 text-center cursor-pointer">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-lightViolet text-theme"
                    : " hover:bg-lightViolet hover:text-theme text-[#626262]",
                  "group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium profile-sec"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? " text-theme"
                      : " group-hover:text-theme text-[#D5D5D5]",
                    "h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                <span className="mt-2">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
