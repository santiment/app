import React, { useMemo, useEffect } from 'react'
import { NO_GROUP } from '../utils'
import Category from '../Category'
import { INSIGHT } from '../Button/types'
import {
  useToggleInsight,
  useActiveToggleInsight,
  useInsightsErrorMsg
} from '../../insights/context'

const NO_GROUP_ITEMS = [
  {
    item: {
      type: INSIGHT,
      key: 'sanfam',
      label: 'SANFAM Insights'
    }
  },
  {
    item: {
      type: INSIGHT,
      key: 'my',
      label: 'My Insights'
    }
  },
  {
    item: {
      type: INSIGHT,
      key: 'followings',
      label: 'My Followings'
    }
  }
]

const PROJECT_GROUP_ITEMS = [
  {
    item: {
      type: INSIGHT,
      key: 'eth',
      label: 'ETH Insights',
      checkIsVisible: ({ slug }) => slug !== 'ethereum'
    }
  },
  {
    item: {
      type: INSIGHT,
      key: 'btc',
      label: 'BTC Insights',
      checkIsVisible: ({ slug }) => slug !== 'bitcoin'
    }
  },
  {
    item: {
      type: INSIGHT,
      key: 'defi',
      label: 'DEFI Insights'
    }
  }
]

function buildGroups (ticker) {
  const item = {
    type: INSIGHT,
    key: ticker,
    label: ticker.toUpperCase() + ' Insights'
  }
  const groups = {
    [NO_GROUP]: NO_GROUP_ITEMS,
    Projects: [
      {
        item
      },
      ...PROJECT_GROUP_ITEMS
    ]
  }

  return { groups, toggle: item }
}

const InsightAlertSelector = ({ categories = {}, slug, project }) => {
  const { ticker } = project
  const toggleInsight = useToggleInsight()
  const activeMetrics = [useActiveToggleInsight()]
  const ErrorMsg = useInsightsErrorMsg()
  const { toggle, groups } = useMemo(() => buildGroups(ticker), [ticker])

  useEffect(() => toggleInsight(toggle), [ticker])
  useEffect(() => toggleInsight, [])

  return (
    <Category
      title='Santiment Insights'
      slug={slug}
      groups={groups}
      project={project}
      toggleMetric={toggleInsight}
      activeMetrics={activeMetrics}
      ErrorMsg={ErrorMsg}
    />
  )
}

export default InsightAlertSelector
