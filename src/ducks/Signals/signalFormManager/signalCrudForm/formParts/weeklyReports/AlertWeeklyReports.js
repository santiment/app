import React, { useCallback, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { WATCHLIST_TOGGLE_MONITORING } from '../../../../../../actions/types'
import { showNotification } from '../../../../../../actions/rootActions'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import { selectIsEmailConnected } from '../../../../../../pages/UserSelectors'
import TriggerChannelSettings from '../channels/TriggerChannelSettings'
import styles from './AlertWeeklyReports.module.scss'

const AlertWeeklyReports = ({
  watchlist,
  dispatchIsMonitored,
  showNotification,
  isEmailConnected
}) => {
  const { isMonitored: initialMonitoring } = watchlist
  const [isMonitored, setMonitored] = useState(initialMonitoring)

  useEffect(
    () => {
      setMonitored(initialMonitoring)
    },
    [initialMonitoring]
  )

  const toggle = useCallback(
    val => {
      const { id, name } = watchlist
      const newVal = !isMonitored

      dispatchIsMonitored({ id, isMonitored: newVal })

      showNotification({
        variant: 'success',
        title: newVal
          ? `You are monitoring "${name}" watchlist now`
          : `You won't receive reports with "${name}" watchlist`
      })

      setMonitored(newVal)
    },
    [watchlist, initialMonitoring, isMonitored]
  )

  return (
    <div className={styles.container}>
      <Checkbox
        isActive={isMonitored}
        onClick={isEmailConnected ? toggle : undefined}
        disabled={!isEmailConnected}
        className={styles.checkbox}
      />
      <div className={styles.info}>
        <div className={styles.title}>
          Receive weekly report
          {!isEmailConnected && (
            <TriggerChannelSettings
              showTrigger
              trigger={<div className={styles.connect}>Connect email</div>}
              showTelegram={false}
              showWebPush={false}
            />
          )}
        </div>
        <div className={styles.description}>
          Every Sunday, you'll receive a report to your inbox with insights from
          the San family, based on your monitored screener.
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  dispatchIsMonitored: payload => {
    window.intercomSettings = {
      ...window.intercomSettings,
      weekly_report: payload.isMonitored
    }
    dispatch({ type: WATCHLIST_TOGGLE_MONITORING, payload })
  },
  showNotification: message => dispatch(showNotification(message))
})

const mapStateToProps = state => ({
  isEmailConnected: selectIsEmailConnected(state)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertWeeklyReports)
