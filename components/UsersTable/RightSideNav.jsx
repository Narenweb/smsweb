import React, { useState, useEffect, useRef } from "react";
import Toggle from "../Toggle";
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
  const {
    id,
    name,
    businessLine,
    businessCategory,
    businessCategoryNames,
    createdTime,
    updatedTime,
  } = details;

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
      <Dialog
        as="div"
        className="relative z-10"
        onClose={setOpen}
        onClick={() => setOpen(false)}
      >
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
                <Dialog.Panel className="pointer-events-auto w-screen sm:max-w-lg md:max-w-xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl rounded-l-3xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-end">
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-theme focus:ring-offset-2"
                            onClick={() => setOpen(false)}
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
                        <h2 className="text-xl font-bold mb-10">Details</h2>
                        <div className="space-y-10 pb-16 mt-10 ml-10">
                          <p className="mb-3 font-bold">
                            ID : <span className="font-normal">{id}</span>
                          </p>
                          <p className="mb-3 font-bold">
                            Name : <span className="font-normal">{name}</span>
                          </p>
                          <div className="flex items-center mb-3">
                            <p className="mr-3 font-bold">Enable :</p>
                            {/* With toggle functionality use this below one */}
                            {/* <Toggle checked={toggleState.enable} onToggle={(value) => onToggle('enable', value)} /> */}
                            <Toggle checked={toggleState.enable} />
                          </div>
                          <div className="flex w-28 items-center mb-3">
                            <p className="mr-3 font-bold">Active :</p>
                            {/* <Toggle checked={toggleState.active} onToggle={(value) => onToggle('active', value)} /> */}
                            <Toggle checked={toggleState.active} />
                          </div>

                          {businessLine && businessLine.length > 0 && (
                            <p className="mb-3 font-bold">
                              Business Line :{" "}
                              <span className="font-normal">
                                {businessLine}
                              </span>
                            </p>
                          )}
                          {businessCategoryNames &&
                            businessCategoryNames.length > 0 && (
                              <div className="mb-3 flex items-center flex-wrap">
                                <label className="mb-3 font-bold">{business} : </label>
                                {/* <div className=""> */}
                                  {businessCategoryNames.map(
                                    (category, index) => (
                                      <div
                                        key={index}
                                        className="bg-[#F6E1FF] ml-2 rounded-xl p-2 mb-2 w-auto text-gray-600 min-w-[30px]"
                                      >
                                        {category}
                                      </div>
                                    )
                                  )}
                                {/* </div> */}
                              </div>
                            )}
                          <p className="mb-3 font-bold">
                            Created At :{" "}
                            <span className="font-normal">
                              {format(createdAt, "yyyy-MM-dd HH:mm:ss")}
                            </span>
                          </p>
                          {updatedAt && (
                            <p className="mb-3 font-bold">
                              Updated At :{" "}
                              <span className="font-normal">
                                {format(updatedAt, "yyyy-MM-dd HH:mm:ss")}
                              </span>
                            </p>
                          )}
                          {/* That api time */}
                          {/* <p className="mb-3">Created At: {createdTime}</p>
                          {updatedAt && <p className="mb-3">Updated At: {updatedTime}</p>} */}
                          <button
                            // onClick={onClose}
                            onClick={() => setOpen(false)}
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
