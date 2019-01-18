import React from 'react'
import { Link } from 'react-router-dom'
import { Panel, Button } from '@santiment-network/ui'
import styles from './NavbarDropdown.module.scss'

const links = [
  { link: '/labs/trends', label: 'Social Trends' },
  { link: '/ethereum-spent', label: 'ETH spent' },
  { link: '/labs/balance', label: 'Historical balance' },
  { link: '/labs/wordcloud', label: 'Word context' },
  { link: '/dashboard', label: 'Dashboard' }
]

const NavbarLabsDropdown = ({ activeLink }) => {
  return (
    <div className={styles.list}>
      {links.map(({ link, label }) => {
        return (
          <Button
            fluid
            variant='ghost'
            key={label}
            as={Link}
            className={styles.item + ' ' + styles.text}
            to={link}
            isActive={link === activeLink}
          >
            {label}
          </Button>
        )
      })}
    </div>
  )
}

export default NavbarLabsDropdown
