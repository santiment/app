import React, { PureComponent } from 'react'
import { compose } from 'redux'
import Table from 'react-table'
import cx from 'classnames'
import withSizes from 'react-sizes'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import Loader from '@santiment-network/ui/Loader/Loader'
import Panel from '@santiment-network/ui/Panel/Panel'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import Label from '@santiment-network/ui/Label'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import Button from '@santiment-network/ui/Button'
import { store } from '../../../index'
import ValueChange from '../../../components/ValueChange/ValueChange'
import WordCloud from '../../../components/WordCloud/WordCloud'
import InsightCardSmall from '../../../components/Insight/InsightCardSmall'
import ExplanationTooltip from '../../../components/ExplanationTooltip/ExplanationTooltip'
import {
  getTopicsFromUrl,
  updTopicsInUrl
} from '../../../pages/TrendsExplore/url'
import ConditionalWrapper from './ConditionalWrapper'
import { mapSizesToProps } from '../../../utils/withSizes'
import styles from './TrendsTable.module.scss'

const EXPLORE_PAGE_URL = '/labs/trends/explore/'

const MOBILE_COLUMNS = [
  {
    Header: 'Words',
    accessor: 'word'
  },
  {
    Header: 'Trending score',
    accessor: 'score'
  },
  {
    Header: 'Soc. vol, 24h',
    accessor: 'volume'
  }
]

const DESKTOP_COLUMNS = [
  {
    Header: '#',
    accessor: 'index',
    width: 35,
    headerClassName: styles.headerIndex
  },
  ...MOBILE_COLUMNS
]

const COMPACT_VIEW_COLUMNS = [
  {
    Header: '#',
    accessor: 'index',
    width: 35,
    headerClassName: styles.headerIndex
  },
  {
    Header: 'Words',
    accessor: 'word'
  },
  {
    Header: 'Social volume, 24h',
    accessor: 'volume'
  }
]

const NumberCircle = ({ className, ...props }) => (
  <div {...props} className={cx(className, styles.insights__number)} />
)

const getTrGroupProps = (_, rowInfo) => {
  return {
    onClick: ({ target, currentTarget, ctrlKey, metaKey }) => {
      if (ctrlKey || metaKey) {
        return
      }

      let node = target
      while (node && node !== currentTarget) {
        if (
          node.classList &&
          (node.classList.contains(styles.tooltip) ||
            node.classList.contains(styles.action) ||
            node.classList.contains(styles.checkbox))
        ) {
          return
        }
        node = node.parentNode
      }
      store.dispatch(push(`/labs/trends/explore/${rowInfo.original.rawWord}`))
    }
  }
}

class TrendsTable extends PureComponent {
  static defaultProps = {
    trendWords: [],
    selectable: true,
    selectedTrends: new Set(),
    trendConnections: [],
    connectedTrends: {},
    TrendToInsights: {},
    header: ''
  }

