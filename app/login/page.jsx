"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/TextInput';
import { useForm } from 'react-hook-form';



// ... (import statements)

// ... (import statements)

export default function Login() {
    const router = useRouter();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            mobile: '',
        },
    });

    const generateOTP = async (phoneNumber, tenantId) => {
        try {
            const otpResponse = await fetch(`https://api.urbanbarrow.com/v1/public/phone/otp?phoneNo=${phoneNumber}&tenantId=${tenantId}`);
            if (otpResponse.ok) {
                console.log('OTP generation successful');
                const responseData = await otpResponse.json();
            
                // Log the entire response to inspect its structure
                console.log('OTP Response:', responseData);
            
                // Check if the token exists in the response
                const otpToken = responseData.serviceResponse?.token;
            
                if (otpToken) {
                    console.log('OTP Token from login page:', otpToken);
                    localStorage.setItem('otpToken', otpToken); 
                    router.push('/otp');
                } else {
                    console.error('OTP token not found in the response');
                    // Handle the case when the token is not found
                }
            } else {
                const errorResponse = await otpResponse.text();
                console.error('OTP generation failed:', otpResponse.status, errorResponse);
                return null;
            }
            
            
        } catch (error) {
            console.error('Error during OTP generation:', error.message);
            return null;
        }
    };

    const onSubmit = async (data) => {
        try {
            // Generate OTP
            const otpToken = await generateOTP(data.mobile, '64ad025e4b10231342f7e9e6');
            localStorage.setItem('mobileNumber', data.mobile); 
            if (otpToken) {
                // Use the generated OTP for token generation
                const tokenResponse = await fetch('https://api.urbanbarrow.com/v1/public/tenant/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        clientId: '64ad025e4b10231342f7e9e7',
                        clientSecret: '8c0af060-d1c4-40b0-8092-f5a6fae9ce27',
                        grantType: 'PASSWORD',
                        password: '1234',
                        provider: 'UB_TENANT_OTP',
                        tenant: '64ad025e4b10231342f7e9e6',
                        token:otpToken,
                        userName: data.mobile,
                    }),
                });

                if (tokenResponse.ok) {
                    const { token } = await tokenResponse.json();
                    router.push(`/otp?token=${token}`);
                } else {
                    const responseBody = await tokenResponse.text();
                    console.error('Token retrieval failed:', tokenResponse.status, responseBody);
                }
            } 
        } catch (error) {
            console.error('Error during login:', error.message);
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
                            <h2 className="mt-8 mb-16 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Login to your account
                            </h2>
                        </div>

                        <div className="mt-10">
                            <div>
                                <form action="/business-config" method="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                    <TextInput
                                        control={control}
                                        errors={errors}
                                        name="mobile"
                                        label="Mobile No"
                                        type="number"
                                        rules={{
                                            required: 'Mobile is required',
                                            pattern: {
                                                value: /^[0-9]+$/,
                                                message: 'Mobile must contain only numbers',
                                            },
                                            minLength: {
                                                value: 10,
                                                message: 'Mobile must be 10 characters',
                                            },
                                        }}
                                    />
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-theme focus:ring-indigo-600"
                                            />
                                            <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-700">
                                                Remember me
                                            </label>
                                        </div>

                                        <div className="text-sm leading-6">
                                            <a href="#" className="font-semibold text-theme hover:text-indigo-500">
                                                Forgot Mobile Number?
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="btn-secondary"
                                        >
                                            Get OTP
                                        </button>
                                    </div>
                                </form>
                                <div className="signup_link text-gray-600 text-center text-base  mt-7">
                                    Not a member?{' '}
                                    <Link href="/signup" className="text-sky-700 hover:text-sky-400 cursor-pointer">
                                        Register here
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
