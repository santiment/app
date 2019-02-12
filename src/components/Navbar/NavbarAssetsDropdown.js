import React from 'react'
import { Link } from 'react-router-dom'
import { Panel, Button } from '@santiment-network/ui'
import NavbarAssetsDropdownWatchlist from './NavbarAssetsDropdownWatchlist'
import styles from './NavbarAssetsDropdown.module.scss'
import dropdownStyles from './NavbarDropdown.module.scss'

const linksLeft = [
  { link: '/assets/all', label: 'All Assets' },
  { link: '/assets/erc20', label: 'ERC20' },
  {
    link: '/assets/list?name=top%2050%20erc20%40227#shared',
    label: 'Top 50 ERC20'
  },
  { link: '/assets/list?name=stablecoins@86#shared', label: 'Stablecoins' },
  { link: '/assets/list?name=usa@138#shared', label: 'US-Based Projects' },
  {
    link: '/assets/list?name=dex@127#shared',
    label: 'Decentralized Exchanges'
  },
  {
    link: '/assets/list?name=centralized%20exchanges@272#shared',
    label: 'Centralized Exchanges'
  }
]

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
          {linksLeft.map(({ link, label }) => {
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
