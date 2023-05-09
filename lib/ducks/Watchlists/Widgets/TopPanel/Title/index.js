import React from 'react';
import HelpPopup from '../../../../../components/HelpPopup/HelpPopup';
import styles from './index.module.css';

const Title = ({
  name,
  watchlist,
  isDefaultScreener
}) => {
  const title = isDefaultScreener ? 'My screener' : watchlist.name || name;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    className: styles.name
  }, title), watchlist.description && /*#__PURE__*/React.createElement(HelpPopup, {
    triggerClassName: styles.description
  }, watchlist.description));
};

export default Title;