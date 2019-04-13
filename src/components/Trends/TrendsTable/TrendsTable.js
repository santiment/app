import React, { PureComponent } from 'react'
import Table from 'react-table'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Label,
  Checkbox,
  PanelWithHeader,
  Panel,
  Icon,
  Tooltip
} from '@santiment-network/ui'
import ValueChange from '../../../components/ValueChange/ValueChange'
import WordCloud from '../../../components/WordCloud/WordCloud'
import InsightCardSmall from '../../../components/Insight/InsightCardSmall'
import { TRENDS_SELECTED_WORDS } from '../../../components/Trends/actions'
import styles from './TrendsTable.module.scss'

const columns = [
  {
    Header: '#',
    accessor: 'index',
    width: 35,
    headerClassName: styles.headerIndex
  },
  {
    Header: 'Word',
    accessor: 'word'
  },
  {
    Header: 'Trending score',
    accessor: 'score'
  },
  {
    Header: 'Social volume',
    accessor: 'volume'
  }
]

const NumberCircle = props => (
  <div {...props} className={styles.insights__number} />
)

class TrendsTable extends PureComponent {
  static defaultProps = {
    selectable: true,
    selectedTrends: new Set()
  }

  state = {
    selected: this.props.selectedTrends,
    connectedTrends: []
  }

  componentWillUnmount () {
    const { selected } = this.state
    if (selected.size > 0) {
      this.props.setSelectedTrends(selected)
    }
  }

  connectTrends (word) {
    const { connectedTrends } = this.props
    const trendConnections = connectedTrends[word.toUpperCase()]

    if (trendConnections && trendConnections.length > 0) {
      this.setState({
        connectedTrends: trendConnections
      })
    }
  }

  clearConnectedTrends = () => {
    this.setState({
      connectedTrends: []
    })
  }

  selectTrend (trend) {
    const { selected: oldSelected } = this.state
    const selected = new Set([...oldSelected])

    if (selected.has(trend)) {
      selected.delete(trend)
    } else {
      selected.add(trend)
    }

    this.setState({ selected })
  }

  getActionButtons = () => {
    return [
      {
        Cell: ({ original: { rawWord } }) => {
          return (
            <Tooltip
              closeTimeout={50}
              position='left'
              className={styles.tooltip}
              trigger={
                <Icon
                  className={cx(styles.action__icon, styles.action__icon_cloud)}
                  type='cloud-big'
                />
              }
            >
              <WordCloud className={styles.wordCloud} word={rawWord} />
            </Tooltip>
          )
        },
        width: 40,
        className: styles.action
      },
      {
        Cell: ({ original: { rawWord } }) => {
          const trendConnections = this.props.connectedTrends[
            rawWord.toUpperCase()
          ]
          const hasConnections = trendConnections && trendConnections.length > 0
          return (
            <>
              <Icon
                className={cx(
                  styles.action__icon,
                  !hasConnections && styles.action__icon_disabled
                )}
                type='connection-big'
                onMouseEnter={() => {
                  this.connectTrends(rawWord)
                }}
                onMouseLeave={this.clearConnectedTrends}
              />
              {hasConnections && (
                <NumberCircle>{trendConnections.length}</NumberCircle>
              )}
            </>
          )
        },
        width: 40,
        className: styles.action
      },
      {
        Cell: ({ original: { rawWord } }) => {
          const insights = this.props.TrendToInsights[rawWord.toUpperCase()]

          const icon = (
            <Icon
              className={cx(
                styles.action__icon,
                !insights && styles.action__icon_disabled
              )}
              type='insight'
            />
          )

          return insights && insights.length > 0 ? (
            <>
              <Tooltip
                closeTimeout={50}
                position='bottom'
                className={styles.tooltip}
                trigger={icon}
              >
                <Panel>
                  {insights.map((insight, i) => (
                    <InsightCardSmall
                      key={i}
                      {...insight}
                      className={styles.insight}
                    />
                  ))}
                </Panel>
              </Tooltip>
              <NumberCircle>{insights.length}</NumberCircle>
            </>
          ) : (
            icon
          )
        },
        width: 40,
        className: styles.action
      }
    ]
  }

  render () {
    const {
      small,
      trend: { topWords = [] },
      scoreChange,
      volumeChange,
      header,
      className,
      selectable,
      isLoggedIn,
      username
    } = this.props
    const { selected, connectedTrends } = this.state

    const tableData = topWords.map(({ word }, index) => {
      const [oldScore = 0, newScore = 0] = scoreChange[word] || []
      const [oldVolume = 0, newVolume = 0] = volumeChange[word] || []
      const isWordSelected = selected.has(word)
      return {
        index: (
          <>
            {selectable && !!username && isLoggedIn && (
              <Checkbox
                isActive={isWordSelected}
                className={cx(
                  styles.checkbox,
                  isWordSelected && styles.checkbox_active
                )}
                onClick={() => this.selectTrend(word)}
              />
            )}
            <Label accent='waterloo' className={styles.index}>
              {index + 1}
            </Label>
          </>
        ),
        word: (
          <Link
            className={cx(
              styles.word,
              connectedTrends.includes(word.toUpperCase()) && styles.connected
            )}
            to={`/labs/trends/explore/${word}`}
          >
            {word}{' '}
          </Link>
        ),
        rawWord: word,
        score: (
          <>
            {newScore} <ValueChange change={newScore - oldScore} />
          </>
        ),
        volume: (
          <>
            {newVolume} <ValueChange change={newVolume - oldVolume} />
          </>
        )
      }
    })

    return (
      <PanelWithHeader
        header={header}
        className={className}
        contentClassName={styles.panel}
        headerClassName={styles.header}
      >
        <Table
          className={styles.table}
          sortable={false}
          resizable={false}
          data={tableData}
          columns={
            small
              ? columns.slice(0, 2)
              : columns.concat(this.getActionButtons())
          }
          showPagination={false}
          defaultPageSize={10}
          minRows={10}
        />
      </PanelWithHeader>
    )
  }
}

const mapStateToProps = ({
  hypedTrends: {
    scoreChange,
    volumeChange,
    connectedTrends,
    TrendToInsights,
    selectedTrends
  },
  user: {
    data: { username }
  }
}) => ({
  scoreChange,
  volumeChange,
  connectedTrends,
  TrendToInsights,
  selectedTrends,
  username
})

const mapDispatchToProps = dispatch => ({
  setSelectedTrends: payload =>
    dispatch({ type: TRENDS_SELECTED_WORDS, payload })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendsTable)
