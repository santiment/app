import React, { forwardRef } from 'react';
import cx from 'classnames';
import { Checkbox } from '@santiment-network/ui/Checkboxes';
import Label from '@santiment-network/ui/Label';
import { ProjectIcon } from '../../../../../../../../../components/ProjectIcon/ProjectIcon';
import styles from '../ProjectsList.module.css';
const ProjectListItem = /*#__PURE__*/forwardRef(({
  style,
  isSelectedItem,
  onToggleProject,
  item,
  listItems,
  isAssetInList,
  slug,
  logoUrl,
  name,
  ticker,
  isWords,
  isNightMode
}, ref) => /*#__PURE__*/React.createElement("div", {
  ref: ref,
  style: style,
  className: cx(isSelectedItem && styles.selectedItem)
}, /*#__PURE__*/React.createElement("div", {
  className: styles.project,
  onClick: () => {
    onToggleProject({
      project: item,
      listItems,
      isAssetInList
    });
  }
}, /*#__PURE__*/React.createElement(Checkbox, {
  isActive: isAssetInList
}), /*#__PURE__*/React.createElement("div", {
  className: styles.asset
}, !isWords && /*#__PURE__*/React.createElement(ProjectIcon, {
  className: styles.icon,
  size: 16,
  slug: slug,
  logoUrl: logoUrl,
  isNightMode: isNightMode
}), /*#__PURE__*/React.createElement("span", {
  className: styles.name
}, isWords ? slug : name), !isWords && /*#__PURE__*/React.createElement(Label, {
  accent: "waterloo",
  className: styles.label
}, "(", ticker, ")")))));
export default ProjectListItem;