import React from 'react'
import cx from 'classnames'
import { isDefaultScreenerPath } from '../../ducks/Watchlists/utils'
import Button from '@santiment-network/ui/Button'
import SmoothDropdownItem from '../SmoothDropdown/SmoothDropdownItem'
import styles from './Navbar.module.scss'

export const NavbarItem = ({
  item: { Dropdown, ddParams, onOpen, onClose, ...rest },
  activeLink,
  isScreener
}) => {
  let isActive = activeLink.includes(rest.to)

  if (rest.to === '/') {
    isActive = activeLink === '/'
  }

  if (rest.to === '/assets' && activeLink.includes(rest.to)) {
    isActive = !isDefaultScreenerPath(activeLink) && !isScreener
  }

  if (rest.to === '/assets/screener' && activeLink.includes('/assets')) {
    isActive = isDefaultScreenerPath(activeLink) || isScreener
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
