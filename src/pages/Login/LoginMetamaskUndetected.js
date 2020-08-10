import React from 'react'
import Panel from '@santiment-network/ui/Panel/Panel'
import Icon from '@santiment-network/ui/Icon'
import styles from './LoginMetamaskUndetected.module.scss'

const LoginMetamaskUndetected = () => {
  return (
    <Panel className={styles.undetected}>
      <div>
        <Icon type='metamask' className={styles.metamask} />
      </div>
      <div className={styles.info}>
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
        </div>
      </div>
    </Panel>
  )
}

export default LoginMetamaskUndetected
