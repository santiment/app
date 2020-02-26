import React, { Component } from 'react'
import { Selector } from '@santiment-network/ui'
import InsightAddBtn from './InsightAddBtn'
import InsightsWrap from './InsightsWrap'
import styles from './Insights.module.scss'
import { DesktopOnly } from '../Responsive'

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
    title: 'Insights',
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
    const { title, insights, className } = this.props

    const length = insights.length

    return (
      <div className={className}>
        <div className={styles.top}>
          <div className={styles.title}>
            {title}
            <span className={styles.count}> ({length})</span>
          </div>
          <DesktopOnly>
            <div className={styles.controls}>
              {length > 0 && (
                <Selector
                  className={styles.selectors}
                  options={[View.RECENT, View.POPULAR]}
                  onSelectOption={this.onViewSelect}
                  defaultSelected={View.RECENT}
                />
              )}
              <InsightAddBtn />
            </div>
          </DesktopOnly>
        </div>
        <InsightsWrap
          withAuthorPic={true}
          insights={insights.sort(
            view === View.RECENT ? sortByRecent : sortByPopularity
          )}
        />
      </div>
    )
  }
}

export default Insights
