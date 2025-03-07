import { DataTypes } from 'sequelize';
import sequelize from '../config/Database.js';
import VarianPaket from './VarianPaket.js';

const Restoran = sequelize.define(
  'Restoran',
  {
    namaResto: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    altImage: { type: DataTypes.STRING },
    alamat: { type: DataTypes.STRING, allowNull: false },
    linkMaps: { type: DataTypes.STRING },
    deskripsi: { type: DataTypes.TEXT },
    kontak: { type: DataTypes.STRING },
    linkKontak: { type: DataTypes.STRING },
    menuUnggulan: { type: DataTypes.TEXT }, 
    fasilitas: { type: DataTypes.TEXT }, 
    namaPaket: { type: DataTypes.STRING },
  },
  {
    tableName: 'restoran',
    timestamps: true,
    freezeTableName: true,
  }
);

export default Restoran;
