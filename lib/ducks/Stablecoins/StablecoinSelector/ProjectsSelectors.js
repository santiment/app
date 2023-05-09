function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import cx from 'classnames';
import { createSkeletonElement, createSkeletonProvider } from '@trainline/react-skeletor';
import Icon from '@santiment-network/ui/Icon';
import ProjectSelectDialog from '../../Studio/Compare/ProjectSelectDialog';
import { ProjectIcon } from '../../../components/ProjectIcon/ProjectIcon';
import { useDialogState } from '../../../hooks/dialog';
import styles from './DashboardProjectsSelector.module.css';
const H1 = createSkeletonElement('h1');
export const DashboardProjectInfo = createSkeletonProvider({
  name: '_______'
}, ({
  name
}) => name === undefined, () => ({
  color: 'var(--mystic)',
  backgroundColor: 'var(--mystic)'
}))(({
  name,
  ticker,
  slug,
  description,
  logoUrl,
  darkLogoUrl,
  onClick,
  size = 40,
  classes = {}
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.selector,
  onClick: onClick
}, /*#__PURE__*/React.createElement(ProjectIcon, {
  size: size,
  slug: slug,
  logoUrl: logoUrl,
  darkLogoUrl: darkLogoUrl
}), /*#__PURE__*/React.createElement("div", {
  className: styles.project
}, /*#__PURE__*/React.createElement("div", {
  className: styles.project__top
}, /*#__PURE__*/React.createElement(H1, {
  className: cx(styles.project__name, classes.project__name)
}, name, " ", /*#__PURE__*/React.createElement("span", {
  className: styles.project__ticker
}, ticker)), /*#__PURE__*/React.createElement("div", {
  className: styles.project__arrows
}, /*#__PURE__*/React.createElement(Icon, {
  type: "arrow-down",
  className: styles.project__arrow
}))), description && /*#__PURE__*/React.createElement("div", {
  className: styles.project__description
}, description))));
export const DashboardProjectSelector = ({
  type,
  setAsset,
  asset,
  trigger,
  triggerProps,
  classes
}) => {
  const {
    closeDialog,
    openDialog,
    isOpened
  } = useDialogState();
  return /*#__PURE__*/React.createElement(ProjectSelectDialog, {
    open: isOpened,
    activeSlug: asset.slug,
    onOpen: openDialog,
    onClose: closeDialog,
    onSelect: asset => {
      setAsset(asset);
      closeDialog();
    },
    customTabs: type && [type],
    showTabs: false,
    trigger: trigger || /*#__PURE__*/React.createElement(DashboardProjectInfo, _extends({}, asset, triggerProps, {
      onClick: openDialog,
      classes: classes
    }))
  });
};
export const StablecoinsSelector = _ref => {
  let rest = _extends({}, _ref);

  return /*#__PURE__*/React.createElement(DashboardProjectSelector, _extends({
    type: 'Stablecoins'
  }, rest));
};