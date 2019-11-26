import React, { useState } from 'react'
import cx from 'classnames'
import WordCloud from '../../components/WordCloud/WordCloud'
import TrendsTable from '../../components/Trends/TrendsTable/TrendsTable'
import Icon from '@santiment-network/ui/Icon'
import SidecarExplanationTooltip from './SidecarExplanationTooltip'
import GetHypedTrends from '../../components/Trends/GetHypedTrends'
import { parseIntervalString } from '../../utils/dates'
import { SOCIAL_SIDEBAR } from './data'
import { useDebounceEffect } from '../../hooks'
import sharedStyles from './ChartSidecar.module.scss'
import styles from './SocialContext.module.scss'

const Content = ({ interval, date, projectName }) => {
  const [period, setPeriod] = useState({})

  useDebounceEffect(
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

export default SocialContext
