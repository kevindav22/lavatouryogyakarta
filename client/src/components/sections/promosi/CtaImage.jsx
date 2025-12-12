const CtaImage = ({ backgroundImage }) => {
  return (
    <div className="absolute inset-0 bg-cover bg-center rounded-xl" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 hover:bg-opacity-40 transition-all duration-300 rounded-xl" ></div>
    </div>
  );
};

export default CtaImage;
