import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'

const Navbar = () => {
  return (
    <nav className={styles.wrapper}>
      <Link className={styles.logo} to='/'>
        Sanbase
      </Link>
    </nav>
  )
}

export default Navbar
