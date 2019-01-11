import React from 'react'
import { Link } from 'react-router-dom'
import { Panel, Button, Input } from '@santiment-network/ui'
import dropdownStyles from './NavbarDropdown.module.scss'
import styles from './NavbarAssetsDropdown.module.scss'

const linksLeft = [
  { link: '/labs/trends', label: 'All Assets' },
  { link: '/labs/dashboard', label: 'ERC10' },
  { link: '/labs/api', label: 'Ethereum + ERC20 ETH Spent' },

  { link: '/labs/dashboard', label: 'Top 50 ERC20' },
  { link: '/labs/dashboard', label: 'Stablecoins' },
  { link: '/labs/dashboard', label: 'Privacy Tokens' },
  { link: '/labs/dashboard', label: 'US-Based Projects' },
  { link: '/labs/dashboard', label: 'Decentralized Exchanges' }
]

const linksRight = [
  { link: '/labs/trends', label: 'Favorites' },
  { link: '/labs/dashboard', label: 'Full Portfolio' },
  { link: '/labs/api', label: 'Dividend Tokens' }
]

const NavbarAssetsDropdown = ({ activeLink }) => {
  return (
    <Panel>
      <div className={styles.wrapper}>
        <div className={dropdownStyles.list}>
          <h3 className={styles.title}>Categories</h3>
          {linksLeft.map(({ link, label }) => {
            return (
              <Button
                fluid
                variant='ghost'
                key={label}
                as={Link}
                className={dropdownStyles.item + ' ' + dropdownStyles.text}
                to={link}
                isActive={link === activeLink}
              >
                {label}
              </Button>
            )
          })}
        </div>
        <div className={styles.list + ' ' + dropdownStyles.list}>
          <h3 className={styles.title}>My Watchlists</h3>
          <div className={styles.watchlist}>
            {linksRight.map(({ link, label }) => {
              return (
                <Button
                  fluid
                  variant='ghost'
                  key={label}
                  as={Link}
                  className={dropdownStyles.item + ' ' + dropdownStyles.text}
                  to={link}
                  isActive={link === activeLink}
                >
                  {label}
                </Button>
              )
            })}
          </div>
          <Input className={styles.input} placeholder='New List' />
        </div>
      </div>
    </Panel>
  )
}

export default NavbarAssetsDropdown
