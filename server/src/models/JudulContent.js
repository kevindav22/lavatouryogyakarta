// models/JudulContent.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/Database.js'; 

const JudulContent = sequelize.define('JudulContent', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  judul: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: false, 
  },
}, {
  tableName: 'judul_content', 
    timestamps: true,
    freezeTableName: true,
});

export default JudulContent;
