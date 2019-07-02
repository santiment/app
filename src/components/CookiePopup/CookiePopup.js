import React from 'react'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import styles from './CookiePopup.module.scss'

const CookiePopup = () => {
  return (
    <Panel className={styles.wrapper} variant='modal'>
      <h2 className={styles.title}>We are using cookies</h2>
      <div className={styles.bottom}>
        <p className={styles.text}>
          This website uses the following types of cookies; strictly necessary,
          functional, performance
          <br />
          and marketing cookies. By using this website, you accept our Terms &
          Conditions.
        </p>
        <Button variant='fill' accent='positive' className={styles.btn}>
          Accept
        </Button>
      </div>
    </Panel>
  )
}

export default CookiePopup
