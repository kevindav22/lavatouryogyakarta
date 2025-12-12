// TikTokGallery.jsx
import TitleSection from '../../commons/TitleSection';

const TikTokGallery = () => {
  const videos = ['7450056347342638344', '7450540259999239432', '7451137331936906514', '7460820850720148754', '7462648342011464968', '7464805787383237895'];

  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 lg:px-20">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <TitleSection data={[{ title: 'TikTok Gallery', subtitle: '6 Video Terbaru TikTok' }]} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos.map((videoId, idx) => (
            <div key={idx} className="w-full aspect-[2/3]">
              <iframe
                src={`https://www.tiktok.com/player/v1/${videoId}?autoplay=0&controls=1&volume_control=1&fullscreen_button=1`}
                className="w-full h-full border-2 border-red-700 rounded-lg"
                allow="fullscreen; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TikTokGallery;
