import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { baseLocation, pulseLocation, personalLocation } from './locations'
import {
  extractEventsFromData,
  makeFeedVariables,
  getFeedAuthorType,
  getDefaultFilters,
  isBaseLocation
} from './utils'
import EmptyFeed from './EmptyFeed'
import { FEED_QUERY } from '../../../queries/FeedGQL'
import PageLoader from '../../../components/Loader/PageLoader'
import FeedListLoading from './FeedList/FeedListLoading'
import { checkIsLoggedIn, checkIsLoggedInPending } from '../../UserSelectors'
import FeedSorters, { DATETIME_SORT } from '../sorters/FeedSorters'
import FeedHelpPopup from './HelpPopup/FeedHelpPopup'
import Tabs from '@santiment-network/ui/Tabs'
import FeedFilters from '../filters/FeedFilters'
import PulseInsights from './PulseInsights/PulseInsights'
import styles from './GeneralFeed.module.scss'

const tabs = [
  {
    index: `${baseLocation}`,
    content: 'General'
  },
  {
    index: pulseLocation,
    content: 'Pulse'
  },
  {
    index: personalLocation,
    content: 'My Feed',
    requireLogin: true
  }
]

const Header = ({
  onChangeSort,
  sortType,
  onChangeTab,
  tab,
  onChangeFilters,
  filters,
  isLoggedIn,
  isPulse
}) => (
  <div className={styles.header}>
    <div className={styles.title}>
      <div>Feed</div>
      <FeedHelpPopup />
      {!isPulse && (
        <>
          <FeedFilters
            handleFiltersChange={onChangeFilters}
            filters={filters}
            enableAlertsInsights={isBaseLocation(tab)}
          />
          <FeedSorters
            className={styles.sort}
            onChangeSort={onChangeSort}
            sortType={sortType}
          />
        </>
      )}
    </div>
    <Tabs
      options={
        isLoggedIn ? tabs : tabs.filter(({ requiredLogin }) => !requiredLogin)
      }
      defaultSelectedIndex={tab}
      passSelectionIndexToItem
      className={styles.tabs}
      onSelect={onChangeTab}
      as={({ selectionIndex, ...props }) => (
        <Link {...props} to={selectionIndex} />
      )}
    />
  </div>
)

const START_DATE = new Date()

const GeneralFeed = ({ isLoggedIn, isUserLoading, location }) => {
  const { pathname } = location
  const [tab, setTab] = useState(isLoggedIn ? pathname : baseLocation)
  const [isPulse, setPulse] = useState(tab === pulseLocation)
  const [sortType, setSortType] = useState(DATETIME_SORT)
  const [filters, setFilters] = useState(getDefaultFilters(tab))

  const onChangeTab = value => {
    setTab(value)
  }

  useEffect(
    () => {
      setFilters({
        ...filters,
        author: getFeedAuthorType(tab)
      })
      setPulse(tab === pulseLocation)
    },
    [tab]
  )

  const onChangeSort = value => {
    if (value) {
      setSortType(value)
    }
  }

  if (isUserLoading) {
    return (
      <div>
        <Header
          onChangeSort={onChangeSort}
          sortType={sortType}
          onChangeTab={onChangeTab}
          tab={tab}
          isLoggedIn={isLoggedIn}
          onChangeFilters={setFilters}
          filters={filters}
          isPulse={isPulse}
        />
        <div className={styles.scrollable}>
          <PageLoader />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Header
        onChangeSort={onChangeSort}
        sortType={sortType}
        onChangeTab={onChangeTab}
        isLoggedIn={isLoggedIn}
        tab={tab}
        onChangeFilters={setFilters}
        filters={filters}
        isPulse={isPulse}
      />

      <div className={styles.scrollable}>
        {isPulse ? (
          <PulseInsights />
        ) : (
          <Query
            query={FEED_QUERY}
            variables={makeFeedVariables({
              date: START_DATE,
              orderBy: sortType.type,
              filterBy: filters
            })}
            notifyOnNetworkStatusChange={true}
            fetchPolicy='network-only'
          >
            {props => {
              const {
                data,
                fetchMore: fetchMoreCommon,
                loading: loadingEvents
              } = props

              if (!data) {
                return <EmptyFeed />
              }

              return (
                <FeedListLoading
                  events={extractEventsFromData(data)}
                  fetchMoreCommon={fetchMoreCommon}
                  isLoading={loadingEvents}
                  sortType={sortType}
                  filters={filters}
                  showProfileExplanation={isBaseLocation(tab)}
                />
              )
            }}
          </Query>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state),
  isUserLoading: checkIsLoggedInPending(state)
})

export default connect(mapStateToProps)(GeneralFeed)
