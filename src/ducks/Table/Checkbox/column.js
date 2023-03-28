import React from 'react'
import Checkbox from './index'
import PopupBanner from '../../../components/banners/feature/PopupBanner'
import { useUser } from '../../../stores/user'

export const CHECKBOX_COLUMN = {
  id: 'Checkboxes',
  Header: ({ getToggleAllRowsSelectedProps }) => {
    const { isLoggedIn } = useUser()
    const { onChange, ...rest } = getToggleAllRowsSelectedProps()

    function handleChange(e) {
      if (isLoggedIn) onChange(e)
    }

    return (
      <PopupBanner>
        <Checkbox {...rest} onChange={handleChange} />
      </PopupBanner>
    )
  },
  Cell: ({ row }) => {
    const { isLoggedIn } = useUser()
    const { onChange, ...rest } = row.getToggleRowSelectedProps()

    function handleChange(e) {
      if (isLoggedIn) onChange(e)
    }

    return (
      <PopupBanner>
        <Checkbox {...rest} onChange={handleChange} />
      </PopupBanner>
    )
  },
  disableSortBy: true,
  collapse: true,
}
