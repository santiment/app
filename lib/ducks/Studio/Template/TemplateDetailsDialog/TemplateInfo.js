import React from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Panel from '@santiment-network/ui/Panel';
import { getTemplateInfo } from '../utils';
import AvatarWithName from '../../../../components/AvatarWithName/AvatarWithName';
import styles from './TemplateDetailsDialog.module.css';

const TemplateInfo = ({
  template,
  as: El = Panel,
  classes = {}
}) => {
  const {
    assets: usedAssets,
    metrics: usedMetrics
  } = getTemplateInfo(template);
  const {
    description,
    user
  } = template;
  return /*#__PURE__*/React.createElement(El, {
    className: classes.templateInfo
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.block
  }, /*#__PURE__*/React.createElement(Icon, {
    className: styles.icon,
    type: "assets"
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.subTitle
  }, "Assets"), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, usedAssets.join(', ')))), /*#__PURE__*/React.createElement("div", {
    className: styles.block
  }, /*#__PURE__*/React.createElement(Icon, {
    className: styles.icon,
    type: "chart-bars"
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.subTitle
  }, "Metrics"), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, usedMetrics.join(', ')))), description && /*#__PURE__*/React.createElement("div", {
    className: styles.block
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "info-round-small",
    className: styles.icon
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.subTitle
  }, "Description"), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, description))), /*#__PURE__*/React.createElement("div", {
    className: styles.block
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "profile-small",
    className: styles.icon
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.subTitle
  }, "Author"), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.description, styles.user)
  }, /*#__PURE__*/React.createElement(AvatarWithName, {
    user: user,
    classes: styles
  })))));
};

export default TemplateInfo;