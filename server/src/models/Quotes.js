// models/Quotes.js
import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
const Quote = db.define('quotes', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jabatan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    tableName: 'quotes',
    timestamps: true,
    freezeTableName: true, 
});

export default Quote;
