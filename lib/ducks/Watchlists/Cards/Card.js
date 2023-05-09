const _excluded = ["watchlists", "Card"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import NewLabel from '../../../components/NewLabel/NewLabel';
import { VisibilityIndicator } from '../../../components/VisibilityIndicator';
import { DesktopOnly, MobileOnly } from '../../../components/Responsive';
import { getSEOLinkFromIdAndTitle } from '../../../utils/url';
import styles from './Card.module.css';

const WatchlistCard = ({
  className,
  classes,
  watchlist,
  path,
  simplifiedChildren,
  middleChildren,
  bottomChildren,
  isSimplified,
  isWithNewCheck,
  isWithVisibility,
  chart
}) => {
  const {
    id,
    name,
    insertedAt,
    isPublic,
    href
  } = watchlist;
  const to = href || path + getSEOLinkFromIdAndTitle(id, name);

  if (isSimplified) {
    return /*#__PURE__*/React.createElement(Link, {
      to: to,
      className: cx(styles.wrapper, styles.simple, className)
    }, name, simplifiedChildren);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(Link, {
    to: to,
    className: cx(styles.wrapper, 'btn c-black', className)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.header, 'row v-center body-2')
  }, isWithNewCheck && /*#__PURE__*/React.createElement(NewLabel, {
    date: insertedAt,
    className: styles.new
  }), name, isWithVisibility && /*#__PURE__*/React.createElement(VisibilityIndicator, {
    isPublic: isPublic,
    className: styles.visibility
  })), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.middle, 'h4 row justify', classes.middle)
  }, middleChildren), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.bottom, 'row v-center c-casper')
  }, bottomChildren))), /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement(Link, {
    to: to,
    className: cx(styles.wrapper, 'btn row v-center justify c-black', className)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.info, 'column justify')
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.header, 'row v-center body-2')
  }, isWithNewCheck && /*#__PURE__*/React.createElement(NewLabel, {
    date: insertedAt,
    className: styles.new
  }), name), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.middle, 'h4 row justify', classes.middle)
  }, middleChildren), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.bottom, 'row v-center c-casper')
  }, bottomChildren)), chart)));
};

WatchlistCard.defaultProps = {
  classes: {},
  isWithNewCheck: true,
  isWithVisibility: true
};
export const WatchlistCards = _ref => {
  let {
    watchlists,
    Card
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return watchlists.map(watchlist => /*#__PURE__*/React.createElement(Card, _extends({}, props, {
    key: watchlist.id,
    watchlist: watchlist
  })));
};
export default WatchlistCard;