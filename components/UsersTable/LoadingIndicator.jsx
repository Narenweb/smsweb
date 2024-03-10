const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-primaryColor"></div>
    </div>
  );
};

export default LoadingIndicator;
