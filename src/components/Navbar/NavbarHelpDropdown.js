import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavbarHelpDropdown.module.scss'
import GhostBtn from './GhostBtn'
import Dropdown from './Dropdown'

const links = [
  { link: '/docs', label: 'Documentation' },
  { link: '/dev-api', label: 'Developer API' },
  { link: '/support', label: 'Support' }
]

const NavbarHelpDropdown = ({ activeLink }) => {
  return (
    <Dropdown>
      <div className={styles.list}>
        {links.map(({ link, label }) => {
          return (
            <GhostBtn
              key={label}
              fluid
              as={Link}
              className={styles.item + ' ' + styles.text}
              to={link}
              isActive={link === activeLink}
            >
              {label}
            </GhostBtn>
          )
        })}
      </div>
    </Dropdown>
  )
}

export default NavbarHelpDropdown
