import React from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import UpgradeBtn from '../../../components/UpgradeBtn/UpgradeBtn';
import styles from './ProMetric.module.css';

const ProMetric = ({
  classes = {},
  metric: {
    title,
    description,
    svg,
    isImage,
    isLeft,
    linkToTemplate
  },
  isProSanbase
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.container, classes.container, isLeft && styles.isLeft)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.descriptions
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, title), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, description)), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.svg, classes.svg, isLeft && styles.svgLeft)
  }, !isProSanbase ? /*#__PURE__*/React.createElement(UpgradeToUse, {
    className: styles.upgrade
  }) : /*#__PURE__*/React.createElement(LinkToTemplate, {
    link: linkToTemplate
  }), isImage ? /*#__PURE__*/React.createElement("img", {
    src: svg,
    alt: title
  }) : svg));
};

const LinkToTemplate = ({
  link
}) => {
  if (!link) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles.linkToTemplate
    }, "\xA0");
  }

  return /*#__PURE__*/React.createElement("a", {
    className: cx(styles.link, styles.linkToTemplate),
    target: "_blank",
    rel: "noopener noreferrer",
    href: link
  }, "Open to use ", /*#__PURE__*/React.createElement(Icon, {
    className: styles.upgradeIcon,
    type: "pointer-right"
  }));
};

const UpgradeToUse = ({
  className
}) => {
  return /*#__PURE__*/React.createElement(UpgradeBtn, {
    className: className,
    variant: "flat",
    showCrownIcon: false
  }, /*#__PURE__*/React.createElement(React.Fragment, null, "Upgrade to use ", /*#__PURE__*/React.createElement(Icon, {
    className: styles.upgradeIcon,
    type: "pointer-right"
  })));
};

export default ProMetric;