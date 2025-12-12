const TitleSection = ({ data, titleColor = 'text-red-700', subtitleColor = 'text-gray-600', slideDuration = 1000 }) => {
  const { title, subtitle } = data[0];

  return (
    <div>
      <h2 className={`text-4xl sm:text-6xl font-staatliches font-bold ${titleColor}`}>{title}</h2>

      {subtitle && <p className={`mt-2 text-lg sm:text-xl ${subtitleColor}`}>{subtitle}</p>}
    </div>
  );
};

export default TitleSection;
