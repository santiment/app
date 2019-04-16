import React, { PureComponent } from 'react'
import Table from 'react-table'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {
  Label,
  Checkbox,
  PanelWithHeader,
  Panel,
  Icon,
  Tooltip,
  Button,
} from '@santiment-network/ui'
import { store } from '../../../index'
import ValueChange from '../../../components/ValueChange/ValueChange'
import WordCloud from '../../../components/WordCloud/WordCloud'
import InsightCardSmall from '../../../components/Insight/InsightCardSmall'
import styles from './TrendsTable.module.scss'

const columns = [
  {
    Header: '#',
    accessor: 'index',
    width: 35,
    headerClassName: styles.headerIndex,
  },
  {
    Header: 'Word',
    accessor: 'word',
  },
  {
    Header: 'Hype score',
    accessor: 'score',
  },
  {
    Header: 'Social volume',
    accessor: 'volume',
  },
]

const NumberCircle = ({ className, ...props }) => (
  <div {...props} className={cx(className, styles.insights__number)} />
)

const Explanation = ({ text, children, ...props }) => (
  <Tooltip
    offsetY={5}
    {...props}
    className={styles.explanation}
    closeTimeout={0}
    trigger={children}
  >
    {text}
  </Tooltip>
)

const getTrGroupProps = (_, rowInfo) => {
  return {
    onClick: ({ target, currentTarget }) => {
      let node = target
      while (node && node !== currentTarget) {
        if (
          node.classList.contains(styles.action) ||
          node.classList.contains(styles.checkbox)
        ) {
          return
        }
        node = node.parentNode
      }
      store.dispatch(push(`/labs/trends/explore/${rowInfo.original.rawWord}`))
    },
  }
}

class TrendsTable extends PureComponent {
  static defaultProps = {
    trendWords: [],
    selectable: true,
    selectedTrends: new Set(),
    trendConnections: [],
    connectedTrends: {},
  }

  getActionButtons = () => {
    return [
      {
        Cell: ({ original: { rawWord } }) => {
          const {
            connectedTrends,
            connectTrends,
            clearConnectedTrends,
            allTrends,
          } = this.props
          const trendConnections = connectedTrends[rawWord.toUpperCase()]
          const visibleConnectionsLength = trendConnections
            ? trendConnections.filter(word => allTrends.has(word.toLowerCase()))
                .length
            : 0

          const hasConnections = visibleConnectionsLength > 0
          return (
            <>
              <Explanation text='Connected trends'>
                <span
                  className={cx(
                    styles.action__icon,
                    !hasConnections && styles.action__icon_disabled,
                  )}
                >
                  <Icon
                    type='connection-big'
                    className={styles.icon}
                    onMouseEnter={() => {
                      connectTrends(rawWord)
                    }}
                    onMouseLeave={clearConnectedTrends}
                  />
                </span>
              </Explanation>
              {hasConnections && (
                <NumberCircle>{visibleConnectionsLength}</NumberCircle>
              )}
            </>
          )
        },
        width: 42,
        className: styles.action,
      },
      {
        Cell: ({ original: { rawWord } }) => {
          const insights = this.props.TrendToInsights[rawWord.toUpperCase()]

          const insightsTrigger = (
            <Button variant='flat' className={styles.tooltip__trigger}>
              <Explanation text='Connected insights'>
                <Icon
                  className={cx(!insights && styles.action__icon_disabled)}
                  type='insight'
                />
              </Explanation>
            </Button>
          )

          return insights && insights.length > 0 ? (
            <>
              <Tooltip
                closeTimeout={200}
                position='bottom'
                className={styles.tooltip}
                on='click'
                passOpenStateAs='isActive'
                trigger={insightsTrigger}
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
              <NumberCircle className={styles.insights__number_btn}>
                {insights.length}
              </NumberCircle>
            </>
          ) : (
            insightsTrigger
          )
        },
        width: 42,
        className: styles.action,
      },
      {
        Cell: ({ original: { rawWord } }) => {
          return (
            <Tooltip
              on='click'
              closeTimeout={200}
              position='left'
              className={styles.tooltip}
              passOpenStateAs='isActive'
              trigger={
                <Button variant='flat' className={styles.tooltip__trigger}>
                  <Explanation text='Social context' offsetY={7}>
                    <Icon
                      className={styles.action__icon_cloud}
                      type='cloud-big'
                    />
                  </Explanation>
                </Button>
              }
            >
              <WordCloud className={styles.wordCloud} word={rawWord} />
            </Tooltip>
          )
        },
        width: 42,
        className: styles.action,
      },
    ]
  }

  render() {
    const {
      small,
      trendWords,
      scoreChange,
      volumeChange,
      header,
      className,
      selectable,
      isLoggedIn,
      username,
      selectTrend,
      selectedTrends,
      trendConnections,
    } = this.props

    const tableData = trendWords.map((word, index) => {
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
                  isWordSelected && styles.checkbox_active,
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
              trendConnections.includes(word.toUpperCase()) && styles.connected,
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
        ),
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
          getTrGroupProps={getTrGroupProps}
        />
      </PanelWithHeader>
    )
  }
}

const mapStateToProps = ({
  hypedTrends: { scoreChange, volumeChange, TrendToInsights },
  user: {
    data: { username },
  },
}) => ({
  scoreChange,
  volumeChange,
  TrendToInsights,
  username,
})

export default connect(mapStateToProps)(TrendsTable)
