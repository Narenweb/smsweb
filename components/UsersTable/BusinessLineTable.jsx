"use client";
import Toggle from "../Toggle";
import React, { useState, useEffect } from "react";
import RightSideNav from "./RightSideNav";
import config from "../config";
import { useRouter } from "next/navigation";
import { EditIcon, RightIcon, SearchIcon } from "@/app/Assets/icons";
import LoadingIndicator from "./LoadingIndicator";
export default function BusinessLineTable() {
  const [people, setData] = useState([]);
  const [toggleStates, setToggleStates] = useState([]);
  const [details, setDetails] = useState(null);
  // const accessToken = localStorage.getItem('accessToken');
  const [accessToken, setAccessToken] = useState({});
  const [isMainLoading, setIsMainLoading] = useState(true);
  const router = useRouter();
  const [responseData, setResponseData] = useState(null);
  const checkAuthentication = () => {
    const isAuthenticated = Boolean(localStorage.getItem("accessToken"));
    return isAuthenticated;
  };
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/line/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Replace with your actual access token
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setData(
          data.serviceResponse.businessLineList.map((item) => ({
            ...item,
            id: item.blId,
          }))
        );

        setToggleStates(
          data.serviceResponse.businessLineList.map((item) => ({
            enable: item.enable, // Adjust these based on your backend structure
            active: item.active,
            isSideNavOpen: false,
          }))
        );
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
    setTimeout(() => {
      setIsMainLoading(false);
    }, 2000);
    fetchData();
  }, [accessToken]);
  useEffect(() => {
    // Check if running on the client side
    const storedAccessToken =
      typeof window !== "undefined" && localStorage.getItem("accessToken");

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);

  const handleShowSideNav = async (blId, index) => {
    try {
      // Convert blId to the actual id used in the API
      const businessLineId = people.find((person) => person.blId === blId)?.id;

      if (!businessLineId) {
        console.error("Business Line ID not found for blId:", blId);
        return;
      }
      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/line/${businessLineId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Replace with your actual access token
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const updatedPeople = people.map((row) =>
          row.id === businessLineId
            ? { ...row, isSideNavOpen: !row.isSideNavOpen }
            : { ...row, isSideNavOpen: false }
        );

        setData(updatedPeople);
        // Update the toggle state for the corresponding row
        setToggleStates((prevStates) =>
          prevStates.map((state, i) =>
            i === index
              ? { ...state, isSideNavOpen: !state.isSideNavOpen }
              : state
          )
        );

        // You can update the details state with the fetched data
        setDetails(data.serviceResponse);
      } else {
        console.error("Failed to fetch details:", response.status);
      }
    } catch (error) {
      console.error("Error fetching details:", error.message);
    }
  };

  const handleToggle = async (blId, field, value) => {
    try {
      // Make API request to update the specified field (enable or active) for the business kind
      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/line/${blId}`,
        {
          method: "PUT", // Use PATCH method for partial updates
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [field]: value }),
        }
      );

      if (response.ok) {
        // Update the UI state (toggle state) if the API request is successful
        setToggleStates((prevStates) => {
          const index = prevStates.findIndex((state) => state.blId === blId);
          if (index !== -1) {
            const updatedState = { ...prevStates[index], [field]: value };
            const updatedStates = [...prevStates];
            updatedStates[index] = updatedState;
            return updatedStates;
          }

          console.log(prevStates);
          return [...prevStates];
        });
        // const work=await handleUpdate(bkId, 'enable', value);
        // console.log(work)
        fetchData();
      } else {
        console.error("Failed to update business kind:", response.status);
      }
    } catch (error) {
      console.error("Error updating business kind:", error.message);
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  // Function to trigger synchronization
  const handleSync = async () => {
    try {
      setIsLoading(true);

      // Make a request to the sync API endpoint
      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/line/sync`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Replace with your actual access token
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Sync successful, you may want to handle the response or update UI accordingly
        const data = await response.json();
        console.log("Sync Successful:", data);
      } else {
        // Handle error if the sync request fails
        console.error("Sync Failed:", response.status);

        // Log error response body for more information
        const responseBody = await response.json();
        console.error("Error response body:", responseBody);
      }
    } catch (error) {
      console.error("Error during sync:", error.message);
    } finally {
      // Stop loading animation after 2 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const filtered = people.filter((item) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchInput, people]);
  return (
    <div className="pr-4 sm:pr-6 lg:pr-8 sm:w-[80%] relative">
      <div className="absolute right-[-60px] sm:top-[-70px] lg:right-20  lg:top-[-60px]">
        {/* <button type="button" className="user-btn" onClick={handleSync}>
          <span className="text-lg font-medium">Sync</span>
        </button> */}
        <button
          type="button"
          className="user-btn"
          onClick={handleSync}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="text-lg font-medium">
              Syncing<span className="blinking-dots"></span>
            </span>
          ) : (
            <span className="text-lg font-medium">Sync</span>
          )}
        </button>
      </div>
      {/* search bar */}
      <div className="search-bar w-[58%] lg:w-[38%]">
        <div className="relative mt-5 rounded-md shadow-sm">
          <input
            type="text"
            name="account-number"
            id="account-number"
            className="block w-full rounded-md border py-3 px-4 text-gray-900  placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none border-[#E1E1E1]"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center pr-3">
            <SearchIcon PathClassName="stroke-gray-400" />
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root pb-40">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-transparent">
              <thead>
                <tr className="flex justify-between">
                  <th
                    scope="col"
                    className="py-3.5 pl-5 pr-3 text-left text-sm font-semibold text-gray-900 w-[25%]"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className=" py-3.5 text-left text-sm font-semibold text-gray-900 w-[20%]"
                  >
                    Enable
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 relative right-3 text-left text-sm font-semibold text-gray-900 w-[20%]"
                  >
                    Active
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-transparent">
                {isMainLoading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-32">
                      {/* Loading indicator or spinner */}
                      <LoadingIndicator />
                    </td>
                  </tr>
                ) : people.filter((row) =>
                    row.name.toLowerCase().includes(searchInput.toLowerCase())
                  ).length > 0 ? (
                  filteredData.map((person, index) => (
                    <tr key={person.id}>
                      <div className="bg-white rounded-[10px] flex items-center justify-between py-[25px] mb-3 px-4 w-full">
                        <td className="w-[25%]">
                          <div className=" ">
                            <button
                              className="px-1 hover:text-primaryColor rounded transition-all delay-[30]"
                              onClick={() =>
                                handleShowSideNav(person.id, index)
                              }
                            >
                              <span className="block max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
                                {person.name}
                              </span>
                            </button>
                          </div>
                        </td>
                        <td className="relative right-1 font-light w-[20%]">
                          <div className="">
                            <Toggle
                              checked={person.enable}
                              onToggle={(value) =>
                                handleToggle(person.id, "enable", value)
                              }
                            />
                          </div>
                        </td>
                        <td className="relative right-2 font-light w-[20%]">
                          {/* <div className=""> */}
                          <Toggle
                            checked={person.active}
                            onToggle={(value) =>
                              handleToggle(person.id, "active", value)
                            }
                          />
                          {/* </div> */}
                        </td>
                      </div>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-32 text-primaryColor text-3xl"
                    >
                      No results found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {people.map((row, index) => (
              <React.Fragment key={row.id}>
                {row.isSideNavOpen && (
                  <RightSideNav
                    bgColor2="bg-red-500"
                    text="text-white"
                    isSideNavOpen={row.isSideNavOpen}
                    onClose={() => handleShowSideNav(row.id, index)}
                    details={row}
                    toggleState={toggleStates[index]}
                    // onToggle={(field, value) => handleToggle(row.id, field, value)}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
