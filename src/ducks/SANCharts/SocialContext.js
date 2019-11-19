import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import WordCloud from '../../components/WordCloud/WordCloud'
import TrendsTable from '../../components/Trends/TrendsTable/TrendsTable'
import Icon from '@santiment-network/ui/Icon'
import SidecarExplanationTooltip from './SidecarExplanationTooltip'
import GetHypedTrends from '../../components/Trends/GetHypedTrends'
import { parseIntervalString } from '../../utils/dates'
import { SOCIAL_SIDEBAR } from './data'
import sharedStyles from './ChartSidecar.module.scss'
import styles from './SocialContext.module.scss'

// TODO: move to utils/hooks [@vanguard | Nov 19, 2019]
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
        infoClassName={styles.cloud__header}
        {...period}
      />
      <div className={styles.item}>
        <h3 className={styles.trend}>
          Trending words <span className={styles.trend__label}>top 10</span>
        </h3>
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
                className={styles.table}
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
        title='Social context'
        description='Explore social context of the hovered date'
        localStorageSuffix={SOCIAL_SIDEBAR}
        classes={{
          wrapper: cx(
            sharedStyles.toggle,
            styles.toggle,
            isAdvancedView || classes.sidecar__toggle_social
          )
        }}
      >
        <div
          className={sharedStyles.toggle__btn}
          onClick={() => onSidebarToggleClick(SOCIAL_SIDEBAR)}
        >
          <div className={cx(styles.toggle__icons, sharedStyles.toggle__icons)}>
            <Icon type='arrow-left' className={sharedStyles.toggle__arrow} />
            <Icon type='cloud-small' />
          </div>
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
