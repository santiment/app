import React from 'react'
import qs from 'query-string'
import UnsubscribeImage from './UnsubscribeImage'
import styles from './Unsubscribe.module.scss'

const Unsubscribe = () => {
  const { md_email: email } = qs.parse(window.location.search)
  return (
    <div className={styles.wrapper}>
      <UnsubscribeImage />
      <h3>You've been unsubscribed</h3>
      <p>
        Your email address{email ? `, ${email}, ` : ' '}has been removed from
        our mailing list. We are sorry to see you go, but we won't be sending
        any more email to your address.
      </p>
    </div>
  )
}

export default Unsubscribe
