import { DataTypes } from 'sequelize';
import sequelize from '../config/Database.js';

const VarianPaket = sequelize.define(
  'VarianPaket',
  {
    restoranId: { type: DataTypes.INTEGER, allowNull: false }, // Foreign key
    title: { type: DataTypes.STRING, allowNull: false },
    items: { type: DataTypes.TEXT, allowNull: false }, // Disimpan sebagai JSON dalam string
  },
  {
    tableName: 'varian-paket',
    timestamps: true,
    freezeTableName: true,
  }
);


export default VarianPaket;
