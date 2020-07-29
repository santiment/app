import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import NewBtn from '../../ducks/Watchlists/Actions/New/NewBtn'
import NewWatchlist from '../../ducks/Watchlists/Actions/New'
import { getWatchlistLink } from '../../ducks/Watchlists/utils'
import { VisibilityIndicator } from '../VisibilityIndicator'
import { useUserScreeners } from '../../ducks/Watchlists/gql/hooks'
import {
  checkIsLoggedIn,
  checkIsLoggedInPending
} from '../../pages/UserSelectors'
import styles from './NavbarAssetsDropdownWatchlist.module.scss'

const ScreenerDropdown = ({ activeLink, isLoggedIn, isLoggedInPending }) => {
  const [screeners, loading] = useUserScreeners()

  return (
    <>
      <List screeners={screeners} activeLink={activeLink} />,
      {/* <NewWatchlist */}
      {/*   trigger={<NewBtn border className={styles.watchlistNew} />} */}
      {/*   watchlists={watchlists} */}
      {/* /> */}
    </>
  )
}

const List = ({ screeners, activeLink }) => (
  <div className={styles.wrapper}>
    <div className={styles.list}>
      {screeners.map(({ name, id, isPublic, ...rest }) => {
        const link = getWatchlistLink({ id, name })
        return (
          <Button
            fluid
            variant='ghost'
            key={id}
            as={Link}
            className={styles.item}
            to={link}
            isActive={activeLink === link}
            {...rest}
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
