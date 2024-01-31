"use client";
import Toggle from "./Toggle";
import React, { useState, useEffect, useRef } from "react";
import RightSideNav from "./RightSideNav";
import EditRow from "./EditRow";
import AddRow from "./AddRow";
import config from "./config";
import { useRouter } from "next/navigation";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
class BusinessLine {
  constructor(blId, name, tenantId, enable, active, createdTime, updatedTime) {
    this.blId = blId;
    this.name = name;
    this.tenantId = tenantId;
    this.enable = enable;
    this.active = active;
    this.createdTime = createdTime;
    this.updatedTime = updatedTime;
  }
}

class BusinessLineResponse {
  constructor(successful, code, message, status, protocol, serviceResponse) {
    this.successful = successful;
    this.code = code;
    this.message = message;
    this.status = status;
    this.protocol = protocol;

    // Map businessLineList to an array of BusinessLine objects
    this.businessLineList = serviceResponse.businessLineList.map(
      (line) =>
        new BusinessLine(
          line.blId,
          line.name,
          line.tenantId,
          line.enable,
          line.active,
          line.createdTime,
          line.updatedTime
        )
    );
  }
}
export default function BusinessCategoryTable() {
  const [people, setData] = useState([]);
  const [details, setDetails] = useState(null);
  const [businessLineNamesMap, setBusinessLineNamesMap] = useState({});
  // const accessToken = localStorage.getItem("accessToken");
  const [businessKindOptions, setBusinessKindOptions] = useState([]);
  const [accessToken, setAccessToken] = useState({});
  const [selectedBusinessCategory, setSelectedBusinessCategory] =
    useState(null);
  const router = useRouter();

  const checkAuthentication = () => {
    const isAuthenticated = Boolean(localStorage.getItem("accessToken"));
    return isAuthenticated;
  };

  useEffect(() => {
    // Check if running on the client side
    const storedAccessToken =
      typeof window !== "undefined" && localStorage.getItem("accessToken");

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);

  useEffect(() => {
    fetchData();
    setIsAddRowOpen(false);
    const isAuthenticated = checkAuthentication();
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [accessToken]);
  const handleForceReload = () => {
    window.location.reload();
  };
  const businessLineOptions = Object.keys(businessLineNamesMap).map((blId) => ({
    label: businessLineNamesMap[blId],
    value: blId,
  }));
  const fetchBusinessKindOptions = async (selectedBlId) => {
    try {
      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/kind/all?blId=${selectedBlId}`,

        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);

        // Use the businessKindList with filtering based on selectedBlId
        const options = data.serviceResponse.businessKindList
          .filter((kind) => kind.blId === selectedBlId)
          .map((kind) => ({
            label: kind.name,
            value: kind.name,
            blId: kind.blId,
            bkId: kind.bkId,
          }));
        console.log("Options:", options);
        setBusinessKindOptions(options);
      } else {
        console.error(
          "Failed to fetch business kind options:",
          response.status
        );

        const responseBody = await response.json();
        console.error("Error response body:", responseBody);
      }
    } catch (error) {
      console.error("Error fetching business kind options:", error.message);
    }
  };
  // Fetch business line names
  const fetchBusinessLineNames = async () => {
    try {
      const businessLineNamesResponse = await fetch(
        `${config.host}/tenant/admin/v2/business/line/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (businessLineNamesResponse.ok) {
        const businessLineNamesData = await businessLineNamesResponse.json();
        // console.log(businessLineNamesData.serviceResponse.businessLineList)
        const businessLineResponse = new BusinessLineResponse(
          true,
          200,
          "OK",
          "OK",
          "PROTOCOL_JSON",
          businessLineNamesData.serviceResponse
        );

        setBusinessLineNamesMap(
          businessLineResponse.businessLineList.reduce((map, line) => {
            map[line.blId] = line.name;
            return map;
          }, {})
        );
      } else {
        console.error(
          "Failed to fetch business line names:",
          businessLineNamesResponse.status
        );
      }
    } catch (error) {
      console.error("Error fetching business line names:", error.message);
    }
  };

  // Fetch data
  const fetchData = async () => {
    try {
      await fetchBusinessLineNames(); // Fetch business line names once

      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/category/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Use businessLineNamesMap where needed
        const updatedData = data.serviceResponse.businessCategoryList.map(
          (item) => {
            const businessLineName = businessLineNamesMap[item.blId] || "N/A";
            return {
              ...item,
              id: item.bcId,
              businessLineName,
            };
          }
        );

        setData(updatedData);

        const toggleStates = data.serviceResponse.businessCategoryList.map(
          (item) => ({
            enable: item.enable,
            active: item.active,
          })
        );

        setToggleStates(toggleStates);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const [editRow, setEditRow] = useState(null);
  const [isAddRowOpen, setIsAddRowOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState(
    people.map(() => ({ enable: false, active: false }))
  );

  const handleAddRowToggle = () => {
    setIsAddRowOpen(!isAddRowOpen);
  };

  const handleToggle = (bcId, field, value) => {
    console.log("Toggling", { bcId, field, value });
  };

  const handleMainToggle = async (bcId, field, value) => {
    try {
      // Make API request to update the specified field (enable or active) for the business kind
      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/category/${bcId}`,
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
          const index = prevStates.findIndex((state) => state.bcId === bcId);
          if (index !== -1) {
            const updatedState = { ...prevStates[index], [field]: value };
            const updatedStates = [...prevStates];
            updatedStates[index] = updatedState;
            return updatedStates;
          }

          console.log(prevStates);
          fetchData();
          return [...prevStates];
        });
        // const work=await handleUpdate(bkId, 'enable', value);
        // console.log(work)
      } else {
        console.error("Failed to update business category:", response.status);
      }
    } catch (error) {
      console.error("Error updating business category:", error.message);
    }
  };

  const fetchBusinessKind = async () => {
    try {
      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/kind/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.serviceResponse.businessKindList;
      } else {
        console.error("Failed to fetch business categories:", response.status);
        return [];
      }
    } catch (error) {
      console.error("Error fetching business categories:", error.message);
      return [];
    }
  };
  //Edit component
  const handleEdit = async (row) => {
    try {
      // Fetch business categories
      const businessKind = await fetchBusinessKind();

      // Make a GET request to fetch the detailed information for the business kind
      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/category/${row.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const businessKindDetails = await response.json();

        // Map bcId to corresponding names
        const bkIdToNameMap = businessKind.reduce((map, kind) => {
          map[kind.bkId] = kind.name;
          return map;
        }, {});

        // Check if bcIds is not null before mapping
        const bkIds = businessKindDetails.serviceResponse.bkIds || [];

        // Use the updated data from the API response
        const businessLineOption = businessLineOptions.find(
          (option) => option.value === businessKindDetails.serviceResponse.blId
        );

        if (businessLineOption) {
          const businessLineName = businessLineOption.label || "N/A";
          const businessLineId = businessLineOption.value || "N/A";

          // Set EditRow state
          setEditRow({
            ...row,
            blId: businessLineOption.value,
            businessLine: businessLineName,
            businessLineId: businessLineId,
            bkIds: bkIds,
            bkNames: bkIds.map((bcId) => bkIdToNameMap[bcId] || "N/A"),
            // Use bcIds from the API response
          });

          // Log bcIds and bcNames
          console.log("bkIds", bkIds);
          console.log(
            "bkNames",
            bkIds.map((bcId) => bcIdToNameMap[bcId] || "N/A")
          );

          // Update ToggleStates
          setToggleStates((prevStates) =>
            prevStates.map((state, i) =>
              i === row.id - 1
                ? { ...state, enable: row.enable, active: row.active }
                : state
            )
          );
        } else {
          console.error(
            "Invalid business line ID during edit:",
            businessKindDetails.serviceResponse.blId
          );
        }
      } else {
        // Handle error
        console.error(
          "Failed to fetch business kind details:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching business kind details:", error.message);
    }
  };

  //Edit Row
  const updateBusinessCategory = async (bcId, blId, updatedData) => {
    try {
      console.log("businessLineOptions:", businessLineOptions);
      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/category/${bcId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        // Business kind updated successfully
        const updateBusinessCategory = await response.json();
        console.log(
          "Active in response:",
          updateBusinessCategory.serviceResponse.active
        );
        console.log("API Response:", updateBusinessCategory);
        // Update the local state immediately
        setData((prevData) =>
          prevData.map((row) =>
            row.id === updateBusinessCategory.serviceResponse.id
              ? {
                  ...row,
                  ...updateBusinessCategory.serviceResponse,
                  enable: updateBusinessCategory.serviceResponse.enable, // Set enable based on the API response
                  active: updateBusinessCategory.serviceResponse.active, // Set active based on the API response
                  businessLine:
                    businessLineOptions.find(
                      (option) =>
                        option.value ===
                        updateBusinessCategory.serviceResponse.blId
                    )?.label || "N/A",
                }
              : row
          )
        );

        setToggleStates((prevStates) =>
          prevStates.map((state) =>
            state.bcId === bcId
              ? {
                  ...state,
                  enable: updateBusinessCategory.serviceResponse.enable, // Set enable based on the API response
                  active: updateBusinessCategory.serviceResponse.active, // Set active based on the API response
                  [field]: value,
                }
              : state
          )
        );

        console.log(
          "blId in response:",
          updateBusinessCategory.serviceResponse.blId
        );
        console.log(
          "Mapped label:",
          businessLineOptions.find(
            (option) =>
              option.value === updateBusinessCategory.serviceResponse.blId
          )?.label
        );

        // Close the editing mode (if any)
        setEditRow(null);
      } else {
        // Handle error
        console.error("Failed to update business category:", response.status);
      }
    } catch (error) {
      console.error("Error updating business category:", error.message);
    }
  };
  const extractSelectedOptions = (bkIds) => {
    return bkIds ? bkIds.map((option) => option.bkId) : [];
  };
  // const handleUpdate = async (
  //   id,
  //   updatedName,
  //   updatedBusinessLine,
  //   enable,
  //   active,
  //   selectedBusinessCategory,
  //   bkNames
  // ) => {
  //   console.log("id:", id);
  //   console.log("updatedBusinessLine:", updatedBusinessLine);

  //   // Find the corresponding businessLineOption for the updatedBusinessLine
  //   const businessLineOption = businessLineOptions.find(
  //     (option) => option.label === updatedBusinessLine
  //   );

  //   // Ensure that businessLineOption is found before proceeding
  //   if (businessLineOption) {
  //     const existingBusinessKind = await response.json();
  //     const existingBcIds = existingBusinessKind.serviceResponse.bcIds || [];
  //     const updatedData = {
  //       name: updatedName,
  //       blId: businessLineOption.value,
  //       enable,
  //       active,
  //       bkIds: extractSelectedOptions(selectedBusinessCategory),
  //       bkNames:
  //         selectedBusinessCategory.map((option) => option.label) || bkNames,
  //     };

  //     // Update the local state immediately
  //     setData((prevData) =>
  //       prevData.map((row) =>
  //         row.id === id
  //           ? {
  //               ...row,
  //               ...updatedData,
  //             }
  //           : row
  //       )
  //     );
  //     //Main table toggle
  //     await handleMainToggle(id, "enable", enable);
  //     // setTimeout(() => {
  //     //   handleForceReload()
  //     // }, 500)
  //     // Update the businessKind using the correct blId, enable, and active
  //     await updateBusinessCategory(id, businessLineOption.value, updatedData);

  //     // Close the editing mode (if any)
  //     setEditRow(null);
  //   } else {
  //     console.error(
  //       "Invalid business line during update:",
  //       updatedBusinessLine
  //     );
  //   }
  // };
  //2
  const handleUpdate = async (
    id,
    updatedName,
    updatedBusinessLine,
    enable,
    active,
    selectedBusinessCategory,
    bkNames
  ) => {
    console.log("id:", id);
    console.log("updatedBusinessLine:", updatedBusinessLine);
    console.log("updatedBusinessLine:", updatedBusinessLine);

    // Find the corresponding businessLineOption for the updatedBusinessLine
    const businessLineOption = businessLineOptions.find(
      (option) => option.label === updatedBusinessLine
    );

    if (businessLineOption) {
      // Fetch the existing bcIds from the API response
      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/category/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const existingBusinessKind = await response.json();
        const existingBcIds = existingBusinessKind.serviceResponse.bkIds || [];

        // Concatenate the existing bcIds with the new ones
        const updatedData = {
          name: updatedName,
          blId: businessLineOption.value,
          enable,
          active,
          bkIds: [
            ...extractSelectedOptions(selectedBusinessCategory),
            ...existingBcIds,
          ],
          bkNames:
            selectedBusinessCategory.map((option) => option.label) || bkNames,
        };

        // Update the local state immediately
        setData((prevData) =>
          prevData.map((row) =>
            row.id === id
              ? {
                  ...row,
                  ...updatedData,
                }
              : row
          )
        );

        // Update the businessKind using the correct blId, enable, and active
        //Main table toggle
        await handleMainToggle(id, "enable", enable);
        // setTimeout(() => {
        //   handleForceReload()
        // }, 500)
        await updateBusinessCategory(id, businessLineOption.value, updatedData);

        // Close the editing mode (if any)
        setEditRow(null);
      } else {
        console.error(
          "Failed to fetch business kind details:",
          response.status
        );
      }
    } else {
      console.error(
        "Invalid business line during update:",
        updatedBusinessLine
      );
    }
  };
  //Add Row

  const handleAdd = async (newRow) => {
    try {
      // Trim and convert to lowercase for case-insensitive comparison
      const normalizedBusinessLine = newRow.businessLine.trim().toLowerCase();

      // Find the selected business line in a case-insensitive manner
      const selectedBusinessLine = businessLineOptions.find(
        (line) => line.label.trim().toLowerCase() === normalizedBusinessLine
      );

      if (!selectedBusinessLine || !selectedBusinessLine.value) {
        console.error("Invalid selected business line.");
        return;
      }

      newRow.blId = selectedBusinessLine.value;

      console.log("Before API Call local - newRow:", newRow);
      console.log("enable from newRow before", newRow.enable);
      console.log("active from newRow before", newRow.active);

      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/category`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Replace with your actual access token
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRow),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("After updating API Response Data:", data.serviceResponse);
        // Set toggleStates based on the extracted values
        setToggleStates((prevStates) => [
          ...prevStates,
          {
            enable: data.serviceResponse.enable,
            active: data.serviceResponse.active,
            isSideNavOpen: false,
          },
        ]);

        const { enable, active } = data.serviceResponse;
        console.log("enable from API:", enable);
        console.log("active from API:", active);

        // Use the extracted values for updating state
        setData((prevData) => [...prevData, data.serviceResponse]);

        // Fetch data after adding the new row
        await fetchData();
        setIsAddRowOpen(false);
        // Additional logic for toggles and state updates similar to handleUpdate
        // Set the main toggle for the new row
        // await handleAddToggle('enable', data.serviceResponse.enable);

        // Additional logic for toggles and state updates similar to handleUpdate
        // Set the main toggle for the new row
        // await handleMainToggle(data.serviceResponse.id, 'enable', enable);
        // setTimeout(() => {
        //   handleForceReload();
        // }, 500);
      } else {
        console.error("Failed to add business category:", response.status);

        const responseBody = await response.json();
        console.error("Error response body:", responseBody);
      }
    } catch (error) {
      console.error("Error adding business category:", error.message);
    }
  };
  const handleAddUpdate = async (
    enable,
    active,
    name,
    businessLine,
    selectedOptions
  ) => {
    try {
      const businessLineOption = businessLineOptions.find(
        (option) => option.label === businessLine
      );

      if (businessLineOption) {
        const bkIds = selectedOptions
          ? selectedOptions.map((option) => option.bkId)
          : [];
        const newRow = {
          name,
          businessLine: businessLineOption.label,
          bkIds,
          blId: businessLineOption.value,
          enable,
          active,
          isSideNavOpen: false,
        };

        // const selectedBkIds = businessCategory.map((category) => category.bkId);
        // console.log('Selected BK IDs:', selectedBkIds);
        // newRow.bkIds = selectedBkIds;
        console.log("Business Kind Options:", businessKindOptions);
        await handleAdd(newRow);
        setEditRow(null);
      } else {
        console.error("Invalid business line during add:", businessLine);
      }
    } catch (error) {
      console.error("Error adding business category:", error.message);
    }
  };

  const handleAddToggle = (field, value) => {
    console.log("Add Toggling", { field, value });
    // Handle toggling logic here if needed
  };
  const handleShowSideNav = async (bcId, index) => {
    try {
      const businessCategoryId = people.find(
        (person) => person.bcId === bcId
      )?.id;

      if (!businessCategoryId) {
        console.error("Business Line ID not found for bcId:", bcId);
        return;
      }

      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/category/${businessCategoryId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        const businessKind = await fetchBusinessKind();

        // Map bcIds to corresponding names
        const bcIdToNameMap = businessKind.reduce((map, kind) => {
          map[kind.bkId] = kind.name;
          return map;
        }, {});
        const updatedPeople = people.map((row) => {
          if (row.id === businessCategoryId) {
            return {
              ...row,
              isSideNavOpen: !row.isSideNavOpen,
              businessLine:
                businessLineNamesMap[
                  people.find((person) => person.id === businessCategoryId)
                    ?.blId
                ] || data.serviceResponse.businessLineName,
              createdTime: data.serviceResponse.createdTime,
              updatedTime: data.serviceResponse.updatedTime,
              businessCategory: data.serviceResponse.bkIds || [], // Provide a default value if bcIds is null
              businessCategoryNames:
                data.serviceResponse.bkIds?.map(
                  (bkId) => bcIdToNameMap[bkId] || "N/A"
                ) || [],
            };
          } else {
            return {
              ...row,
              isSideNavOpen: false,
              businessLine: row.businessLineName,
              createdTime: row.createdTime,
              updatedTime: row.updatedTime,
            };
          }
        });

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

  const handleCancelEdit = () => {
    setEditRow(null);
    setIsAddRowOpen(false);
  };

  return (
    <>
      <div className={`overflow-hidden px-4 sm:px-6 lg:px-8 `}>
        <div className="sm:flex sm:items-center w-[90%]">
          <div className="sm:flex-auto sm:mt-20">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Category section
            </h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="btn-primary-sm"
              onClick={handleAddRowToggle}
            >
              Add
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-[90%] py-2 align-middle sm:px-6 lg:px-8">
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
                      className="py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Business Line
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
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Edit
                    </th>
                    {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Delete
                    </th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {people.map((row) => (
                    <tr key={row.id}>
                      <td className="whitespace-nowrap py-6 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        <button
                          className="px-1 py-1 hover:bg-gray-100 rounded"
                          onClick={() => handleShowSideNav(row.id)}
                        >
                          {row.name}
                        </button>
                      </td>
                      <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-900 sm:pl-0">
                        {/* {console.log('businessLineNamesMap:', businessLineNamesMap)} */}
                        {businessLineNamesMap[row.blId] || "N/A"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Toggle
                          checked={row.enable}
                          onToggle={(value) =>
                            handleMainToggle(row.id, "enable", value)
                          }
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Toggle
                          checked={row.active}
                          onToggle={(value) =>
                            handleMainToggle(row.id, "active", value)
                          }
                        />
                      </td>

                      <td className="whitespace-nowrap py-4 text-sm text-gray-500">
                        {/* Edit Icon */}
                        <button
                          className="px-3 py-1 ml-2 rounded text-white hover:bg-gray-100"
                          onClick={() => handleEdit(row)}
                        >
                          <IoPencilOutline className="h-5 w-5 text-blue-600" />
                        </button>
                      </td>
                      {/* <td className="whitespace-nowrap py-4 text-sm text-gray-500">
                        <button className="px-3 py-1 ml-2  text-customRed rounded hover:bg-gray-100" onClick={() => handleDelete(person.id)}>
                          <IoTrashOutline className="h-5 w-5" />
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {people.map((row, index) => (
        <React.Fragment key={row.id}>
          {row.isSideNavOpen && (
            <RightSideNav
              bgColor2="bg-red-500"
              text="text-white"
              isSideNavOpen={row.isSideNavOpen}
              business={"Business Kind"}
              onClose={() => handleShowSideNav(row.id, index)}
              details={row}
              toggleState={toggleStates[index]}
              onToggle={(field, value) => handleToggle(row.id, field, value)}
            />
          )}
          {editRow !== null && editRow.id === row.id && (
            <EditRow
              id={editRow.id}
              heading="EDIT BUSINESS CATEGORY"
              name={editRow.name}
              businessLine={editRow.businessLine}
              businessCategory={editRow.businessCategory}
              blId={editRow.blId}
              bcNames={editRow.bkNames}
              business={"Business Kind"}
              handleUpdateRow={handleUpdate}
              onCancel={handleCancelEdit}
              businessLineOptions={businessLineOptions}
              toggleState={toggleStates[index]}
              onToggle={(field, value) =>
                handleToggle(editRow.id, field, value)
              }
              fetchBusinessKindOptions={fetchBusinessKindOptions}
              businessKindOptions={businessKindOptions}
              businessNames="Select Bussiness Kind"
            />
          )}
        </React.Fragment>
      ))}

      {isAddRowOpen && (
        <AddRow
          heading="ADD NEW BUSINESS CATEGORY"
          // onAdd={handleAdd}
          business="Business Kind"
          // toggleState={toggleStates[index]}
          onToggle={(field, value) => handleAddToggle(field, value)}
          onCancel={handleCancelEdit}
          businessLineOptions={businessLineOptions}
          fetchBusinessKindOptions={fetchBusinessKindOptions}
          businessKindOptions={businessKindOptions}
          handleAddUpdate={handleAddUpdate}
          businessNames="Select Bussiness Kind"
        />
      )}
    </>
  );
}
