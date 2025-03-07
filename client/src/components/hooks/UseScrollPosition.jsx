import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Analytics from '../commons/Analytics'; 

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    Analytics.logPageView();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
