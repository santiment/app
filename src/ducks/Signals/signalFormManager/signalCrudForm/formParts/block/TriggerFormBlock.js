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
  enabledHide = false
}) => {
  const [isShow, setShowing] = useState(show)

  return (
    <div className={cx(styles.block)}>
      {titleLabel && (
        <div
          className={cx(styles.header, enabledHide && styles.clickable)}
          onClick={() => enabledHide && setShowing(!isShow)}
        >
          <span className={styles.title}>{titleLabel}</span>
          <span className={styles.description}>{titleDescription}</span>

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

export const TriggerFormBlockDivider = () => (
  <div className={styles.dividerContainer}>
    <div className={styles.divider} />
  </div>
)

export default TriggerFormBlock
