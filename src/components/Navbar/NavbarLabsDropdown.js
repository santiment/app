import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavbarHelpDropdown.module.scss'
import GhostBtn from './GhostBtn'
import Dropdown from './Dropdown'

const links = [
  { link: '/labs/trends', label: 'Trends' },
  { link: '/labs/dashboard', label: 'Dashboard' },
  { link: '/labs/api', label: 'API' }
]

const NavbarLabsDropdown = ({ activeLink }) => {
  return (
    <Dropdown>
      <div className={styles.list}>
        {links.map(({ link, label }) => {
          return (
            <GhostBtn
              fluid
              key={label}
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

export default NavbarLabsDropdown
