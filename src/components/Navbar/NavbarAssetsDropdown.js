import React from 'react'
import { Link } from 'react-router-dom'
import { Panel, Button, Input } from '@santiment-network/ui'
import dropdownStyles from './NavbarDropdown.module.scss'
import NavbarAssetsDropdownWatchlist from './NavbarAssetsDropdownWatchlist'
import styles from './NavbarAssetsDropdown.module.scss'
import * as actions from '../../actions/types'
import CreateWatchlistBtn from '../WatchlistPopup/CreateWatchlistBtn'
import { connect } from 'react-redux'
const mapStateToProps = ({ watchlistUi }) => ({
  watchlistUi
})

const mapDispatchToProps = dispatch => ({
  createWatchlist: payload =>
    dispatch({
      type: actions.USER_ADD_NEW_ASSET_LIST,
      payload
    })
})

const WatchlistCreateForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateWatchlistBtn)

const linksLeft = [
  { link: '/assets/all', label: 'All Assets' },
  { link: '/assets/erc20', label: 'ERC20' },
  { link: '/labs/api', label: 'Ethereum + ERC20 ETH Spent' },

  {
    link: '/assets/list?name=top%2050%20erc20%40227#shared',
    label: 'Top 50 ERC20'
  },
  { link: '/assets/list?name=stablecoins@86#shared', label: 'Stablecoins' },
  { link: '/labs/dashboard', label: 'Privacy Tokens' },
  { link: '/assets/list?name=usa@138#shared', label: 'US-Based Projects' },
  { link: '/assets/list?name=dex@127#shared', label: 'Decentralized Exchanges' }
]

const linksRight = [
  { link: '/labs/trends', label: 'Favorites' },
  { link: '/labs/dashboard', label: 'Full Portfolio' },
  { link: '/labs/api', label: 'Dividend Tokens' }
]

const NavbarAssetsDropdown = ({ activeLink, isLoggedIn = true }) => {
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
        {isLoggedIn && (
          <div className={styles.list + ' ' + dropdownStyles.list}>
            <h3 className={styles.title}>My Watchlists</h3>
            <div className={styles.watchlist}>
              <NavbarAssetsDropdownWatchlist
                isLoggedIn={isLoggedIn}
                activeLink={activeLink}
                list={linksRight}
              />
            </div>
            {/* <Input className={styles.input} placeholder='New List' /> */}
            <WatchlistCreateForm />
          </div>
        )}
      </div>
    </Panel>
  )
}

export default NavbarAssetsDropdown
