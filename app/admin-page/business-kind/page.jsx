"use client";
import BusinessKindTable from "@/components/UsersTable/BusinessKindTable";
import Header from "@/components/Header";
import CustomizedHeader from "@/components/CustomizedHeader";
import SideNav from "@/components/SideNav";
import CustomizedSideNav from "@/components/CustomizedSideNav";
import { Fragment, useState, useEffect } from "react";
import {
  Bars4Icon,
  Squares2X2Icon as Squares2X2IconMini,
} from "@heroicons/react/20/solid";

const tabs = [
  {
    name: "Business Line",
    href: "./business-config",
    current: false,
    tooltip: "Tooltip for Business Line",
  },
  {
    name: "Business Kind",
    href: "./business-kind",
    current: true,
    tooltip: "Tooltip for Business Kind Tooltip",
  },
  {
    name: "Business Category",
    href: "./business-category",
    current: false,
    tooltip: "Tooltip for Business Category",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BusinessKind() {
  const [hoveredTab, setHoveredTab] = useState(null);
  return (
    <>
      <div className="flex bg-userTheme h-screen">
        {/* Content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <CustomizedHeader value={1} />
          {/* <Header /> */}
          {/* Main content */}
          <div className="flex flex-1 items-stretch overflow-hidden relative left-[4%] pt-[20px]">
            <CustomizedSideNav value2={true} parentClass="max-h-[600px]" />
            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 ">
                <div className="flex">
                  <h1 className="flex-1 text-2xl font-semibold">
                    Business Details
                  </h1>
                </div>

                {/* Tabs */}
                <div className="mt-4 sm:mt-9">
                  <div className="hidden sm:block">
                    <div className="flex items-center border-b border-[#B9B9B9] w-[44%] pb-[15px] ">
                      <nav
                        className="-mb-px flex flex-1 space-x-6 xl:space-x-24"
                        aria-label="Tabs"
                      >
                        {tabs.map((tab) => (
                          <div key={tab.name} className="relative">
                            <a
                              key={tab.name}
                              href={tab.href}
                              aria-current={tab.current ? "page" : undefined}
                              className={classNames(
                                tab.current
                                  ? "border-theme text-theme"
                                  : "border-transparent text-[#B9B9B9] hover:border-gray-400 hover:text-gray-700",
                                "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-bold"
                              )}
                              onMouseEnter={() => setHoveredTab(tab.name)}
                              onMouseLeave={() => setHoveredTab(null)}
                            >
                              {tab.name}

                              {/* Tooltip */}
                              {hoveredTab === tab.name && (
                                <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 ">
                                  <div className="relative bg-white border border-theme text-[#7C7C7C] text-xs py-1 px-2 rounded-md pointer-events-none transition-opacity duration-200 ease-in-out opacity-100">
                                    <div className="font-normal">
                                      {tab.tooltip}
                                    </div>
                                    <div className="absolute top-[23px] left-1/2 transform -translate-x-1/2 -translate-y-1 bg-white border border-theme border-t-0 border-l-0 w-3 h-3 rotate-45"></div>
                                  </div>
                                </div>
                              )}
                            </a>
                          </div>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
                <BusinessKindTable />
              </div>
            </main>
            {/* Right sidebar */}
          </div>
        </div>
      </div>
    </>
  );
}
