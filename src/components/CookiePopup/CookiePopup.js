import React, { useState } from 'react'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Cookie from './Cookie'
import ManageCookiesDialog from './ManageCookiesDialog/ManageCookiesDialog'
import { useTrackEvents } from '../../hooks/tracking'
import styles from './CookiePopup.module.scss'

const COOKIE_POLICY_ACCEPTED = 'COOKIE_POLICY_ACCEPTED'

const cookiesPolicies = [
  {
    title: 'Strictly Necessary Cookies',
    content:
      'These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. These cookies do not store any personally identifiable information.',
    key: 'BASIC_COOKIES',
    hideCheckbox: true,
  },
  {
    title: 'Functional Cookies',
    content:
      'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance.',
    key: 'FUNCTIONAL_COOKIES',
    hideCheckbox: false,
  },
  {
    title: 'Performance Cookies',
    content:
      'These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies then some or all of these services may not function properly.',
    key: 'PERFORMANCE_COOKIES',
    hideCheckbox: false,
  },
]

const CookiePopup = () => {
  const [shown, setShown] = useState(!localStorage.getItem(COOKIE_POLICY_ACCEPTED))
  const [isModalOpen, setIsOpenModal] = useState(false)

  const [trackEvent] = useTrackEvents()

  function acceptCookies () {
    trackEvent({ category: 'User', action: 'Cookie policy accepted' })
    cookiesPolicies.forEach((item) => {
      localStorage.setItem(item.key, true)
    })
    localStorage.setItem(COOKIE_POLICY_ACCEPTED, true)

    setShown(false)
  }

  return (
    <>
      {shown && (
        <Panel className={styles.wrapper} variant='modal'>
          <Icon type='close-medium' className={styles.closeIcon} onClick={() => setShown(false)} />
          <Cookie className={styles.image} />
          <div className={styles.content}>
            <div className={styles.title}>We are using cookies to improve your experience!</div>
            <p className={styles.text}>
              By clicking “Allow all”, you agree to use of all cookies. Visit our{' '}
              <a
                href='https://santiment.net/cookies/'
                target='_blank'
                rel='noopener noreferrer'
                className={styles.link}
              >
                Cookies Policy{' '}
              </a>
              to learn more.
            </p>
            <div className={styles.actions}>
              <Button
                variant='fill'
                accent='positive'
                className={styles.btn}
                onClick={acceptCookies}
              >
                Allow all
              </Button>
              <Button
                variant='flat'
                border
                onClick={() => {
                  setIsOpenModal(true)
                  setShown(false)
                }}
              >
                Manage cookies
              </Button>
            </div>
          </div>
        </Panel>
      )}
      {isModalOpen && (
        <ManageCookiesDialog
          cookiesPolicies={cookiesPolicies}
          basePolicy={COOKIE_POLICY_ACCEPTED}
        />
      )}
    </>
  )
}

export default CookiePopup
