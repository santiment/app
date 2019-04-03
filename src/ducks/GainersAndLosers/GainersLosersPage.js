import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Panel } from '@santiment-network/ui'
import GainersLosersTable from './GainersAndLosersTable'
import { Tabs } from '@santiment-network/ui'
import { allProjectsGQL } from '../../pages/Projects/allProjectsGQL'
import styles from './GainersAndLosersPage.module.scss'
import { mapItemsToKeys } from '../../utils/utils'

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
      <div className='page'>
        <h1>Top Gainers And Top Losers</h1>
        <Panel className={styles.table}>
          <div className={styles.tabs}>
            <Tabs
              options={['Gainers', 'Losers']}
              defaultSelectedIndex='Gainers'
              onSelect={this.onSelectStatus}
            />
            <Tabs
              options={['24h', '2w']}
              defaultSelectedIndex='24h'
              onSelect={this.onSelectTimeWindow}
            />
          </div>
          <GainersLosersTable
            timeWindow={timeWindow}
            status={status}
            allProjects={allProjects}
            error={error}
          />
        </Panel>
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
