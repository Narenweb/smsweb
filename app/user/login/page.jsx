"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter from 'next/router'
import TextInput from "@/components/TextInput";
import TextInputBox from "@/components/TextInputBox";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import config from "@/components/config";
import { useAuth } from "../../AuthContext";
import LoginImage from "../../../public/images/login.png";
import RoundLogo from "../../../public/images/round-logo.png";
import { EditIcon } from "@/app/Assets/icons";
import InputBox from "@/components/CustomInput";
export default function UserLogin() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mobile: "",
    },
  });
  const [activeSection, setActiveSection] = useState(1);
  const [accountError, setAccountError] = useState("");
  const [emptyError, setEmptyError] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [storedPhoneNumber, setStoredPhoneNumber] = useState("");
  const { authData, setAuth } = useAuth();

  useEffect(() => {
    if (accountError) {
      const timer = setTimeout(() => {
        setAccountError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [accountError]);

  useEffect(() => {
    if (authData) {
      const { phoneNumber } = authData;
      const formattedPhoneNumber = phoneNumber && phoneNumber.slice(2);
      setStoredPhoneNumber(formattedPhoneNumber);
      console.log("storedPhoneNumber", storedPhoneNumber);
    }
  }, [authData]);

  const generateOTP = async (phoneNumber, tenantId) => {
    try {
      const otpResponse = await fetch(
        `${config.host}/v1/public/admin/login/otp?phoneNo=${phoneNumber}&tenantId=${tenantId}`
      );
      if (otpResponse.ok) {
        const responseData = await otpResponse.json();
        const otpToken = responseData.serviceResponse?.token;

        if (otpToken) {
          setOtpToken(otpToken); // Store OTP token in state
          return otpToken;
        } else {
          console.error("OTP token not found in the response");
        }
      } else {
        const errorResponse = await otpResponse.text();
        console.error(
          "OTP generation failed:",
          otpResponse.status,
          errorResponse
        );
      }
    } catch (error) {
      console.error("Error during OTP generation:", error.message);
    }
  };

  //To print that account exsist error
  const checkAccount = async (phoneNumber, tenantId) => {
    try {
      const accountCheckResponse = await fetch(
        `${config.host}/v1/public/admin/login/otp?phoneNo=${phoneNumber}&tenantId=${tenantId}`
      );
      const accountCheckData = await accountCheckResponse.json();

      if (accountCheckData.successful) {
        await generateOTP(phoneNumber, tenantId);
        // localStorage.setItem('mobileNumber', phoneNumber);
        setAccountError("");
      } else {
        // Account does not exist, set error message
        setAccountError(
          "Account does not exist for the provided mobile number"
        );
        console.error("Account does not exist for the provided mobile number");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const onSubmit = async () => {
    try {
      const phoneNumber = `91${storedPhoneNumber}`;
      const tenantId = "64ad025e4b10231342f7e9e6";

      if (
        accountError === "Account does not exist for the provided mobile number"
      ) {
        setAccountError("");
      }

      const otpToken = await generateOTP(phoneNumber, tenantId);

      if (otpToken) {
        setMobileNumber(phoneNumber);
        setEmptyError("Phone Number is required");
        // Set auth data in the context
        setAuth({ otpToken, phoneNumber });

        // Navigate to OTP page
        router.push("/user/otp");
        setActiveSection(activeSection + 1);
      }

      await checkAccount(phoneNumber, tenantId);
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <>
      <div className="flex min-h-full h-[100vh] justify-between">
        <div className="relative hidden lg:block mr-auto w-1/2">
          <Image
            src={LoginImage}
            alt="LoginImage-img"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]  w-[200px] h-[200px] hidden lg:block">
          <Image
            src={RoundLogo}
            alt="RoundLogo-img"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div
          className={`flex min-w-full lg:min-w-[550px] w-1/2  flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-userTheme ${
            activeSection === 1 ? "block" : "hidden"
          }`}
        >
          <div className="mx-auto w-full max-w-sm ">
            <div>
              <h2 className="mt-8 text-3xl font-bold tracking-wider text-gray-900 text-center">
                Sign In
              </h2>
            </div>
            <div className="mt-6">
              <div>
                <form
                  action="/business-config"
                  method=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex items-end space-y-12 relative flex-col ml-5">
                    <span
                      className={`text-lg absolute left-2 z-10 text-gray-500 ${
                        errors.mobile
                          ? "bottom-[42px]"
                          : accountError
                          ? "bottom-[62px]"
                          : "bottom-[10px]"
                      }`}
                    >
                      +91
                    </span>

                    <TextInputBox
                      control={control}
                      errors={errors}
                      name="mobile"
                      label="Mobile No"
                      type="number"
                      styles="pl-[45px] text-lg text-gray-500 number-input"
                      errorMessage={accountError}
                      // emptyError={emptyError}
                      value={storedPhoneNumber}
                      setPhoneNumber={setStoredPhoneNumber}
                      // onChange={(e) => {
                      //   setPhoneNumber(e.target.value);
                      // }}
                      placeholder="Enter Phone Number"
                      rules={{
                        required: !storedPhoneNumber
                          ? "Phone Number is required"
                          : undefined,
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Mobile must contain only numbers",
                        },
                        minLength: {
                          value: 10,
                          message: "Mobile must be 10 characters",
                        },
                        // ...(!storedPhoneNumber &&
                        //   storedPhoneNumber.trim() === "" && {
                        //     required: "Phone Number is required",
                        //   }),
                      }}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex mt-10 justify-center rounded-md bg-primaryColor px-3 py-2 text-sm font-semibold leading-6  text-white shadow-sm hover:bg-[#e71f58] w-full max-w-[370px] text-bold hover:shadow-md ml-5 mr-3 "
                    >
                      Get OTP
                    </button>
                    <div className="flex gap-2 mt-10 justify-center">
                      <p>Don't have an account? </p>
                      <Link
                        href={"/user/signup"}
                        className="text-theme underline font-semibold tracking-wider hover:text-primaryColor"
                      >
                        SIGN UP
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
