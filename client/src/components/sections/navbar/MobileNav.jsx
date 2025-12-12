import { Link } from 'react-router-dom';
import Button from '../../commons/Button';

const MobileNav = ({ navLinks, openNav, activePath, linkWhatsapp }) => {
  if (!openNav) return null;

  return (
    <div className="lg:hidden bg-[#800000] shadow-lg rounded-lg backdrop-blur-md">
      <div className="flex flex-col space-y-4 px-6 py-4">
        {/* NAV LINKS */}
        {navLinks.map(({ label, href }) => (
          <Link key={label} to={href} className={`${activePath === href ? 'text-yellow-500 font-bold' : 'text-white'} transition hover:text-yellow-300`}>
            {label}
          </Link>
        ))}

        {/* BUTTON WHATSAPP */}
        <Button link={linkWhatsapp} target="_blank" className="bg-[#FF6F00] text-white hover:bg-white hover:text-[#800000]">
          Hubungi Kami
        </Button>
      </div>
    </div>
  );
};

export default MobileNav;
