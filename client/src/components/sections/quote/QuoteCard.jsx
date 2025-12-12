import { FaQuoteLeft } from 'react-icons/fa';

const QuoteCard = ({ quote, author, role, avatar }) => (
  <figure className="max-w-screen-md mx-auto px-6 sm:px-8 text-center">
    <FaQuoteLeft className="w-10 h-10 text-gray-400 mx-auto mb-2" />
    <div className="text-base sm:text-lg lg:text-xl italic font-light text-gray-900">{quote}</div>
    <figcaption className="flex items-center justify-center mt-4 space-x-3">
      <img className="w-12 h-12 rounded-full" src={avatar} alt={`${author}'s profile`} loading="lazy" />
      <div className="text-left">
        <span className="block font-medium text-gray-900">{author}</span>
        <span className="block text-sm text-gray-500">{role}</span>
      </div>
    </figcaption>
  </figure>
);

export default QuoteCard;
