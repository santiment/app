import React from 'react'
import { push } from 'react-router-redux'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Label from '@santiment-network/ui/Label'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import ValueChange from '../../ValueChange/ValueChange'
import {
  getTopicsFromUrl,
  updTopicsInUrl
} from '../../../pages/TrendsExplore/url'
import { store } from '../../../redux'
import ExplanationTooltip from '../../ExplanationTooltip/ExplanationTooltip'
import InsightCardSmall from '../../Insight/InsightCardSmall'
import WordCloud from '../../WordCloud/WordCloud'
import SocialVolumeGraph from '../../../ducks/SocialTool/SocialVolumeGraph/SocialVolumeGraph'
import { formatNumber } from '../../../utils/formatting'
import Skeleton from '../../Skeleton/Skeleton'
import styles from './TrendsTable.module.scss'

export const getTrGroupProps = (_, rowInfo) => {
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

const EXPLORE_PAGE_URL = '/labs/trends/explore/'

const NumberCircle = ({ className, ...props }) => (
  <div {...props} className={cx(className, styles.insights__number)} />
)

const getIndexColumn = ({ isCompactView = false } = {}) => ({
  Header: '#',
  accessor: 'index',
  width: isCompactView ? 20 : 40,
  headerClassName: styles.headerIndex,
  Cell: ({ value }) => (
    <Label accent='waterloo' className={styles.index}>
      {value}
    </Label>
  )
})

const CHART_COLUMN = {
  Header: 'Trending chart, 7d',
  accessor: 'rawWordChart',
  Cell: ({ value }) => <SocialVolumeGraph word={value} />
}

export const getCommonColumns = ({ trendConnections }) => [
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
        {word}
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
        <Skeleton centered className={styles.skeleton} show={true} repeat={1} />
      ) : (
        <>
          <div className={styles.volume}>{newVolume}</div>{' '}
          <ValueChange
            change={
              oldVolume !== 0 ? (100 * (newVolume - oldVolume)) / oldVolume : 0
            }
            className={styles.valueChange}
            suffix={'%'}
            render={formatNumber}
          />
        </>
      )
    }
  }
]

export const getTrendsCompatctViewCols = ({ trendConnections }) => {
  return [
    getIndexColumn({ isCompactView: true }),
    ...getCommonColumns({ trendConnections })
  ]
}

export const getTrendsMobileCols = ({ trendConnections }) => [
  ...getCommonColumns({ trendConnections }),
  CHART_COLUMN
]

export const getTrendsDesktopCols = ({ trendConnections, TrendToInsights }) => {
  const hasInsights =
    TrendToInsights &&
    Object.values(TrendToInsights).some(item => item && item.length > 0)

  const columns = [
    getIndexColumn(),
    ...getCommonColumns({ trendConnections }),
    CHART_COLUMN,
    {
      Header: 'Connected words',
      accessor: 'wordCloud',
      Cell: ({ value: rawWord }) => (
        <WordCloud className={styles.wordCloud} size={6} word={rawWord} />
      )
    }
  ]

  if (!hasInsights) {
    return columns
  }

  return [
    ...columns,
    {
      Header: 'Insights',
      width: 60,
      accessor: 'insightWord',
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
    }
  ]
}