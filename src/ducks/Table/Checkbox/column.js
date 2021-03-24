import React from 'react'
import Checkbox from './index'

export const CHECKBOX_COLUMN = {
  id: 'Checkboxes',
  Header: ({ getToggleAllRowsSelectedProps }) => (
    <Checkbox {...getToggleAllRowsSelectedProps()} />
  ),
  Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
  disableSortBy: true,
  collapse: true
}
