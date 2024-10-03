
const initSentry = () => {
  if (!window.env) {
    window.env = {
      RAVEN_DSN: '',
      WEBSITE_URL: process.env.REACT_APP_WEBSITE_URL || ''
    };
  }

  const configs = {
    dsn: window.env.RAVEN_DSN || '',
    release: `Ver. ${process.env.REACT_APP_VERSION}`
  };
};

export default initSentry;