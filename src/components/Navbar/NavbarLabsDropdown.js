import React from 'react'
import { Link } from 'react-router-dom'
import { Panel, Button } from '@santiment-network/ui'
import styles from './NavbarHelpDropdown.module.scss'

const links = [
  { link: '/labs/trends', label: 'Trends' },
  { link: '/labs/dashboard', label: 'Dashboard' },
  { link: '/labs/api', label: 'API' }
]

const NavbarLabsDropdown = ({ activeLink }) => {
  return (
    <Panel>
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
    </Panel>
  )
}

export default NavbarLabsDropdown
