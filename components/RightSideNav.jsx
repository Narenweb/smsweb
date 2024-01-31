import React, { useState, useEffect, useRef } from "react";
import Toggle from "./Toggle";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

export default function RightSideNav({
  isSideNavOpen,
  onClose,
  details,
  onToggle,
  business,
  styles,
  toggleState,
}) {
  const [open, setOpen] = useState(false);
  const { id, name, businessLine, businessCategory,businessCategoryNames, createdTime, updatedTime } =
    details;

  const [createdAt] = useState(new Date());
  const [updatedAt, setUpdatedAt] = useState(createdAt);

  useEffect(() => {
    // Update updatedAt timestamp when isSideNavOpen changes
    if (isSideNavOpen) {
      setUpdatedAt(new Date());
      setOpen(true);
    }
  }, [isSideNavOpen]);


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen sm:max-w-lg md:max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-end">
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-theme focus:ring-offset-2"
                            onClick={onClose}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <nav
                        className={`px-5  sm:flex lg:flex-col items-center  space-y-6 flex-col ${styles}`}
                      >
                        <div className="space-y-10 pb-16 mt-10 ml-10">
                          <p className="mb-3">ID: {id}</p>
                          <p className="mb-3">Name: {name}</p>
                          <div className="flex items-center mb-3">
                            <p className="mr-3">Enable :</p>
                            {/* With toggle functionality use this below one */}
                            {/* <Toggle checked={toggleState.enable} onToggle={(value) => onToggle('enable', value)} /> */}
                            <Toggle checked={toggleState.enable} />
                          </div>
                          <div className="flex w-28 items-center mb-3">
                            <p className="mr-3">Active :</p>
                            {/* <Toggle checked={toggleState.active} onToggle={(value) => onToggle('active', value)} /> */}
                            <Toggle checked={toggleState.active} />
                          </div>

                          {businessLine && businessLine.length > 0 && (
                            <p className="mb-3">Business Line: {businessLine}</p>
                          )}
                          {businessCategoryNames && businessCategoryNames.length > 0 && (
                            <div className="mb-3">
                              <label className="mb-3">{business} : </label>
                              {businessCategoryNames.map((category, index) => (
                                <div
                                  key={index}
                                  className="bg-theme inline mr-2 rounded-md p-2 mb-1 w-auto text-white"
                                >
                                  {category}
                                </div>
                              ))}
                            </div>
                          )}
                          <p className="mb-3">
                            Created At:{" "}
                            {format(createdAt, "yyyy-MM-dd HH:mm:ss")}
                          </p>
                          {updatedAt && (
                            <p className="mb-3">
                              Updated At:{" "}
                              {format(updatedAt, "yyyy-MM-dd HH:mm:ss")}
                            </p>
                          )}
                          {/* That api time */}
                          {/* <p className="mb-3">Created At: {createdTime}</p>
                          {updatedAt && <p className="mb-3">Updated At: {updatedTime}</p>} */}
                          <button
                            onClick={onClose}
                            className={`text-secondaryColor relative bottom-[0%] left-1/2 translate-x-[-50%] hover:transition-color hover:delay-100 hover:ease-out border border-secondaryColor px-7 py-2 rounded-md hover:bg-secondaryColor hover:text-white`}
                          >
                            Close
                          </button>
                        </div>
                      </nav>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
