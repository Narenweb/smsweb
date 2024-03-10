"use client";
import Toggle from "../Toggle";
import React, { useState, useEffect, useRef } from "react";
import RightSideNav from "./RightSideNav";
import EditRow from "./EditRow";
import AddRow from "./AddRow";
import config from "../config";
import { useRouter } from "next/navigation";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { EditIcon, RightIcon, SearchIcon } from "@/app/Assets/icons";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import CustomSelect from "./CountDropdown";
import LoadingIndicator from "./LoadingIndicator";
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
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  const checkAuthentication = () => {
    const isAuthenticated = Boolean(localStorage.getItem("accessToken"));
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
    const storedAccessToken =
      typeof window !== "undefined" && localStorage.getItem("accessToken");

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
  const [searchInput, setSearchInput] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(20);

  // Fetch data
  // const fetchData = async () => {
  //   try {
  //     await fetchBusinessLineNames(); // Fetch business line names once

  //     const response = await fetch(
  //       `${config.host}/tenant/admin/v2/business/kind/all`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();

  //       // Filter data based on search input
  //       const filteredData = data.serviceResponse.businessKindList.filter(
  //         (item) => item.name.toLowerCase().includes(searchInput.toLowerCase())
  //       );

  //       // Use businessLineNamesMap where needed
  //       const updatedData = filteredData.map((item) => {
  //         const businessLineName = businessLineNamesMap[item.blId] || "N/A";
  //         return {
  //           ...item,
  //           id: item.bkId,
  //           businessLineName,
  //         };
  //       });

  //       setData(updatedData);

  //       const toggleStates = filteredData.map((item) => ({
  //         enable: item.enable,
  //         active: item.active,
  //       }));

  //       setToggleStates(toggleStates);
  //     } else {
  //       console.error("Failed to fetch data:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error.message);
  //   }
  // };

  const fetchData = async (pageNo = 1, pageSize = 20) => {
    try {
      const response = await fetch(
        `${config.host}/tenant/admin/v2/business/kind/all?pageNo=${pageNo}&pageSize=${pageSize}`,
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

        // Calculate the total number of pages based on the total number of items and items per page
        const totalItems = data.serviceResponse.businessKindList.length; // Assuming this is the total number of items
        // const totalPages = Math.ceil(totalItems / pageSize);
        const totalPages = 10;
        setTotalPages(totalPages); // Update the totalPages state

        // Filter data based on search input
        const filteredData = data.serviceResponse.businessKindList.filter(
          (item) => item.name.toLowerCase().includes(searchInput.toLowerCase())
        );

        // Use businessLineNamesMap where needed
        const updatedData = filteredData.map((item) => {
          const businessLineName = businessLineNamesMap[item.blId] || "N/A";
          return {
            ...item,
            id: item.bkId,
            businessLineName,
          };
        });

        setData(updatedData);

        const toggleStates = filteredData.map((item) => ({
          enable: item.enable,
          active: item.active,
        }));

        setToggleStates(toggleStates);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleRecordsPerPageChange = (value) => {
    setRecordsPerPage(value);
    setCurrentPage(1);
    fetchData(1, value);
  };

  const topRef = useRef(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page);
    scrollToTop();
  };

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    fetchData(currentPage, recordsPerPage);
    fetchBusinessLineNames();
    setIsAddRowOpen(false);
    const isAuthenticated = checkAuthentication();
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [accessToken, currentPage, recordsPerPage]);

  const [editRow, setEditRow] = useState(null);
  const [isAddRowOpen, setIsAddRowOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState(
    people.map(() => ({ enable: false, active: false }))
  );

  const handleAddRowToggle = () => {
    setIsAddRowOpen(!isAddRowOpen);
    console.log("add is clicked");
  };

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
        //Set the pagination to one
        setCurrentPage(1);
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
        // await getBusinessKind();
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
        setToggleStates((prevStates) => {
          const index = prevStates.findIndex((state) => state.bkId === bkId);
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
      setEditRow(!editRow);
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
        // const bcIdToNameMap = businessCategories.reduce((map, category) => {
        //   map[category.bcId] = category.name;
        //   return map;
        // }, {});

        //------For bcId and bkid adding-----

        const bcIdToNameMap = businessCategories.reduce((map, category) => {
          map[category.bcId] = { name: category.name, id: category.bcId };
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
          // setEditRow({
          //   ...row,
          //   blId: businessLineOption.value,
          //   businessLine: businessLineName,
          //   businessLineId: businessLineId,
          //   bcIds: bcIds,
          //   bcNames: bcIds.map((bcId) => bcIdToNameMap[bcId] || "N/A"),
          //   // Use bcIds from the API response
          // });

          //------For bcId and bkid adding-----

          setEditRow({
            ...row,
            blId: businessLineOption.value,
            businessLine: businessLineName,
            businessLineId: businessLineId,
            bcIds: bcIds,
            bcNames: bcIds.map((bcId) => {
              const businessCategory = bcIdToNameMap[bcId];
              return businessCategory
                ? {
                    label: businessCategory.name,
                    value: businessCategory.name,
                    bcId: businessCategory.id,
                    blId: businessKindDetails.serviceResponse.blId,
                  }
                : { label: "N/A", value: "N/A" }; // Return an object with label and value properties
            }),
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
        // await fetchData();
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
  // const handleUpdate = async (
  //   id,
  //   updatedName,
  //   updatedBusinessLine,
  //   enable,
  //   active,
  //   selectedBusinessCategory,
  //   bcNames
  // ) => {
  //   console.log("id:", id);
  //   console.log("updatedBusinessLine:", updatedBusinessLine);
  //   console.log("Selected business types:", selectedBusinessCategory);

  //   // Find the corresponding businessLineOption for the updatedBusinessLine
  //   const businessLineOption = businessLineOptions.find(
  //     (option) => option.label === updatedBusinessLine
  //   );

  //   if (businessLineOption) {
  //     // Fetch the existing bcIds from the API response
  //     const response = await fetch(
  //       `${config.host}/tenant/admin/v2/business/kind/${id}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );

  //     if (response.ok) {
  //       const existingBusinessKind = await response.json();
  //       const existingBcIds = existingBusinessKind.serviceResponse.bcIds || [];

  //       // Concatenate the existing bcIds with the new ones
  //       const updatedData = {
  //         name: updatedName,
  //         blId: businessLineOption.value,
  //         enable,
  //         active,
  //         bcIds: [
  //           ...extractSelectedOptions(selectedBusinessCategory),
  //           ...existingBcIds,
  //         ],
  //         bcNames:
  //           selectedBusinessCategory.map((option) => option.label) || bcNames,
  //       };

  //       // Update the local state immediately
  //       setData((prevData) =>
  //         prevData.map((row) =>
  //           row.id === id
  //             ? {
  //                 ...row,
  //                 ...updatedData,
  //               }
  //             : row
  //         )
  //       );

  //       // Update the businessKind using the correct blId, enable, and active
  //       await updateBusinessKind(id, businessLineOption.value, updatedData);

  //       // Close the editing mode (if any)
  //       setEditRow(null);
  //     } else {
  //       console.error(
  //         "Failed to fetch business kind details:",
  //         response.status
  //       );
  //     }
  //   } else {
  //     console.error(
  //       "Invalid business line during update:",
  //       updatedBusinessLine
  //     );
  //   }
  // };

  //Second one
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
      // Concatenate the existing bcIds with the new ones
      const updatedData = {
        name: updatedName,
        blId: businessLineOption.value,
        enable,
        active,
        bcIds: selectedBusinessCategory.map((option) => option.bcId),
        bcNames: selectedBusinessCategory.map((option) => option.label),
      };

      try {
        // Update the businessKind using the correct blId, enable, and active
        await updateBusinessKind(id, businessLineOption.value, updatedData);

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

        // Close the editing mode (if any)
        setEditRow(null);
      } catch (error) {
        console.error("Error updating business kind:", error.message);
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
    setIsAddRowOpen(null);
  };

  return (
    <>
      <div className={`pr-4 sm:pr-6 lg:pr-8 relative`} ref={topRef}>
        <div className="absolute right-[60px] top-[-70px]">
          <button
            type="button"
            className="user-btn"
            onClick={handleAddRowToggle}
          >
            <span className="text-xl pr-2.5">+</span>
            <span className="text-lg font-medium">Add Kind</span>
          </button>
        </div>
        {/* search bar */}
        <div className="search-bar w-[50%] lg:w-[30%]">
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

        <div className="mt-8 flow-root pb-40 ">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-[100%] py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-transparent">
                <thead>
                  <tr className="mb-10">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-5"
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
                      className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Enable
                    </th>
                    <th
                      scope="col"
                      className="px-0 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Active
                    </th>
                    {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Delete
                    </th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-transparent ">
                  {isLoading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-32">
                        {/* Loading indicator or spinner */}
                        <LoadingIndicator />
                      </td>
                    </tr>
                  ) : people.filter((row) =>
                      row.name.toLowerCase().includes(searchInput.toLowerCase())
                    ).length > 0 ? (
                    people
                      .filter((row) =>
                        row.name
                          .toLowerCase()
                          .includes(searchInput.toLowerCase())
                      )
                      .slice(0, recordsPerPage)
                      .map((row) => (
                        <tr key={row.id} className=" rounded-md">
                          <td className="w-[25%]">
                            <div className="mb-3 pl-4 py-[25px] bg-white border-none rounded-l-[10px] ">
                              <button
                                className="px-1 hover:text-primaryColor rounded transition-all delay-[30]"
                                onClick={() => handleShowSideNav(row.id)}
                              >
                                <span className="block max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
                                  {row.name}
                                </span>
                              </button>
                            </div>
                          </td>
                          <td className="relative right-1 font-light w-[20%]">
                            <div className="mb-3 py-[25px] bg-white ">
                              {businessLineNamesMap[row.blId] || "N/A"}
                            </div>
                          </td>
                          <td className="relative right-2 w-[14%]">
                            <div className="py-[24.5px] px-3 mb-3 bg-white">
                              <Toggle
                                checked={row.enable}
                                onToggle={(value) =>
                                  handleMainToggle(row.id, "enable", value)
                                }
                              />
                            </div>
                          </td>
                          <td className="relative right-3 w-[27%]">
                            <div className="py-[24.5px] px-3 mb-3 bg-white">
                              <Toggle
                                checked={row.active}
                                onToggle={(value) =>
                                  handleMainToggle(row.id, "active", value)
                                }
                              />
                            </div>
                          </td>
                          <td className="relative right-4 ">
                            <div className="py-[16px] mb-3 bg-white pr-2">
                              {/* Edit Icon */}
                              <button
                                className="px-6 py-2 text-white hover:bg-transparent border hover:border-primaryColor hover:text-primaryColor bg-primaryColor rounded-lg cursor-pointer group transition-all delay-75"
                                onClick={() => handleEdit(row)}
                              >
                                <div className="flex items-center">
                                  <span className="mr-2.5">Edit</span>
                                  <EditIcon PathClassName="group-hover:fill-primaryColor transition-all delay-75" />
                                </div>
                              </button>
                            </div>
                          </td>
                          <td className="relative right-5 ">
                            <div className="py-[21.3px] mb-3 bg-white rounded-r-[10px]">
                              <button className="px-3 rounded text-white hover:bg-gray-100 mr-2">
                                <RightIcon />
                              </button>
                            </div>
                          </td>
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
            </div>
          </div>
          {/* Pagination */}
          {!isLoading && (
            <div className="relative">
              <nav className="flex items-center justify-center pt-6 px-4 sm:px-0">
                <div className="hidden md:-mt-px md:flex">
                  {/* Previous page link */}
                  <a
                    href="javascript:void(0)"
                    className="items-center text-sm font-medium cursor-pointer hover:bg-gray-300 rounded-full w-6 h-6 relative group mr-1"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                      <ArrowLongLeftIcon
                        className="h-5 w-5 text-gray-400 group-hover:text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                  {/* Page links */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <a
                        key={page}
                        href="javascript:void(0)"
                        className={`items-center text-sm font-medium cursor-pointer rounded-full w-6 h-6 relative mr-1 ${
                          page === currentPage
                            ? " text-white bg-primaryColor"
                            : "border-transparent text-gray-500 hover:text-primaryColor hover:border-gray-300 hover:bg-gray-300"
                        }`}
                        onClick={() => handlePageChange(page)}
                      >
                        <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                          {page}
                        </span>
                      </a>
                    )
                  )}
                  {/* Next page link */}
                  <a
                    href="javascript:void(0)"
                    className="items-center text-sm font-medium cursor-pointer hover:bg-gray-300 rounded-full w-6 h-6 relative group"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                      <ArrowLongRightIcon
                        className="h-5 w-5 text-gray-400 group-hover:text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </div>
              </nav>

              <div className="absolute right-4 top-5 flex items-center">
                <p className="mr-3 text-sm font-light">Records per page</p>
                <CustomSelect
                  options={[5, 10, 15, 20]}
                  value={recordsPerPage}
                  onChange={(value) => {
                    handleRecordsPerPageChange(value);
                  }}
                />
              </div>
            </div>
          )}
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
              updateBcNames={(newBcNames) => {
                setEditRow({ ...editRow, bcNames: newBcNames });
                console.log("bcNames updated", newBcNames);
                console.log("exsisting bcNames", editRow.bcNames);
              }}
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
          addButtonName="Kind"
        />
      )}
    </>
  );
}