  getActionButtons = () => {
    return [
      {
        Cell: ({ original: { rawWord } }) => {
          const {
            connectedTrends,
            connectTrends,
            clearConnectedTrends,
            allTrends
          } = this.props
          const trendConnections = connectedTrends[rawWord.toUpperCase()]
          const visibleConnectionsLength = trendConnections
            ? trendConnections.filter(word => allTrends.has(word.toLowerCase()))
              .length
            : 0

          const hasConnections = visibleConnectionsLength > 0
          return (
            <>
              <ExplanationTooltip text='Connected trends' offsetY={5}>
                <span className={styles.action__icon}>
                  <Icon
                    type='connection-big'
                    className={cx(
                      styles.icon,
                      !hasConnections && styles.action__icon_disabled
                    )}
                    onMouseEnter={() => {
                      connectTrends(rawWord)
                    }}
                    onMouseLeave={clearConnectedTrends}
                  />
                </span>
              </ExplanationTooltip>
              {hasConnections && (
                <NumberCircle>{visibleConnectionsLength}</NumberCircle>
              )}
            </>
          )
        },
        width: 42,
        className: styles.action
      },
      {
        Cell: ({ original: { rawWord } }) => {
          const insights = this.props.TrendToInsights[rawWord.toUpperCase()]

          const insightsTrigger = (
            <Button variant='flat' className={styles.tooltip__trigger}>
              <ExplanationTooltip text='Connected insights' offsetY={5}>
                <Icon
                  type='insight'
                  className={cx(!insights && styles.action__icon_disabled)}
                />
              </ExplanationTooltip>
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
                      multilineTextId='TrendsTable__insights'
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
        className: styles.action
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
                  <ExplanationTooltip text='Social context' offsetY={7}>
                    <Icon
                      className={styles.action__icon_cloud}
                      type='cloud-big'
                    />
                  </ExplanationTooltip>
                </Button>
              }
            >
              <WordCloud className={styles.wordCloud} word={rawWord} />
            </Tooltip>
          )
        },
        width: 42,
        className: styles.action
      }
    ]
  }

  render () {
    const {
      small,
      hasActions,
      trendWords,
      volumeChange,
      header,
      className,
      selectable,
      isLoggedIn,
      username,
      selectTrend,
      selectedTrends,
      trendConnections,
      isDesktop,
      isCompactView
    } = this.props

    const tableData = trendWords.map(({ word, score }, index) => {
      const volumeIsLoading = !volumeChange[word]
      const [oldVolume = 0, newVolume = 0] = volumeChange[word] || []
      const isWordSelected = selectedTrends.has(word)
      const hasMaxWordsSelected = selectedTrends.size > 4 && !isWordSelected
      const isSelectable =
        selectable &&
        !!username &&
        !hasMaxWordsSelected &&
        !isCompactView &&
        isLoggedIn
      return {
        index: (
          <>
            {isSelectable && (
              <Checkbox
                isActive={isWordSelected}
                className={cx(
                  styles.checkbox,
                  isWordSelected && styles.checkbox_active
                )}
                onClick={() => selectTrend(word)}
              />
            )}
            <ConditionalWrapper isLimitReached={hasMaxWordsSelected}>
              <Label accent='waterloo' className={styles.index}>
                {index + 1}
              </Label>
            </ConditionalWrapper>
          </>
        ),
        word: (
          <Link
            className={cx(
              styles.word,
              trendConnections.includes(word.toUpperCase()) && styles.connected
            )}
            to={`${EXPLORE_PAGE_URL}${word}`}
            onClick={evt => {
              if (evt.ctrlKey || evt.metaKey) {
                const { pathname } = window.location
                const topic = pathname.replace(EXPLORE_PAGE_URL, '')

                if (pathname.includes(EXPLORE_PAGE_URL)) {
                  evt.preventDefault()
                  evt.stopPropagation()
                  if (word !== topic) {
                    const addedTopics = new Set(getTopicsFromUrl())
                    addedTopics.add(word)
                    const newTopics = updTopicsInUrl([...addedTopics])
                    const url = topic ? `?${newTopics}` : `${word}`

                    store.dispatch(push(pathname + url))
                  }
                }
              }
            }}
          >
            {word}{' '}
          </Link>
        ),
        rawWord: word,
        score: parseInt(score, 10),
        volume: volumeIsLoading ? (
          <Loader className={styles.loader} />
        ) : (
          <>
            <div className={styles.volume}>{newVolume}</div>{' '}
            <ValueChange
              change={newVolume - oldVolume}
              className={styles.valueChange}
            />
          </>
        )
      }
    })

    const baseColumns = isDesktop ? DESKTOP_COLUMNS : MOBILE_COLUMNS

    return (
      <PanelWithHeader
        header={header}
        className={cx(
          styles.panel,
          className,
          isCompactView && styles.panel__compact
        )}
        contentClassName={cx(
          styles.content,
          isCompactView && styles.content__compact
        )}
        headerClassName={cx(
          styles.header,
          !header && styles.header__empty,
          isCompactView && styles.header__compact
        )}
      >
        <Table
          className={cx(styles.table, isCompactView && styles.compact)}
          sortable={false}
          resizable={false}
          data={tableData}
          columns={
            isCompactView
              ? COMPACT_VIEW_COLUMNS
              : small
                ? baseColumns.slice(0, 2)
                : hasActions
                  ? baseColumns.concat(this.getActionButtons())
                  : baseColumns
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
  hypedTrends: { volumeChange, TrendToInsights },
  user: {
    data: { username }
  }
}) => ({
  volumeChange,
  TrendToInsights,
  username
})

export default compose(
  connect(mapStateToProps),
  withSizes(mapSizesToProps)
)(TrendsTable)
