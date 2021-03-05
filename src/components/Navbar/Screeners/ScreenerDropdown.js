import React, { useMemo } from 'react'
import cx from 'classnames'
import Panel from '@santiment-network/ui/Panel/Panel'
import Loader from '@santiment-network/ui/Loader/Loader'
import Item from '../Watchlists/Item'
import { getBlockMinHeight } from '../utils'
import { useUser } from '../../../stores/user'
import CreateScreenerBtn from './NewScreenerBtn'
import { sortById } from '../../../utils/sortMethods'
import { getRecentScreeners } from '../../../utils/recent'
import { VisibilityIndicator } from '../../VisibilityIndicator'
import { getScreenerLink } from '../../../ducks/Watchlists/url'
import { useRecentWatchlists } from '../../../ducks/Watchlists/gql/hooks'
import {
  useFeaturedScreeners,
  useUserScreeners
} from '../../../ducks/Watchlists/gql/lists/hooks'
import wrapperStyles from '../Watchlists/MarketDropdown.module.scss'
import styles from '../Watchlists/WatchlistsDropdown.module.scss'

const ScreenerDropdown = ({ activeLink }) => {
  const [featuredScreeners] = useFeaturedScreeners()
  const [screeners, loading] = useUserScreeners()
  const { loading: isLoggedInPending } = useUser()
  const isLoading = loading || isLoggedInPending
  const sortedScreeners = useMemo(() => screeners.sort(sortById), [screeners])

  const screenersIDs = getRecentScreeners().filter(Boolean)
  const [recentScreeners] = useRecentWatchlists(screenersIDs)

  return (
    <Panel>
      <div className={wrapperStyles.wrapper}>
        <div className={wrapperStyles.block}>
          <h3 className={wrapperStyles.title}>Explore screeners</h3>
          <div className={wrapperStyles.listWrapper}>
            {featuredScreeners.map((list, idx) => (
              <Item
                key={idx}
                name={list.name}
                link={getScreenerLink(list)}
                activeLink={activeLink}
              />
            ))}
          </div>
        </div>
        <div className={cx(wrapperStyles.block, wrapperStyles.list)}>
          {recentScreeners && recentScreeners.length > 0 && (
            <div className={wrapperStyles.row}>
              <h3 className={wrapperStyles.title}>Recently viewed screeners</h3>
              <div
                className={wrapperStyles.listWrapper}
                style={{ minHeight: getBlockMinHeight(recentScreeners) }}
              >
                <div className={wrapperStyles.recentList}>
                  {recentScreeners.map((list, idx) => (
                    <Item
                      key={idx}
                      name={list.name}
                      link={getScreenerLink(list)}
                      activeLink={activeLink}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <h3 className={wrapperStyles.title}>My screeners</h3>
          <div className={wrapperStyles.listWrapper}>
            {isLoading ? (
              <Loader className={styles.loader} />
            ) : (
              <List screeners={sortedScreeners} activeLink={activeLink} />
            )}
            <CreateScreenerBtn />
          </div>
        </div>
      </div>
    </Panel>
  )
}

const List = ({ screeners, activeLink }) => (
  <div
    className={styles.wrapper}
    style={{ minHeight: getBlockMinHeight(screeners) }}
  >
    <div className={styles.list}>
      {screeners.map((list, idx) => (
        <Item
          key={idx}
          name={list.name}
          link={list.href || getScreenerLink(list)}
          activeLink={activeLink}
        >
          <span className={styles.watchlistName}>{list.name}</span>
          <VisibilityIndicator isPublic={list.isPublic} />
        </Item>
      ))}
    </div>
  </div>
)

export default ScreenerDropdown
