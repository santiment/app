import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import { client } from '../../../apollo'
import { getDateFormats } from '../../../utils/dates'
import UpgradeBtn from '../../../components/UpgradeBtn/UpgradeBtn'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import styles from './PaywallInfo.module.scss'

let CACHE
const queryParams = {
  query: gql`
    query {
      getAccessRestrictions {
        name
        restrictedFrom
        restrictedTo
      }
    }
  `
}

function metricsBoundariesAccessor ({ data: { getAccessRestrictions } }) {
  if (CACHE) return CACHE

  CACHE = {}
  const { length } = getAccessRestrictions

  for (let i = 0; i < length; i++) {
    const metricBoundaries = getAccessRestrictions[i]
    CACHE[metricBoundaries.name] = metricBoundaries
  }
  return CACHE
}
export const getMetricBoundaries = () =>
  client.query(queryParams).then(metricsBoundariesAccessor)

function formatDate (date) {
  const { DD, MMM, YY } = getDateFormats(new Date(date))
  return `${DD} ${MMM}, ${YY}`
}

const DEFAULT_INFOS = []

function useRestrictedInfo (metrics) {
  const [infos, setInfos] = useState(DEFAULT_INFOS)

  useEffect(
    () => {
      setInfos(DEFAULT_INFOS)

      let race = false
      const infos = []

      getMetricBoundaries().then(MetricBoundaries => {
        if (race) return

        metrics.forEach(({ key, queryKey = key, label }, i) => {
          const { restrictedFrom: from, restrictedTo: to } = MetricBoundaries[
            queryKey
          ]

          if (from || to) {
            infos.push({
              label,
              boundaries:
                from && to
                  ? `${formatDate(from)} - ${formatDate(to)}`
                  : formatDate(from || to)
            })
          }
        })

        setInfos(infos)
      })

      return () => {
        race = true
      }
    },
    [metrics]
  )

  return infos
}

const PaywallInfo = ({ metrics }) => {
  const infos = useRestrictedInfo(metrics)
  const { isPro, isTrial } = useUserSubscriptionStatus()

  if (isTrial) {
    return <UpgradeBtn variant='fill' fluid className={styles.upgrade_trial} />
  }

  if (isPro) return null

  return infos.length > 0 ? (
    <Tooltip
      position='bottom'
      trigger={
        <Button className={styles.btn}>
          <Icon className={styles.icon} type='question-round-small' />
          Why the gaps?
        </Button>
      }
      className={styles.tooltip}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>Why is some data hidden?</h2>
        <p className={styles.text}>Your plan has limited data period for:</p>
        {infos.map(({ label, boundaries }) => (
          <p key={label} className={styles.restriction}>
            {label} ({boundaries})
          </p>
        ))}
        <p className={styles.text}>
          To unlock the full potential of Santiment metrics you need to upgrade
          your account to PRO
        </p>
        <UpgradeBtn variant='fill' fluid className={styles.upgrade} />
      </div>
    </Tooltip>
  ) : null
}

export default PaywallInfo
