import React from 'react'
import { Button, Dialog, Icon } from '@santiment-network/ui'
import styles from './ChartExpandView.module.scss'

export const ChartExpandView = ({ children }) => {
  const height = window.innerHeight * 0.7
  const width = window.innerWidth * 0.8

  const renderChildWithHeight = () => {
    return React.cloneElement(children, { height: 0.7 * height })
  }

  return (
    <div className={styles.expander}>
      {children}
      <Dialog
        title='&nbsp;'
        trigger={
          <Button
            className={styles.expanderButton}
            type='button'
            variant='ghost'
          >
            <Icon type='plus-round' />
          </Button>
        }
      >
        <Dialog.ScrollContent>
          <div
            style={{
              width: width,
              height: height
            }}
            className={styles.expanded}
          >
            {renderChildWithHeight()}
          </div>
        </Dialog.ScrollContent>
      </Dialog>
    </div>
  )
}
