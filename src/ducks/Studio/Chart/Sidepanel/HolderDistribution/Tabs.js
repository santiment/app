import React from 'react'
import UITabs from '@santiment-network/ui/Tabs'
import {
  HOLDER_DISTRIBUTION_ABSOLUTE_METRICS,
  HOLDER_DISTRIBUTION_PERCENT_METRICS
} from './metrics'
import styles from './Tabs.module.scss'

export const Tab = {
  PERCENTS: 'Percents',
  ABSOLUTE: 'Absolute'
}
const TABS = [Tab.PERCENTS, Tab.ABSOLUTE]
export const TabMetrics = {
  [Tab.PERCENTS]: HOLDER_DISTRIBUTION_PERCENT_METRICS,
  [Tab.ABSOLUTE]: HOLDER_DISTRIBUTION_ABSOLUTE_METRICS
}

const Tabs = ({ activeTab, setActiveTab, ...props }) => (
  <UITabs
    {...props}
    options={TABS}
    className={styles.tabs}
    classes={styles}
    defaultSelectedIndex={activeTab}
    onSelect={tab => setActiveTab(tab)}
  />
)

export default Tabs
