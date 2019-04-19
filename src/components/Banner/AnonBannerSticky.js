import React from 'react'
import { DesktopOnly } from './../Responsive'
import BannerDesktop from './BannerDesktop'

const AnonBannerSticky = props => {
  return (
    <DesktopOnly>
      <BannerDesktop {...props} />
    </DesktopOnly>
  )
}

export default React.memo(AnonBannerSticky)
