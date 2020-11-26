import React, { useEffect } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import { useFeaturedWatchlists } from '../../../ducks/Watchlists/gql/hooks'
import NavbarAssetsDropdownWatchlist from './NavbarAssetsDropdownWatchlist'
import {
  BASIC_CATEGORIES,
  getWatchlistLink
} from '../../../ducks/Watchlists/utils'
import { store } from '../../../redux'
import { RECENT_WATCHLISTS_FETCH } from '../../../actions/types'
import { NewLabelTemplate } from '../../NewLabel/NewLabel'
import styles from './NavbarAssetsDropdown.module.scss'

const DASHBOARDS = [
  {
    name: 'Stablecoins',
    to: '/stablecoins'
  },
  {
    name: 'Uniswap Protocol',
    to: '/uniswap-protocol',
    isNew: true
  },
  {
    name: 'Decentralized Exchanges',
    to: '/decentralized-exchanges',
    isNew: true
  },
  {
    name: 'Bitcoin Locked on Ethereum',
    to: '/bitcoin-locked-on-ethereum',
    isNew: true
  }
]

const NavbarAssetsDropdown = ({ activeLink, recentWatchlists = [] }) => {
  const [watchlists = []] = useFeaturedWatchlists()
  const categories = [...BASIC_CATEGORIES, ...watchlists]

  useEffect(() => {
    store.dispatch({ type: RECENT_WATCHLISTS_FETCH })
  }, [])

  return (
    <Panel>
      <div className={styles.wrapper}>
        <div className={cx(styles.block, styles.list)}>
          <h3 className={styles.title}>Dashboards</h3>

          <div>
            {DASHBOARDS.map(({ to, name, isNew }) => {
              const link = to

              return (
                <Button
                  fluid
                  variant='ghost'
                  key={name}
                  as={Link}
                  to={link}
                  isActive={link === activeLink}
                >
                  {isNew && <NewLabelTemplate className={styles.new} />}
                  {name}
                </Button>
              )
            })}
          </div>
        </div>
        <div className={styles.block}>
          <h3 className={styles.title}>Explore watchlists</h3>
          <div>
            {categories.map(({ to, name, id }) => {
              const link = to || getWatchlistLink({ name, id })

              return (
                <Button
                  fluid
                  variant='ghost'
                  key={name}
                  as={Link}
                  to={link}
                  isActive={link === activeLink}
                >
                  {name}
                </Button>
              )
            })}
          </div>
        </div>
        <div className={cx(styles.block, styles.list)}>
          {recentWatchlists && recentWatchlists.length > 0 && (
            <>
              <h3 className={styles.title}>Recent watched watchlists</h3>
              <div
                className={styles.listWrapper}
                style={{
                  minHeight:
                    recentWatchlists.length > 3
                      ? '100px'
                      : `${32 * recentWatchlists.length}px`
                }}
              >
                <div className={styles.recentList}>
                  {recentWatchlists.map(({ to, name, id }) => {
                    const link = to || getWatchlistLink({ name, id })

                    return (
                      <Button
                        fluid
                        variant='ghost'
                        key={name}
                        as={Link}
                        to={link}
                      >
                        {name}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </>
          )}
          <h3 className={styles.title}>My watchlists</h3>
          <NavbarAssetsDropdownWatchlist activeLink={activeLink} />
        </div>
      </div>
    </Panel>
  )
}

const mapStateToProps = ({ recents }) => ({
  recentWatchlists: recents.watchlists
})

export default connect(mapStateToProps)(NavbarAssetsDropdown)
