import React from 'react';
import cx from 'classnames';
import Svg from 'webkit/ui/Svg/react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
export const Title = ({
  id,
  children,
  link,
  externalLink
}) => /*#__PURE__*/React.createElement("h2", {
  id: id,
  className: cx(styles.title, 'row v-center justify')
}, children, link && /*#__PURE__*/React.createElement(Link, {
  to: link,
  className: "btn-0 btn-2 btn-3"
}, /*#__PURE__*/React.createElement(Svg, {
  id: "external-link",
  w: 12
})), externalLink && /*#__PURE__*/React.createElement("a", {
  href: externalLink,
  target: "_blank",
  rel: "noopener noreferrer",
  className: "btn-0 btn-2 btn-3"
}, /*#__PURE__*/React.createElement(Svg, {
  id: "external-link",
  w: 12
})));
export const Content = ({
  className,
  children,
  isGrid
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.section, className, isGrid && styles.grid)
}, children);

const Section = ({
  children,
  title,
  isGrid,
  link,
  externalLink
}) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Title, {
  externalLink: externalLink,
  link: link
}, title), /*#__PURE__*/React.createElement(Content, {
  isGrid: isGrid
}, children));

export default Section;