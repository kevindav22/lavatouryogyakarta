const HeroPageContent = ({ title, breadcrumbs }) => {
  return (
    <header className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center max-w-3xl mx-auto">
      <h1 className="text-5xl md:text-7xl font-bold font-staatliches tracking-wide mb-4 text-white">{title}</h1>

      <nav aria-label="breadcrumb" className="text-base md:text-lg font-medium opacity-80 text-gray-300">
        {breadcrumbs.map((crumb, index) => (
          <span key={index}>
            {crumb}
            {index < breadcrumbs.length - 1 && ' > '}
          </span>
        ))}
      </nav>
    </header>
  );
};

export default HeroPageContent;
