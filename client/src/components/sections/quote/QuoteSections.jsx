import React, { useEffect, useState } from 'react';
import QuoteCard from './QuoteCard';
import apiClient from '../../../services/apiClient';
import 'react-toastify/dist/ReactToastify.css';

const QuotesSection = () => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await apiClient.get('/api/quotes');
        if (response.data && response.data.length > 0) {
          setQuote(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <section className="bg-white py-8">
      {quote ? (
        <QuoteCard quote={quote.text || 'No quote available'} author={quote.nama || 'Anonymous'} role={quote.jabatan || 'Unknown'} avatar={quote.image ? `${apiClient.defaults.baseURL}${quote.image}` : '/default-avatar.png'} />
      ) : (
       <></>
      )}
    </section>
  );
};

export default QuotesSection;
