"use client";
import Toggle from "./Toggle";
import React, { useState, useEffect } from "react";
import RightSideNav from "./RightSideNav";
import config from "./config";
import { useRouter } from "next/navigation";
export default function BusinessLineTable() {
  const [people, setData] = useState([]);
  const [toggleStates, setToggleStates] = useState([]);
  const [details, setDetails] = useState(null);
  // const accessToken = localStorage.getItem('accessToken');
  const [accessToken, setAccessToken] = useState({});
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
    fetchData();
  }, [accessToken]); // Empty dependency array to ensure the effect runs once when the component mounts

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
          const updatedStates = prevStates.map((state) => {
            if (state.id === blId) {
              return { ...state, [field]: value };
            }
            return state;
          });
          // fetchData();
          return updatedStates;
        });
      } else {
        console.error("Failed to update business kind:", response.status);
      }
    } catch (error) {
      console.error("Error updating business kind:", error.message);
    }
  };

  // Function to trigger synchronization
  const handleSync = async () => {
    try {
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
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 sm:w-[80%]">
      <div className="sm:flex sm:items-center sm:w-[80%]">
        <div className="sm:flex-auto sm:mt-20">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Line section
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button type="button" className="btn-primary-sm" onClick={handleSync}>
            Sync
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Enable
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Active
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {people.map((person, index) => (
                  <tr key={person.id}>
                    <td className="whitespace-nowrap py-6 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      <button
                        className="px-1 py-1 hover:bg-gray-100 rounded"
                        onClick={() => handleShowSideNav(person.id, index)}
                      >
                        {person.name}
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Toggle
                        checked={person.enable}
                        onToggle={(value) =>
                          handleToggle(person.id, "enable", value)
                        }
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Toggle
                        checked={person.active}
                        onToggle={(value) =>
                          handleToggle(person.id, "active", value)
                        }
                      />
                    </td>
                  </tr>
                ))}
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
