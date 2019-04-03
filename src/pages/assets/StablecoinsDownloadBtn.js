import React from 'react'
import { Button } from '@santiment-network/ui'
import GoogleAnalytics from 'react-ga'

const StablecoinsDownloadBtn = () => (
  <a
    style={{ leftMargin: '1em' }}
    href='https://docs.google.com/spreadsheets/u/1/d/1OwF5xKsPRxFsy3WvSest-gn8lFbm7cTQLhW3ylZE_2M'
    target='_blank'
    rel='noopener noreferrer'
  >
    <Button
      variant='flat'
      isActive
      onClick={() => {
        GoogleAnalytics.event({
          category: 'Stablecoins Data',
          action: 'Download'
        })
      }}
    >
      Open data as spreadsheets
    </Button>
  </a>
)

export default StablecoinsDownloadBtn
