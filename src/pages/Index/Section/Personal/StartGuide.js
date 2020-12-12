import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { Row as BaseRow } from '../index'
import styles from './index.module.scss'

const Row = ({ title, isActive }) => (
  <BaseRow className={styles.row}>
    <div className={cx(styles.status, isActive && styles.status_active)}>
      {isActive && <Icon type='checkmark' className={styles.checkmark} />}
    </div>
    {title}
    <Icon type='arrow-right-big' className={styles.arrow} />
  </BaseRow>
)

const StartGuide = () => (
  <>
    <Row title='Fill out your profile with personal information' isActive />
    <Row title='Connect with Telegram' />
    <Row title='Create your first Chart Layout' />
    <Row title='Create your first Watchlist' />
  </>
)

export default StartGuide
