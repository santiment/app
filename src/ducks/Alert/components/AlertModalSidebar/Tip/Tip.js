import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Icon from '@santiment-network/ui/Icon'
import Tip from '../../../../../components/Illustrations/Tip'
import styles from './Tip.module.scss'

const Tips = ({ tips, selectedStep, openedSteps, setOpenedSteps }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTip, setCurrentTip] = useState(0)

  useEffect(() => {
    if (!openedSteps.includes(selectedStep)) {
      setIsOpen(true)
      setOpenedSteps(prev => [...prev, selectedStep])
    }
  }, [tips])

  return (
    <ContextMenu
      position='top'
      align='start'
      className={styles.wrapper}
      trigger={
        <div className={cx(styles.trigger, isOpen && styles.openState)}>
          <Tip className={styles.icon} />
        </div>
      }
      open={isOpen}
      onOpen={() => {
        setIsOpen(true)
      }}
      onClose={() => {
        setIsOpen(false)
        setCurrentTip(0)
      }}
    >
      <div className={styles.tipWrapper}>
        <div className={styles.tipTitle}>{tips[currentTip].title}</div>
        <div className={styles.tipContent}>{tips[currentTip].description}</div>
        {tips.length > 1 && (
          <div
            onClick={() =>
              setCurrentTip(prev =>
                prev === tips.length - 1 ? prev - 1 : prev + 1
              )
            }
            className={styles.tipChanger}
          >
            {currentTip !== tips.length - 1 ? (
              <>
                Next
                <Icon className={styles.nextIcon} type='pointer-right-small' />
              </>
            ) : (
              <>
                <Icon
                  className={styles.previousIcon}
                  type='pointer-right-small'
                />
                Previous
              </>
            )}
          </div>
        )}
      </div>
    </ContextMenu>
  )
}

Tips.defaultProps = {
  defaultOpen: false
}

export default Tips
