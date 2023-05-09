import React from 'react';
import { Checkbox } from '@santiment-network/ui/Checkboxes';
import { checkbox as checkboxStyles, index as indexStyles } from './columns.module.css'; // NOTE: Generic columns [@vanguard | Dec 21, 2020]

export const CHECKBOX_COLUMN = {
  id: 'CHECKBOX',
  Title: ({
    selectAll,
    isAllItemSelected
  }) => /*#__PURE__*/React.createElement(Checkbox, {
    onClick: selectAll,
    isActive: isAllItemSelected
  }),
  render: (item, {
    selectItem,
    selectedItemsSet
  }) => /*#__PURE__*/React.createElement(Checkbox, {
    onClick: () => selectItem(item),
    isActive: selectedItemsSet.has(item)
  }),
  className: checkboxStyles
};
export const INDEX_COLUMN = {
  id: 'INDEX',
  title: '#',
  render: (_, __, i) => i + 1,
  className: indexStyles
};