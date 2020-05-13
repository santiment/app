import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { INDEX_PAGE_GROUPS } from '../../../components/SocialGrid/topics'
import SocialGrid from '../../../components/SocialGrid'
import styles from './SocialTrends.module.scss'

const SocialTrends = () => (
  <>
    {INDEX_PAGE_GROUPS.map(({ title, description, topics }) => (
      <section className={styles.template}>
        <h4 className={styles.template__title}>{title}</h4>
        <p className={styles.template__description}>{description}</p>
        <SocialGrid topics={topics} />
      </section>
    ))}
    <Button
      variant='flat'
      className={styles.button}
      as={Link}
      to={'/labs/trends/explore/'}
    >
      Start researching Social Tool{' '}
      <Icon className={styles.useIcon} type='pointer-right' />
    </Button>
  </>
)

export default SocialTrends
