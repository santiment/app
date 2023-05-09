import React from 'react';
import { Link } from 'react-router-dom';
import { METRIC_TYPES } from '../../ducks/Signals/utils/constants';
import { getScreenerLink } from '../../ducks/Watchlists/url';
import styles from './ScreenerTriggerDescription.module.css';

const ScreenerTriggerDescription = ({
  trigger,
  data
}) => {
  const {
    settings: {
      type
    }
  } = trigger;

  if (!data || type !== METRIC_TYPES.SCREENER_SIGNAL) {
    return null;
  }

  const {
    added_slugs = [],
    removed_slugs = [],
    operation: {
      selector: {
        watchlist_id
      } = {}
    } = {}
  } = data;
  const link = getScreenerLink({
    id: watchlist_id
  });
  return /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, added_slugs.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, "Added slugs: ", /*#__PURE__*/React.createElement(Link, {
    to: link
  }, " ", added_slugs, " "))), removed_slugs.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, "Removed slugs: ", /*#__PURE__*/React.createElement(Link, {
    to: link
  }, " ", removed_slugs, " "))));
};

export default ScreenerTriggerDescription;