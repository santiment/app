import React, { useState } from 'react'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import Cookie from './Cookie'
import { useTrackEvents } from './../../hooks/tracking'
import styles from './CookiePopup.module.scss'

const COOKIE_POLICY_ACCEPTED = 'COOKIE_POLICY_ACCEPTED'

const CookiePopup = () => {
  const [shown, setShown] = useState(
    !localStorage.getItem(COOKIE_POLICY_ACCEPTED)
  )

  const [trackEvent] = useTrackEvents()

  function accept () {
    trackEvent({ category: 'User', action: 'Cookie policy accepted' })
    localStorage.setItem(COOKIE_POLICY_ACCEPTED, true)

    setShown(false)
  }

  return (
    shown && (
      <Panel className={styles.wrapper} variant='modal'>
        <Cookie className={styles.image} />
        <div className={styles.content}>
          <h2 className={styles.title}>
            We are using cookies to improve your experience
          </h2>
          <p className={styles.text}>
            By clicking “Allow all”, you agree to the storing of cookie and
            accept our{' '}
            <a
              href='https://santiment.net/terms-conditions/'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.link}
            >
              Terms&nbsp;&&nbsp;Conditions
            </a>
            .
          </p>
          <Button
            variant='fill'
            accent='positive'
            className={styles.btn}
            onClick={accept}
          >
            Allow all
          </Button>
        </div>
      </Panel>
    )
  )
}

export default CookiePopup
