import React, { useState, useEffect, useCallback } from 'react'
import memoize from 'lodash.memoize'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Dialog from '@santiment-network/ui/Dialog'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import ScreenerSignal from './ScreenerSignal'
import { updateTrigger, createTrigger, toggleTrigger } from '../common/actions'
import { SCREENER_DEFAULT_SIGNAL } from '../utils/constants'
import { useWatchlist } from '../../Watchlists/gql/hooks'
import Loader from '@santiment-network/ui/Loader/Loader'
import { useSignals } from '../common/getSignals'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import AnonBanner from '../../../components/AnonBanner/AnonBanner'
import styles from './ScreenerSignalDialog.module.scss'

export const EditSignalIcon = ({ className }) => (
  <svg
    className={className}
    width='16'
    height='14'
    viewBox='0 0 16 14'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4.54081 0.225283C4.69256 0.45599 4.62855 0.766035 4.39785 0.917788C2.3329 2.27606 1 4.50146 1 7.00187C1 9.49989 2.33035 11.7234 4.39193 13.0821C4.6225 13.234 4.68624 13.5441 4.53428 13.7747C4.38233 14.0053 4.07223 14.069 3.84165 13.917C1.52928 12.3931 0 9.87049 0 7.00187C0 4.1305 1.53221 1.60579 3.8483 0.0823244C4.07901 -0.0694286 4.38905 -0.00542398 4.54081 0.225283ZM11.4598 0.225283C11.6116 -0.00542398 11.9216 -0.0694286 12.1523 0.0823244C14.4684 1.60579 16.0006 4.1305 16.0006 7.00187C16.0006 9.87049 14.4714 12.3931 12.159 13.917C11.9284 14.069 11.6183 14.0053 11.4664 13.7747C11.3144 13.5441 11.3781 13.234 11.6087 13.0821C13.6703 11.7234 15.0006 9.49989 15.0006 7.00187C15.0006 4.50146 13.6677 2.27606 11.6028 0.917788C11.3721 0.766035 11.3081 0.45599 11.4598 0.225283Z'
    />
    <path
      d='M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7Z'
      fill='var(--persimmon)'
    />
  </svg>
)

const getWachlistIdFromSignal = memoize((signal = {}) => {
  const {
    settings: { operation: { selector: { watchlist_id } = {} } = {} } = {}
  } = signal
  return watchlist_id
})

const getWatchlistSignal = memoize(({ signals, watchlist: { id } }) => {
  return signals.find(signal => {
    const wId = getWachlistIdFromSignal(signal)
    return wId && +wId === +id
  })
})

const ScreenerSignalDialog = ({
  trigger: ElTrigger,
  signal,
  watchlistId,
  createTrigger,
  updateTrigger,
  defaultOpen,
  redirect,
  goBackTo,
  isLoggedIn
}) => {
  const [stateSignal, setSignal] = useState(signal || SCREENER_DEFAULT_SIGNAL)
  const [open, setOpen] = useState(defaultOpen)

  const targetId = watchlistId || getWachlistIdFromSignal(signal)
  const [watchlist = {}] = useWatchlist({ id: targetId })

  const hasSignal = signal && signal.id > 0

  const { data: signals = [], loading: signalsLoading } = useSignals({
    skip: hasSignal
  })

  useEffect(
    () => {
      if (hasSignal) {
        setSignal(signal)
      }
    },
    [signal]
  )

  useEffect(
    () => {
      if (watchlist && !hasSignal) {
        if (signals.length > 0) {
          let signalOfWatchlist = getWatchlistSignal({ signals, watchlist })
          if (signalOfWatchlist) {
            setSignal(signalOfWatchlist)
            return
          }
        }

        const newSignal = {
          ...SCREENER_DEFAULT_SIGNAL,
          title: `Alert for screener '${watchlist.name}'`
        }
        newSignal.settings.operation.selector = { watchlist_id: watchlist.id }
        setSignal(newSignal)
      }
    },
    [signals, watchlist]
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

  const close = useCallback(
    () => {
      setOpen(false)
      goBackTo && redirect(goBackTo)
    },
    [goBackTo, redirect, setOpen]
  )

  const isActive = !!stateSignal.id && !!stateSignal.isActive
  const title = isActive ? 'Edit Alert' : 'Enable Alert'

  if (signalsLoading) {
    return <Loader className={styles.loader} />
  }

  return (
    <Dialog
      open={open}
      onOpen={() => setOpen(true)}
      onClose={close}
      title={title}
      classes={{
        dialog: isLoggedIn ? styles.dialog : undefined
      }}
      trigger={
        ElTrigger || (
          <Button className={styles.btn} type='button' variant='ghost'>
            {!isActive ? (
              <>
                <Icon type='signal' className={styles.iconAlert} /> {title}
              </>
            ) : (
              <>
                <EditSignalIcon className={styles.iconAlert} /> {title}
              </>
            )}
          </Button>
        )
      }
    >
      <Dialog.ScrollContent>
        {isLoggedIn ? (
          <ScreenerSignal
            watchlist={watchlist}
            signal={stateSignal}
            onCancel={close}
            onSubmit={onSubmit}
          />
        ) : (
          <AnonBanner className={styles.anon} />
        )}
      </Dialog.ScrollContent>
    </Dialog>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    createTrigger: payload => dispatch(createTrigger(payload)),
    updateTrigger: payload => dispatch(updateTrigger(payload)),
    redirect: url => {
      dispatch(push(url))
    }
  }
}

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state)
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenerSignalDialog)
