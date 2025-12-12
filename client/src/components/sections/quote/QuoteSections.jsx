import { useEffect, useState } from 'react';
import QuoteCard from './QuoteCard';
import { loadGlobalData } from '../../../services/GlobalData';

const QuotesSection = () => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const global = await loadGlobalData();

      if (global.quotes && global.quotes.length > 0) {
        setQuote(global.quotes[0]);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-white py-8">
      {quote ? <QuoteCard quote={quote.text || 'No quote available'} author={quote.nama || 'Anonymous'} role={quote.jabatan || 'Unknown'} avatar={quote.image ? quote.image : '/default-avatar.png'} /> : <></>}
    </section>
  );
};

export default QuotesSection;
