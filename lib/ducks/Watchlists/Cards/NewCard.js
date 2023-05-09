const _excluded = ["title", "showProBanner"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import NewWatchlist from '../Actions/New';
import { ProLabel } from '../../../components/ProLabel';
import { SvgNew } from '../../../components/Illustrations/NewCard';
import { BLOCKCHAIN_ADDRESS, PROJECT, SCREENER } from '../detector';
import LoginPopup from '../../../components/banners/feature/PopupBanner';
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions';
import styles from './NewCard.module.css';
import cardStyles from './Card.module.css';

const Trigger = _ref => {
  let {
    title,
    showProBanner
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx(cardStyles.wrapper, styles.create, showProBanner && styles.create__disabled)
  }, props), /*#__PURE__*/React.createElement(SvgNew, {
    isDisabled: showProBanner
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.createLink
  }, "Create ", title, showProBanner && /*#__PURE__*/React.createElement(ProLabel, {
    className: styles.proLabel,
    as: 'span'
  })));
};

const NewCard = ({
  type
}) => {
  switch (type) {
    case SCREENER:
      return /*#__PURE__*/React.createElement(NewScreenerCard, {
        source: "create_screener"
      });

    case BLOCKCHAIN_ADDRESS:
    case PROJECT:
    default:
      return /*#__PURE__*/React.createElement(NewWatchlistCard, {
        type: type
      });
  }
};

const NewWatchlistCard = ({
  type
}) => /*#__PURE__*/React.createElement(LoginPopup, {
  trigger: props => /*#__PURE__*/React.createElement(Trigger, _extends({
    title: "watchlist"
  }, props))
}, /*#__PURE__*/React.createElement(NewWatchlist, {
  trigger: /*#__PURE__*/React.createElement(Trigger, {
    title: "watchlist"
  }),
  type: type
}));

const NewScreenerCard = ({
  source
}) => {
  const {
    isPro
  } = useUserSubscriptionStatus();
  return /*#__PURE__*/React.createElement(NewWatchlist, {
    trigger: /*#__PURE__*/React.createElement(Trigger, {
      title: "screener",
      showProBanner: !isPro
    }),
    type: SCREENER,
    source: source
  });
};

export default NewCard;