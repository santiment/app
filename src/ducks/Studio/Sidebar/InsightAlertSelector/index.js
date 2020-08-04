import React, { useEffect } from 'react'
import Category from '../Category'
import { INSIGHT } from '../Button/types'
import { useToggleInsight } from '../../insights/context'

const GROUPS = {
  _: [
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
  ],
  Projects: [
    {
      item: {
        type: INSIGHT,
        key: 'eth',
        label: 'ETH Insights'
      }
    },
    {
      item: {
        type: INSIGHT,
        key: 'btc',
        label: 'BTC Insights'
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
}

const InsightAlertSelector = ({ categories = {}, ...rest }) => {
  const toggleInsight = useToggleInsight()
  useEffect(() => toggleInsight, [])

  return <Category title='Santiment Insights' groups={GROUPS} {...rest} />
}

export default InsightAlertSelector
