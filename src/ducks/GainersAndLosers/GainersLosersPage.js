import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import cx from 'classnames'
import { Selector } from '@santiment-network/ui'
import GainersLosersTable from './GainersAndLosersTable'
import { ALL_PROJECTS_FOR_SEARCH_QUERY } from '../../pages/Projects/allProjectsGQL'
import { mapItemsToKeys } from '../../utils/utils'
import styles from './GainersAndLosersPage.module.scss'

const STATUSES = {
  Gainers: 'GAINER',
  Losers: 'LOSER'
}

const TIME_WINDOWS = {
  '24h': '2d',
  '2w': '15d'
}

class GainersAndLosersPage extends Component {
  state = {
    timeWindow: TIME_WINDOWS['24h'],
    status: STATUSES.Gainers
  }

  onSelectStatus = status => {
    this.setState({
      status: STATUSES[status]
    })
  }

  onSelectTimeWindow = timeWindow => {
    this.setState({
      timeWindow: TIME_WINDOWS[timeWindow]
    })
  }

  render () {
    const { timeWindow, status } = this.state
    const { allProjects, error } = this.props
    return (
      <div className={cx('page', styles.wrapper)}>
        <h1>Top Gainers And Losers</h1>
        <div className={styles.tabs}>
          <Selector
            options={Object.keys(STATUSES)}
            defaultSelected='Gainers'
            onSelectOption={this.onSelectStatus}
          />
          <Selector
            options={Object.keys(TIME_WINDOWS)}
            defaultSelected='24h'
            onSelectOption={this.onSelectTimeWindow}
          />
        </div>
        <GainersLosersTable
          timeWindow={timeWindow}
          status={status}
          allProjects={allProjects}
          error={error}
        />
      </div>
    )
  }
}

const enhance = graphql(ALL_PROJECTS_FOR_SEARCH_QUERY, {
  props: ({ data: { allProjects = [], loading, error } }) => ({
    allProjects: !loading
      ? mapItemsToKeys(allProjects, { keyPath: 'slug' })
      : undefined,
    error
  }),
  options: () => ({
    context: { isRetriable: true },
    variables: { minVolume: 0 }
  })
})

export default enhance(GainersAndLosersPage)
