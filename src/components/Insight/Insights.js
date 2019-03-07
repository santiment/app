import React, { Component } from 'react'
import { Selector } from '@santiment-network/ui'
import InsightCard from './InsightCard'
import InsightAddBtn from './InsightAddBtn'
import styles from './Insights.module.scss'
import WithLikesMutation from './WithLikesMutation'

const View = {
  RECENT: 'Recent',
  POPULAR: 'Popular'
}

const sortByRecent = ({ createdAt: aCreatedAt }, { createdAt: bCreatedAt }) =>
  new Date(aCreatedAt) < new Date(bCreatedAt) ? 1 : -1

const sortByPopularity = (
  { votes: { totalVotes: aVotes } },
  { votes: { totalVotes: bVotes } }
) => (aVotes < bVotes ? 1 : -1)

class Insights extends Component {
  static defaultProps = {
    insights: [],
    className: ''
  }

  state = {
    view: View.RECENT
  }

  onViewSelect = newView => {
    const { view } = this.state
    if (newView === view) return

    this.setState({
      view: newView
    })
  }

  render () {
    const { view } = this.state
    const { insights, className } = this.props

    const length = insights.length

    return (
      <div className={className}>
        <div className={styles.top}>
          <div className={styles.title}>
            Insights
            <span className={styles.count}> ({length})</span>
          </div>
          <div className={styles.controls}>
            {length > 0 && (
              <Selector
                className={styles.selectors}
                options={[View.RECENT, View.POPULAR]}
                onSelectOption={this.onViewSelect}
                defaultSelected={View.RECENT}
              />
            )}
            <InsightAddBtn searchParams='currentTrends' />
          </div>
        </div>
        <div className={styles.bottom}>
          <WithLikesMutation isFor='insights'>
            {(likeInsight, unlikeInsight) =>
              [...insights]
                .sort(view === View.RECENT ? sortByRecent : sortByPopularity)
                .slice(0, 3)
                .map(({ id, ...insight }) => {
                  return (
                    <InsightCard
                      className={styles.insight}
                      key={id}
                      id={id}
                      {...insight}
                      onLike={liked =>
                        (liked ? unlikeInsight : likeInsight)({
                          variables: { id: +id }
                        })
                      }
                    />
                  )
                })
            }
          </WithLikesMutation>
        </div>
      </div>
    )
  }
}

export default Insights
