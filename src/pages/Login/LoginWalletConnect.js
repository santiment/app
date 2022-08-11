import React from 'react'
import cx from 'classnames'
import { track } from 'webkit/analytics'
import { mutateWalletConnectLogin } from 'webkit/api/login'
import wcSrc from 'webkit/ui/LoginPrompt/WalletConnect/wallet-connect.svg'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'
import styles from './index.module.scss'

const mutateLogin = (connector, address) => mutateWalletConnectLogin('id', connector, address)

const LoginGoogleBtn = ({ className }) => {
  function onClick() {
    track.event('sign_up', { method: 'walletconnect' })

    const connector = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org', // Required
      qrcodeModal: QRCodeModal,
    })

    if (!connector.connected) {
      connector.createSession()
    }

    connector.on('connect', (error, payload) => {
      if (error) throw error

      const { accounts } = payload.params[0]
      mutateLogin(connector, accounts[0]).then(() => {
        window.location.reload() // HACK: refactor later to mutate store
      })
    })
  }
  return (
    <button
      className={cx(styles.btn, styles.btn_email, styles.btn_google, className)}
      onClick={onClick}
    >
      <img src={wcSrc} alt='wallet connect' style={{ width: 24 }} className='mrg-s mrg--r' />
      Sign in with WalletConnect
    </button>
  )
}

export default LoginGoogleBtn
