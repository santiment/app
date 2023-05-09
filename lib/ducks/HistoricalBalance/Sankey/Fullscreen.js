function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Title from './Title';
import Sankey from './Sankey';
import FullscreenDialogBtn from '../../../components/FullscreenDialogBtn';
import styles from './index.module.css';

const Fullscreen = props => /*#__PURE__*/React.createElement("div", {
  className: styles.fullscreen
}, /*#__PURE__*/React.createElement(Title, null, "Fullscreen"), /*#__PURE__*/React.createElement(FullscreenDialogBtn, {
  title: `${props.address} Money Flow`,
  className: styles.fullscreen__btn,
  dialogClasses: styles
}, /*#__PURE__*/React.createElement(Sankey, _extends({
  id: "sankey-fullscreen-graph"
}, props))));

export default Fullscreen;