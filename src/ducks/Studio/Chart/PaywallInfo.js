import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import { client } from '../../../index'
import UpgradeBtn from '../../../components/UpgradeBtn/UpgradeBtn'
import { getCurrentSanbaseSubscription } from '../../../utils/plans'
import { getDateFormats } from '../../../utils/dates'
import styles from './PaywallInfo.module.scss'

const METRIC_BOUNDARIES_QUERY = gql`
  query($metric: String!) {
    getMetric(metric: $metric) {
      metadata {
        isRestricted
        from: restrictedFrom
        to: restrictedTo
      }
    }
  }
`

function formatDate(date) {
  const { DD, MMM, YY } = getDateFormats(new Date(date))
  return `${DD} ${MMM}, ${YY}`
}

const DEFAULT_INFOS = []

function useRestrictedInfo(metrics) {
  const [infos, setInfos] = useState(DEFAULT_INFOS)

  useEffect(
    () => {
      setInfos(DEFAULT_INFOS)

      let race = false

      metrics.forEach(({ key, queryKey = key, label }) =>
        client
          .query({
            query: METRIC_BOUNDARIES_QUERY,
            variables: {
              metric: queryKey,
            },
          })
          .then(({ data: { getMetric } }) => {
            if (race) return

            const {
              metadata: { isRestricted, from, to },
            } = getMetric

            if (!isRestricted) return

            setInfos((state) => [
              ...state,
              {
                key,
                label,
                from,
                to,
              },
            ])
          })
          .catch(console.warn),
      )

      return () => {
        race = true
      }
    },
    [metrics],
  )

  return infos
}

const checkHasBoundaries = ({ leftBoundaryDate: a, rightBoundaryDate: b }) =>
  a || b

const PaywallInfo = ({ boundaries, subscription, metrics }) => {
  const infos = useRestrictedInfo(metrics)

  if (subscription && new Date(subscription.trialEnd) > new Date()) {
    return <UpgradeBtn variant='fill' fluid className={styles.upgrade_trial} />
  }

  return infos.length > 0 &&
    /* checkHasBoundaries(boundaries) && ( */
    boundaries ? (
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
        {infos.map(({ label, from, to }) => (
          <p key={label} className={styles.restriction}>
            {label} ({formatDate(from)} - {formatDate(to)})
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

const mapStateToProps = (state) => ({
  subscription: getCurrentSanbaseSubscription(state.user.data),
})

export default connect(mapStateToProps)(PaywallInfo)
