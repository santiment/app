import React, { useCallback, useState, useMemo } from 'react'
import { useProject } from '../../../hooks/project'
import { QueuedDashboardMetricChart as DashboardMetricChart } from '../DashboardMetricChart'
import { ERC20Selector } from '../../../ducks/Stablecoins/StablecoinSelector/ProjectsSelectors'
import styles from './Erc20DashChart.module.scss'

const DEFAULT_PROJECT = {
  slug: 'maker',
  ticker: 'Maker'
}

const Erc20DashChart = ({ metricsBuilder, ...rest }) => {
  const [targetProject, setProject] = useState(DEFAULT_PROJECT)

  const onChange = useCallback(
    project => {
      setProject(project)
    },
    [setProject]
  )

  const [project = {}] = useProject(targetProject.slug)

  const metrics = useMemo(
    () => {
      return metricsBuilder(targetProject)
    },
    [metricsBuilder, targetProject]
  )

  console.log(metrics)

  return (
    <DashboardMetricChart
      {...rest}
      metrics={metrics}
      projectSelector={
        <div className={styles.project}>
          <ERC20Selector
            setAsset={onChange}
            asset={project}
            triggerProps={{ size: 20 }}
            classes={styles}
          />
        </div>
      }
    />
  )
}

export default Erc20DashChart
