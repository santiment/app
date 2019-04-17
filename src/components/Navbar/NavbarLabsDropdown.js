import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@santiment-network/ui'
import styles from './NavbarDropdown.module.scss'

const links = [
  { link: '/labs/trends', label: 'Social trends 🔥' },
  // { link: '/labs/social-movers', label: 'Social movers' },
  { link: '/ethereum-spent', label: 'ETH spent' },
  { link: '/labs/balance', label: 'Historical balance' },
  { link: '/dashboards', label: 'Dashboards' }
]

const NavbarLabsDropdown = ({ activeLink }) => (
  <div className={styles.list}>
    {links.map(({ link, label }) => (
      <Button
        fluid
        variant='ghost'
        key={label}
        as={props => <Link {...props} to={link} />}
        className={styles.item}
        isActive={link === activeLink}
      >
        {label}
      </Button>
    ))}
  </div>
)

export default NavbarLabsDropdown
