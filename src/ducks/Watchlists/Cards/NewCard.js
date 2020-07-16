import React from 'react'
import cx from 'classnames'
import { NavLink as Link } from 'react-router-dom'
import { connect } from 'react-redux'
import NewWatchlist from '../Actions/New'
import { ProLabel } from '../../../components/ProLabel'
import LoginDialogWrapper from '../../../components/LoginDialog/LoginDialogWrapper'
import { useUserWatchlists, useUserScreeners } from '../gql/hooks'
import { Plus } from '../../../components/Illustrations/Plus'
import { checkHasPremium } from '../../../pages/UserSelectors'
import styles from './WatchlistCard.module.scss'

const Trigger = ({ type, showProBanner, ...props }) => {
  return (
    <div
      className={cx(
        styles.wrapper,
        styles.create,
        showProBanner && styles.create__disabled
      )}
      {...props}
    >
      <Plus isDisabled={showProBanner} />
      <div className={styles.createLink}>
        Create {type}
        {showProBanner && <ProLabel className={styles.proLabel} as={'span'} />}
      </div>
    </div>
  )
}

const NewCard = ({ type = 'watchlist', hasPremium }) => {
  let lists = []

  if (type === 'watchlist') {
    const [watchlists = []] = useUserWatchlists()
    lists = watchlists
  } else {
    const [screeners = []] = useUserScreeners()
    lists = screeners
  }

  const showProBanner = type === 'screener' && !hasPremium

  return (
    <LoginDialogWrapper
      title={`Create ${type}`}
      trigger={props =>
        showProBanner ? (
          <Link to='/pricing'>
            <Trigger showProBanner type={type} {...props} />
          </Link>
        ) : (
          <Trigger type={type} {...props} />
        )
      }
    >
      {showProBanner ? (
        <Link to='/pricing'>
          <Trigger showProBanner type={type} />
        </Link>
      ) : (
        <NewWatchlist
          watchlists={lists}
          trigger={<Trigger type={type} />}
          type={type}
        />
      )}
    </LoginDialogWrapper>
  )
}

const mapStateToProps = state => ({
  hasPremium: checkHasPremium(state)
})

export default connect(mapStateToProps)(NewCard)
