import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavbarHelpDropdown.module.scss'

const NavbarHelpDropdown = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link className={styles.link + ' ' + styles.text} to='/'>
            Documentation
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link + ' ' + styles.text} to='/'>
            Developer API
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link + ' ' + styles.text} to='/'>
            Support
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default NavbarHelpDropdown
