import React, { useState, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Input from '@santiment-network/ui/Input'
import Icon from '@santiment-network/ui/Icon'
import Loader from '@santiment-network/ui/Loader/Loader'
import Panel from '@santiment-network/ui/Panel'
import SantimentLogo from './SantimentLogo'
import MobileWrapper from '../Login/Mobile/MobileWrapper'
import { useUser } from '../../stores/user'
import styles from './index.module.scss'

const UsernameChangeModal = () => {
    const [username, setUsername] = useState()
    const [usernameError, setUsernameError] = useState()  
    const loading = false;

    const checkUsername = useCallback(() => {
        let error = undefined
        if (!username || username.length < 3) {
          error = 'Username should be at least 3 characters long'
        } else if (username[0] === '@') {
          error = '@ is not allowed for the first character'
        }
        setUsernameError(error)
        return !!error
    }, [username])
    
  return (
    <>
      <h3 className={styles.title}>Account settings update</h3>
      <p className={styles.description}>
        Please type your username
      </p>
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
          onBlur={checkUsername}
          isError={!!usernameError}
          errorText={usernameError}
          className={styles.usernameInput}
          disabled={loading}
        />
      </div>
      <ul className={styles.checkList}>
          <li><div><Icon type='checkmark'/></div> All your messages will be marked to this username</li>
          <li><div><Icon type='checkmark'/></div> All charts you create will be assigned this username</li>
          <li><div><Icon type='checkmark'/></div> Users will be able to tag you using this username</li>
      </ul>
      <Button
        fluid
        className={styles.toggleBtn}
        variant='fill'
        accent={!loading ? 'positive' : 'grey'}
      >
        {loading ? <Loader className={styles.loader} /> : 'Save'}
      </Button>
    </>
  )
}

const UsernamePage = ({ isDesktop }) => {
  const { user } = useUser()

  if (user && !user.username) { // FIXME
    return <Redirect to='/' />
  }

  return isDesktop ? (
    <div className={cx('page', styles.wrapper)}>
      <Panel padding className={styles.container}>
         <UsernameChangeModal />
      </Panel>
    </div>
  ) : (
    <div className={styles.container}>
        <SantimentLogo />
      <MobileWrapper className={styles.mobileWrapper}>
        <UsernameChangeModal />
      </MobileWrapper>
    </div>
  )
}

export default UsernamePage
