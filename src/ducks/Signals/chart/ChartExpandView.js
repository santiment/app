import React from 'react'
import cx from 'classnames'
import Dialog from '@santiment-network/ui/Dialog'
import Button from '@santiment-network/ui/Button'
import full_screen from '../../../assets/full_screen.svg'
import ExplanationTooltip from '../../../components/ExplanationTooltip/ExplanationTooltip'
import styles from './ChartExpandView.module.scss'

export const ChartExpandView = ({ children, classes = {} }) => {
  return (
    <Dialog
      title='Smart Chart'
      classes={styles}
      trigger={
        <Button
          className={cx(styles.btn, classes.expanderButton)}
          type='button'
          variant='ghost'
        >
          <ExplanationTooltip
            position='top'
            offsetY={5}
            text='Expand'
            className={styles.explanation}
          >
            <img src={full_screen} alt='Expand' />
          </ExplanationTooltip>
        </Button>
      }
    >
      <Dialog.ScrollContent>{children}</Dialog.ScrollContent>
    </Dialog>
  )
}
