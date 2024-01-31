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
    console.log(`Name: ${data.name}`);
    console.log(`Mobile: ${data.mobile}`);
    console.log(`Email: ${data.email}`);
    console.log(`Password: ${data.password}`);
    router.push('/');
  };
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <Link href="/login">
      <Image src='/images/bird.png' alt='logo' width={138} height={18} priority="high" className='object-contain relative bottom-10 w-auto h-auto' />
      </Link>
      <div className="center bg-white p-8 rounded-lg shadow-lg sm:w-96 animate__animated animate__fadeIn relative bottom-16 w-11/12">
        <h1 className="text-3xl font-bold text-center text-red-500">Signup</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="animate__animated animate__fadeInUp">
          <TextInput
            control={control}
            errors={errors}
            name="name"
            label="Name"
            type="text"
            placeholder="Enter your Name"
            rules={{
              required: 'Name is required'
            }}
          />
          <TextInput
            control={control}
            errors={errors}
            name="mobile"
            label="Mobile No"
            placeholder="Enter your Mobile No"
            type="number"
            rules={{
              required: 'Mobile is required',
              minLength: {
                value: 10,
                message: 'Mobile must be 10 characters',
              },
            }}
          />
          <TextInput
            control={control}
            errors={errors}
            name="email"
            label="Email"
            placeholder="Enter your Email id"
            type="text"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                message: 'Invalid email address',
              },
            }}
          />
          <TextInput
            control={control}
            errors={errors}
            name="password"
            label="Password"
            placeholder="Create your Password"
            type="password"
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
            className="w-full bg-red-500 text-white py-3 rounded-full hover:bg-red-600 transition duration-300 ease-in-out font-bold mt-6"
          >
            Signup for free
          </button>

          <div className="signup_link text-gray-600 text-center text-base font-bold mt-7">
            Back to Login -{' '}
            <Link href="/" className="text-sky-400 hover:text-sky-700 cursor-pointer font-bold">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

