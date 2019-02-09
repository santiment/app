import React, { Component } from 'react'
import SignalsChart from '../../components/Signals/SignalsChart'
import SignalsSearch from '../../components/Signals/SignalsSearch'
import Selector from '../../components/Selector/Selector'
import Panel from '../../components/Panel'
import GetTimeSeries from '../../ducks/GetTimeSeries/GetTimeSeries'
import styles from './SignalsPriceVolume.module.css'

class SignalsPriceVolume extends Component {
  state = {
    timeRange: '6m'
  }

  setTimeRangeValue = timeRange => {
    this.setState({
      timeRange
    })
  }

  render () {
    const {
      match: {
        params: { slug }
      }
    } = this.props
    const { timeRange } = this.state
    return (
      <div className={styles.wrapper}>
        <Panel>
          <SignalsSearch slug={slug} />
          <div className={styles.header}>
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
            render={({ price = {} }) => {
              const { items = [] } = price
              return <SignalsChart chartData={items} />
            }}
          />
        </Panel>
      </div>
    )
  }
}

export default SignalsPriceVolume
