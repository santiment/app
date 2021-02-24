import React, { useMemo } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import Loader from '@santiment-network/ui/Loader/Loader'
import CreateScreenerBtn from './NewScreenerBtn'
import { VisibilityIndicator } from '../../VisibilityIndicator'
import {
  useUserScreeners,
  useRecentWatchlists
} from '../../../ducks/Watchlists/gql/hooks'
import { getRecentScreeners } from '../../../utils/recent'
import { getSEOLinkFromIdAndTitle } from '../../../utils/url'
import { useUser } from '../../../stores/user'
import { sortById } from '../../../utils/sortMethods'
import styles from '../Watchlists/WatchlistsDropdown.module.scss'
import { useFeaturedScreeners } from '../../../ducks/Watchlists/gql/queries'
import { getBlockMinHeight } from '../utils'
import wrapperStyles from '../Watchlists/MarketDropdown.module.scss'

const getScreenerSEOLink = (id, name) =>
  '/screener/' + getSEOLinkFromIdAndTitle(id, name)

const ScreenerDropdown = ({ activeLink }) => {
  const [featuredScreeners = []] = useFeaturedScreeners()
  const [screeners = [], loading] = useUserScreeners()
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
            {featuredScreeners.map(({ name, id }) => {
              const link = getScreenerSEOLink(id, name)

              return (
                <Button
                  fluid
                  variant='ghost'
                  key={name}
                  as={Link}
                  to={link}
                  isActive={link === activeLink}
                  className={wrapperStyles.btn}
                >
                  {name}
                </Button>
              )
            })}
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
                  {recentScreeners.map(({ to, name, id }) => {
                    const link = to || getScreenerSEOLink(id, name)

                    return (
                      <Button
                        fluid
                        variant='ghost'
                        key={id}
                        as={Link}
                        to={link}
                        className={wrapperStyles.btn}
                      >
                        {name}
                      </Button>
                    )
                  })}
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
            <CreateScreenerBtn screeners={screeners} />
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
      {screeners.map(({ name, id, isPublic, to }, idx) => {
        const link = getScreenerSEOLink(id, name)
        return (
          <Button
            fluid
            variant='ghost'
            key={idx}
            as={Link}
            className={cx(styles.item, wrapperStyles.btn)}
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
