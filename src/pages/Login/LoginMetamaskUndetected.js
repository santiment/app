import React from 'react'
import Panel from '@santiment-network/ui/Panel/Panel'
import styles from './LoginMetamaskUndetected.module.scss'

const LoginMetamaskUndetected = () => {
  return (
    <Panel className={styles.undetected}>
      <h4 className={styles.undetected__title}>We can't detect Metamask!</h4>
      <p className={styles.undetected__text}>
        We can auth you with Metamask account. It's secure and easy.
      </p>
      <div className={styles.undetected__bottom}>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://metamask.io/#how-it-works'
          className={styles.undetected__link}
        >
          How Metamask works?
        </a>
        <a href='https://metamask.io/'>
          <img
            width={128}
            src='https://api-stage.santiment.net/images/sanbase/download-metamask.png'
            alt='Metamask link'
          />
        </a>
      </div>
    </Panel>
  )
}

export default LoginMetamaskUndetected
