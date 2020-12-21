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

export const EXPLORE_PAGE_URL = '/labs/trends/explore/'

export const NumberCircle = ({ className, ...props }) => (
  <div {...props} className={cx(className, styles.insights__number)} />
)

const INDEX_COLUMN = ({ isCompactView = false } = {}) => ({
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

export const COMMON_COLUMNS = ({ trendConnections }) => [
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
        <Skeleton className={styles.skeleton} show={true} repeat={1} />
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

export const TRENDS_COMPACT_VIEW_COLUMNS = ({ trendConnections }) => {
  return [
    INDEX_COLUMN({ isCompactView: true }),
    ...COMMON_COLUMNS({ trendConnections })
  ]
}

export const TRENDS_MOBILE_COLUMNS = ({ trendConnections }) => [
  ...COMMON_COLUMNS({ trendConnections }),
  CHART_COLUMN
]

export const TRENDS_DESKTOP_COLUMNS = ({
  trendConnections,
  TrendToInsights
}) => {
  return [
    INDEX_COLUMN(),
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
    CHART_COLUMN,

    {
      Header: 'Connected words',
      accessor: 'wordCloud',
      Cell: ({ value: rawWord }) => (
        <WordCloud className={styles.wordCloud} size={6} word={rawWord} />
      )
    }
  ]
}
