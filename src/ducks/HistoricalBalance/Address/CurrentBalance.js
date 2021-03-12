import React, { useMemo } from 'react'
import { useProjects, getProjectInfo } from '../../../stores/projects'
import { millify } from '../../../utils/formatting'
import styles from './CurrentBalance.module.scss'

const distributionSorter = ({ balanceUsd: a }, { balanceUsd: b }) => b - a
const intlFormatter = new Intl.NumberFormat('en-EN', {
  style: 'currency',
  currency: 'USD'
})

function useCurrentBalance (walletAssets) {
  const { projects } = useProjects()

  return useMemo(
    () => {
      if (projects.length === 0) return { distributions: [] }

      const sortedAssets = walletAssets
        .slice()
        .sort(distributionSorter)
        .slice(0, 5)
      const { length } = sortedAssets
      const distributions = new Array(length)

      let totalBalance = 0
      for (let i = 0; i < length; i++) {
        totalBalance += sortedAssets[i].balanceUsd
      }

      for (let i = 0; i < length; i++) {
        const { slug, balance } = sortedAssets[i]
        const { ticker } = getProjectInfo(projects, slug) || {}

        distributions[i] = {
          ticker,
          balance: millify(balance, balance < 1 ? 3 : 1)
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

const CurrentBalance = ({ walletAssets }) => {
  const { usd, totalBalance, distributions } = useCurrentBalance(walletAssets)

  if (!totalBalance) return null

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Current balance</div>

      <div className={styles.balance}>
        {usd} <span className={styles.currency}>USD</span>
      </div>

      <div className={styles.projects}>
        {distributions.map(({ ticker, balance }) =>
          ticker ? (
            <div key={ticker} className={styles.project}>
              {ticker} {balance}
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}

export default CurrentBalance
