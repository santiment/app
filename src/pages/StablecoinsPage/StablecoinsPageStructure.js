import React, { Fragment, useMemo, useState } from 'react'
import cx from 'classnames'
import StablecoinsIntervals from '../../ducks/Stablecoins/StablecoinsIntervals/StablecoinsIntervals'
import UpgradeBtn from '../../components/UpgradeBtn/UpgradeBtn'
import CheckProPaywall from '../../ducks/Stablecoins/CheckProPaywall'
import styles from './StablecoinsPage.module.scss'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'

const UpgradeLabel = () => {
  const { isPro } = useUserSubscriptionStatus()

  if (isPro) {
    return null
  }

  return (
    <UpgradeBtn
      className={styles.upgrade}
      iconClassName={styles.crown}
      variant='fill'
      children='Pro'
    />
  )
}

const BlockHeader = ({ title, description, showPro, setInterval }) => {
  if (!title) {
    return null
  }

  return (
    <div className={styles.subHeader}>
      <div className={styles.subTitle}>
        {title}
        {setInterval && <StablecoinsIntervals onChange={setInterval} />}
        {showPro && <UpgradeLabel />}
      </div>
      {description && <div className={styles.subDescr}>{description}</div>}
    </div>
  )
}

export const Block = ({
  title,
  description,
  showPro,
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
      <BlockHeader title={title} description={description} showPro={showPro} />

      <El>{children}</El>
    </div>
  )
}

export const BlockWithRanges = ({ title, description, showPro, el: El }) => {
  const [interval, setInterval] = useState('24h')

  return (
    <div className={styles.block}>
      <BlockHeader
        title={title}
        description={description}
        showPro={showPro}
        setInterval={setInterval}
      />

      <CheckProPaywall>
        <El interval={interval} />
      </CheckProPaywall>
    </div>
  )
}
