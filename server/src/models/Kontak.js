// models/kontak.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/Database.js';
import { kontakHooks } from '../hooks/KontakHooks.js';

const Kontak = sequelize.define(
  'Kontak',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    whatsapp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    templateTeks: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    linkWhatsapp: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    linkMaps: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkTiktok: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkInstagram: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkFacebook: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkYoutube: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'kontak',
    timestamps: true,
    freezeTableName: true,
  }
);

Kontak.addHook('beforeSave', kontakHooks.beforeSave);
Kontak.addHook('beforeUpdate', kontakHooks.beforeUpdate);

export default Kontak;
