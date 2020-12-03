import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import Loader from '@santiment-network/ui/Loader/Loader'
import CreateScreenerBtn from './NewScreenerBtn'
import { getWatchlistLink } from '../../../ducks/Watchlists/utils'
import { VisibilityIndicator } from '../../VisibilityIndicator'
import {
  useUserScreeners,
  useRecentWatchlists
} from '../../../ducks/Watchlists/gql/hooks'
import { getRecentScreeners } from '../../../utils/recent'
import { useUser } from '../../../stores/user'
import styles from '../Watchlists/WatchlistsDropdown.module.scss'
import wrapperStyles from '../Watchlists/MarketDropdown.module.scss'

const ScreenerDropdown = ({ activeLink }) => {
  const [screeners = [], loading] = useUserScreeners()
  const { loading: isLoggedInPending } = useUser()
  const isLoading = loading || isLoggedInPending

  const screenersIDs = getRecentScreeners().filter(Boolean)
  const [recentScreeners] = useRecentWatchlists(screenersIDs)

  return (
    <Panel>
      <div className={wrapperStyles.wrapper}>
        <div className={cx(wrapperStyles.block, wrapperStyles.list)}>
          {recentScreeners && recentScreeners.length > 0 && (
            <>
              <h3 className={wrapperStyles.title}>Recent watched screeners</h3>
              <div
                className={wrapperStyles.listWrapper}
                style={{
                  minHeight:
                    recentScreeners.length > 3
                      ? '100px'
                      : `${32 * recentScreeners.length}px`
                }}
              >
                <div className={wrapperStyles.recentList}>
                  {recentScreeners.map(({ to, name, id }) => {
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
  <div
    className={styles.wrapper}
    style={{
      minHeight: screeners.length > 3 ? '100px' : `${32 * screeners.length}px`
    }}
  >
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

export default ScreenerDropdown
