import React, { Fragment, useMemo, useState } from 'react'
import cx from 'classnames'
import StablecoinsIntervals from '../../ducks/Stablecoins/StablecoinsIntervals/StablecoinsIntervals'
import CheckProPaywall from '../../ducks/Stablecoins/CheckProPaywall'
import styles from './StablecoinsPage.module.scss'

const BlockHeader = ({ title, description, setInterval }) => {
  if (!title) {
    return null
  }

  return (
    <div className={styles.subHeader}>
      <div className={styles.subTitle}>
        {title}
        {setInterval && <StablecoinsIntervals onChange={setInterval} />}
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
  className
}) => {
  const El = useMemo(
    () => {
      return isPaywalActive ? CheckProPaywall : Fragment
    },
    [isPaywalActive]
  )

  return (
    <div className={cx(styles.block, className)}>
      <BlockHeader title={title} description={description} />

      <El>{children}</El>
    </div>
  )
}

export const BlockWithRanges = ({ title, description, el: El }) => {
  const [interval, setInterval] = useState('24h')

  return (
    <div className={styles.block}>
      <BlockHeader
        title={title}
        description={description}
        setInterval={setInterval}
      />

      <CheckProPaywall>
        <El interval={interval} />
      </CheckProPaywall>
    </div>
  )
}
