import React from 'react'
import { Panel } from '@santiment-network/ui'
import GetTrendsStats from './GetTrendsStats'

const TrendsStatsLoader = () => ''

const TrendsStats = ({ timeRange }) => (
  <GetTrendsStats
    timeRange={timeRange}
    render={({ stats, isLoading }) => {
      if (isLoading) {
        return <TrendsStatsLoader />
      } else {
        return (
          <Panel padding style={{ marginTop: '1rem' }}>
            <strong style={{ marginLeft: 40 }}>
              These stats were compiled searching:
            </strong>
            <div style={{ display: 'flex', marginTop: 0 }}>
              <ul>
                <li>{stats.documentsCount} messages </li>
                <li>{stats.averageDocumentsPerDay} average messages per day</li>
              </ul>
              <ul>
                <li>{stats.telegramChannelsCount} telegram channels</li>
                <li>{stats.subredditsCount} subreddits</li>
              </ul>
            </div>
          </Panel>
        )
      }
    }}
  />
)

export default TrendsStats
