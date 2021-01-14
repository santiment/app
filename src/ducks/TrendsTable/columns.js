import React from 'react'
import { useTrendSocialVolumeChange } from './hooks'
import { prepareColumns } from '../_Table'
import { INDEX_COLUMN } from '../_Table/columns'
import PercentChanges from '../../components/PercentChanges'

const SocialVolumeChange = ({ trend }) => {
  const { value, change } = useTrendSocialVolumeChange(trend)

  return (
    <>
      {value}
      <PercentChanges changes={change} />
    </>
  )
}

export const COLUMNS = [INDEX_COLUMN].concat(
  prepareColumns([
    {
      title: 'Trending word',
      render: ({ word }) => word
    },
    {
      title: 'Soc. vol., 24h',
      render: trend => <SocialVolumeChange trend={trend} />
    },
    {
      title: 'Trending chart, 7d',
      render: () => 123
    },
    {
      title: 'Connected words',
      render: () => 123
    }
  ])
)
