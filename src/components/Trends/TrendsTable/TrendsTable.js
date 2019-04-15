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
    selectedTrends: new Set(),
    trendConnections: [],
    connectedTrends: {}
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
          const {
            connectedTrends,
            connectTrends,
            clearConnectedTrends,
            trend
          } = this.props
          const trendConnections = connectedTrends[rawWord.toUpperCase()]
          const hasConnections =
            trendConnections &&
            trendConnections.filter(word => trend.includes(word.toLowerCase()))
              .length > 0
          return (
            <>
              <Icon
                className={cx(
                  styles.action__icon,
                  !hasConnections && styles.action__icon_disabled
                )}
                type='connection-big'
                onMouseEnter={() => {
                  connectTrends(rawWord)
                }}
                onMouseLeave={clearConnectedTrends}
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
      trend,
      scoreChange,
      volumeChange,
      header,
      className,
      selectable,
      isLoggedIn,
      username,
      selectTrend,
      selectedTrends,
      trendConnections
    } = this.props

    const tableData = trend.map((word, index) => {
      const [oldScore = 0, newScore = 0] = scoreChange[word] || []
      const [oldVolume = 0, newVolume = 0] = volumeChange[word] || []
      const isWordSelected = selectedTrends.has(word)
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
                onClick={() => selectTrend(word)}
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
              trendConnections.includes(word.toUpperCase()) && styles.connected
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
  hypedTrends: { scoreChange, volumeChange, TrendToInsights },
  user: {
    data: { username }
  }
}) => ({
  scoreChange,
  volumeChange,
  TrendToInsights,
  username
})

export default connect(mapStateToProps)(TrendsTable)
