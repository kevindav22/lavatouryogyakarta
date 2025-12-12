import { Link } from 'react-router-dom';

const DesktopNav = ({ navLinks, activePath }) => {
  return (
    <div className="hidden lg:flex space-x-6">
      {navLinks.map(({ label, href }) => (
        <Link key={label} to={href} className={`text-lg ${activePath === href ? 'text-yellow-500 font-bold' : 'text-white'} transition hover:text-yellow-300`}>
          {label}
        </Link>
      ))}
    </div>
  );
};

export default DesktopNav;
