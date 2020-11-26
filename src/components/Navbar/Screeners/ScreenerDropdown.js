import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import Loader from '@santiment-network/ui/Loader/Loader'
import CreateScreenerBtn from './NewScreenerBtn'
import { getWatchlistLink } from '../../../ducks/Watchlists/utils'
import { VisibilityIndicator } from '../../VisibilityIndicator'
import { useUserScreeners } from '../../../ducks/Watchlists/gql/hooks'
import {
  checkIsLoggedIn,
  checkIsLoggedInPending
} from '../../../pages/UserSelectors'
import styles from '../Watchlists/NavbarAssetsDropdownWatchlist.module.scss'
import wrapperStyles from '../Watchlists/NavbarAssetsDropdown.module.scss'

const ScreenerDropdown = ({ activeLink, isLoggedIn, isLoggedInPending }) => {
  const [screeners = [], loading] = useUserScreeners()
  const isLoading = loading || isLoggedInPending

  return (
    <Panel>
      <div className={wrapperStyles.wrapper}>
        <div className={cx(wrapperStyles.block, wrapperStyles.list)}>
          <h3 className={wrapperStyles.title}>My screeners</h3>
          {isLoading ? (
            <Loader className={styles.loader} />
          ) : (
            <List screeners={screeners} activeLink={activeLink} />
          )}
          <CreateScreenerBtn screeners={screeners} />
        </div>
      </div>
    </Panel>
  )
}

const List = ({ screeners, activeLink }) => (
  <div className={styles.wrapper}>
    <div className={styles.list}>
      {screeners.map(({ name, id, isPublic, to }, idx) => {
        const link = getWatchlistLink({ id, name })
        return (
          <Button
            fluid
            variant='ghost'
            key={idx}
            as={Link}
            className={styles.item}
            to={to || link}
            isActive={activeLink === link}
          >
            <span className={styles.watchlistName}>{name}</span>
            <VisibilityIndicator isPublic={isPublic} />
          </Button>
        )
      })}
    </div>
  </div>
)

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state),
  isLoggedInPending: checkIsLoggedInPending(state)
})

export default connect(mapStateToProps)(ScreenerDropdown)
