import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import PageLoader from '../../../components/Loader/PageLoader';
const LoadableRelatedInsights = Loadable({
  loader: () => import('../../../ducks/Studio/RelatedInsights/RelatedInsights'),
  loading: () => /*#__PURE__*/React.createElement(PageLoader, null)
});

const InsightsTab = ({
  settings
}) => {
  const [target, setTarget] = useState();
  useEffect(() => {
    setTarget(document.querySelector('.studio-screen'));
  }, []);
  return target ? /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement(LoadableRelatedInsights, {
    settings: settings
  }), target) : null;
};

export default InsightsTab;