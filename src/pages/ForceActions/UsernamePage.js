import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Input from '@santiment-network/ui/Input'
import Icon from '@santiment-network/ui/Icon'
import Loader from '@santiment-network/ui/Loader/Loader'
import Panel from '@santiment-network/ui/Panel'
import SantimentLogo from './SantimentLogo'
import MobileWrapper from '../Login/Mobile/MobileWrapper'
import { useUser } from '../../stores/user'
import { useUsernameChange } from '../../hooks/usernameChange'
import { USER_USERNAME_CHANGE } from '../../actions/types'
import styles from './index.module.scss'

const UsernameChangeModal = ({ dispatchNewUsername }) => {
  const history = useHistory()
  const {
    changeUsername,
    savingUsername,
    usernameError,
    setUsernameError,
    username,
    setUsername,
    checkUsername,
    catchUsernameChangeError
  } = useUsernameChange()

  const saveUsernameButtonHandler = useCallback(() => {
    if (savingUsername) return
    if (checkUsername(username)) return
    changeUsername(username)
      .then(() => {
        dispatchNewUsername(username)
        history.replace('/')
      })
      .catch(catchUsernameChangeError)
  }, [
    username,
    savingUsername,
    checkUsername,
    catchUsernameChangeError,
    changeUsername
  ])

  return (
    <>
      <h3 className={styles.title}>Account settings update</h3>
      <p className={styles.description}>Please type your username</p>
      <div className={styles.inputPrefix}>
        <Input
          name='username'
          maxLength='25'
          autoComplete='off'
          placeholder='username'
          onChange={e => {
            setUsername(e.target.value)
            setUsernameError()
          }}
          onBlur={e => checkUsername(e.target.value)}
          isError={!!usernameError}
          errorText={usernameError}
          className={styles.usernameInput}
          disabled={savingUsername}
        />
      </div>
      <ul className={styles.checkList}>
        <li>
          <div>
            <Icon type='checkmark' />
          </div>{' '}
          All your messages will be marked to this username
        </li>
        <li>
          <div>
            <Icon type='checkmark' />
          </div>{' '}
          All charts you create will be assigned this username
        </li>
        <li>
          <div>
            <Icon type='checkmark' />
          </div>{' '}
          Users will be able to tag you using this username
        </li>
      </ul>
      <Button
        fluid
        className={styles.toggleBtn}
        variant='fill'
        accent={!savingUsername ? 'positive' : 'grey'}
        onClick={saveUsernameButtonHandler}
      >
        {savingUsername ? <Loader className={styles.loader} /> : 'Save'}
      </Button>
    </>
  )
}

const UsernamePage = ({ isDesktop, dispatchNewUsername }) => {
  const { user } = useUser()

  if (user && user.username) {
    return <Redirect to='/' />
  }

  return isDesktop ? (
    <div className={cx('page', styles.wrapper)}>
      <Panel padding className={styles.container}>
        <UsernameChangeModal dispatchNewUsername={dispatchNewUsername} />
      </Panel>
    </div>
  ) : (
    <div className={styles.container}>
      <SantimentLogo />
      <MobileWrapper className={styles.mobileWrapper}>
        <UsernameChangeModal dispatchNewUsername={dispatchNewUsername} />
      </MobileWrapper>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  dispatchNewUsername: username =>
    dispatch({
      type: USER_USERNAME_CHANGE,
      username
    })
})

export default connect(null, mapDispatchToProps)(UsernamePage)
