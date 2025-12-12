import ReactGA from 'react-ga4';

const Analytics = {
  init: () => {
    // Inisialisasi Google Analytics
    ReactGA.initialize('G-Z9GM9YWRVZ');
  },
  logPageView: () => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  },
  logEvent: (category, action, label) => {

    ReactGA.event({
      category,
      action,
      label,
    });
  },
};

export default Analytics;
