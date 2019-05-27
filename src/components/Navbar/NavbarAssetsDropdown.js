import React from 'react'
import { Link } from 'react-router-dom'
import { Panel, Button } from '@santiment-network/ui'
import { CATEGORIES } from '../../pages/assets/assets-overview-constants'
import NavbarAssetsDropdownWatchlist from './NavbarAssetsDropdownWatchlist'
import styles from './NavbarAssetsDropdown.module.scss'
import dropdownStyles from './NavbarDropdown.module.scss'

const linksRight = [
  { link: '/labs/trends', label: 'Favorites' },
  { link: '/labs/dashboard', label: 'Full Portfolio' },
  { link: '/labs/api', label: 'Dividend Tokens' }
]

const NavbarAssetsDropdown = ({ activeLink, isLoggedIn }) => (
  <Panel>
    <div className={styles.wrapper}>
      <div>
        <h3 className={styles.title}>Categories</h3>
        <div className={dropdownStyles.list}>
          {CATEGORIES.map(({ to: link, name: label }) => {
            return (
              <Button
                fluid
                variant='ghost'
                key={label}
                as={Link}
                className={dropdownStyles.item}
                to={link}
                isActive={link === activeLink}
              >
                {label}
              </Button>
            )
          })}
        </div>
      </div>
      <div className={styles.list}>
        <h3 className={styles.title}>My Watchlists</h3>
        <NavbarAssetsDropdownWatchlist
          isLoggedIn={isLoggedIn}
          activeLink={activeLink}
          list={linksRight}
        />
      </div>
    </div>
  </Panel>
)

export default NavbarAssetsDropdown
