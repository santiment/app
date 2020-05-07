import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './TemplateStatus.module.scss'
import Toggle from '@santiment-network/ui/Toggle'

export const TemplateStatusToggle = ({
  toggleIsPublic,
  isPublic,
  classes = {}
}) => {
  return (
    <div onClick={toggleIsPublic} className={classes.status}>
      Public
      <Toggle isActive={isPublic} className={classes.toggle} />
    </div>
  )
}

const TemplateStatus = ({
  isAuthor,
  isPublic,
  toggleIsPublic,
  asEl: El = 'div',
  classes = {},
  ...rest
}) => {
  return (
    <El
      className={cx(
        styles.publicity,
        isPublic && styles.publicity_public,
        !isAuthor && styles.unclickable,
        classes.status
      )}
      onClick={isAuthor ? toggleIsPublic : undefined}
      {...rest}
    >
      <Icon
        type={isPublic ? 'eye' : 'lock-small'}
        className={cx(
          styles.icon,
          classes.statusIcon,
          !isAuthor && styles.unclickableIcon
        )}
      />{' '}
      {isPublic ? 'Public' : 'Private'}
    </El>
  )
}

export default TemplateStatus
