"use client"
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import TextInput from '@/components/TextInput';
import Image from "next/image"

const LoginPage = () => {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      mobile: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    console.log(`Mobile: ${data.mobile}`);
    console.log(`Password: ${data.password}`);
    router.push('/landing');
  };
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <Image src='/images/bird.png' alt='logo' width={138} height={38} priority="high" className='object-contain relative bottom-20 w-auto h-auto' />
      <div className="center bg-white p-8 rounded-lg shadow-lg sm:w-96 animate__animated animate__fadeIn relative bottom-20 w-11/12">
        <h1 className="text-3xl font-bold text-center text-red-500">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="animate__animated animate__fadeInUp">
          <TextInput
            control={control}
            errors={errors}
            name="mobile"
            label="Mobile No"
            type="number"
            placeholder="Enter your Mobile No"
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
          <TextInput
            control={control}
            errors={errors}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your Password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            }}
            showPasswordToggle={true}
          />

          <p className="pass text-sky-500 mt-3 hover:text-customViolet cursor-pointer inline-block">Forgot Password?</p>


          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 mt-6 rounded-full hover:bg-red-600 transition duration-300 ease-in-out font-bold"
          >
            Sign In
          </button>

          <div className="signup_link text-gray-600 text-center text-base font-bold mt-7">
            Not a member?{' '}
            <Link href="/signup" className="text-sky-400 hover:text-sky-700 cursor-pointer font-bold">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

