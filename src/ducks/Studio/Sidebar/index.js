import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { CSSTransition } from 'react-transition-group'
import Tabs from '@santiment-network/ui/Tabs'
import Icon from '@santiment-network/ui/Icon'
import { saveIsSidebarLocked } from './utils'
import ProjectSelector from './ProjectSelector'
import MetricSelector from './MetricSelector'
import InsightAlertSelector from './InsightAlertSelector'
import Search from './Search'
import {
  HOLDER_DISTRIBUTION_NODE,
  HOLDER_DISTRIBUTION_COMBINED_BALANCE_NODE,
  HOLDER_LABELED_DISTRIBUTION_NODE
} from './nodes'
import { useProjectMetrics } from '../withMetrics'
import styles from './index.module.scss'

const TRANSITION_CLASSES = {
  enter: cx(styles.wrapper_opened, styles.wrapper_transition),
  enterDone: styles.wrapper_opened,
  exit: styles.wrapper_transition
}

const ON_CHAIN_DEFAULT = [
  HOLDER_DISTRIBUTION_NODE,
  HOLDER_DISTRIBUTION_COMBINED_BALANCE_NODE,
  HOLDER_LABELED_DISTRIBUTION_NODE
]

const TABS = ['Metrics', 'Insights']
const DEFAULT_TAB = TABS[0]

const TabToComponent = {
  [TABS[0]]: MetricSelector,
  [TABS[1]]: InsightAlertSelector
}

const Header = ({
  activeTab,
  project,
  ProjectMetrics,
  setActiveTab,
  onProjectSelect,
  ...props
}) => (
  <div className={styles.header}>
    <Tabs
      options={TABS}
      className={styles.tabs}
      classes={styles}
      defaultSelectedIndex={activeTab}
      // NOTE: Not passed as a reference, since more than 1 argument is passed to a callback [@vanguard | Aug  4, 2020]
      onSelect={tab => setActiveTab(tab)}
    />
    <ProjectSelector project={project} onProjectSelect={onProjectSelect} />
    <Search
      onChainDefault={ON_CHAIN_DEFAULT}
      {...props}
      {...ProjectMetrics}
      project={project}
    />
  </div>
)

const CloseButton = ({ isLocked, onClick, className }) => (
  <div className={cx(styles.toggle, className)} onClick={onClick}>
    <div className={styles.close}>
      <Icon type='sidebar' className={styles.icon} />
    </div>
  </div>
)

const Sidebar = ({
  children,
  hiddenMetrics,
  noMarketSegments,
  isPeeked,
  isLocked,
  isOverviewOpened,
  setIsPeeked,
  setIsLocked,
  ...props
}) => {
  const { settings } = props
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB)
  const [metricProject, setMetricProject] = useState(settings)
  const [isDraggingMetric, setIsDraggingMetric] = useState(false)
  const ProjectMetrics = useProjectMetrics(
    metricProject.slug,
    hiddenMetrics,
    noMarketSegments
  )

  const isOpened = isPeeked || isDraggingMetric
  const TabComponent = TabToComponent[activeTab]

  useEffect(() => setMetricProject(settings), [settings.slug, settings.name])
  useEffect(() => saveIsSidebarLocked(isLocked), [isLocked])

  return (
    <CSSTransition in={isOpened} timeout={200} classNames={TRANSITION_CLASSES}>
      <aside
        className={cx(
          styles.wrapper,
          isOpened && styles.wrapper_opened,
          (isLocked || isOverviewOpened) && styles.wrapper_locked
        )}
        onMouseEnter={() => setIsPeeked(true)}
        onMouseLeave={() => setIsPeeked(false)}
      >
        <div className={styles.content}>
          <Header
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            {...props}
            project={metricProject}
            ProjectMetrics={ProjectMetrics}
            onProjectSelect={setMetricProject}
          />
          <div className={styles.selector}>
            <TabComponent
              {...props}
              {...ProjectMetrics}
              project={metricProject}
              setIsDraggingMetric={setIsDraggingMetric}
            />
          </div>
          <CloseButton
            isLocked={isLocked}
            onClick={() => setIsLocked(!isLocked)}
          />
        </div>
      </aside>
    </CSSTransition>
  )
}

export default Sidebar
