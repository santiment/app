import React, { useState } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash.debounce'
import Button from '@santiment-network/ui/Button'
import { createTrigger } from '../../../ducks/Signals/common/actions'
import styles from './CopySignal.module.scss'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import isEqual from 'lodash.isequal'

const CopySignal = ({ isAuthor, isCreated, signal, createTrigger }) => {
  if (isAuthor || isCreated) {
    return null
  }

  const copySignal = debounce(() => {
    const newSignal = { ...signal }
    delete newSignal.id
    newSignal.isPublic = false
    createTrigger(newSignal)
    setCreation && setCreation(true)
  })

  const [isCreation, setCreation] = useState(false)

  return (
    !isCreation && (
      <div className={styles.bottom}>
        <Button onClick={copySignal} as='a' className={styles.copyBtn}>
          Copy signal
        </Button>
      </div>
    )
  )
}

const mapDispatchToProps = dispatch => ({
  createTrigger: payload => {
    dispatch(createTrigger(payload))
  }
})

const mapStateToProps = (state, { creatorId, signal }) => {
  const isLoggedIn = checkIsLoggedIn(state)

  return {
    isAuthor:
      state &&
      state.user &&
      state.user.data &&
      +state.user.data.id === +creatorId,
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
