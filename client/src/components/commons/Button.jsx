const Button = ({ children, onClick, className, link, target }) => {
  return (
    <button onClick={onClick || (() => window.open(link, target || '_self'))} className={`px-6 py-4 text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold rounded-md shadow transition-all ${className}`}>
      {children}
    </button>
  );
};

export default Button;


