import React from 'react'
import { Link } from 'react-router-dom'
import { Panel, Button } from '@santiment-network/ui'
import styles from './NavbarDropdown.module.scss'

const links = [
  { link: '/docs', label: 'Documentation' },
  { link: '/dev-api', label: 'Developer API' },
  { link: '/support', label: 'Support' }
]

const NavbarHelpDropdown = ({ activeLink }) => {
  return (
    <div className={styles.list}>
      {links.map(({ link, label }) => {
        return (
          <Button
            key={label}
            variant='ghost'
            fluid
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

export default NavbarHelpDropdown
