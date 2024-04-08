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
import InputBox from "@/components/CustomInput";
import { EditIcon } from "@/app/Assets/icons";
export default function AdminLogin() {
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
  const { authData } = useAuth();
  const { otpToken, phoneNumber } = authData;
  const [otpError, setOtpError] = useState();
  const formattedPhoneNumber = phoneNumber && phoneNumber.slice(2);
  useEffect(() => {
    if (otpError) {
      const timer = setTimeout(() => {
        setOtpError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [otpError]);

  const onSubmit = async (data) => {
    try {
      if (!otpToken || !phoneNumber) {
        console.error("OTP token or phone number is missing in the URL");
        return;
      }

      const tokenResponse = await fetch(
        `${config.host}/v1/public/tenant/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientId: "64ad025e4b10231342f7e9e7",
            clientSecret: "8c0af060-d1c4-40b0-8092-f5a6fae9ce27",
            grantType: "PASSWORD",
            password: data.otp,
            provider: "UB_TENANT_OTP",
            tenant: "64ad025e4b10231342f7e9e6",
            token: otpToken,
            userName: phoneNumber,
          }),
        }
      );

      if (tokenResponse.ok) {
        const responseData = await tokenResponse.json();
        const accessToken = responseData.serviceResponse?.accessToken;
        localStorage.setItem("accessToken", accessToken);
        if (accessToken) {
          // If you need to do something with the token, you can store it or use it as needed
          console.log("Access Token:", accessToken);
          localStorage.setItem("accessToken", accessToken);
          // Redirect to the business-config page with the token
          router.push(`/dashboard`);
        } else {
          const responseBody = await tokenResponse.text();
          console.error(
            "OTP verification failed:",
            tokenResponse.status,
            responseBody
          );
        }
      } else {
        console.error("Incorrect OTP");
        setOtpError("Incorrect OTP. Please try again");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error.message);
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
        <div className="flex min-w-full lg:min-w-[550px] w-1/2  flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-userTheme">
          <div className="mx-auto w-full max-w-sm ">
            <div>
              <h2 className="mt-8 text-3xl font-bold tracking-wider text-gray-900 text-center">
                Validate Mobile Number
              </h2>
            </div>
            <div className="mt-6 ml-5">
              <div>
                <form
                  action="/business-config"
                  method=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex items-end space-y-12 relative flex-col">
                    <TextInputBox
                      control={control}
                      errors={errors}
                      name="otp"
                      label="OTP"
                      type="number"
                      styles="pl-5 text-lg text-gray-500 number-input"
                      placeholder="Enter OTP"
                      //   otpError={otpError}
                      errorMessage={otpError}
                      rules={{
                        required: "OTP is required",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "OTP must contain only numbers",
                        },
                        minLength: {
                          value: 4,
                          message: "OTP must be 4 characters",
                        },
                        maxLength: {
                          value: 4,
                          message: "OTP must be exactly 4 characters",
                        },
                      }}
                    />
                  </div>
                  <div className="flex items-end">
                    <p className="mt-5 text-center">
                      Enter the 4-digit code sent to{" "}
                      <span className="text-theme underline font-semibold test-lg ml-1">
                        {formattedPhoneNumber}
                      </span>
                    </p>
                    <Link
                      href={{
                        pathname: "/user/login",
                        // query: { phoneNo: formattedPhoneNumber },
                      }}
                    >
                      <EditIcon
                        SvgClassName="w-5 h-5 ml-2 relative bottom-[2px] cursor-pointer hover:fill-theme"
                        PathClassName="fill-primaryColor hover:fill-theme"
                      />
                    </Link>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex mt-10 justify-center rounded-md bg-primaryColor px-3 py-2 text-sm font-semibold leading-6  text-white shadow-sm hover:bg-[#e71f58] w-full max-w-[370px] text-bold hover:shadow-md mr-3 "
                    >
                      VALIDATE
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
