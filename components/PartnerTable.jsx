"use client";
import Toggle from "./Toggle";
import React, { useState, useEffect, useRef } from "react";
// import RightSideNav from "./RightSideNav";
// import EditRow from "./EditRow";
import AddRowPartner from "./PartnerAndAdminaddRow";
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

export default function PartnerTable() {
  const [people, setData] = useState([]);
  const [details, setDetails] = useState(null);
  const [businessLineNamesMap, setBusinessLineNamesMap] = useState({});
  const [accessToken, setAccessToken] = useState({});
  // const accessToken = localStorage.getItem("accessToken");
  const [businessKindOptions, setBusinessKindOptions] = useState([]);
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
  const handleForceReload = () => {
    window.location.reload();
  };

  useEffect(() => {
    fetchData();
    setIsAddRowOpen(false);
    const isAuthenticated = checkAuthentication();
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [accessToken]);
  // Fetch data
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${config.host}/tenant/admin/v2/partner/account/`,
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

        setData(data.serviceResponse.partnerAccountList);

        const toggleStates = data.serviceResponse.partnerAccountList.map(
          (item) => ({
            enable: item.enable,
            active: item.active,
          })
        );

        setToggleStates(toggleStates);
      } else {
        console.error(
          "Failed to fetch data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error.message, error.response);
    }
  };

  const [editRow, setEditRow] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isAddRowOpen, setIsAddRowOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState(
    people.map(() => ({ enable: false, active: false }))
  );

  const handleAddRowToggle = () => {
    setIsAddRowOpen(!isAddRowOpen);
  };
  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  const handleAdd = async (newRow) => {
    try {
      const response = await fetch(
        `${config.host}/tenant/admin/v2/partner/account`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: "India",
            phone: newRow.phone,
            name: newRow.name,
            email: newRow.email,
            enable: newRow.enable,
            active: newRow.active,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("API Response Data:", data.serviceResponse);

        // Use the extracted values for updating state
        setData((prevData) => [...prevData, data.serviceResponse]);

        // Fetch data after adding the new row
        await fetchData();
        setIsAddRowOpen(false);

        // Return null to indicate success
        return null;
      } else {
        const responseBody = await response.json();
        const normalizedErrorMessage = responseBody.serviceResponse.trim();
        const expectedErrorMessage = `Account is already present with phone : ${newRow.phone} tenantId : 64ad025e4b10231342f7e9e6 userType PARTNER`;

        // Check if the error message indicates that the account already exists
        if (normalizedErrorMessage === expectedErrorMessage) {
          console.log("Account already exists. Handle it appropriately.");

          // Set the error message in state
          setErrorMessage(
            "Account already exists. Please use different Phone Number."
          );

          // Return the error message to be handled by the parent component
          return normalizedErrorMessage;
        } else {
          console.error("Failed to add partner account:", response.status);
          console.error("Error response body:", responseBody);
          setErrorMessage("");

          // Set the general error message in state
          setErrorMessage("Failed to add partner account. Please try again.");

          // Return the general error message
          return "Failed to add partner account. Please try again.";
        }
      }
    } catch (error) {
      console.error("Error adding partner account:", error.message);

      // Set the error message in state
      setErrorMessage("Error adding partner account. Please try again.");

      // Return the error message to be handled by the parent component
      return "Error adding partner account. Please try again.";
    }
  };

  const handleAddUpdate = async (enable, active, name, email, phone) => {
    try {
      const newRow = {
        name,
        email,
        phone,
        enable,
        active,
      };

      console.log("New Row:", newRow);

      // Include any additional logic or checks if needed

      const errorMessage = await handleAdd(newRow);

      if (
        errorMessage &&
        errorMessage === "Account already exists. Handle it appropriately."
      ) {
        // Pass the errorMessage as a prop to another component
        setErrorMessage(errorMessage);
      }

      setEditRow(null);
    } catch (error) {
      console.error("Error adding partner account:", error.message);
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

  const handleEdit = async (row) => {
    try {
      // Fetch business categories

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
              Partner section
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
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
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
                      <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-900 sm:pl-0 w-[200px] lg:w-[300px]">
                        {/* {console.log('businessLineNamesMap:', businessLineNamesMap)} */}
                        {/* {businessLineNamesMap[row.blId] || "N/A"} */}
                        {row.email}
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
        <AddRowPartner
          heading="ADD NEW PARTNER USER"
          onToggle={(field, value) => handleAddToggle(field, value)}
          onCancel={handleCancelEdit}
          handleAddUpdate={handleAddUpdate}
          errorMessage={errorMessage}
          styles="space-y-6"
          clearErrorMessage={clearErrorMessage}
          isPartnerDesign
        />
      )}
    </>
  );
}
