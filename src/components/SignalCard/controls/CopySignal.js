import React, { useState } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import isEqual from 'lodash.isequal'
import Icon from '@santiment-network/ui/Icon'
import { createTrigger } from '../../../ducks/Signals/common/actions'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import styles from './CopySignal.module.scss'

const CopySignal = ({
  children,
  isAuthor,
  isCreated,
  signal,
  createTrigger,
  onCreate,
  onClose,
  label = 'Copy alert',
  doneLabel = 'Copied to my alerts',
  classes = {},
  btnParams,
}) => {
  const [isCreation, setCreation] = useState(false)

  if (isCreated && isCreation) {
    return (
      <button
        className={cx(styles.copyBtn, 'btn body-3 row v-center', styles.copiedBtn)}
        {...btnParams}
      >
        {doneLabel}
        <Icon type='success-round' />
      </button>
    )
  }

  if (isAuthor || isCreated) {
    return null
  }

  const { settings } = signal
  if (settings && settings.target && settings.target.watchlist_id > 0) {
    return null
  }

  function copySignal() {
    if (onCreate) {
      onCreate()
    } else {
      const newSignal = { ...signal }
      delete newSignal.id
      newSignal.isPublic = false
      createTrigger(newSignal)

      setCreation && setCreation(true)
    }
    if (onClose) {
      onClose()
    }
  }

  return (
    <>
      {children}
      <button
        onClick={!isCreation ? copySignal : undefined}
        className={cx(styles.copyBtn, 'btn body-3', classes.copyBtn)}
        {...btnParams}
      >
        {label}
      </button>
    </>
  )
}

const mapDispatchToProps = (dispatch) => ({
  createTrigger: (payload) => {
    dispatch(createTrigger(payload))
  },
})

const mapStateToProps = (state, { creatorId, signal }) => {
  const { user: { data: { id } = {} } = {} } = state
  const isLoggedIn = checkIsLoggedIn(state)

  return {
    isAuthor: +id === +creatorId,
    isLoggedIn: isLoggedIn,
    isCreated:
      !isLoggedIn ||
      (state &&
        state.signals.all &&
        state.signals.all.some(
          (item) =>
            item.title === signal.title &&
            isEqual(signal.settings.operation, item.settings.operation),
        )),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CopySignal)
