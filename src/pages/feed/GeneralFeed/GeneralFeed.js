import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { FEED_QUERY } from '../../../queries/FeedGQL'
import PageLoader from '../../../components/Loader/PageLoader'
import FeedListLoading from './FeedList/FeedListLoading'
import { checkIsLoggedIn, checkIsLoggedInPending } from '../../UserSelectors'
import { extractEventsFromData, makeFeedVariables } from './utils'
import { fetchSignals } from '../../../ducks/Signals/common/actions'
import FeedSorters, { DATETIME_SORT } from '../filter/FeedSorters'
import FeedHelpPopup from './HelpPopup/FeedHelpPopup'
import Tabs from '@santiment-network/ui/Tabs'
import styles from './GeneralFeed.module.scss'

const AUTHOR_TYPES = {
  OWN: 'OWN',
  ALL: 'ALL',
  FOLLOWED: 'FOLLOWED',
  SANFAM: 'SANFAM'
}

const baseLocation = '/feed'

const tabs = [
  {
    index: `${baseLocation}`,
    content: 'General'
  },
  {
    index: `${baseLocation}/personal`,
    content: 'Personal'
  }
]

const Header = ({ onChangeSort, sortType, onChangeTab, tab }) => (
  <>
    <div className={styles.title}>
      <div>Feed</div>
      <FeedHelpPopup />
      <FeedSorters
        className={styles.sort}
        onChangeSort={onChangeSort}
        sortType={sortType}
      />
    </div>
    <Tabs
      options={tabs}
      defaultSelectedIndex={tab}
      passSelectionIndexToItem
      className={styles.tabs}
      onSelect={onChangeTab}
      as={({ selectionIndex, ...props }) => (
        <Link {...props} to={selectionIndex} />
      )}
    />
  </>
)

const Empty = () => (
  <div className={styles.scrollable}>
    <PageLoader />
  </div>
)

const START_DATE = new Date()

const getFeedAuthorType = tab => {
  if (tab === baseLocation) {
    return AUTHOR_TYPES.ALL
  } else {
    return AUTHOR_TYPES.OWN
  }
}

const GeneralFeed = ({
  isLoggedIn,
  isUserLoading,
  fetchSignals,
  location: { pathname }
}) => {
  const [tab, setTab] = useState(pathname)
  const [sortType, setSortType] = useState(DATETIME_SORT)
  const [filters, setFilters] = useState({
    author: getFeedAuthorType(tab)
  })

  const onChangeTab = value => {
    setTab(value)
  }

  useEffect(
    () => {
      setFilters({
        ...filters,
        author: getFeedAuthorType(tab)
      })
    },
    [tab]
  )

  useEffect(
    () => {
      isLoggedIn && fetchSignals()
    },
    [isLoggedIn]
  )

  const onChangeSort = value => setSortType(value)

  if (isUserLoading) {
    return (
      <div>
        <Header
          onChangeSort={onChangeSort}
          sortType={sortType}
          onChangeTab={onChangeTab}
          tab={tab}
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
        tab={tab}
      />

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
            return <Empty />
          }

          console.log(props)

          return (
            <FeedListLoading
              events={extractEventsFromData(data)}
              fetchMoreCommon={fetchMoreCommon}
              isLoading={loadingEvents}
              sortType={sortType}
              filters={filters}
            />
          )
        }}
      </Query>
    </div>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state),
  isUserLoading: checkIsLoggedInPending(state)
})

const mapDispatchToProps = dispatch => ({
  fetchSignals: payload => {
    return dispatch(fetchSignals())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralFeed)
