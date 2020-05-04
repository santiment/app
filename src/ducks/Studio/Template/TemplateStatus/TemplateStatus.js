import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './TemplateStatus.module.scss'

const TemplateStatus = ({
  isAuthor,
  isPublic,
  toggleIsPublic,
  className,
  asEl: El = 'div',
  ...rest
}) => {
  return (
    <El
      className={cx(
        styles.publicity,
        isPublic && styles.publicity_public,
        !isAuthor && styles.unclickable,
        className
      )}
      onClick={isAuthor ? toggleIsPublic : undefined}
      {...rest}
    >
      <Icon type={isPublic ? 'eye' : 'lock-small'} className={styles.icon} />{' '}
      {isPublic ? 'Public' : 'Private'}
    </El>
  )
}

export default TemplateStatus
