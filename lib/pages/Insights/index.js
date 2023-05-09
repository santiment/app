import React, { useEffect } from 'react';
import { isTrackingEnabled } from 'san-webkit/lib/analytics';
import PageLoader from '../../components/Loader/PageLoader';
export default (({
  match
}) => {
  useEffect(() => {
    setTimeout(() => {
      const path = window.location.href.replace(window.location.origin, '').replace(match.path, '');
      const stage = process.env.IS_STAGE_BACKEND ? '-stage' : '';
      const href = `https://insights${stage}.santiment.net${path}`;
      window.location = href;
    }, isTrackingEnabled ? 700 : 0);
  }, []);
  return /*#__PURE__*/React.createElement(PageLoader, null);
});