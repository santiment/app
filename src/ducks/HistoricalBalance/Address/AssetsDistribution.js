import React, { useMemo } from 'react'
import cx from 'classnames'
import { CollapsedTooltip } from './Labels'
import { capitalizeStr } from '../../../utils/utils'
import { useProjects, getProjectInfo } from '../../../stores/projects'
import styles from './AssetsDistribution.module.scss'

const NO_COLOR = '#D2D6E7'
const COLORS = [
  '#37D7BA',
  '#FF5BAA',
  '#FFCB47',
  '#D4E763',
  '#5275FF',
  '#efa7a7',
  '#8358ff',
  '#18c0e4'
]
const MAX_COLOR_PROJECTS = COLORS.length
const MAX_DESCRIBED_PROJECTS = 6

const distributionSorter = ({ balanceUsd: a }, { balanceUsd: b }) => b - a
const checkIsSmallDistribution = percent => percent < 0.5
const smallDistributionFinder = ({ percent }) =>
  checkIsSmallDistribution(percent)

export const existingAssetsFilter = ({ balanceUsd }) => balanceUsd

function useDistributions (walletAssets) {
  const { projects } = useProjects()

  return useMemo(
    () => {
      if (projects.length === 0) return []

      const filteredWalletAssets = walletAssets.filter(existingAssetsFilter)
      const { length } = filteredWalletAssets
      const distributions = new Array(length)
      const sortedAssets = filteredWalletAssets.sort(distributionSorter)
      let totalBalance = 0

      for (let i = 0; i < length; i++) {
        totalBalance += sortedAssets[i].balanceUsd
      }

      const scale = 100 / totalBalance

      for (let i = 0; i < length; i++) {
        const { slug, balanceUsd } = sortedAssets[i]
        const { ticker } = getProjectInfo(projects, slug) || {}
        const percent = balanceUsd * scale

        distributions[i] = {
          percent,
          name: ticker || capitalizeStr(slug),
          percentText: percent > 0.1 ? percent.toFixed(1) + '%' : '0.0%',
          style: {
            '--width': percent + '%',
            '--color': checkIsSmallDistribution(percent)
              ? NO_COLOR
              : COLORS[i] || NO_COLOR
          }
        }
      }

      return distributions
    },
    [projects, walletAssets]
  )
}

const Distribution = ({ name, style, percentText }) => (
  <div style={style} className={styles.project}>
    {name} <span className={styles.percent}>{percentText}</span>
  </div>
)

const Distributions = ({ distributions }) =>
  distributions.map((distribution, i) => (
    <Distribution key={i} {...distribution} />
  ))

export const CollapsedDistributions = ({
  distributions,
  Items = Distributions
}) => (
  <CollapsedTooltip
    trigger={
      <div className={styles.collapsed}>{`+${
        distributions.length
      } assets`}</div>
    }
  >
    <Items distributions={distributions} />
  </CollapsedTooltip>
)

const AssetsDistribution = ({ walletAssets, className }) => {
  const distributions = useDistributions(walletAssets)
  const biggestDistributions = useMemo(
    () => {
      const index = distributions.findIndex(smallDistributionFinder)
      return index === -1 ? distributions : distributions.slice(0, index)
    },
    [distributions]
  )

  if (distributions.length === 0) return null

  const historgramProjects = biggestDistributions.slice(0, MAX_COLOR_PROJECTS)
  const hiddenProjects = distributions.slice(MAX_DESCRIBED_PROJECTS)

  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.title}>Assets USD distribution</div>
      <div className={styles.historgram}>
        {historgramProjects.map(({ name, style }) => (
          <div key={name} style={style} className={styles.slice} />
        ))}
        {historgramProjects.length < biggestDistributions.length && (
          <div className={cx(styles.slice, styles.slice_other)} />
        )}
      </div>

      <div className={styles.projects}>
        <Distributions
          distributions={distributions.slice(0, MAX_DESCRIBED_PROJECTS)}
        />
        {hiddenProjects.length !== 0 && (
          <CollapsedDistributions distributions={hiddenProjects} />
        )}
      </div>
    </div>
  )
}

export default AssetsDistribution
