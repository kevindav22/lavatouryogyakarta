import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/Database.js'

const PaketJeep = sequelize.define('PaketJeep', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  NamaPaket: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsiPaket: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hargaAwal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  diskon: {
    type: DataTypes.INTEGER,  // Gunakan integer untuk diskon
    allowNull: false,
  },
  durasi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spotWisata: {
    type: DataTypes.JSON,  // Array untuk spot wisata
    allowNull: false,
  },
  isPopular: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  altImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'paket_jeep',
    timestamps: true,
    freezeTableName: true, 
});

export default PaketJeep;
