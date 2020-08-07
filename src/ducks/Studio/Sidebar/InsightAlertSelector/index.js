import React, { useState, useMemo, useEffect } from 'react'
import { NO_GROUP } from '../utils'
import Category from '../Category'
import {
  useToggleInsight,
  useActiveToggleInsight,
  useInsightsErrorMsg
} from '../../insights/context'
import { getFollowingsCount, getMyInsights } from '../../insights/queries'

const OPENED_GROUP = {
  Tags: true
}

const ALL_INSIGHTS_TOGGLE = {
  key: 'all',
  label: 'Recent 100 Insights'
}

const NO_GROUP_ITEMS = [
  {
    item: ALL_INSIGHTS_TOGGLE
  },
  {
    item: {
      key: 'pro',
      label: 'PRO Insights',
      isPro: true
    }
  },
  {
    item: {
      key: 'pulse',
      label: 'Pulse Insights'
    }
  },
  {
    item: {
      key: 'sanfam',
      label: 'Sanfam Insights'
    }
  },
  {
    item: {
      key: 'my',
      label: 'My Insights',
      checkIsVisible: ({ hasMyInsights }) => hasMyInsights
    }
  },
  {
    item: {
      key: 'followings',
      label: 'My Followings',
      checkIsVisible: ({ hasFollowings }) => hasFollowings
    }
  }
]

const TAG_GROUP_ITEMS = [
  {
    item: {
      key: 'eth',
      label: 'ETH Insights',
      checkIsVisible: ({ slug }) => slug !== 'ethereum'
    }
  },
  {
    item: {
      key: 'btc',
      label: 'BTC Insights',
      checkIsVisible: ({ slug }) => slug !== 'bitcoin'
    }
  },
  {
    item: {
      key: 'defi',
      label: 'DEFI Insights'
    }
  }
]

function buildGroups (ticker) {
  const item = {
    key: ticker,
    label: ticker.toUpperCase() + ' Insights',
    type: 'project'
  }
  const groups = {
    [NO_GROUP]: NO_GROUP_ITEMS,
    Tags: [
      {
        item
      },
      ...TAG_GROUP_ITEMS
    ]
  }

  return { groups, toggle: item }
}

const InsightAlertSelector = ({ widgets, categories = {}, slug, project }) => {
  const { ticker } = project
  const toggleInsight = useToggleInsight()
  const activeToggle = useActiveToggleInsight()
  const ErrorMsg = useInsightsErrorMsg()
  const [hasMyInsights, setHasMyInsights] = useState(false)
  const [hasFollowings, setHasFollowings] = useState(false)
  const { toggle, groups } = useMemo(() => buildGroups(ticker), [ticker])

  useEffect(
    () => {
      if (activeToggle && activeToggle.type === 'project') {
        toggleInsight(toggle)
      }
    },
    [ticker]
  )

  useEffect(() => {
    const widget = widgets[0]
    toggleInsight(ALL_INSIGHTS_TOGGLE)
    if (widget) {
      widget.chartRef.current.canvas.scrollIntoView({ block: 'center' })
    }

    getMyInsights().then(insights => setHasMyInsights(!!insights.length))
    getFollowingsCount().then(count => setHasFollowings(!!count))

    return toggleInsight
  }, [])

  return (
    <Category
      title='Santiment Insights'
      slug={slug}
      groups={groups}
      project={project}
      toggleMetric={toggleInsight}
      activeMetrics={[activeToggle]}
      ErrorMsg={ErrorMsg}
      OpenedGroup={OPENED_GROUP}
      hasMyInsights={hasMyInsights}
      hasFollowings={hasFollowings}
    />
  )
}

export default InsightAlertSelector
