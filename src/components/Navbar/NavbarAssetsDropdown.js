import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import { CATEGORIES } from '../../pages/assets/assets-overview-constants'
import NavbarAssetsDropdownWatchlist from './NavbarAssetsDropdownWatchlist'
import styles from './NavbarAssetsDropdown.module.scss'

const NavbarAssetsDropdown = ({ activeLink, isLoggedIn }) => (
  <Panel>
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <h3 className={styles.title}>Categories</h3>
        <div>
          {CATEGORIES.map(({ to: link, name: label }) => {
            return (
              <Button
                fluid
                variant='ghost'
                key={label}
                as={Link}
                to={link}
                isActive={link === activeLink}
              >
                {label}
              </Button>
            )
          })}
        </div>
      </div>
      <div className={cx(styles.block, styles.list)}>
        <h3 className={styles.title}>My Watchlists</h3>
        <NavbarAssetsDropdownWatchlist
          isLoggedIn={isLoggedIn}
          activeLink={activeLink}
        />
      </div>
    </div>
  </Panel>
)

export default NavbarAssetsDropdown
