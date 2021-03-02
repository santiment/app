import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import { DEFAULT_SCREENER } from '../../ducks/Screener/utils'
import SmoothDropdownItem from '../SmoothDropdown/SmoothDropdownItem'
import styles from './Navbar.module.scss'

export const NavbarItem = ({
  item: { Dropdown, ddParams, onOpen, onClose, ...rest },
  activeLink
}) => {
  let isActive = activeLink.includes(rest.to)

  if (rest.to === '/') {
    isActive = activeLink === '/'
  }

  if (rest.to === '/watchlists') {
    isActive =
      activeLink.includes('/assets') || activeLink.includes('/watchlist')
  }

  if (rest.to === DEFAULT_SCREENER.href) {
    isActive = activeLink.includes('/screener')
  }

  const button = (
    <Button
      variant='flat'
      isActive={isActive}
      className={cx(Dropdown || styles.leftLink, styles.btn)}
      {...rest}
    />
  )

  if (Dropdown) {
    return (
      <SmoothDropdownItem
        trigger={button}
        ddParams={ddParams}
        onOpen={onOpen}
        onClose={onClose}
      >
        <Dropdown activeLink={activeLink} />
      </SmoothDropdownItem>
    )
  }

  return button
}
