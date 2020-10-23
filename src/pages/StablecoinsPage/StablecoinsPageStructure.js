import React, { Fragment, useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import { getTimerangePeriod } from '../../utils/dates'
import IntervalsComponent from '../../components/IntervalsComponent/IntervalsComponent'
import CheckProPaywall from '../../ducks/Stablecoins/CheckProPaywall'
import styles from './StablecoinsPage.module.scss'

export const BlockHeader = ({
  title,
  description,
  setInterval,
  ranges,
  defaultIndex,
  tag,
  className
}) => {
  if (!title) {
    return null
  }

  return (
    <div className={cx(styles.subHeader, className)}>
      <div className={styles.subTitle} id={tag}>
        {title}
        {setInterval && (
          <IntervalsComponent
            onChange={setInterval}
            defaultIndex={defaultIndex}
            ranges={ranges}
          />
        )}
      </div>
      {description && <div className={styles.subDescr}>{description}</div>}
    </div>
  )
}

export const Block = ({
  title,
  description,
  children,
  isPaywalActive = false,
  tag,
  className
}) => {
  const El = useMemo(
    () => {
      return isPaywalActive ? CheckProPaywall : Fragment
    },
    [isPaywalActive]
  )

  return (
    <div className={cx(styles.block, className)} id={tag}>
      <BlockHeader title={title} description={description} />

      <El>{children}</El>
    </div>
  )
}

export const ProOnlyBlock = ({
  title,
  description,
  children,
  tag,
  className
}) => {
  return (
    <div className={cx(styles.block, className)} id={tag}>
      <BlockHeader title={title} description={description} />
      <CheckProPaywall>{children}</CheckProPaywall>
    </div>
  )
}

export const BlockWithRanges = ({
  title,
  description,
  el: El,
  tag,
  checkPro = true
}) => {
  const [interval, setInterval] = useState('24h')
  const [settings, setSettings] = useState(getTimerangePeriod(interval))

  useEffect(
    () => {
      setSettings({
        ...settings,
        ...getTimerangePeriod(interval)
      })
    },
    [interval]
  )

  const Wrapper = checkPro ? CheckProPaywall : Fragment

  return (
    <div className={styles.block} id={tag}>
      <BlockHeader
        title={title}
        description={description}
        setInterval={setInterval}
      />

      <Wrapper>
        <El settings={settings} />
      </Wrapper>
    </div>
  )
}
