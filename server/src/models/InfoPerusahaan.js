import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const InfoPerusahaan = db.define(
  'InfoPerusahaan',
  {
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identitas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tagline: {
      type: DataTypes.STRING,
    },
    deskripsi: {
      type: DataTypes.TEXT,
    },
    tentang: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    altImage: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'info_perusahaan',
    timestamps: true,
    freezeTableName: true, 
  }
);

// Sinkronisasi tabel (opsional, gunakan hanya saat pengembangan)
//await InfoPerusahaan.sync({ alter: true })
  //.then(() => console.log('InfoPerusahaan table created or updated successfully!'))
  //.catch((error) => console.error('Error syncing InfoPerusahaan table:', error));

export default InfoPerusahaan;
