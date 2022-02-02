import React from 'react'
import Input from '@santiment-network/ui/Input'
import Icon from '@santiment-network/ui/Icon'
import Dialog from '@santiment-network/ui/Dialog'
import DarkTooltip from '../../../components/Tooltip/DarkTooltip'
import { useUsernameChange } from '../../../hooks/usernameChange'
import styles from './ProfileInfo.module.scss'

const EditProfile = ({ profile }) => {
    const {
      setUsername,
      savingUsername,
      usernameError,
      setUsernameError,
      checkUsername,
    } = useUsernameChange()
  
    return (
      <div className={styles.modalContent}>
        <label className={styles.label}>
          <DarkTooltip
            trigger={
              <div>
                Full name <Icon type='info-round' />
              </div>
            }
            position='top'
            align='start'
          >
            Official assignation for visitors to your user profile
          </DarkTooltip>
        </label>
        <Input />
        <label className={styles.label}>
          <DarkTooltip
            trigger={
              <div>
                Username <Icon type='info-round' />
              </div>
            }
            position='top'
            align='start'
          >
            Service assignation for any interactions on Sanbase
          </DarkTooltip>
        </label>
        <div className={styles.inputPrefix}>
            <Input
                name='username'
                maxLength='25'
                autoComplete='off'
                placeholder='username'
                onChange={e => {
                    setUsernameError()
                    setUsername(e.target.value)
                }}
                defaultValue={profile.username}
                onBlur={e => checkUsername(e.target.value)}
                isError={!!usernameError}
                errorText={usernameError}
                className={styles.usernameInput}
                disabled={savingUsername}
            />
        </div>
        <Dialog.Actions className={styles.actions}>
          <Dialog.Approve isLoading={savingUsername}>Save</Dialog.Approve>
          <Dialog.Cancel isLoading={savingUsername}>Cancel</Dialog.Cancel>
        </Dialog.Actions>
      </div>
    )
}

export default EditProfile