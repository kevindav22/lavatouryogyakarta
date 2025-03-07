// Menggunakan `export` untuk mengekspor objek atau fungsi
const generateWhatsappLink = (whatsapp, templateTeks) => {
  const cleanNumber = whatsapp.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(templateTeks)}`;
};

export const kontakHooks = {
  beforeSave: (kontak) => {
    if (kontak.whatsapp && kontak.templateTeks) {
      kontak.linkWhatsapp = generateWhatsappLink(kontak.whatsapp, kontak.templateTeks);
    }
  },
  beforeUpdate: (kontak) => {
    console.log('Before Update Hook Triggered');

    const updatedFields = kontak.dataValues;
    const previousFields = kontak._previousDataValues;

    const whatsapp = updatedFields.whatsapp || previousFields.whatsapp;
    const templateTeks = updatedFields.templateTeks || previousFields.templateTeks;

    if (whatsapp && templateTeks) {
      kontak.linkWhatsapp = generateWhatsappLink(whatsapp, templateTeks);
    }
  },
};
