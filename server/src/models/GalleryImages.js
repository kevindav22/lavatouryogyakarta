import { DataTypes } from 'sequelize';
import sequelize from '../config/Database.js';

const GalleryImage = sequelize.define(
  'GalleryImage',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'gallery_image',
    timestamps: true,
    freezeTableName: true,
  }
);

export default GalleryImage;
