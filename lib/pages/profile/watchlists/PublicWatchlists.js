const _excluded = ["watchlists", "type", "isOwner"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import { WatchlistCards } from '../../../ducks/Watchlists/Cards/Card';
import NoEntries from '../../../components/EmptySection/NoEntries';
import NewWatchlist from '../../../ducks/Watchlists/Actions/New';
import { PROJECT, BLOCKCHAIN_ADDRESS, SCREENER } from '../../../ducks/Watchlists/detector';
import styles from './../ProfilePage.module.css';

const PublicWatchlists = _ref => {
  let {
    watchlists,
    type,
    isOwner
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  if (!watchlists || watchlists.length === 0) {
    switch (type) {
      case PROJECT:
        return /*#__PURE__*/React.createElement(NoEntries, {
          maxWidth: "277px",
          title: isOwner && 'No Watchlist yet',
          desc: isOwner ? 'Create your own watchlist to track assets you are interested in' : "This user doesn't have any watchlists yet"
        }, isOwner && /*#__PURE__*/React.createElement(NewWatchlist, {
          trigger: /*#__PURE__*/React.createElement("button", {
            className: "btn-1 body-3"
          }, "Create watchlist"),
          type: PROJECT
        }));

      case BLOCKCHAIN_ADDRESS:
        return /*#__PURE__*/React.createElement(NoEntries, {
          title: isOwner && 'No Addresses Watchlists yet',
          desc: isOwner ? 'Create your watchlist to track wallets you are interested in' : "This user doesn't have any watchlists yet"
        }, isOwner && /*#__PURE__*/React.createElement(NewWatchlist, {
          trigger: /*#__PURE__*/React.createElement("button", {
            className: "btn-1 body-3"
          }, "Create addresses watchlist"),
          type: BLOCKCHAIN_ADDRESS
        }));

      case SCREENER:
        return /*#__PURE__*/React.createElement(NoEntries, {
          title: isOwner && 'No Screener yet',
          desc: isOwner ? 'Create your own screener to track assets you are interested in' : "This user doesn't have any screeners yet"
        }, isOwner && /*#__PURE__*/React.createElement(NewWatchlist, {
          source: "create_screener",
          trigger: /*#__PURE__*/React.createElement("button", {
            className: "btn-1 body-3"
          }, "Create screener"),
          type: SCREENER
        }));

      default:
        throw new Error('Invalid type');
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.block, styles.block__lists)
  }, /*#__PURE__*/React.createElement(WatchlistCards, _extends({
    watchlists: watchlists
  }, props)));
};

export default PublicWatchlists;