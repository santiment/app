import React, { forwardRef } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import { clipText } from '../../../../../../../utils';
import styles from './WatchlistsAndScreenersListItem.module.css';
const WatchlistsAndScreenersListItem = /*#__PURE__*/forwardRef(({
  item,
  isSelectedItem,
  style,
  onSelect
}, ref) => {
  const {
    name,
    id,
    listItems
  } = item;
  const assetsStr = listItems && listItems.map(entity => entity.project.name).join(', ');
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: style,
    className: styles.paddingWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, isSelectedItem && styles.selectedItem),
    onClick: () => onSelect(+id)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, name, isSelectedItem && /*#__PURE__*/React.createElement(Icon, {
    type: "checkmark",
    className: styles.icon,
    onClick: () => onSelect(+id)
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, clipText(assetsStr, 60))));
});
export default WatchlistsAndScreenersListItem;