import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@santiment-network/ui'
import styles from './NavbarDropdown.module.scss'

const links = [
  { link: '/labs/trends', label: 'Social trends' },
  { link: '/ethereum-spent', label: 'ETH spent' },
  // TODO: Balance is off until we don't fix backend logic
  // { link: '/labs/balance', label: 'Historical balance' },
  { link: '/labs/wordcloud', label: 'Word context' },
  { link: '/dashboards', label: 'Dashboard' }
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
