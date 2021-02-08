import React, { Fragment } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './StatusLabel.module.scss'

const statusMap = [
  {
    icon: 'eye-disabled',
    label: 'Private'
  },
  {
    icon: 'eye',
    label: 'Public'
  }
]

const getStatus = isPublic => statusMap[Number(isPublic)] || statusMap[0]

const StatusLabel = ({ isPublic = false }) => (
  <Fragment>
    <Icon
      type={getStatus(isPublic).icon}
      className={cx(styles.status, isPublic && styles.status_public)}
    />
    {getStatus(isPublic).label}{' '}
  </Fragment>
)

export default StatusLabel
