import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Dialog from '@santiment-network/ui/Dialog'
import ScreenerSignal from './ScreenerSignal'
import { fetchSignals, updateTrigger, createTrigger } from '../common/actions'
import { SCREENER_DEFAULT_SIGNAL } from '../utils/constants'
import styles from './ScreenerSignalDialog.module.scss'

const getWatchlistSignal = ({ signals, watchlist: { id } }) => {
  return signals.find(
    ({ settings: { operation: { selector: { watchlist_id } = {} } = {} } }) => {
      return watchlist_id && +watchlist_id === +id
    }
  )
}

const ScreenerSignalDialog = ({
  fetchSignals,
  createTrigger,
  updateTrigger,
  watchlist,
  signals,
  signal
}) => {
  const [stateSignal, setSignal] = useState(signal || SCREENER_DEFAULT_SIGNAL)

  const [open, setOpen] = useState(true)

  useEffect(() => {
    fetchSignals()
  }, [])

  useEffect(
    () => {
      if (signals) {
        let signalOfWatchlist = getWatchlistSignal({ signals, watchlist })
        if (signalOfWatchlist) {
          setSignal(signalOfWatchlist)
        }
      }
    },
    [signals]
  )

  useEffect(
    () => {
      if (watchlist && !stateSignal.id) {
        const newSignal = {
          ...SCREENER_DEFAULT_SIGNAL,
          title: `Screener alert for watchlist '${watchlist.name}'`
        }
        newSignal.settings.operation.selector = { watchlist_id: watchlist.id }
        setSignal(newSignal)
      }
    },
    [watchlist]
  )

  const onSubmit = useCallback(
    data => {
      setOpen(false)
      if (stateSignal.id) {
        return updateTrigger({
          id: stateSignal.id,
          ...data
        })
      } else {
        return createTrigger(data)
      }
    },
    [stateSignal]
  )

  console.log(stateSignal)

  return (
    <Dialog
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      title='Enable Alert'
      classes={styles}
      trigger={
        <Button className={styles.btn} type='button' variant='ghost'>
          <Icon type='signal' className={styles.icon} /> Enable Alert
        </Button>
      }
    >
      <Dialog.ScrollContent>
        <ScreenerSignal
          signal={stateSignal}
          onCancel={() => setOpen(false)}
          onSubmit={onSubmit}
        />
      </Dialog.ScrollContent>
    </Dialog>
  )
}

export default connect(
  state => {
    return {
      signals: state.signals.all
    }
  },
  {
    fetchSignals,
    createTrigger,
    updateTrigger
  }
)(ScreenerSignalDialog)
