import { useState, useEffect } from 'react';
import { loadGlobalData } from '../../../services/GlobalData';
import TitleSection from '../../commons/TitleSection';
import { FaEye } from 'react-icons/fa';

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Wisata', value: 'wisata' },
  { label: 'Jeep', value: 'jeep' },
  { label: 'Kuliner', value: 'kuliner' },
];

const MasonryGridGallery = () => {
  const [judulContent, setJudulContent] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [itemsToShow, setItemsToShow] = useState(25);
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadGlobalData();

      if (data.judulContent) {
        const judulData = data.judulContent.find((item) => item.type === 'gallery');
        setJudulContent(judulData || null);
      }
      setImages(data.gallery || []);
      setFilteredImages(data.gallery || []);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const newFiltered = activeCategory === 'all' ? images : images.filter((img) => img.category === activeCategory);

    setFilteredImages(newFiltered);
    setItemsToShow(25);
  }, [activeCategory, images]);

  const handleLoadMore = () => setItemsToShow((prev) => prev + 25);
  const closeModal = () => setModalImage(null);

  return (
    <section className="bg-gray-300 py-16 px-4 sm:px-8 md:px-16 lg:px-20">
      <div className="container mx-auto">
        <div className="mb-12 text-center" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="600">
          {judulContent ? <TitleSection data={[{ title: judulContent.judul, subtitle: judulContent.deskripsi }]} /> : <p></p>}
        </div>

        <div className="mb-8 flex justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              className={`px-4 py-2 text-base font-semibold rounded-lg border border-red-800 ${activeCategory === category.value ? 'bg-red-800 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => setActiveCategory(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" style={{ gridAutoRows: '200px', gridAutoFlow: 'dense' }}>
          {filteredImages.slice(0, itemsToShow).map((image, index) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-lg shadow-md border-2 border-red-800 group"
              style={{
                gridColumn: index % 5 === 0 ? 'span 2' : 'span 1',
                gridRow: index % 3 === 0 ? 'span 2' : 'span 1',
              }}
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay={index * 400}
            >
              {/* 🔥 FULL URL LANGSUNG */}
              <img className="w-full h-full object-cover" src={image.image || 'https://via.placeholder.com/150'} alt={image.altImage} loading="lazy" />

              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex items-center cursor-pointer gap-2" onClick={() => setModalImage(image)}>
                  <FaEye className="text-white text-2xl hover:scale-125 transition-transform" />
                  <span className="text-white text-lg">{image.altImage}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {itemsToShow < filteredImages.length && (
          <div className="mt-8 text-center">
            <button className="px-6 py-4 text-lg font-semibold text-white bg-red-800 rounded-lg hover:bg-red-700" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}

        {modalImage && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm" onClick={closeModal}>
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <img src={modalImage.image || 'https://via.placeholder.com/150'} alt={modalImage.altImage} loading="lazy" className="rounded-lg max-h-[90vh] max-w-[90vw] object-contain" />
              <button className="absolute top-2 right-2 text-white text-2xl font-bold bg-red-600 rounded-xl p-2 hover:bg-red-700" onClick={closeModal}>
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MasonryGridGallery;
