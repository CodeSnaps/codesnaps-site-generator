const Hero: React.FCC = ({ children }) => {
  return (
    <h1
      className="my-2 text-4xl
        font-extrabold tracking-tight
        dark:text-white sm:my-6 md:leading-none"
    >
      {children}
    </h1>
  );
};

export default Hero;
