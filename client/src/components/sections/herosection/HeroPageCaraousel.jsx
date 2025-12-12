import HeroPageContent from './HeroPageContent';

const HeroPageCarousel = ({ data }) => {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {data.slice(0, 1).map(
        (
          item // tampilkan hanya slide pertama
        ) => (
          <div
            key={item.id}
            className="absolute inset-0 h-full w-full"
            style={{
              backgroundImage: `url(${item.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/80"></div>

            {/* konten hero */}
            <HeroPageContent title={item.title} breadcrumbs={item.breadcrumbs} />
          </div>
        )
      )}
    </div>
  );
};

export default HeroPageCarousel;
