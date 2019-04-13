import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { TRENDS_SELECTED_WORDS } from '../../../components/Trends/actions'
import TrendsTable from './TrendsTable'
import { dateDifferenceInWords, HOUR } from '../../../utils/dates'
import styles from './TrendsTables.module.scss'

class TrendsTables extends PureComponent {
  static defaultProps = {
    selectedTrends: new Set()
  }

  state = {
    selected: this.props.selectedTrends
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

  render () {
    const { selected } = this.state
    const { trends, isLoading, selectable, isLoggedIn } = this.props

    return (
      <div className={styles.tables}>
        {trends.length > 1 &&
          trends.slice(0, -1).map(trend => {
            const { datetime } = trend
            return (
              <TrendsTable
                key={datetime}
                header={dateDifferenceInWords({
                  from: new Date(datetime),
                  format: HOUR
                })}
                small
                className={styles.table}
                trend={trend}
                isLoggedIn={isLoggedIn}
                selectTrend={this.selectTrend}
                selectedTrends={selected}
              />
            )
          })}
        <TrendsTable
          className={styles.table}
          isLoading={isLoading}
          trend={trends.length > 0 ? trends[trends.length - 1] : {}}
          header='Last trends'
          selectable={selectable}
          isLoggedIn={isLoggedIn || true}
          selectTrend={this.selectTrend}
          selectedTrends={selected}
        />
      </div>
    )
  }
}

const mapStateToProps = ({
  hypedTrends: { selectedTrends },
  user: { token }
}) => ({
  selectedTrends,
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
