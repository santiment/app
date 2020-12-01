import React from 'react'
import { useUser } from '../../stores/user'
import LoginDialog from '../AnonBanner/AnonBanner'

const LoginDialogWrapper = ({ trigger: Trigger, children }) => {
  const { isLoggedIn } = useUser()

  if (isLoggedIn) {
    return children
  }

  return <LoginDialog trigger={Trigger ? <Trigger /> : <div>{children}</div>} />
}

export default LoginDialogWrapper
