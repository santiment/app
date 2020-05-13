import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { INDEX_PAGE_GROUPS } from '../../../components/SocialGrid/topics'
import SocialGrid from '../../../components/SocialGrid'
import styles from './SocialTrends.module.scss'

const SocialTrends = () => (
  <>
    <div className={styles.description}>
      Our previous analysis indicates that ERC-20 coins tend to be less
      correlated to Ethereum during the bull market, and exhibit higher
      correlation during the bear market. This Index charts the correlation of
      ERC-20 market cap to the ETH market cap over the last 3 months.
    </div>
    <Link to={'/labs/trends'} className={styles.link}>
      Start researching Social Tool now
    </Link>
    {INDEX_PAGE_GROUPS.map(({ title, description, topics }, idx) => (
      <section key={idx} className={styles.template}>
        <h4 className={styles.template__title}>{title}</h4>
        <p className={styles.template__description}>{description}</p>
        <SocialGrid topics={topics} />
      </section>
    ))}
    <Button
      fluid
      variant='flat'
      isActive
      className={styles.button}
      as={Link}
      to={'/labs/trends'}
    >
      Learn more about Social Tool{' '}
      <Icon className={styles.useIcon} type='pointer-right' />
    </Button>
  </>
)

export default SocialTrends
