import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@santiment-network/ui'
import dropdownStyles from './NavbarDropdown.module.scss'

const NavbarAssetsDropdownWatchlist = ({ list, activeLink }) => {
  return list.map(({ link, label }) => {
    return (
      <Button
        fluid
        variant='ghost'
        key={label}
        as={Link}
        className={dropdownStyles.item + ' ' + dropdownStyles.text}
        to={link}
        isActive={link === activeLink}
      >
        {label}
      </Button>
    )
  })
}

export default NavbarAssetsDropdownWatchlist
