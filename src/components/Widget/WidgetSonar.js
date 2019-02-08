import React, { Component } from 'react'
import { Tabs } from '@santiment-network/ui'
import cx from 'classnames'
import MarketcapWidget from '../TotalMarketcapWidget/GetTotalMarketcap'
import styles from './WidgetSonar.module.scss'

class WidgetSonar extends Component {
  state = {
    view: 'Marketcap'
  }

  onSelect = view => {
    this.setState({ view })
  }

  render () {
    const { view } = this.state
    const { className, type, listName } = this.props
    return (
      <div className={cx(styles.wrapper, className)}>
        <Tabs
          options={['Marketcap', 'Insights']}
          defaultSelectedIndex='Marketcap'
          onSelect={this.onSelect}
          className={styles.tabs}
        />
        {view === 'Marketcap' ? (
          <MarketcapWidget type={type} listName={listName} />
        ) : (
          <div>123</div>
        )}
      </div>
    )
  }
}

export default WidgetSonar
