import React, { useMemo } from 'react'
import { capitalizeStr } from '../../../utils/utils'
import { useProjects, getProjectInfo } from '../../../stores/projects'
import styles from './AssetsDistribution.module.scss'

const distributionSorter = ({ balance: a }, { balance: b }) => b - a
const checkIsSmallDistribution = percent => percent < 0.5
const smallDistributionFinder = ({ percent }) =>
  checkIsSmallDistribution(percent)

function useDistributions (walletAssets) {
  const { projects } = useProjects()

  return useMemo(
    () => {
      if (projects.length === 0) return []

      const { length } = walletAssets
      const distributions = new Array(length)
      const sortedAssets = walletAssets.slice().sort(distributionSorter)
      let totalBalance = 0

      for (let i = 0; i < length; i++) {
        totalBalance += sortedAssets[i].balance
      }

      const scale = 100 / totalBalance

      for (let i = 0; i < length; i++) {
        const { slug, balance } = sortedAssets[i]
        const { name } = getProjectInfo(projects, slug) || {}
        const percent = balance * scale

        distributions[i] = {
          percent,
          name: name || capitalizeStr(slug),
          percentText: percent > 0.1 ? percent.toFixed(1) + '%' : '0.0%',
          style: {
            '--width': percent + '%',
            '--color': checkIsSmallDistribution(percent) ? '#D2D6E7' : '#37d7ba' // mystic and green
          }
        }
      }

      return distributions
    },
    [projects, walletAssets]
  )
}

const AssetsDistribution = ({ walletAssets }) => {
  const distributions = useDistributions(walletAssets)
  const biggestDistributions = useMemo(
    () =>
      distributions.slice(0, distributions.findIndex(smallDistributionFinder)),
    [distributions]
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Assets distribution</div>
      <div className={styles.historgram}>
        {biggestDistributions.map(({ name, style }) => (
          <div key={name} style={style} className={styles.slice} />
        ))}
      </div>

      <div className={styles.projects}>
        {distributions.slice(0, 6).map(({ name, percentText, style }) => (
          <div key={name} style={style} className={styles.project}>
            {name} <span className={styles.percent}>{percentText}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AssetsDistribution
