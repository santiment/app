import React, { useState } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import debounce from 'lodash.debounce'
import Button from '@santiment-network/ui/Button'
import { createTrigger } from '../../../ducks/Signals/common/actions'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import isEqual from 'lodash.isequal'
import styles from './CopySignal.module.scss'

const CopySignal = ({
  children,
  as = 'a',
  isAuthor,
  isCreated,
  signal,
  createTrigger,
  onCreate,
  label = 'Copy alert',
  classes = {},
  btnParams
}) => {
  if (isAuthor || isCreated) {
    return null
  }

  const { settings } = signal
  if (settings && settings.target && settings.target.watchlist_id > 0) {
    return null
  }

  const copySignal = debounce(() => {
    if (onCreate) {
      onCreate()
    } else {
      const newSignal = { ...signal }
      delete newSignal.id
      newSignal.isPublic = false
      createTrigger(newSignal)
      setCreation && setCreation(true)
    }
  })

  const [isCreation, setCreation] = useState(false)

  return (
    !isCreation && (
      <>
        {children}
        <Button
          onClick={copySignal}
          as={as}
          className={cx(styles.copyBtn, classes.copyBtn)}
          {...btnParams}
        >
          {label}
        </Button>
      </>
    )
  )
}

const mapDispatchToProps = dispatch => ({
  createTrigger: payload => {
    dispatch(createTrigger(payload))
  }
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
          item =>
            item.title === signal.title &&
            isEqual(signal.settings.operation, item.settings.operation)
        ))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CopySignal)
