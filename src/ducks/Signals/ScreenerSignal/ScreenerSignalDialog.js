import React, { useState, useEffect } from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Dialog from '@santiment-network/ui/Dialog'
import styles from './ScreenerSignalDialog.module.scss'
import ScreenerSignal from './ScreenerSignal'
import { fetchSignals } from '../common/actions'
import { connect } from 'react-redux'
import { mapTriggerToFormProps } from '../utils/utils'

const getWatchlistSignal = ({ signals = [], watchlist: { id } }) => {
  return signals.find(({ settings: { selector: { watchlist_id } = {} } }) => {
    return watchlist_id && +watchlist_id === +id
  })
}

const ScreenerSignalDialog = ({ watchlist, signals, signal }) => {
  const [stateSignal, setSignal] = useState(signal)

  useEffect(() => {
    fetchSignals()
  }, [])

  useEffect(
    () => {
      if (signals) {
        setSignal(getWatchlistSignal({ signals, watchlist }))
      }
    },
    [signals]
  )

  return (
    <Dialog
      title='Enable Alert'
      classes={styles}
      trigger={
        <Button className={styles.btn} type='button' variant='ghost'>
          <Icon type='signal' className={styles.icon} /> Enable Alert
        </Button>
      }
    >
      <Dialog.ScrollContent>
        <ScreenerSignal watchlist={watchlist} signal={stateSignal} />
      </Dialog.ScrollContent>
    </Dialog>
  )
}

export default connect(state => {
  return {
    signals: state.signals
  }
})(ScreenerSignalDialog)
