import React, { Component } from 'react'
import { Panel } from '@santiment-network/ui'
import GainersLosersTable from './GainersAndLosersTable'
import { Tabs } from '@santiment-network/ui'
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
    timeWindow: '2d',
    status: 'GAINER'
  }

  render () {
    const { timeWindow, status } = this.state
    return (
      <div className='page'>
        <h1>Top Gainers And Top Losers</h1>
        <Panel className={styles.table}>
          <div className={styles.tabs}>
            <Tabs
              options={['Gainers', 'Losers']}
              defaultSelectedIndex='Gainers'
              onSelect={selectedTab =>
                this.setState({
                  status: statusMapping[selectedTab]
                })
              }
            />
            <Tabs
              options={['24h', '2w']}
              defaultSelectedIndex='24h'
              onSelect={selectedTab =>
                this.setState({
                  timeWindow: timeWindowMapping[selectedTab]
                })
              }
            />
          </div>
          <GainersLosersTable timeWindow={timeWindow} status={status} />
        </Panel>
      </div>
    )
  }
}

export default GainersAndLosersPage
