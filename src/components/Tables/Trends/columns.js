import React from 'react'
import { push } from 'react-router-redux'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import Label from '@santiment-network/ui/Label'
import Loader from '@santiment-network/ui/Loader/Loader'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import ValueChange from '../../ValueChange/ValueChange'
import ConditionalWrapper from '../../Trends/TrendsTable/ConditionalWrapper'
import {
  getTopicsFromUrl,
  updTopicsInUrl
} from '../../../pages/TrendsExplore/url'
import { store } from '../../../redux'
import ExplanationTooltip from '../../ExplanationTooltip/ExplanationTooltip'
import InsightCardSmall from '../../Insight/InsightCardSmall'
import WordCloud from '../../WordCloud/WordCloud'
import styles from './TrendsTable.module.scss'
import PriceGraph from '../../../ducks/Watchlists/Widgets/Table/PriceGraph'
import SocialVolumeGraph from '../../../ducks/SocialTool/SocialVolumeGraph/SocialVolumeGraph'

export const EXPLORE_PAGE_URL = '/labs/trends/explore/'

const checkWorkInfo = ({
  word,
  selectable,
  selectedTrends,
  username,
  isCompactView,
  isLoggedIn
}) => {
  const isWordSelected = selectedTrends.has(word)
  const hasMaxWordsSelected = selectedTrends.size > 4 && !isWordSelected
  const isSelectable =
    selectable &&
    !!username &&
    !hasMaxWordsSelected &&
    !isCompactView &&
    isLoggedIn

  return { isSelectable, isWordSelected, hasMaxWordsSelected }
}

export const NumberCircle = ({ className, ...props }) => (
  <div {...props} className={cx(className, styles.insights__number)} />
)

const getIndexColumn = ({
  selectable,
  selectTrend,
  selectedTrends,
  username,
  isCompactView,
  isLoggedIn
}) => {
  return {
    Header: '#',
    accessor: 'index',
    width: 20,
    headerClassName: styles.headerIndex,
    Cell: ({ value, ...props }) => {
      const { original } = props
      const word = original.rawWord
      const {
        hasMaxWordsSelected,
        isWordSelected,
        isSelectable
      } = checkWorkInfo({
        word,
        selectable,
        selectedTrends,
        username,
        isCompactView,
        isLoggedIn
      })

      return (
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
              {value}
            </Label>
          </ConditionalWrapper>
        </>
      )
    }
  }
}

export const COMMON_COLUMNS = ({ trendConnections, isDesktop }) => [
  {
    Header: 'Trending words',
    accessor: 'word',
    Cell: ({ value: word }) => (
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
    )
  },
  {
    Header: 'Soc. vol., 24h',
    accessor: 'volume',
    Cell: ({ value: volumeChange }) => {
      const volumeIsLoading = !volumeChange
      const [oldVolume = 0, newVolume = 0] = volumeChange || []

      return volumeIsLoading ? (
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
  }
]

export const TRENDS_COMPACT_VIEW_COLUMNS = ({
  selectable,
  selectTrend,
  selectedTrends,
  username,
  isCompactView,
  isLoggedIn,
  trendConnections
}) => {
  return [
    getIndexColumn({
      selectable,
      selectTrend,
      selectedTrends,
      username,
      isCompactView,
      isLoggedIn
    }),
    ...COMMON_COLUMNS({ trendConnections })
  ]
}

export const TRENDS_MOBILE_COLUMNS = ({ trendConnections }) => [
  ...COMMON_COLUMNS({ trendConnections }),
  {
    Header: 'Trending chart, 7d',
    accessor: 'rawWord',
    Cell: ({ value }) => <SocialVolumeGraph word={value} />
  }
]

export const TRENDS_DESKTOP_COLUMNS = ({
  selectable,
  selectTrend,
  selectedTrends,
  username,
  isCompactView,
  isLoggedIn,
  trendConnections,
  TrendToInsights
}) => {
  return [
    getIndexColumn({
      selectable,
      selectTrend,
      selectedTrends,
      username,
      isCompactView,
      isLoggedIn
    }),
    ...COMMON_COLUMNS({ trendConnections }),
    {
      Header: 'Insights',
      accessor: 'rawWord',
      Cell: ({ value: rawWord }) => {
        const insights = TrendToInsights[rawWord.toUpperCase()]

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
          <div>
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
          </div>
        ) : (
          insightsTrigger
        )
      }
    },
    {
      Header: 'Trending chart, 7d',
      accessor: 'rawWord',
      Cell: ({ value }) => <SocialVolumeGraph word={value} />
    },

    {
      Header: 'Connected words',
      accessor: 'wordCloud',
      Cell: ({ value: rawWord }) => (
        <WordCloud className={styles.wordCloud} size={6} word={rawWord} />
      )
    }
  ]
}
