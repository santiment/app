import React, { PureComponent } from 'react'
import Table from 'react-table'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { PanelWithHeader, Panel, Icon, Tooltip } from '@santiment-network/ui'
import ValueChange from '../../../components/ValueChange/ValueChange'
import WordCloud from '../../../components/WordCloud/WordCloud'
import InsightCardSmall from '../../../components/Insight/InsightCardSmall'
import styles from './TrendsTable.module.scss'

const columns = [
  {
    Header: '#',
    accessor: 'index',
    width: 35,
    className: styles.index,
    headerClassName: styles.index
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
  state = {
    connectedTrends: []
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

  getActionButtons = () => {
    return [
      {
        Cell: ({ original: { rawWord } }) => {
          return (
            <Tooltip
              closeTimeout={50}
              position='bottom'
              className={styles.tooltip}
              trigger={
                <Icon className={styles.action__icon} type='cloud-big' />
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
          return (
            <Icon
              className={styles.action__icon}
              type='connection-big'
              onMouseEnter={() => {
                this.connectTrends(rawWord)
              }}
              onMouseLeave={this.clearConnectedTrends}
            />
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
                !insights && styles.insights__icon_disabled
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
        className: cx(styles.action, styles.insights)
      }
    ]
  }

  render () {
    const {
      notSelected,
      trend: { topWords = [] },
      scoreChange,
      volumeChange,
      header,
      className
    } = this.props
    const { connectedTrends } = this.state

    const tableData = topWords.map(({ word }, index) => {
      const [oldScore = 0, newScore = 0] = scoreChange[word] || []
      const [oldVolume = 0, newVolume = 0] = volumeChange[word] || []
      return {
        index: index + 1,
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
            notSelected
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
  hypedTrends: { scoreChange, volumeChange, connectedTrends, TrendToInsights }
}) => ({
  scoreChange,
  volumeChange,
  connectedTrends,
  TrendToInsights
})

export default connect(mapStateToProps)(TrendsTable)
