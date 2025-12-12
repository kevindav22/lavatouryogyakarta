import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ href, children, className }) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  const handleClick = () => {
    console.log('Scrolling to top');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <Link to={href} onClick={handleClick} className={`${className} ${isActive ? 'text-orange-500 font-bold' : 'text-white'} hover:text-[#FF6F00] transition-colors text-sm sm:text-base md:text-lg lg:text-xl font-medium`}>
      {children}
    </Link>
  );
};

export default NavLink;
