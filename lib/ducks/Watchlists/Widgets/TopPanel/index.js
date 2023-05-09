const _excluded = ["name", "type", "widgets", "setWidgets", "className", "watchlist", "isLoggedIn", "projectsCount", "isDefaultScreener", "isUpdatingWatchlist", "updateWatchlistFunction", "refetchAssets"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Title from './Title';
import Filter from '../Filter';
import Widgets from './Widgets';
import BaseActions from './BaseActions';
import Share from '../../Actions/Share';
import { useIsAuthor } from '../../gql/list/hooks';
import { PROJECT, SCREENER } from '../../detector';
import WeeklyReport from '../../Actions/WeeklyReport';
import ScreenerSignalDialog from '../../../Signals/ScreenerSignal/ScreenerSignalDialog';
import styles from './index.module.css';

const TopPanel = _ref => {
  let {
    name,
    type,
    widgets,
    setWidgets,
    className,
    watchlist,
    isLoggedIn,
    projectsCount,
    isDefaultScreener,
    isUpdatingWatchlist,
    updateWatchlistFunction,
    refetchAssets
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const {
    isAuthor,
    isAuthorLoading
  } = useIsAuthor(watchlist);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [knockNumber, setKnockNumber] = useState(0);
  useEffect(() => {
    if (knockNumber > 0) {
      setKnockNumber(0);
    }
  }, []);

  function closeFilter() {
    if (isFilterOpen) {
      setIsFilterOpen(false);
    }
  }

  return /*#__PURE__*/React.createElement("section", {
    className: cx(styles.wrapper, isFilterOpen && styles.open, type !== SCREENER && styles.light, className)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement(Title, {
    name: name,
    watchlist: watchlist,
    isDefaultScreener: isDefaultScreener
  }), /*#__PURE__*/React.createElement(BaseActions, {
    type: type,
    watchlist: watchlist,
    onClick: closeFilter,
    isAuthor: isAuthor,
    isAuthorLoading: isAuthorLoading,
    refetchAssets: refetchAssets
  }), isUpdatingWatchlist && /*#__PURE__*/React.createElement("span", {
    className: styles.saving
  }, "Saving...")), type === SCREENER ? /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement("div", {
    onClick: closeFilter,
    className: styles.row
  }, isAuthor && !isDefaultScreener && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Share, {
    watchlist: watchlist,
    isAuthor: isAuthor
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.divider
  })), (isAuthor || isDefaultScreener) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ScreenerSignalDialog, {
    watchlistId: watchlist.id
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.divider
  })), /*#__PURE__*/React.createElement(Widgets, {
    widgets: widgets,
    setWidgets: setWidgets
  })), /*#__PURE__*/React.createElement(Filter, _extends({
    watchlist: watchlist,
    projectsCount: projectsCount,
    isAuthor: isAuthor,
    isAuthorLoading: isAuthorLoading,
    isLoggedIn: isLoggedIn,
    isDefaultScreener: isDefaultScreener,
    setIsOpen: setIsFilterOpen,
    isOpen: isFilterOpen,
    updateWatchlistFunction: updateWatchlistFunction
  }, props))) : /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, widgets && /*#__PURE__*/React.createElement(Widgets, {
    widgets: widgets,
    setWidgets: setWidgets
  }), watchlist && /*#__PURE__*/React.createElement(Share, {
    watchlist: watchlist,
    isAuthor: isAuthor
  }), isAuthor && type === PROJECT && /*#__PURE__*/React.createElement(WeeklyReport, {
    watchlist: watchlist
  })));
};

export default TopPanel;