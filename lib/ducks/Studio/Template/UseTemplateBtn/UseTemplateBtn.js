function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Button from '@santiment-network/ui/Button';

const UseTemplateBtn = props => /*#__PURE__*/React.createElement(Button, _extends({
  variant: "fill",
  accent: "positive"
}, props), "Use Chart Layout");

export default UseTemplateBtn;