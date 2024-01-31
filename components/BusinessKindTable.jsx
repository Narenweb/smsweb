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
export default function BusinessKindTable() {
  const [people, setData] = useState([]);
  const [details, setDetails] = useState(null);
  const [businessLineNamesMap, setBusinessLineNamesMap] = useState({});
  // const accessToken = localStorage.getItem("accessToken"); 
  const [accessToken, setAccessToken] = useState({});
  const [businessKindOptions, setBusinessKindOptions] = useState([]);
  const router = useRouter();
  const checkAuthentication = () => {
    const isAuthenticated = Boolean(accessToken);
    return isAuthenticated;
  };
  const handleForceReload = () => {
    window.location.reload();
  };
  const businessLineOptions = Object.keys(businessLineNamesMap).map((blId) => ({
    label: businessLineNamesMap[blId],
    value: blId,
  }));

  useEffect(() => {
    // Check if running on the client side
    const storedAccessToken = typeof window !== 'undefined' && localStorage.getItem('accessToken');

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);
  //businessCategory
  const fetchBusinessKindOptions = async (selectedBlId) => {
    try {
      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/category/all?blId=${selectedBlId}`,

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
        const options = data.serviceResponse.businessCategoryList
          .filter((category) => category.blId === selectedBlId)
          .map((kind) => ({
            label: kind.name,
            value: kind.name,
            blId: kind.blId,
            bcId: kind.bcId,
          }));
        console.log("Options:", options);
        const labels = options.map((option) => option.label);
        console.log("Labels:", labels);
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
        console.log(businessLineNamesData.serviceResponse.businessLineList);
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

  // console.log('businessLineNamesMap:', businessLineNamesMap);
  // console.log('businessLineList:', businessLineNamesMap.businessLineList);

  // const businessLineOptions = businessLineNamesMap
  //   ? Object.keys(businessLineNamesMap).map((blId) => ({
  //     label: businessLineNamesMap[blId],
  //     value: blId,
  //   }))
  //   : [];

  // console.log('businessLineOptions:', businessLineOptions);

  // Fetch data
  const fetchData = async () => {
    try {
      await fetchBusinessLineNames(); // Fetch business line names once

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

        // Use businessLineNamesMap where needed
        const updatedData = data.serviceResponse.businessKindList.map(
          (item) => {
            const businessLineName = businessLineNamesMap[item.blId] || "N/A";
            return {
              ...item,
              id: item.bkId,
              businessLineName,
            };
          }
        );

        setData(updatedData);

        const toggleStates = data.serviceResponse.businessKindList.map(
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

  useEffect(() => {
    fetchData();
    setIsAddRowOpen(false);
    const isAuthenticated = checkAuthentication();
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [accessToken]);

  const [editRow, setEditRow] = useState(null);
  const [isAddRowOpen, setIsAddRowOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState(
    people.map(() => ({ enable: false, active: false }))
  );

  const handleAddRowToggle = () => {
    setIsAddRowOpen(!isAddRowOpen);
  };

  // const handleAdd = (newRow) => {
  //   // Generate a unique ID for the new row
  //   const newId = Math.max(...people.map((row) => row.id), 0) + 1;
  //   const newDataRow = { id: newId, ...newRow, isSideNavOpen: false };
  // console.log(newId);
  //   // Append the new row to the end of the data array
  //   setData((prevData) => [...prevData, newDataRow]);

  //   // Update the toggle states for the new row with values from mainTableToggles
  //   setToggleStates((prevStates) => [
  //     ...prevStates,
  //     { enable: mainTableToggles.enable, active: mainTableToggles.active },
  //   ]);

  //   setIsAddRowOpen(false);
  // };

  // const handleToggleAdd = (id, field, value) => {
  //   console.log('Toggling', { id, field, value });
  //   setData((prevPeople) =>
  //     prevPeople.map((row) =>
  //       row.id === id ? { ...row, [field]: value } : row
  //     )
  //   );

  //   // Update the toggle states for the corresponding row
  //   setToggleStates((prevStates) =>
  //     prevStates.map((state, i) => (i === id - 1 ? { ...state, [field]: value } : state))
  //   );
  // };

  // const handleAdd = async (newRow) => {
  //   try {
  //     // Ensure that the necessary properties are present in the new row
  //     if (!newRow.name || !newRow.businessLine) {
  //       console.error('Name, Business Line are required.');
  //       return;
  //     }

  //     // Fetch the business line details
  //     const businessLineResponse = await fetch(`${config.host}/tenant/admin/v2/business/line/all`, {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${accessToken}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (businessLineResponse.ok) {
  //       const businessLineData = await businessLineResponse.json();

  //       // Log the business line data for debugging
  //       console.log('Business Line Data:', businessLineData);

  //       // Trim and convert to uppercase for case-insensitive comparison
  //       const normalizedBusinessLine = newRow.businessLine.trim().toLowerCase();

  //       // Find the selected business line in a case-insensitive manner
  //       const selectedBusinessLine = businessLineData.serviceResponse.businessLineList.find(
  //         line => line.name.trim().toLowerCase() === normalizedBusinessLine
  //       );
  //       // Log the selected business line for debugging
  //       console.log('Selected Business Line:', selectedBusinessLine);

  //       // Check if the selected business line exists
  //       if (!selectedBusinessLine || selectedBusinessLine.blId == null) {
  //         console.error('Invalid response from the business line API.');
  //         return;
  //       }

  //       // Log the blId for debugging
  //       console.log('Selected blId:', selectedBusinessLine.blId);

  //       // Use the blId from the selected business line in the new row
  //       newRow.blId = selectedBusinessLine.blId;

  //       console.log('Before API Call - newRow:', newRow);

  //       const response = await fetch(`${config.host}/tenant/admin/v2/business/kind`, {
  //         method: 'POST',
  //         headers: {
  //           'Authorization': `Bearer ${accessToken}`, // Replace with your actual access token
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(newRow),
  //       });

  //       if (response.ok) {
  //         // Business kind added successfully
  //         const data = await response.json();

  //         // Log the response data for debugging
  //         console.log('API Response Data:', data);

  //         // Update the data state with the newly added business kind, including the received bkId
  //         setData((prevData) => [...prevData, data.serviceResponse]);

  //         setToggleStates((prevStates) => {
  //           const newState = [
  //             ...prevStates,
  //             { enable: data.serviceResponse.enable, active: data.serviceResponse.active, isSideNavOpen: false },
  //           ];
  //           return newState;
  //         });

  //         console.log('Toggle States after API response:', toggleStates);

  //         console.log('In local', newRow)
  //         // Fetch data after adding the new row
  //         await fetchData();
  //         setIsAddRowOpen(false);
  //       } else {
  //         // Handle error
  //         console.error('Failed to add business kind:', response.status);

  //         // Log error response body for more information
  //         const responseBody = await response.json();
  //         console.error('Error response body:', responseBody);
  //       }
  //       // Continue with the rest of the handleAdd function...
  //       // (remaining code remains unchanged)
  //     } else {
  //       // Handle error
  //       console.error('Failed to fetch business line details:', businessLineResponse.status);
  //     }
  //   } catch (error) {
  //     console.error('Error adding business kind:', error.message);
  //   }
  // };
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
      console.log("enable from local row", newRow.enable);
      console.log("active from local row", newRow.active);

      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/kind`,
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
        console.log("API Response Data:", data.serviceResponse);
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
      const bcIds = selectedOptions
        ? selectedOptions.map((option) => option.bcId)
        : [];
      if (businessLineOption) {
        const newRow = {
          name,
          businessLine: businessLineOption.label,
          bcIds,
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
      console.error("Error adding business kind:", error.message);
    }
  };

  const handleAddToggle = (field, value) => {
    console.log("Add Toggling", { field, value });
  };

  const handleToggle = (bkId, field, value) => {
    console.log("Toggling", { bkId, field, value });
    // setToggleStates((prevStates) => {
    //   const updatedStates = prevStates.map((state) => {
    //     if (state.bkId === bkId) { // Adapt this line based on the actual structure
    //       return { ...state, [field]: value };
    //     }

    //     return state;
    //   });

    //   return updatedStates;
    // });
  };

  const handleMainToggle = async (bkId, field, value) => {
    try {
      // Make API request to update the specified field (enable or active) for the business kind
      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/kind/${bkId}`,
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
          const index = prevStates.findIndex((state) => state.bkId === bkId);
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
        console.error("Failed to update business kind:", response.status);
      }
    } catch (error) {
      console.error("Error updating business kind:", error.message);
    }
  };
  // Fetch business categories
  const fetchBusinessCategories = async () => {
    try {
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
        return data.serviceResponse.businessCategoryList;
      } else {
        console.error("Failed to fetch business categories:", response.status);
        return [];
      }
    } catch (error) {
      console.error("Error fetching business categories:", error.message);
      return [];
    }
  };

  const handleEdit = async (row) => {
    try {
      // Fetch business categories
      const businessCategories = await fetchBusinessCategories();

      // Make a GET request to fetch the detailed information for the business kind
      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/kind/${row.id}`,
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
        const bcIdToNameMap = businessCategories.reduce((map, category) => {
          map[category.bcId] = category.name;
          return map;
        }, {});

        // Check if bcIds is not null before mapping
        const bcIds = businessKindDetails.serviceResponse.bcIds || [];

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
            bcIds: bcIds,
            bcNames: bcIds.map((bcId) => bcIdToNameMap[bcId] || "N/A"),
            // Use bcIds from the API response
          });

          // Log bcIds and bcNames
          console.log("bcIds", bcIds);
          console.log(
            "bcNames",
            bcIds.map((bcId) => bcIdToNameMap[bcId] || "N/A")
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

  const updateBusinessKind = async (bkId, blId, updatedData) => {
    try {
      console.log("businessLineOptions:", businessLineOptions);
      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/kind/${bkId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      console.log("updated data", updatedData);
      if (response.ok) {
        // Business kind updated successfully
        const updatedBusinessKind = await response.json();
        console.log(
          "Active in response:",
          updatedBusinessKind.serviceResponse.active
        );
        console.log("API Response:", updatedBusinessKind);
        console.log(
          "bcIds in response:",
          updatedBusinessKind.serviceResponse.bcIds
        );
        // Update the local state immediately
        setData((prevData) =>
          prevData.map((row) =>
            row.id === updatedBusinessKind.serviceResponse.id
              ? {
                  ...row,
                  ...updatedBusinessKind.serviceResponse,
                  enable: updatedBusinessKind.serviceResponse.enable, // Set enable based on the API response
                  active: updatedBusinessKind.serviceResponse.active, // Set active based on the API response
                  businessLine:
                    businessLineOptions.find(
                      (option) =>
                        option.value ===
                        updatedBusinessKind.serviceResponse.blId
                    )?.label || "N/A",
                }
              : row
          )
        );

        setToggleStates((prevStates) =>
          prevStates.map((state) =>
            state.bkId === bkId
              ? {
                  ...state,
                  enable: updatedBusinessKind.serviceResponse.enable, // Set enable based on the API response
                  active: updatedBusinessKind.serviceResponse.active, // Set active based on the API response
                  [field]: value,
                }
              : state
          )
        );

        console.log(
          "blId in response:",
          updatedBusinessKind.serviceResponse.blId
        );
        console.log(
          "Mapped label:",
          businessLineOptions.find(
            (option) =>
              option.value === updatedBusinessKind.serviceResponse.blId
          )?.label
        );

        // Close the editing mode (if any)
        setEditRow(null);
      } else {
        // Handle error
        console.error("Failed to update business kind:", response.status);
      }
    } catch (error) {
      console.error("Error updating business kind:", error.message);
    }
  };
  const logBcIds = (options) => {
    options.forEach((option) => {
      console.log("Label:", option.label);
      console.log("bcId:", option.bcId);
    });
  };
  const extractSelectedOptions = (bcIds) => {
    return bcIds ? bcIds.map((option) => option.bcId) : [];
  };
  const handleUpdate = async (
    id,
    updatedName,
    updatedBusinessLine,
    enable,
    active,
    selectedBusinessCategory,
    bcNames
  ) => {
    console.log("id:", id);
    console.log("updatedBusinessLine:", updatedBusinessLine);
    console.log("Selected business types:", selectedBusinessCategory);

    // Find the corresponding businessLineOption for the updatedBusinessLine
    const businessLineOption = businessLineOptions.find(
      (option) => option.label === updatedBusinessLine
    );

    if (businessLineOption) {
      // Fetch the existing bcIds from the API response
      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/kind/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const existingBusinessKind = await response.json();
        const existingBcIds = existingBusinessKind.serviceResponse.bcIds || [];

        // Concatenate the existing bcIds with the new ones
        const updatedData = {
          name: updatedName,
          blId: businessLineOption.value,
          enable,
          active,
          bcIds: [
            ...extractSelectedOptions(selectedBusinessCategory),
            ...existingBcIds,
          ],
          bcNames:
            selectedBusinessCategory.map((option) => option.label) || bcNames,
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
        await updateBusinessKind(id, businessLineOption.value, updatedData);

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

  const handleShowSideNav = async (bkId, index) => {
    try {
      const businessKindId = people.find((person) => person.bkId === bkId)?.id;

      if (!businessKindId) {
        console.error("Business Line ID not found for bkId:", bkId);
        return;
      }

      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/kind/${businessKindId}`,
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

        // Fetch business categories
        const businessCategories = await fetchBusinessCategories();

        // Map bcIds to corresponding names
        const bcIdToNameMap = businessCategories.reduce((map, category) => {
          map[category.bcId] = category.name;
          return map;
        }, {});

        const updatedPeople = people.map((row) => {
          if (row.id === businessKindId) {
            return {
              ...row,
              isSideNavOpen: !row.isSideNavOpen,
              businessLine:
                businessLineNamesMap[row.blId] ||
                data.serviceResponse.businessLineName,
              createdTime: data.serviceResponse.createdTime,
              updatedTime: data.serviceResponse.updatedTime,
              businessCategory: data.serviceResponse.bcIds || [], // Provide a default value if bcIds is null
              businessCategoryNames:
                data.serviceResponse.bcIds?.map(
                  (bcId) => bcIdToNameMap[bcId] || "N/A"
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

        setToggleStates((prevStates) =>
          prevStates.map((state, i) =>
            i === index
              ? { ...state, isSideNavOpen: !state.isSideNavOpen }
              : state
          )
        );

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
              Kind section
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
              business={"Business Category"}
              onClose={() => handleShowSideNav(row.id, index)}
              details={row}
              toggleState={toggleStates[index]}
              onToggle={(field, value) => handleToggle(row.id, field, value)}
            />
          )}

          {editRow !== null && editRow.id === row.id && (
            <EditRow
              id={editRow.id}
              heading="EDIT BUSINESS KIND"
              name={editRow.name}
              // selectedOptions={editRow.selectedOptions}
              bcIds={editRow.bcIds}
              businessLine={editRow.businessLine}
              businessCategory={editRow.businessCategory}
              business={"Business Category"}
              handleUpdateRow={handleUpdate}
              onCancel={handleCancelEdit}
              businessLineOptions={businessLineOptions}
              toggleState={toggleStates[index]}
              onToggle={(field, value) =>
                handleToggle(editRow.id, field, value)
              }
              fetchBusinessKindOptions={fetchBusinessKindOptions}
              businessKindOptions={businessKindOptions}
              businessNames="Select Bussiness Category"
              bcNames={editRow.bcNames}
              blId={editRow.blId}
              logBcIds={logBcIds}
              updateBcNames={(newBcNames) =>
                setEditRow({ ...editRow, bcNames: newBcNames })
              }
            />
          )}
        </React.Fragment>
      ))}

      {isAddRowOpen && (
        <AddRow
          heading="ADD NEW BUSINESS KIND"
          // onAdd={handleAdd}
          business="Business Category"
          // toggleState={toggleStates[index]}
          onToggle={(field, value) => handleAddToggle(field, value)}
          onCancel={handleCancelEdit}
          businessLineOptions={businessLineOptions}
          fetchBusinessKindOptions={fetchBusinessKindOptions}
          businessKindOptions={businessKindOptions}
          handleAddUpdate={handleAddUpdate}
          businessNames="Select Bussiness Category"
        />
      )}
    </>
  );
}
