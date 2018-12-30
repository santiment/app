import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavbarHelpDropdown.module.scss'
import GhostBtn from './GhostBtn'
import Dropdown from './Dropdown'

const links = [
  { link: '/', label: 'Trends' },
  { link: '/', label: 'Dashboard' },
  { link: '/', label: 'API' }
]

const NavbarLabsDropdown = () => {
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
