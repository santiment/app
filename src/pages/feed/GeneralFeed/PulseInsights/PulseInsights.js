import React, { useState } from 'react'
import cx from 'classnames'
import { Query } from 'react-apollo'
import debounce from 'lodash.debounce'
import Loader from '@santiment-network/ui/Loader/Loader'
import { PULSE_INSIGHTS_BY_PAGE_QUERY } from '../../../../queries/InsightsGQL'
import PulseInsightWrapper from '../../../../components/Insight/PulseInsight'
import { isBottom } from '../utils'
import { EmptyFeed } from '../GeneralFeed'
import { groupByDates, RenderFeedGroups } from '../FeedList/FeedList'
import styles from '../FeedItemRenderer/FeedItemRenderer.module.scss'
import feedlistStyles from '../FeedList/FeedList.module.scss'

const MAX_INSIGHTS_COUNT = 10

const PulseInsights = () => {
  const [page, setPage] = useState(1)

  return (
    <Query
      query={PULSE_INSIGHTS_BY_PAGE_QUERY}
      variables={{
        page
      }}
      notifyOnNetworkStatusChange={true}
      fetchPolicy='network-only'
    >
      {props => {
        const { data, loading } = props

        if (!data) {
          return <EmptyFeed />
        }

        return (
          <InsightsList
            insights={data.insights}
            loadMore={() => {
              setPage(page + 1)
            }}
            isLoading={loading}
          />
        )
      }}
    </Query>
  )
}

class InsightsList extends React.Component {
  unmounted = false

  state = {
    list: this.props.insights,
    isEnd:
      this.props.insights && this.props.insights.length < MAX_INSIGHTS_COUNT
  }

  handleScroll = debounce(event => {
    const wrappedElement = document.getElementById('root')

    if (!this.props.isLoading && isBottom(wrappedElement) && !this.unmounted) {
      !this.state.isEnd && this.props.loadMore()
    }
  })

  componentWillReceiveProps (nextProps) {
    const { insights } = nextProps

    const [insight] = insights

    if (insight) {
      const { list } = this.state
      if (!list.find(({ id }) => id === insight.id)) {
        this.setState({
          list: [...list, ...insights]
        })
      }
    }

    if (!insight || insights.length < MAX_INSIGHTS_COUNT) {
      this.setState({
        isEnd: true
      })
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll, true)
  }

  componentWillUnmount () {
    this.unmounted = true
    window.removeEventListener('scroll', this.handleScroll)
  }

  render () {
    const { list } = this.state
    const { isLoading } = this.props

    const grouped = groupByDates(list)

    return (
      <div className={feedlistStyles.block}>
        <RenderFeedGroups
          groups={grouped}
          groupRenderer={({ items }) => {
            return items.map(insight => (
              <PulseInsightWrapper
                key={insight.id}
                insight={insight}
                className={cx(styles.card, styles.pulseInsight)}
              />
            ))
          }}
        />
        {isLoading && <Loader className={feedlistStyles.loader} />}
      </div>
    )
  }
}

export default PulseInsights
