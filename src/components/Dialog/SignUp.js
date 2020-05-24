import React, { useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Dialog from '@santiment-network/ui/Dialog'
import Switch, { Case } from '../Switch'
import { LoginDescription } from '../../pages/Login/index'
import LoginEmailForm from '../../pages/Login/LoginEmailForm'
import { PrepareState } from '../../pages/Login/CreateAccountFreeTrial'
import styles from './SignUp.module.scss'

export const DialogSignUp = ({ defaultRoute, trigger }) => {
  const [isOpened, setIsOpened] = useState(true)
  const [parent, setParent] = useState()
  const [route, setRoute] = useState(defaultRoute)
  const wrapperRef = useRef()

  useEffect(() => {
    setParent(wrapperRef.current)
  }, [])

  useEffect(
    () => {
      if (!parent) return

      const timer = setTimeout(() =>
        parent
          .querySelectorAll('a')
          .forEach((link) => (link.onclick = onLinkClick)),
      )

      return () => clearTimeout(timer)
    },
    [parent, route],
  )

  function onLinkClick(e) {
    e.preventDefault()
    setRoute(e.currentTarget.getAttribute('href'))
  }

  return (
    <Dialog
      title={route === '/sign-up' ? 'Sign up' : 'Log in'}
      trigger={trigger}
      open={isOpened}
      onOpen={() => setIsOpened(true)}
      onClose={() => setIsOpened(false)}
    >
      <div className={styles.wrapper} ref={wrapperRef}>
        <Switch case={route}>
          <Case of='/login'>
            <LoginDescription />
          </Case>
          <Case of='/login/email'>
            <LoginEmailForm isDesktop showBack={false} />
          </Case>
          <Case of='/sign-up'>
            <LoginEmailForm
              isDesktop
              prepareState={PrepareState}
              showBack={false}
            />
          </Case>
        </Switch>
      </div>
    </Dialog>
  )
}

DialogSignUp.defaultProps = {
  defaultRoute: '/sign-up',
}

const mapStateToProps = ({ user: { isLoading, data } }) => ({
  isLoading,
  isLoggedIn: !!data.id,
})

export default connect(mapStateToProps)(({ isLoggedIn, isLoading, ...props }) =>
  isLoading || isLoggedIn ? null : <DialogSignUp {...props} />,
)
