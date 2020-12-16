import React from 'react'
import Checkbox from './index'

export const CHECKBOX_COLUMN = {
  id: 'checkboxes',
  Header: ({ getToggleAllRowsSelectedProps }) => (
    <Checkbox {...getToggleAllRowsSelectedProps()} />
  ),
  Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
  disableSortBy: true
}
