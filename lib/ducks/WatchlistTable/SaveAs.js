function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import { PROJECT } from '../Watchlists/detector';
import SaveAs from '../Watchlists/Actions/SaveAs';
import ExplanationTooltip from '../../components/ExplanationTooltip/ExplanationTooltip';
import styles from './index.module.css';
export const SaveAsButton = props => /*#__PURE__*/React.createElement("div", _extends({}, props, {
  className: cx(styles.action)
}), /*#__PURE__*/React.createElement(ExplanationTooltip, {
  text: "Save as watchlist",
  offsetY: 10,
  className: styles.explanation
}, /*#__PURE__*/React.createElement(Icon, {
  type: "add-watchlist",
  className: styles.action__icon
})));

const SaveAsPopupTrigger = ({
  type,
  watchlist
}) => /*#__PURE__*/React.createElement(SaveAs, {
  watchlist: watchlist,
  type: type,
  trigger: /*#__PURE__*/React.createElement(SaveAsButton, null)
});

SaveAsPopupTrigger.defaultProps = {
  type: PROJECT
};
export default SaveAsPopupTrigger;