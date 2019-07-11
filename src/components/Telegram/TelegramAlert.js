import React from 'react'
import { selectIsTelegramConnected } from '../../pages/UserSelectors'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styles from './TelegramAlert.module.scss'

const mapStateToProps = state => {
  return {
    isTelegramConnected: selectIsTelegramConnected(state)
  }
}
const enhance = compose(connect(mapStateToProps))

export const TelegramAlert = ({ isTelegramConnected }) => {
  return (
    !isTelegramConnected && (
      <span className={styles.telegramAlert}>
        *Telegram is not connect. Enable in{' '}
        <Link to='/account'>My Account</Link>
      </span>
    )
  )
}

export default enhance(TelegramAlert)
