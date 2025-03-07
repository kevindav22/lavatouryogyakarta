import Quote from '../models/Quotes.js'; // Import dengan 'import' dari ES Modules
import fs from 'fs'; // Import fs dengan ES Modules

// Get all quotes
export const getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.findAll();
    res.status(200).json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ message: 'Error fetching quotes', error: error.message });
  }
};

// Get a single quote by ID
export const getQuoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findByPk(id);

    if (!quote) return res.status(404).json({ message: 'Quote not found' });
    res.status(200).json(quote);
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({ message: 'Error fetching quote', error: error.message });
  }
};

// Create a new quote
export const createQuote = async (req, res) => {
  try {
    const { text, nama, jabatan } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newQuote = await Quote.create({
      text,
      nama,
      jabatan,
      image: imagePath,
    });

    res.status(201).json(newQuote);
  } catch (error) {
    console.error('Error creating quote:', error);
    res.status(500).json({ message: 'Error creating quote', error: error.message });
  }
};

// Update a quote
export const updateQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, nama, jabatan } = req.body;

    const quote = await Quote.findByPk(id);
    if (!quote) return res.status(404).json({ message: 'Quote not found' });

    const oldImagePath = quote.image;
    const updatedData = {
      text: text ?? quote.text,
      nama: nama ?? quote.nama,
      jabatan: jabatan ?? quote.jabatan,
      image: req.file ? `/uploads/${req.file.filename}` : quote.image,
    };

    await quote.update(updatedData);

    // Hapus gambar lama jika ada gambar baru
    if (req.file && oldImagePath && fs.existsSync(`.${oldImagePath}`)) {
      fs.unlink(`.${oldImagePath}`, (err) => {
        if (err) console.error('Error deleting old image:', err);
      });
    }

    res.status(200).json({ message: 'Quote updated successfully', data: quote });
  } catch (error) {
    console.error('Error updating quote:', error);
    res.status(500).json({ message: 'Error updating quote', error: error.message });
  }
};

// Delete a quote
export const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findByPk(id);

    if (!quote) return res.status(404).json({ message: 'Quote not found' });

    // Hapus gambar jika ada
    if (quote.image && fs.existsSync(`.${quote.image}`)) {
      try {
        fs.unlinkSync(`.${quote.image}`);
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }

    await quote.destroy();

    res.status(200).json({ message: 'Quote deleted successfully' });
  } catch (error) {
    console.error('Error deleting quote:', error);
    res.status(500).json({ message: 'Error deleting quote', error: error.message });
  }
};
