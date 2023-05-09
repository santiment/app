import React from 'react';
import cx from 'classnames';
import dashboardsStyles from '../../dashboards.module.css';

const Section = ({
  title,
  description,
  id,
  children
}) => /*#__PURE__*/React.createElement("div", {
  id: id
}, title && /*#__PURE__*/React.createElement("h4", {
  className: `h4 txt-b ${description ? 'mrg-s' : 'mrg-xxl'} mrg--b`
}, title), description && /*#__PURE__*/React.createElement("p", {
  className: cx(dashboardsStyles.description, 'body-2 mrg-xxl mrg--b')
}, description), children);

export default Section;