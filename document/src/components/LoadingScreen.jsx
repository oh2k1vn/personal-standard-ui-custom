const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-white bg-black/20 backdrop-blur-[14px]">
      <img
        src="https://cdn.dribbble.com/userupload/9476337/file/original-1edc0651eb26ad65c3ff32b423f134ab.gif"
        alt=""
        className="size-28"
      />
    </div>
  );
};
export default LoadingScreen;
