import React from 'react';
import Icon from '@santiment-network/ui/Icon';
import Tooltip from '@santiment-network/ui/Tooltip';
import TemplateInfo from './TemplateDetailsDialog/TemplateInfo';
import styles from './Title.module.css';
export const Info = ({
  template
}) => /*#__PURE__*/React.createElement(Tooltip, {
  position: "top",
  align: "start",
  on: "click",
  offsetY: 13,
  trigger: /*#__PURE__*/React.createElement(Icon, {
    type: "info-round",
    className: styles.info
  }),
  className: styles.tooltip
}, /*#__PURE__*/React.createElement(TemplateInfo, {
  template: template,
  classes: styles
}));

const Title = ({
  template
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.wrapper
}, /*#__PURE__*/React.createElement(Info, {
  template: template
}), template.title);

Title.defaultProps = {
  template: {}
};
export default Title;