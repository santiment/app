import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Image from './Image';
import styles from './EmptySection.module.css';

const EmptySection = ({
  className = '',
  imgClassName = '',
  children = null
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.wrapper, className)
}, /*#__PURE__*/React.createElement(Image, {
  className: cx(styles.img, imgClassName)
}), children);

EmptySection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  imgClassName: PropTypes.string
};
export default EmptySection;