import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { TRENDS_SELECTED_WORDS } from '../../../components/Trends/actions'
import TrendsTable from './TrendsTable'
import { dateDifferenceInWords, HOUR } from '../../../utils/dates'
import styles from './TrendsTables.module.scss'

class TrendsTables extends PureComponent {
  static defaultProps = {
    selectedTrends: new Set(),
    connectedTrends: {}
  }

  state = {
    selected: this.props.selectedTrends,
    trendConnections: []
  }

  componentWillUnmount () {
    const { selected } = this.state
    if (selected.size > 0) {
      this.props.setSelectedTrends(selected)
    }
  }

  selectTrend = trend => {
    const { selected: oldSelected } = this.state
    const selected = new Set([...oldSelected])

    if (selected.has(trend)) {
      selected.delete(trend)
    } else {
      selected.add(trend)
    }

    this.setState({ selected })
  }

  connectTrends = word => {
    const { connectedTrends } = this.props
    const trendConnections = connectedTrends[word.toUpperCase()]

    if (trendConnections && trendConnections.length > 0) {
      this.setState({
        trendConnections
      })
    }
  }

  clearConnectedTrends = () => {
    this.setState({
      trendConnections: []
    })
  }

  render () {
    const { selected, trendConnections } = this.state
    const {
      trends,
      isLoading,
      selectable,
      isLoggedIn,
      connectedTrends
    } = this.props

    const { length } = trends

    return (
      <div className={styles.tables}>
        {trends.length > 1 &&
          trends.slice(0, -1).map(({ datetime, topWords }) => {
            return (
              <TrendsTable
                key={datetime}
                header={dateDifferenceInWords({
                  from: new Date(datetime),
                  format: HOUR
                })}
                small
                className={styles.table}
                trend={topWords.map(({ word }) => word)}
                isLoggedIn={isLoggedIn}
                selectTrend={this.selectTrend}
                selectedTrends={selected}
                connectedTrends={connectedTrends}
                trendConnections={trendConnections}
                connectTrends={this.connectTrends}
                clearConnectedTrends={this.clearConnectedTrends}
              />
            )
          })}
        <TrendsTable
          className={styles.table}
          isLoading={isLoading}
          trend={
            length > 0
              ? trends[length - 1].topWords.map(({ word }) => word)
              : []
          }
          header='Last trends'
          selectable={selectable}
          isLoggedIn={isLoggedIn || true}
          selectTrend={this.selectTrend}
          selectedTrends={selected}
          connectedTrends={connectedTrends}
          trendConnections={trendConnections}
          connectTrends={this.connectTrends}
          clearConnectedTrends={this.clearConnectedTrends}
        />
      </div>
    )
  }
}

const mapStateToProps = ({
  hypedTrends: { selectedTrends, connectedTrends },
  user: { token }
}) => ({
  selectedTrends,
  connectedTrends,
  isLoggedIn: !!token
})

const mapDispatchToProps = dispatch => ({
  setSelectedTrends: payload =>
    dispatch({ type: TRENDS_SELECTED_WORDS, payload })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendsTables)
