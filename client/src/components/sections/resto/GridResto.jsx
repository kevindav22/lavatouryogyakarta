import CardResto from './CardResto';

const GridResto = ({ data }) => {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {data.map((resto, index) => (
        <div key={resto.id} className="min-w-[100%] sm:min-w-[calc(50%-2rem)] sm:max-w-[calc(50%-2rem)]" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay={index * 300}>
          <CardResto resto={resto} />
        </div>
      ))}
    </div>
  );
};

export default GridResto;
