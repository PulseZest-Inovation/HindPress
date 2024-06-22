// WhatsAppButton.js
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const WhatsAppButton = ({ phoneNumber }) => {
  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-4 right-4 bg-green-500 text-white rounded-full p-5 shadow-lg hover:bg-green-600 transition duration-300"
    >
      <i className="fab fa-whatsapp fa-2x"></i>
    </button>
  );
};

export default WhatsAppButton;
