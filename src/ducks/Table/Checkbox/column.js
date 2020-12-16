import React from 'react'
import { COLUMNS_NAMES } from '../../Watchlists/Widgets/Table/columns'
import Checkbox from './index'

export const CHECKBOX_COLUMN = {
  id: COLUMNS_NAMES.checkboxes,
  Header: ({ getToggleAllRowsSelectedProps }) => (
    <Checkbox {...getToggleAllRowsSelectedProps()} />
  ),
  Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
  disableSortBy: true
}
