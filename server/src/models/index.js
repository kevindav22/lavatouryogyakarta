import Kontak from './Kontak.js';
import { kontakHooks } from '../hooks/KontakHooks.js';

Kontak.addHook('beforeSave', kontakHooks.beforeSave);

export { Kontak };
