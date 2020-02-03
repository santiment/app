import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { FEED_QUERY } from '../../../queries/FeedGQL'
import PageLoader from '../../../components/Loader/PageLoader'
import FeedListLoading from './FeedList/FeedListLoading'
import { checkIsLoggedIn, checkIsLoggedInPending } from '../../UserSelectors'
import { extractEventsFromData, makeFeedVariables } from './utils'
import { fetchSignals } from '../../../ducks/Signals/common/actions'
import FeedSorters, { DATETIME_SORT } from '../filter/FeedSorters'
import FeedHelpPopup from './HelpPopup/FeedHelpPopup'
import styles from './GeneralFeed.module.scss'

const Header = ({ onChangeSort, sortType }) => (
  <div className={styles.title}>
    <div>General feed</div>
    <FeedHelpPopup />
    <FeedSorters
      className={styles.sort}
      onChangeSort={onChangeSort}
      sortType={sortType}
    />
  </div>
)

const Empty = () => (
  <div className={styles.scrollable}>
    <PageLoader />
  </div>
)

const START_DATE = new Date()

const GeneralFeed = ({ isLoggedIn, isUserLoading, fetchSignals }) => {
  const [sortType, setSortType] = useState(DATETIME_SORT)

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
        <Header onChangeSort={onChangeSort} sortType={sortType} />
        <div className={styles.scrollable}>
          <PageLoader />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Header onChangeSort={onChangeSort} sortType={sortType} />

      <Query
        query={FEED_QUERY}
        variables={makeFeedVariables({
          date: START_DATE,
          orderBy: sortType.type
        })}
        notifyOnNetworkStatusChange={true}
      >
        {({ data, fetchMore: fetchMoreCommon, loading: loadingEvents }) => {
          if (!data) {
            return <Empty />
          }

          return (
            <FeedListLoading
              events={extractEventsFromData(data)}
              fetchMoreCommon={fetchMoreCommon}
              isLoading={loadingEvents}
              sortType={sortType.type}
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
