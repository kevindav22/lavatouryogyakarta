import Restoran from '../models/Restoran.js';
import VarianPaket from '../models/VarianPaket.js';
import fs from 'fs';

const processField = (field) => {
  if (typeof field === 'string') {
    try {
      return JSON.parse(field);
    } catch {
      return field.split(',').map((item) => item.trim());
    }
  } else if (Array.isArray(field)) {
    return field;
  }
  return field;
};
const formatArrayResponse = (field) => {
  return Array.isArray(field) ? field.map(String) : [];
};

export const getAllRestorans = async (req, res) => {
  try {
    const restorans = await Restoran.findAll({
      include: [
        {
          model: VarianPaket,
          as: 'varian-paket',
        },
      ],
    });

    const processedRestorans = restorans.map((restoran) => {
      const varianPaketProcessed = restoran['varian-paket'].map((paket) => ({
        ...paket.toJSON(),
        items: JSON.parse(paket.items),
      }));

      return {
        ...restoran.toJSON(),
        menuUnggulan: formatArrayResponse(processField(restoran.menuUnggulan)),
        fasilitas: formatArrayResponse(processField(restoran.fasilitas)),
        'varian-paket': varianPaketProcessed,
      };
    });

    res.status(200).json(processedRestorans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
};

export const getRestoranById = async (req, res) => {
  try {
    const { id } = req.params;
    const restoran = await Restoran.findByPk(id, {
      include: [
        {
          model: VarianPaket,
          as: 'varian-paket',
        },
      ],
    });

    if (!restoran) return res.status(404).json({ error: 'Restoran not found' });

    const varianPaketProcessed = restoran['varian-paket'].map((paket) => ({
      ...paket.toJSON(),
      items: JSON.parse(paket.items),
    }));

    const response = {
      ...restoran.toJSON(),
      menuUnggulan: formatArrayResponse(processField(restoran.menuUnggulan)),
      fasilitas: formatArrayResponse(processField(restoran.fasilitas)),
      'varian-paket': varianPaketProcessed,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createRestoran = async (req, res) => {
  try {
    const { namaResto, altImage, alamat, linkMaps, deskripsi, kontak, linkKontak, menuUnggulan, fasilitas, namaPaket, paketItems } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    console.log('PaketItems:', paketItems);
    const newRestoran = await Restoran.create({
      namaResto,
      altImage,
      alamat,
      linkMaps,
      deskripsi,
      kontak,
      linkKontak,
      namaPaket,
      menuUnggulan: JSON.stringify(processField(menuUnggulan)),
      fasilitas: JSON.stringify(processField(fasilitas)),
      image,
    });
    if (paketItems && typeof paketItems === 'string') {
      const parsedPaketItems = JSON.parse(paketItems);
      if (Array.isArray(parsedPaketItems)) {
        for (let item of parsedPaketItems) {
          await VarianPaket.create({
            title: item.title,
            items: JSON.stringify(processField(item.items)),
            restoranId: newRestoran.id,
          });
        }
      }
    } else if (paketItems && Array.isArray(paketItems)) {
      for (let item of paketItems) {
        await VarianPaket.create({
          title: item.title,
          items: JSON.stringify(processField(item.items)),
          restoranId: newRestoran.id,
        });
      }
    }

    res.status(201).json({
      message: 'Restoran dan varian paket berhasil dibuat',
      data: {
        ...newRestoran.toJSON(),
        menuUnggulan: formatArrayResponse(processField(newRestoran.menuUnggulan)),
        fasilitas: formatArrayResponse(processField(newRestoran.fasilitas)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRestoran = async (req, res) => {
  try {
    const { id } = req.params;
    const { namaResto, altImage, alamat, linkMaps, deskripsi, kontak, linkKontak, menuUnggulan, fasilitas, namaPaket, paketItems } = req.body;

    const restoran = await Restoran.findByPk(id);
    if (!restoran) return res.status(404).json({ message: 'Restoran tidak ditemukan' });

    const oldImagePath = restoran.image;

    const updatedData = {
      namaResto: namaResto ?? restoran.namaResto,
      altImage: altImage ?? restoran.altImage,
      alamat: alamat ?? restoran.alamat,
      linkMaps: linkMaps ?? restoran.linkMaps,
      deskripsi: deskripsi ?? restoran.deskripsi,
      kontak: kontak ?? restoran.kontak,
      linkKontak: linkKontak ?? restoran.linkKontak,
      menuUnggulan: menuUnggulan ? JSON.stringify(processField(menuUnggulan)) : restoran.menuUnggulan,
      fasilitas: fasilitas ? JSON.stringify(processField(fasilitas)) : restoran.fasilitas,
      namaPaket: namaPaket ?? restoran.namaPaket,
      image: req.file ? `/uploads/${req.file.filename}` : restoran.image,
    };

    await restoran.update(updatedData);
    if (paketItems && Array.isArray(paketItems)) {
      for (let item of paketItems) {
        await VarianPaket.create({
          title: item.title,
          items: JSON.stringify(processField(item.items)),
          restoranId: restoran.id,
        });
      }
    }
    if (req.file && oldImagePath && fs.existsSync(`.${oldImagePath}`)) {
      fs.unlink(`.${oldImagePath}`, (err) => {
        if (err) console.error('Error deleting old image:', err);
      });
    }

    res.status(200).json({
      message: 'Restoran berhasil diperbarui',
      data: {
        ...restoran.toJSON(),
        menuUnggulan: formatArrayResponse(processField(restoran.menuUnggulan)),
        fasilitas: formatArrayResponse(processField(restoran.fasilitas)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui data', error: error.message });
  }
};
export const deleteRestoran = async (req, res) => {
  try {
    const { id } = req.params;
    const restoran = await Restoran.findByPk(id);
    if (!restoran) return res.status(404).json({ message: 'Restoran tidak ditemukan' });
    if (restoran.image && fs.existsSync(`.${restoran.image}`)) {
      fs.unlink(`.${restoran.image}`, (err) => {
        if (err) console.error('Error deleting image:', err);
      });
    }
    await VarianPaket.destroy({
      where: { restoranId: restoran.id },
    });

    await restoran.destroy();
    res.status(200).json({ message: 'Restoran dan varian paket berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus data', error: error.message });
  }
};
