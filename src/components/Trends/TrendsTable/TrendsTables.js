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
    trendConnections: [],
    allTrends: []
  }

  static getDerivedStateFromProps ({ trends }, { allTrends }) {
    if (allTrends.length > 0) {
      return null
    }

    const newAllTrends = []
    const { length } = trends
    for (let i = 0; i < length; i++) {
      const { topWords } = trends[i]
      const { length: wordsLength } = topWords
      for (let y = 0; y < wordsLength; y++) {
        newAllTrends.push(topWords[y].word)
      }
    }

    return {
      allTrends: new Set(newAllTrends)
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

    this.setState({ selected }, () => this.props.setSelectedTrends(selected))
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
    const { selected, trendConnections, allTrends } = this.state
    const {
      isLoading,
      selectable,
      isLoggedIn,
      connectedTrends,
      trends
    } = this.props

    const { length } = trends

    console.log(trends)
    return (
      <div className={styles.tables}>
        {length > 1 &&
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
                trendWords={topWords}
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
          trendWords={length > 0 ? trends[length - 1].topWords : undefined}
          header='Last trends'
          selectable={selectable}
          isLoggedIn={isLoggedIn || true}
          selectTrend={this.selectTrend}
          selectedTrends={selected}
          connectedTrends={connectedTrends}
          trendConnections={trendConnections}
          connectTrends={this.connectTrends}
          clearConnectedTrends={this.clearConnectedTrends}
          allTrends={allTrends}
          hasActions
        />
      </div>
    )
  }
}

const mapStateToProps = ({
  hypedTrends: { selectedTrends, connectedTrends },
  user: { data }
}) => ({
  selectedTrends,
  connectedTrends,
  isLoggedIn: data && !!data.id
})

const mapDispatchToProps = dispatch => ({
  setSelectedTrends: payload =>
    dispatch({ type: TRENDS_SELECTED_WORDS, payload })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendsTables)
