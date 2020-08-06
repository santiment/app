import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import { useFeaturedWatchlists } from '../../ducks/Watchlists/gql/hooks'
import NavbarAssetsDropdownWatchlist from './NavbarAssetsDropdownWatchlist'
import ScreenerDropdown from './ScreenerDropdown'
import {
  getSharedWatchlistLink,
  BASIC_CATEGORIES
} from '../../ducks/Watchlists/utils'
import styles from './NavbarAssetsDropdown.module.scss'

const NavbarAssetsDropdown = ({ activeLink }) => {
  const [watchlists = []] = useFeaturedWatchlists()
  const categories = [...BASIC_CATEGORIES, ...watchlists]
  return (
    <Panel>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <h3 className={styles.title}>Explore Watchlists</h3>
          <div>
            {categories.map(({ to, name, id }) => {
              const link = to || getSharedWatchlistLink({ name, id })

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
          <h3 className={styles.title}>My Watchlists</h3>
          <NavbarAssetsDropdownWatchlist activeLink={activeLink} />
        </div>
        <div className={cx(styles.block, styles.list)}>
          <h3 className={styles.title}>My Screeners</h3>
          <ScreenerDropdown activeLink={activeLink} />
        </div>
      </div>
    </Panel>
  )
}

export default NavbarAssetsDropdown
