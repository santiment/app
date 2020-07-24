import React, { useState } from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import styles from './TriggerFormBlock.module.scss'

const TriggerFormBlock = ({
  children,
  show = true,
  titleLabel = '',
  titleDescription = '',
  enabledHide = true,
  showDescription = true,
  className
}) => {
  const [isShow, setShowing] = useState(show)

  return (
    <div className={cx(styles.block, className)}>
      {titleLabel && (
        <div
          className={cx(styles.header, enabledHide && styles.clickable)}
          onClick={() => enabledHide && setShowing(!isShow)}
        >
          <div className={styles.headerContent}>
            <span className={styles.title}>{titleLabel}</span>
            {showDescription && (
              <span className={styles.description}>
                {titleDescription || '...'}
              </span>
            )}
          </div>

          {enabledHide && (
            <Button type='button' className={styles.action}>
              {isShow && <Icon type='arrow-up' />}
              {!isShow && <Icon type='arrow-down' />}
            </Button>
          )}
        </div>
      )}
      {isShow && <div className={styles.content}>{children}</div>}
    </div>
  )
}

export const TriggerFormBlockDivider = ({ className }) => (
  <div className={cx(styles.dividerContainer, className)}>
    <div className={styles.divider} />
  </div>
)

export default TriggerFormBlock
