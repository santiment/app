import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import ProjectIcon from '../../../ProjectIcon/ProjectIcon';
import styles from './index.module.css';

const Project = ({
  name,
  ticker,
  slug,
  logoUrl,
  darkLogoUrl,
  className,
  to
}) => /*#__PURE__*/React.createElement(Link, {
  to: to
}, /*#__PURE__*/React.createElement("div", {
  className: cx(styles.label, className)
}, /*#__PURE__*/React.createElement(ProjectIcon, {
  logoUrl: logoUrl,
  darkLogoUrl: darkLogoUrl,
  slug: slug,
  size: 20
}), /*#__PURE__*/React.createElement("span", {
  className: styles.name
}, name), /*#__PURE__*/React.createElement("span", {
  className: styles.ticker
}, ticker)));

Project.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string
};
export default Project;