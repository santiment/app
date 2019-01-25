import React from 'react'
import { Button } from '@santiment-network/ui'
import SmoothDropdown from '../../SmoothDropdown/SmoothDropdown'
import SmoothDropdownItem from '../../SmoothDropdown/SmoothDropdownItem'
import ShareOptions from '../../ShareOptions/ShareOptions'

const TrendsExploreShare = ({ topic }) => {
  const title = `Crypto Social Trends for "${topic}"`

  return (
    <SmoothDropdown>
      <SmoothDropdownItem trigger={<Button variant='ghost'>Share</Button>}>
        <ShareOptions title={title} url={window.location.href} />
      </SmoothDropdownItem>
    </SmoothDropdown>
  )
}

export default TrendsExploreShare
