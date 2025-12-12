import Restoran from './Restoran.js';
import VarianPaket from './VarianPaket.js';

Restoran.hasMany(VarianPaket, { foreignKey: 'restoranId', as: 'varian-paket', onDelete: 'CASCADE' });
VarianPaket.belongsTo(Restoran, { foreignKey: 'restoranId', as: 'restoran' });
