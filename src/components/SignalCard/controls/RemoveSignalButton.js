import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog'
import { removeTrigger } from '../../../ducks/Signals/common/actions'
import styles from './SignalControls.module.scss'

const RemoveDescription = title => (
  <>
    Are you sure you want to delete <span>{title}</span> ?
  </>
)

const RemoveSignalButton = ({
  id,
  signalTitle = 'trigger',
  removeSignal,
  redirect,
  className,
  withConfirm = true,
  trigger: TriggerEl = () => (
    <Button variant='ghost' type='button' className={cx(className, styles.btn)}>
      <Icon type='remove' />
    </Button>
  )
}) =>
  withConfirm ? (
    <ConfirmDialog
      id={id}
      title='Delete signal'
      description={RemoveDescription(signalTitle)}
      onApprove={removeSignal}
      redirect={redirect}
      classes={styles}
      trigger={
        <div>
          <TriggerEl />
        </div>
      }
    />
  ) : (
    <TriggerEl onClick={() => removeSignal(id)} />
  )

const mapDispatchToProps = dispatch => ({
  removeSignal: id => {
    dispatch(removeTrigger(id))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(RemoveSignalButton)
