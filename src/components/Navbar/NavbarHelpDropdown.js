import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@santiment-network/ui'
import styles from './NavbarDropdown.module.scss'

const links = [
  { link: '/docs', label: 'Documentation' },
  { link: '/apidocs', label: 'Developer API' },
  { link: '/support', label: 'Support' },
  { link: '/academy', label: 'Academy' }
]

const NavbarHelpDropdown = ({ activeLink }) => (
  <div className={styles.list}>
    {links.map(({ link, label }) => {
      return (
        <Button
          key={label}
          variant='ghost'
          fluid
          as={Link}
          className={styles.item}
          to={link}
          isActive={link === activeLink}
        >
          {label}
        </Button>
      )
    })}
  </div>
)

export default NavbarHelpDropdown
