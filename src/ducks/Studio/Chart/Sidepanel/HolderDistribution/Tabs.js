import React from 'react'
import UITabs from '@santiment-network/ui/Tabs'
import {
  HOLDER_DISTRIBUTION_ABSOLUTE_METRICS,
  HOLDER_DISTRIBUTION_PERCENT_METRICS,
  HOLDER_DISTRIBUTION_COMBINED_BALANCE_ABSOLUTE_METRICS
} from './metrics'
import styles from './Tabs.module.scss'

export const Tab = {
  PERCENTS: 'Percents',
  ABSOLUTE: 'Absolute'
}
export const TABS = [Tab.PERCENTS, Tab.ABSOLUTE]
export const TabMetrics = {
  // TODO: Change to the PERCENTS metrics when the API will be available [@vanguard | Sep  2, 2020]
  /* [Tab.PERCENTS]: HOLDER_DISTRIBUTION_PERCENT_METRICS, */
  [Tab.PERCENTS]: HOLDER_DISTRIBUTION_ABSOLUTE_METRICS,
  [Tab.ABSOLUTE]: HOLDER_DISTRIBUTION_ABSOLUTE_METRICS
}
export const TabCombinedBalanceMetrics = {
  [Tab.PERCENTS]: HOLDER_DISTRIBUTION_PERCENT_METRICS,
  [Tab.ABSOLUTE]: HOLDER_DISTRIBUTION_COMBINED_BALANCE_ABSOLUTE_METRICS
}

const Tabs = ({ activeTab, isIdlePhase, setActiveTab }) => (
  <UITabs
    options={TABS}
    className={styles.tabs}
    classes={styles}
    defaultSelectedIndex={activeTab}
    disabledIndexes={isIdlePhase ? undefined : TABS}
    onSelect={tab => setActiveTab(tab)}
  />
)

export default Tabs
