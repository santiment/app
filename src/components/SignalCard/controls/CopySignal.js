import React, { useState } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash.debounce'
import Button from '@santiment-network/ui/Button'
import { createTrigger } from '../../../ducks/Signals/common/actions'
import styles from './CopySignal.module.scss'

const CopySignal = ({ signal, createTrigger }) => {
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

export default connect(
  null,
  mapDispatchToProps
)(CopySignal)
