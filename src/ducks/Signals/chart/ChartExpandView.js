import React from 'react'
import { Button, Dialog } from '@santiment-network/ui'
import full_screen from '../../../assets/full_screen.svg'
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
            <img src={full_screen} alt='Expand' />
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
