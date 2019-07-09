import React from 'react'
import cx from 'classnames'
import Dialog from '@santiment-network/ui/Dialog'
import Button from '@santiment-network/ui/Button'
import full_screen from '../../../assets/full_screen.svg'
import ExplanationTooltip from '../../../components/ExplanationTooltip/ExplanationTooltip'
import styles from './ChartExpandView.module.scss'

const TITLE_HEIGHT = 75

export const ChartExpandView = ({ children, classes = {} }) => {
  const width = window.innerWidth * 0.8
  const height = window.innerHeight * 0.6

  const renderChildWithHeight = () => {
    return React.cloneElement(children, {
      height: height - TITLE_HEIGHT,
      showAxes: true
    })
  }

  return (
    <div className={styles.expander}>
      {children}

      <Dialog
        title='&nbsp;'
        trigger={
          <Button
            className={cx(styles.expanderButton, classes.expanderButton)}
            type='button'
            variant='ghost'
          >
            <ExplanationTooltip
              position='bottom'
              offsetY={5}
              text='Expand'
              className={styles.explanation}
            >
              <img src={full_screen} alt='Expand' />
            </ExplanationTooltip>
          </Button>
        }
        classes={styles}
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
