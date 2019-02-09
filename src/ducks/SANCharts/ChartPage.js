import React, { Component } from 'react'
import GetTimeSeries from '../../ducks/GetTimeSeries/GetTimeSeries'
import Selector from '../../components/Selector/Selector'
import Panel from '../../components/Panel'
import { mapQSToState } from './../../utils/utils'
import Charts from './Charts'

class ChartPage extends Component {
  state = {
    timeRange: '6m',
    slug: 'bitcoin',
    ...mapQSToState(this.props)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    return {
      ...mapQSToState(nextProps)
    }
  }

  setTimeRangeValue = timeRange => {
    this.setState({
      timeRange
    })
  }

  render () {
    const { timeRange, slug } = this.state
    return (
      <Panel>
        <div>
          <Selector
            options={['1w', '1m', '3m', '6m']}
            onSelectOption={this.setTimeRangeValue}
            defaultSelected={timeRange}
          />
        </div>
        <GetTimeSeries
          price={{
            timeRange,
            slug,
            interval: '1d'
          }}
          devActivity={{
            timeRange,
            slug
          }}
          meta={{
            mergedByDatetime: true
          }}
          render={({ timeseries }) => {
            return <Charts chartData={timeseries} />
          }}
        />
      </Panel>
    )
  }
}

export default ChartPage
