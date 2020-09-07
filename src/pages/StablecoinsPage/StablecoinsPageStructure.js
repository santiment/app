import React, { Fragment, useMemo, useState } from 'react'
import cx from 'classnames'
import StablecoinsIntervals from '../../ducks/Stablecoins/StablecoinsIntervals/StablecoinsIntervals'
import CheckProPaywall from '../../ducks/Stablecoins/CheckProPaywall'
import styles from './StablecoinsPage.module.scss'

const BlockHeader = ({ title, description, setInterval, tag }) => {
  if (!title) {
    return null
  }

  return (
    <div className={styles.subHeader}>
      <div className={styles.subTitle}>
        <Anchor tag={tag}>{title}</Anchor>
        {setInterval && <StablecoinsIntervals onChange={setInterval} />}
      </div>
      {description && <div className={styles.subDescr}>{description}</div>}
    </div>
  )
}

export const Anchor = ({ children, tag }) => {
  return (
    <a className={styles.anchor} href={`#${tag}`}>
      {children}
    </a>
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
    <div className={cx(styles.block, className)}>
      <BlockHeader title={title} description={description} tag={tag} />

      <El>{children}</El>
    </div>
  )
}

export const BlockWithRanges = ({ title, description, el: El, tag }) => {
  const [interval, setInterval] = useState('24h')

  return (
    <div className={styles.block}>
      <BlockHeader
        title={title}
        description={description}
        setInterval={setInterval}
        tag={tag}
      />

      <CheckProPaywall>
        <El interval={interval} />
      </CheckProPaywall>
    </div>
  )
}
