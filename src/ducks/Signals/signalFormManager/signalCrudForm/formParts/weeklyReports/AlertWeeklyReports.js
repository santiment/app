import React, { useCallback, useState, useEffect } from 'react'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import TriggerChannelSettings from '../channels/TriggerChannelSettings'
import { useUserSettings } from '../../../../../../stores/user/settings'
import { notifyMonitoring } from '../../../../../Watchlists/Widgets/TopPanel/notifications'
import styles from './AlertWeeklyReports.module.scss'
import { useUpdateWatchlist } from '../../../../../Watchlists/gql/list/mutations'

const AlertWeeklyReports = ({ watchlist }) => {
  const { isMonitored: initialMonitoring } = watchlist
  const [isMonitored, setMonitored] = useState(initialMonitoring)
  const [updateWatchlist] = useUpdateWatchlist(watchlist.type)

  const {
    settings: { isEmailConnected }
  } = useUserSettings()

  useEffect(
    () => {
      setMonitored(initialMonitoring)
    },
    [initialMonitoring]
  )

  const toggle = useCallback(
    () => {
      const { name } = watchlist
      const newVal = !isMonitored

      updateWatchlist(watchlist, { isMonitored: newVal }).then(state =>
        setMonitored(state.isMonitored)
      )
      notifyMonitoring({ name, isMonitored: newVal, type: 'screener' })
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

export default AlertWeeklyReports
