import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import InfoPerusahaan from './InfoPerusahaan.js';

const { DataTypes } = Sequelize;

const CarouselImage = db.define(
  'CarouselImage',
  {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altImage: {
      type: DataTypes.STRING,
    },
    infoPerusahaanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: InfoPerusahaan,
        key: 'id',
      },
    },
  },
  {
    tableName: 'carousel_image',
    timestamps: true,
    freezeTableName: true,
  }
);

InfoPerusahaan.hasMany(CarouselImage, {
  foreignKey: 'infoPerusahaanId',
  as: 'carouselImages',
});
CarouselImage.belongsTo(InfoPerusahaan, {
  foreignKey: 'infoPerusahaanId',
  as: 'infoPerusahaan',
});


//await InfoPerusahaan.sync({ alter: true })
  //.then(() => console.log('InfoPerusahaan table created or updated successfully!'))
  //.catch((error) => console.error('Error syncing InfoPerusahaan table:', error));
export default CarouselImage;
