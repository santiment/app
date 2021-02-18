import React from 'react'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import {
  checkbox as checkboxStyles,
  index as indexStyles
} from './columns.module.scss'

// NOTE: Generic columns [@vanguard | Dec 21, 2020]

export const CHECKBOX_COLUMN = {
  id: 'CHECKBOX',
  Title: ({ selectAll, isAllItemSelected }) => (
    <Checkbox onClick={selectAll} isActive={isAllItemSelected} />
  ),
  render: (item, { selectItem, selectedItemsSet }) => (
    <Checkbox
      onClick={() => selectItem(item)}
      isActive={selectedItemsSet.has(item)}
    />
  ),
  className: checkboxStyles
}

export const INDEX_COLUMN = {
  id: 'INDEX',
  title: '#',
  render: (_, __, i) => i + 1,
  className: indexStyles
}
