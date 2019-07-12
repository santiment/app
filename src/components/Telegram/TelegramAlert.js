import React from 'react'
import { selectIsTelegramConnected } from '../../pages/UserSelectors'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './TelegramAlert.module.scss'

const TelegramAlert = ({ isTelegramConnected }) => {
  return (
    !isTelegramConnected && (
      <span className={styles.telegramAlert}>
        *Telegram is not connect. Enable in{' '}
        <Link className={styles.link} to='/account'>
          My Account
        </Link>
      </span>
    )
  )
}

const mapStateToProps = state => {
  return {
    isTelegramConnected: selectIsTelegramConnected(state)
  }
}

export default connect(mapStateToProps)(TelegramAlert)
