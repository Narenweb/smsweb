"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/TextInput';
import { useForm } from 'react-hook-form';
import config from '@/components/config';
import { useAuth } from '../AuthContext';
export default function OTP() {
    const router = useRouter();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            otp: '',
        },
    });
    const { authData } = useAuth();
    const { otpToken, phoneNumber } = authData; 
    const onSubmit = async (data) => {
        try {
            if (!otpToken || !phoneNumber) {
                console.error('OTP token or phone number is missing in the URL');
                return;
            }

            const tokenResponse = await fetch(`${config.host}/v1/public/tenant/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientId: '64ad025e4b10231342f7e9e7',
                    clientSecret: '8c0af060-d1c4-40b0-8092-f5a6fae9ce27',
                    grantType: 'PASSWORD',
                    password: data.otp,
                    provider: 'UB_TENANT_OTP',
                    tenant: '64ad025e4b10231342f7e9e6',
                    token: otpToken,
                    userName: phoneNumber,
                }),
            });

            if (tokenResponse.ok) {
                const responseData = await tokenResponse.json();
                const accessToken = responseData.serviceResponse?.accessToken;
                localStorage.setItem('accessToken', accessToken);
                if (accessToken) {
                    // If you need to do something with the token, you can store it or use it as needed
                    console.log('Access Token:', accessToken);
                    localStorage.setItem('accessToken', accessToken);
                    // Redirect to the business-config page with the token
                    router.push(`/business-config?token=${accessToken}`);
                } else {
                    const responseBody = await tokenResponse.text();
                    console.error('OTP verification failed:', tokenResponse.status, responseBody);
                }
            } else {
                console.error('Incorrect OTP');
                // Handle incorrect OTP case (show an error message, etc.)
            }
        } catch (error) {
            console.error('Error during OTP verification:', error.message);
        }
    };
    return (
        <>
            <div className="flex min-h-full h-[100vh] flex-1">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            {/* <img
                  className="h-10 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                /> */}

                        </div>

                        <div className="mt-10">
                            <div>
                                <form action="/business-config" method="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                    <TextInput
                                        control={control}
                                        errors={errors}
                                        name="otp"
                                        label="Enter OTP"
                                        type="number"
                                        rules={{
                                            required: 'OTP is required',
                                            pattern: {
                                                value: /^[0-9]+$/,
                                                message: 'OTP must contain only numbers',
                                            },
                                            minLength: {
                                                value: 4,
                                                message: 'OTP must be 4 characters',
                                            },
                                        }}
                                    />

                                    <div>
                                        <button
                                            type="submit"
                                            className="btn-secondary"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </form>
                                <div className="signup_link text-gray-600 text-center text-base  mt-7">
                                    Wrong mobile number?{' '}
                                    <Link href="/admin/login" className="text-sky-400 hover:text-sky-700 cursor-pointer">
                                        Go Back
                                    </Link>
                                </div>
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
    )
}
