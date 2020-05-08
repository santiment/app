import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import styles from './NavbarDropdown.module.scss'

const NavbarHelpDropdown = ({ activeLink }) => (
  <div className={styles.list}>
    <Button
      variant='ghost'
      fluid
      as={Link}
      className={styles.item}
      to={'/docs'}
    >
      Documentation
    </Button>
    <Button
      as='a'
      variant='ghost'
      fluid
      className={styles.item}
      onClick={() => window.Intercom('show')}
    >
      Contact us
    </Button>
  </div>
)

export default NavbarHelpDropdown
