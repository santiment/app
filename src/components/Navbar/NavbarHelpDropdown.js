import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavbarHelpDropdown.module.scss'
import GhostBtn from './GhostBtn'

const links = [
  { link: '/', label: 'Documentation' },
  { link: '/', label: 'Developer API' },
  { link: '/', label: 'Support' }
]

const NavbarHelpDropdown = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {links.map(({ link, label }) => {
          return (
            <GhostBtn
              fluid
              as={Link}
              className={styles.item + ' ' + styles.text}
              to={link}
            >
              {label}
            </GhostBtn>
          )
        })}
      </div>
    </div>
  )
}

export default NavbarHelpDropdown
