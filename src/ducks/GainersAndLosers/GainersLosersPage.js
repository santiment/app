import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import cx from 'classnames'
import { Selector } from '@santiment-network/ui'
import GainersLosersTable from './GainersAndLosersTable'
import { allProjectsGQL } from '../../pages/Projects/allProjectsGQL'
import { mapItemsToKeys } from '../../utils/utils'
import styles from './GainersAndLosersPage.module.scss'

const statusMapping = {
  Gainers: 'GAINER',
  Losers: 'LOSER'
}

const timeWindowMapping = {
  '24h': '2d',
  '2w': '15d'
}

class GainersAndLosersPage extends Component {
  state = {
    timeWindow: timeWindowMapping['24h'],
    status: statusMapping.Gainers
  }

  onSelectStatus = status => {
    this.setState({
      status: statusMapping[status]
    })
  }

  onSelectTimeWindow = timeWindow => {
    this.setState({
      timeWindow: timeWindowMapping[timeWindow]
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
            options={['Gainers', 'Losers']}
            defaultSelected='Gainers'
            onSelectOption={this.onSelectStatus}
          />
          <Selector
            options={['24h', '2w']}
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

const enhance = graphql(allProjectsGQL, {
  props: ({ data: { allProjects = [], loading, error } }) => ({
    allProjects: !loading
      ? mapItemsToKeys(allProjects, { keyPath: 'slug' })
      : undefined,
    error
  })
})

export default enhance(GainersAndLosersPage)
