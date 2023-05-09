const _excluded = ["watchlist", "downloadData", "activeColumns"],
      _excluded2 = ["watchlist", "data", "downloadData"],
      _excluded3 = ["type"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useRef } from 'react';
import cx from 'classnames'; // import { CSVLink } from 'react-csv'

import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import ProPopupWrapper from '../../components/ProPopup/Wrapper';
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions';
import ExplanationTooltip from '../../components/ExplanationTooltip/ExplanationTooltip';
import styles from './index.module.css';

const cb = () => {};

export const DownloadCSVButton = () => /*#__PURE__*/React.createElement(ExplanationTooltip, {
  text: "Download .csv",
  offsetY: 10,
  className: styles.explanation
}, /*#__PURE__*/React.createElement(Icon, {
  type: "save"
}));

function renameFields(assets, activeColumns) {
  const labels = {};
  activeColumns.forEach(column => labels[column.key] = column.label);
  assets.forEach((asset, index) => {
    const keys = Object.keys(asset);
    keys.forEach(key => {
      const label = labels[key];

      if (label) {
        const value = assets[index][key];
        delete assets[index][key];
        assets[index][label] = value;
      }
    });
  });
}

const AsyncButton = _ref => {
  let {
    watchlist,
    downloadData,
    activeColumns
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const csvEl = useRef(null);
  const [data, setData] = useState([]);

  const fetchData = () => {
    downloadData().then(data => {
      renameFields(data.assets, activeColumns);
      setData(data.assets);
      csvEl.current.link.click();
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, _extends({
    className: cx(styles.action, styles.action_csv),
    onClick: fetchData
  }, props)));
};

export const DownloadCSV = _ref2 => {
  let {
    watchlist,
    data,
    downloadData
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2);

  const {
    isPro
  } = useUserSubscriptionStatus();

  if (!isPro) {
    return /*#__PURE__*/React.createElement(Button, _extends({
      className: cx(styles.action, styles.action_csv)
    }, props, {
      onClick: cb
    }));
  } else {
    return downloadData ? /*#__PURE__*/React.createElement(AsyncButton, _extends({
      watchlist: watchlist,
      downloadData: downloadData
    }, props)) : /*#__PURE__*/React.createElement(Button, _extends({
      filename: `${watchlist.name}.csv`,
      target: "_blank",
      data: data,
      className: cx(styles.action, styles.action_csv)
    }, props, {
      disabled: !isPro
    }));
  }
};
DownloadCSV.defaultProps = {
  data: []
};

const DownloadCSVTrigger = _ref3 => {
  let {
    type
  } = _ref3,
      props = _objectWithoutProperties(_ref3, _excluded3);

  return /*#__PURE__*/React.createElement(ProPopupWrapper, {
    type: type,
    className: styles.proWrapper
  }, /*#__PURE__*/React.createElement(DownloadCSV, props, /*#__PURE__*/React.createElement(DownloadCSVButton, null)));
};

export default DownloadCSVTrigger;