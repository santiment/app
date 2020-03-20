import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { TRENDS_SELECTED_WORDS } from '../../actions'
import { DesktopOnly, MobileOnly } from '../../../Responsive'
import TrendsTablesDesktop from './TrendsTablesDesktop'
import TrendsTablesMobile from './TrendsTablesMobile'

class TrendsTablesWrapper extends PureComponent {
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

    return (
      <>
        <DesktopOnly>
          <TrendsTablesDesktop
            {...this.props}
            trendConnections={trendConnections}
            allTrends={allTrends}
            selectTrend={this.selectTrend}
            connectTrends={this.connectTrends}
            clearConnectedTrends={this.clearConnectedTrends}
            selected={selected}
          />
        </DesktopOnly>
        <MobileOnly>
          <TrendsTablesMobile
            {...this.props}
            trendConnections={trendConnections}
            allTrends={allTrends}
            selectTrend={this.selectTrend}
            connectTrends={this.connectTrends}
            clearConnectedTrends={this.clearConnectedTrends}
            selected={selected}
          />
        </MobileOnly>
      </>
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
)(TrendsTablesWrapper)
