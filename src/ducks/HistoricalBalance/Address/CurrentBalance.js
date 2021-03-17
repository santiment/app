import React, { useMemo } from 'react'
import cx from 'classnames'
import {
  distributionSorter,
  existingAssetsFilter,
  CollapsedDistributions
} from './AssetsDistribution'
import { useProjects, getProjectInfo } from '../../../stores/projects'
import { millify } from '../../../utils/formatting'
import styles from './CurrentBalance.module.scss'

const MAX_DISTRIBUTIONS = 5
const intlFormatter = new Intl.NumberFormat('en-EN', {
  style: 'currency',
  currency: 'USD'
})

const Distribution = ({ ticker, balance }) =>
  ticker ? (
    <div className={styles.project}>
      {ticker} {balance}
    </div>
  ) : null

const Distributions = ({ distributions }) =>
  distributions.map((distribution, i) => (
    <Distribution key={i} {...distribution} />
  ))

function useCurrentBalance (walletAssets) {
  const { projects } = useProjects()

  return useMemo(
    () => {
      if (projects.length === 0) return { distributions: [] }

      const sortedAssets = walletAssets
        .filter(existingAssetsFilter)
        .sort(distributionSorter)
      const { length } = sortedAssets
      const distributions = new Array(length)

      let totalBalance = 0
      for (let i = 0; i < length; i++) {
        totalBalance += sortedAssets[i].balanceUsd
      }

      for (let i = 0; i < length; i++) {
        const { slug, balanceUsd } = sortedAssets[i]
        const { ticker } = getProjectInfo(projects, slug) || {}

        distributions[i] = {
          ticker,
          balance: '$' + millify(balanceUsd, balanceUsd < 1 ? 3 : 1)
        }
      }

      return {
        usd: intlFormatter.format(totalBalance),
        totalBalance,
        distributions
      }
    },
    [projects, walletAssets]
  )
}

const CurrentBalance = ({ walletAssets, className }) => {
  const { usd, totalBalance, distributions } = useCurrentBalance(walletAssets)

  if (!totalBalance) return null

  const hiddenProjects = distributions.slice(MAX_DISTRIBUTIONS)
  const biggestDistributions = distributions.slice(
    0,
    MAX_DISTRIBUTIONS + (hiddenProjects.length === 1)
  )

  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.title}>Current balance</div>

      <div className={styles.balance}>
        {usd} <span className={styles.currency}>USD</span>
      </div>

      <div className={styles.projects}>
        <Distributions distributions={biggestDistributions} />

        {hiddenProjects.length > 1 && (
          <CollapsedDistributions
            distributions={hiddenProjects}
            Items={Distributions}
          />
        )}
      </div>
    </div>
  )
}

export default CurrentBalance
