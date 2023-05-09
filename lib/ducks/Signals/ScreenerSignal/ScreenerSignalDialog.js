function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useEffect } from 'react';
import memoize from 'lodash.memoize';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import { useWatchlist } from '../../Watchlists/gql/hooks';
import Loader from '@santiment-network/ui/Loader/Loader';
import { useSignals } from '../common/getSignals';
import { useUser } from '../../../stores/user';
import LoginPopup from '../../../components/banners/feature/PopupBanner';
import AlertModal from '../../Alert/AlertModal';
import { SCREENER_DEFAULT_SIGNAL, WATCHLIST_DEFAULT_SIGNAL } from './utils';
import { ALERT_TYPES } from '../../Alert/constants';
import { PROJECT, SCREENER } from '../../Watchlists/detector';
import styles from './ScreenerSignalDialog.module.css';
export const EditSignalIcon = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  width: "16",
  height: "14",
  viewBox: "0 0 16 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M4.54081 0.225283C4.69256 0.45599 4.62855 0.766035 4.39785 0.917788C2.3329 2.27606 1 4.50146 1 7.00187C1 9.49989 2.33035 11.7234 4.39193 13.0821C4.6225 13.234 4.68624 13.5441 4.53428 13.7747C4.38233 14.0053 4.07223 14.069 3.84165 13.917C1.52928 12.3931 0 9.87049 0 7.00187C0 4.1305 1.53221 1.60579 3.8483 0.0823244C4.07901 -0.0694286 4.38905 -0.00542398 4.54081 0.225283ZM11.4598 0.225283C11.6116 -0.00542398 11.9216 -0.0694286 12.1523 0.0823244C14.4684 1.60579 16.0006 4.1305 16.0006 7.00187C16.0006 9.87049 14.4714 12.3931 12.159 13.917C11.9284 14.069 11.6183 14.0053 11.4664 13.7747C11.3144 13.5441 11.3781 13.234 11.6087 13.0821C13.6703 11.7234 15.0006 9.49989 15.0006 7.00187C15.0006 4.50146 13.6677 2.27606 11.6028 0.917788C11.3721 0.766035 11.3081 0.45599 11.4598 0.225283Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7Z",
  fill: "var(--persimmon)"
}));
const getWachlistIdFromSignal = memoize((signal = {}, isProject) => {
  if (isProject) {
    const {
      settings: {
        target: {
          watchlist_id
        } = {}
      } = {}
    } = signal;
    return watchlist_id;
  }

  const {
    settings: {
      operation: {
        selector: {
          watchlist_id
        } = {}
      } = {}
    } = {}
  } = signal;
  return watchlist_id;
});
const getWatchlistSignal = memoize(({
  signals,
  watchlist: {
    id
  },
  isProject
}) => {
  return signals.find(signal => {
    const wId = getWachlistIdFromSignal(signal, isProject);
    return wId && +wId === +id;
  });
});

const ScreenerSignalDialog = ({
  trigger: ElTrigger,
  signal,
  watchlistId,
  type
}) => {
  const isProject = type === PROJECT;
  const {
    isLoggedIn
  } = useUser();
  const [stateSignal, setSignal] = useState(signal || type === SCREENER && SCREENER_DEFAULT_SIGNAL || isProject && WATCHLIST_DEFAULT_SIGNAL);
  const targetId = watchlistId || getWachlistIdFromSignal(signal, isProject);
  const [watchlist] = useWatchlist({
    id: targetId
  });
  const hasSignal = signal && signal.id > 0;
  const {
    data: signals = [],
    loading: signalsLoading
  } = useSignals({
    skip: hasSignal
  });
  useEffect(() => {
    if (hasSignal) {
      setSignal(signal);
    }
  }, [signal]);
  useEffect(() => {
    if (watchlist && !hasSignal) {
      if (signals.length > 0) {
        let signalOfWatchlist = getWatchlistSignal({
          signals,
          watchlist,
          isProject
        });

        if (signalOfWatchlist) {
          setSignal(signalOfWatchlist);
          return;
        }
      }

      if (isProject) {
        const newSignal = _objectSpread(_objectSpread({}, WATCHLIST_DEFAULT_SIGNAL), {}, {
          title: `Alert for watchlist '${watchlist.name}'`
        });

        newSignal.settings.target = {
          watchlist_id: +watchlist.id
        };
        setSignal(newSignal);
      } else {
        const newSignal = _objectSpread(_objectSpread({}, SCREENER_DEFAULT_SIGNAL), {}, {
          title: `Alert for screener '${watchlist.name}'`
        });

        newSignal.settings.operation.selector = {
          watchlist_id: watchlist.id
        };
        setSignal(newSignal);
      }
    }
  }, [signals, watchlist]);
  const isActive = !!stateSignal.id && !!stateSignal.isActive;
  const title = isActive ? 'Edit Alert' : 'Create Alert';

  if (signalsLoading) {
    return /*#__PURE__*/React.createElement(Loader, {
      className: styles.loader
    });
  }

  if (!isLoggedIn) {
    return /*#__PURE__*/React.createElement(LoginPopup, null, ElTrigger || /*#__PURE__*/React.createElement(Button, {
      className: styles.btn,
      type: "button"
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "signal",
      className: styles.iconAlert
    }), " ", title));
  }

  let defaultType;

  switch (type) {
    case PROJECT:
      defaultType = ALERT_TYPES[1];
      break;

    case SCREENER:
      defaultType = ALERT_TYPES[2];
      break;

    default:
      defaultType = ALERT_TYPES[1];
      break;
  }

  return /*#__PURE__*/React.createElement(AlertModal, {
    defaultType: defaultType,
    signalData: stateSignal,
    id: stateSignal.id,
    trigger: ElTrigger || /*#__PURE__*/React.createElement(Button, {
      className: styles.btn,
      type: "button"
    }, !isActive ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      type: "signal",
      className: styles.iconAlert
    }), " ", title) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EditSignalIcon, {
      className: styles.iconAlert
    }), " ", title))
  });
};

export default ScreenerSignalDialog;