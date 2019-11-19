import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import WordCloud from '../../components/WordCloud/WordCloud'
import TrendsTable from '../../components/Trends/TrendsTable/TrendsTable'
import { parseIntervalString } from '../../utils/dates'
import Icon from '@santiment-network/ui/Icon'
import SidecarExplanationTooltip from './SidecarExplanationTooltip'
import sharedStyles from './ChartSidecar.module.scss'
import styles from './SocialContext.module.scss'
import GetHypedTrends from '../../components/Trends/GetHypedTrends'

function useDebounce (fn, time, dependencies = []) {
  const [timer, setTimer] = useState()
  useEffect(() => {
    clearTimeout(timer)
    setTimer(setTimeout(fn, time))
    return () => clearTimeout(timer)
  }, dependencies)
}

const Content = ({ interval, date, projectName }) => {
  const [period, setPeriod] = useState({})

  useDebounce(
    () => {
      const { amount } = parseIntervalString(interval)
      const from = new Date(date)
      const to = new Date(date)

      from.setHours(to.getHours() - amount, 0, 0, 0)

      setPeriod({
        from: from.toISOString(),
        to: to.toISOString()
      })
    },
    200,
    [date, interval, projectName]
  )

  return (
    <div className={styles.content}>
      <WordCloud
        word={projectName}
        size={12}
        className={cx(styles.item, styles.item_cloud)}
        {...period}
      />
      <div className={styles.item}>
        Trending words top 10
        <GetHypedTrends
          onlyTrends
          interval={interval}
          {...period}
          render={({ isLoading, items }) => {
            const trends = items[0]
            return (
              <TrendsTable
                small
                trendWords={trends && trends.topWords}
                className={styles.trends}
              />
            )
          }}
        />
      </div>
    </div>
  )
}

const SocialContext = ({
  onSidebarToggleClick,
  isAdvancedView,
  classes,
  ...rest
}) => {
  return (
    <div
      className={cx(
        sharedStyles.wrapper,
        isAdvancedView && sharedStyles.opened
      )}
    >
      <SidecarExplanationTooltip
        classes={{
          wrapper: cx(
            sharedStyles.toggle,
            styles.toggle,
            isAdvancedView || classes.sidecar__toggle
          )
        }}
      >
        <div
          className={sharedStyles.toggle__btn}
          onClick={onSidebarToggleClick}
        >
          <Icon type='cloud-big' className={styles.icon} />
        </div>
      </SidecarExplanationTooltip>
      {!isAdvancedView ? null : <Content {...rest} />}
    </div>
  )
}

SocialContext.defaultProps = {
  date: Date.now(),
  interval: '1d',
  projectName: 'bitcoin'
}

SocialContext.propTypes = {
  date: PropTypes.any,
  interval: PropTypes.string,
  projectName: PropTypes.string
}

export default SocialContext
