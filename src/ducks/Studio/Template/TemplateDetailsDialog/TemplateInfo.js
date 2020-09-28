import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel'
import { getTemplateInfo } from '../utils'
import AvatarWithName from '../../../../components/AvatarWithName/AvatarWithName'
import styles from './TemplateDetailsDialog.module.scss'

const TemplateInfo = ({ template, as: El = Panel, classes = {} }) => {
  const { assets: usedAssets, metrics: usedMetrics } = getTemplateInfo(template)

  const { description, user } = template

  return (
    <El className={classes.templateInfo}>
      <div className={styles.block}>
        <Icon className={styles.icon} type='assets' />
        <div className={styles.info}>
          <div className={styles.subTitle}>Assets</div>
          <div className={styles.description}>{usedAssets.join(', ')}</div>
        </div>
      </div>

      <div className={styles.block}>
        <Icon className={styles.icon} type='chart-bars' />
        <div className={styles.info}>
          <div className={styles.subTitle}>Metrics</div>
          <div className={styles.description}>{usedMetrics.join(', ')}</div>
        </div>
      </div>

      {description && (
        <div className={styles.block}>
          <Icon type='info-round-small' className={styles.icon} />
          <div className={styles.info}>
            <div className={styles.subTitle}>Description</div>
            <div className={styles.description}>{description}</div>
          </div>
        </div>
      )}

      <div className={styles.block}>
        <Icon type='profile-small' className={styles.icon} />
        <div className={styles.info}>
          <div className={styles.subTitle}>Author</div>
          <div className={cx(styles.description, styles.user)}>
            <AvatarWithName user={user} classes={styles} />
          </div>
        </div>
      </div>
    </El>
  )
}

export default TemplateInfo
