export default function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };
  const currentYear = getCurrentYear();
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <div className="containerBox max-w-7xl pt-16 sm:pt-24 lg:py-14">
        <div className="flex flex-col text-center lg:flex-row w-full py-14 lg:py-0 lg:text-left">
          <div className="lg:w-[30%]">
            <h1 className="logo text-primaryColor inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-2xl hover:text-white cursor-pointer font-bold mb-6 lg:mb-3">
              <span className="text-white font-medium">SET</span>MySpace
            </h1>
            <div className="flex justify-center lg:w-[85%]">
              <p className="w-[75%] lg:w-auto text-[#6C6C6C] text-xl text-center lg:text-left">
                A unit of UrbanBarrow Pvt. Ltd. Whitefield, Bangalore Karnataka,
                India 560066
              </p>
            </div>
          </div>
          <div className="mt-20 lg:mt-7 text-base flex flex-col w-full lg:w-[90%]">
            <div className="flex flex-col space-y-7 lg:flex-row lg:space-y-0">
              <a
                href=""
                className="font-semibold lg:w-[150px] leading-6 text-white hover:text-gray-300 lg:border-r-4 lg:border-primaryColor lg:h-6 cursor-pointer"
              >
                Help & Support
              </a>
              <a
                href="/admin/login"
                className="font-semibold lg:w-[300px] lg:pl-10 leading-6 text-white hover:text-gray-300  lg:border-r-4 lg:border-primaryColor lg:h-6 cursor-pointer"
              >
                Signup or Login As Partner
              </a>
              <a
                href=""
                className="font-semibold lg:w-[230px] lg:pl-10 leading-6 text-white hover:text-gray-300  lg:border-r-4 lg:border-primaryColor lg:h-6 cursor-pointer"
              >
                Terms & Conditions
              </a>
              <a
                href=""
                className="font-semibold leading-6 lg:pl-10  text-white hover:text-gray-300  cursor-pointer"
              >
                Privacy Policy
              </a>
            </div>
            <div className="mt-20 lg:mt-14 lg:ml-[20%] text-base w-full">
              <p className=" leading-5 text-gray-400">
                &copy; All Rights reserved {currentYear} setmyspace
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
