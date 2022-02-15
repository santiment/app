import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import { Edit } from '../../TopPanel/BaseActions/Items'
import { useUpdateWatchlist } from '../../../gql/list/mutations'
import { notifyUpdate } from '../../TopPanel/notifications'
import styles from './Title.module.scss'

const Title = ({
  title,
  description,
  type,
  refetchAssets,
  entity,
  isLoggedIn,
  isCurrentUser
}) => {
  const [updateWatchlist, { loading }] = useUpdateWatchlist(type)

  const onEditApprove = props =>
    updateWatchlist(entity, { ...props }).then(() => {
      notifyUpdate(title)
      refetchAssets && refetchAssets()
    })

  return (
    <div className={styles.wrapper}>
      <div
        className={cx(
          styles.title,
          (!isLoggedIn || !isCurrentUser) && styles.disabledEdit
        )}
      >
        {title}
        {isLoggedIn && isCurrentUser && (
          <Edit
            type={type}
            title={title}
            watchlist={entity}
            isLoading={loading}
            onSubmit={onEditApprove}
            trigger={<Icon type='edit' className={styles.edit} />}
          />
        )}
      </div>
      <Tooltip
        align='start'
        position='bottom'
        trigger={<Icon type='info-round' className={styles.descIcon} />}
        className={styles.tooltip}
      >
        <div className={styles.tooltip__content}>
          <div className={styles.descTitle}>
            <Icon type='insight' className={styles.contentIcon} />
            Description
          </div>
          <div className={styles.description}>{description || ''}</div>
        </div>
      </Tooltip>
    </div>
  )
}

export default Title
