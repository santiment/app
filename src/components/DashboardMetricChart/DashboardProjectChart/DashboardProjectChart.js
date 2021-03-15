import React, { useCallback, useState, useMemo } from 'react'
import { useProject } from '../../../hooks/project'
import { QueuedDashboardMetricChart as DashboardMetricChart } from '../DashboardMetricChart'
import { DashboardProjectSelector } from '../../../ducks/Stablecoins/StablecoinSelector/ProjectsSelectors'
import styles from './DashboardProjectChart.module.scss'

const DEFAULT_PROJECT = {
  slug: 'maker',
  ticker: 'Maker'
}

const DashboardProjectChart = ({
  metricsBuilder,
  type,
  project: defaultProject = DEFAULT_PROJECT,
  ...rest
}) => {
  const [targetProject, setProject] = useState(defaultProject)

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

  return (
    <DashboardMetricChart
      {...rest}
      metrics={metrics}
      projectSelector={
        <div className={styles.project}>
          <DashboardProjectSelector
            type={type}
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

export default DashboardProjectChart
