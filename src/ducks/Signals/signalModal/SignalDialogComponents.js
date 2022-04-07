import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import EmptySection from '../../../components/EmptySection/EmptySection'
import styles from './SignalMasterModalForm.module.scss'

export const TriggerModalTitle = ({
  showSharedBtn,
  isError,
  dialogTitle = 'Alert details',
  isLoggedIn,
}) => {
  if (isError) {
    return null
  }

  return (
    <>
      {dialogTitle}
      {showSharedBtn && isLoggedIn && (
        <Button accent='positive' variant='fill' className={styles.shared}>
          Shared
        </Button>
      )}
    </>
  )
}

export const signalModalTrigger = (enabled, label, variant = 'fill', border = false, classes) => (
  <Button
    variant={variant}
    border={border}
    disabled={!enabled}
    accent='positive'
    className={cx(styles.newSignal, classes)}
  >
    {label}
  </Button>
)

export const NoSignal = () => (
  <EmptySection className={styles.notSignalInfo}>
    Alert doesn't exist
    <br />
    or it's a private alert.
  </EmptySection>
)
