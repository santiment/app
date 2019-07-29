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
  enabledHide = false,
  isFirstBlock = false,
  isLastBlock = false,
  isCertainBlock = false
}) => {
  const [isShow, setShowing] = useState(show)

  return (
    <div
      className={cx(
        styles.block,
        isFirstBlock && styles.firstBlock,
        isLastBlock && styles.lastBlock,
        isCertainBlock && styles.certainBlock
      )}
    >
      {titleLabel && (
        <div className={styles.header}>
          <span className={styles.title}>{titleLabel}</span>
          <span className={styles.description}>{titleDescription}</span>

          {enabledHide && (
            <Button
              type='button'
              className={cx(styles.action, styles.close)}
              onClick={setShowing(!isShow)}
            >
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

export default TriggerFormBlock
