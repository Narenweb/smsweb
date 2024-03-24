"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter from 'next/router'
import TextInput from "@/components/TextInput";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import config from "@/components/config";
import { useAuth } from "../../AuthContext";
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
  const [accountError, setAccountError] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const { setAuth } = useAuth();
  useEffect(() => {
    if (accountError) {
      const timer = setTimeout(() => {
        setAccountError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [accountError]);

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

  const onSubmit = async (data) => {
    try {
      const phoneNumber = `91${data.mobile}`;
      const tenantId = "64ad025e4b10231342f7e9e6";

      if (
        accountError === "Account does not exist for the provided mobile number"
      ) {
        setAccountError("");
      }

      const otpToken = await generateOTP(phoneNumber, tenantId);

      if (otpToken) {
        setMobileNumber(phoneNumber);

        // Set auth data in the context
        setAuth({ otpToken, phoneNumber });

        // Navigate to OTP page
        router.push("/otp");
      }

      await checkAccount(phoneNumber, tenantId);
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };
  return (
    <>
      <div className="flex min-h-full h-[100vh] flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-8 mb-5 text-2xl font-bold leading-6 tracking-tight text-gray-900">
                Login to your admin account
              </h2>
            </div>

            <div className="mt-10">
              <div>
                <form
                  action="/business-config"
                  method=""
                  className="space-y-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex items-end space-x-1 relative">
                    <span
                      className={`text-lg absolute left-0 z-10 text-gray-500 ${
                        errors.mobile || accountError
                          ? "bottom-[40px]"
                          : "bottom-[10px]"
                      }`}
                    >
                      +91
                    </span>

                    <TextInput
                      control={control}
                      errors={errors}
                      name="mobile"
                      label="Mobile No"
                      type="number"
                      styles="pl-8 text-lg text-gray-500"
                      errorMessage={accountError}
                      rules={{
                        required: "Mobile is required",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Mobile must contain only numbers",
                        },
                        minLength: {
                          value: 10,
                          message: "Mobile must be 10 characters",
                        },
                      }}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-theme px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lightTheme focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Get OTP
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
