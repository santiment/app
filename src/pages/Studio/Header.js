import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { mapview } from 'studio/stores/mapview'
import { useStore } from './stores'
import { Header as StudioHeader } from '../../ducks/Studio/Header'

const Header = ({ studio, settings, widgets }) => {
  const [target, setTarget] = useState()
  const $mapview = useStore(mapview)

  useEffect(
    () => {
      if (!studio) return
      setTarget(document.querySelector('.header'))
    },
    [studio]
  )

  return target
    ? ReactDOM.createPortal(
      <StudioHeader
        settings={settings}
        widgets={widgets}
        metrics={[]}
        headerRef={{ current: target }}
        isOverviewOpened={$mapview > 0}
        changeTimePeriod={mapview.setPeriod}
        toggleOverview={mapview.toggle}
      />,
      target
    )
    : null
}

export default Header
