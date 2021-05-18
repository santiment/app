import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { mapview } from 'studio/stores/mapview'
import { useStore } from './stores'
import { useSidewidgetStore } from './Sidewidget'
import { Header as StudioHeader } from '../../ducks/Studio/Header'

const Header = ({ studio, settings, widgets, metrics }) => {
  const [target, setTarget] = useState()
  const $mapview = useStore(mapview)
  const sidewidget = useSidewidgetStore(studio)

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
        metrics={metrics}
        headerRef={{ current: target }}
        isOverviewOpened={$mapview > 0}
        changeTimePeriod={mapview.setPeriod}
        toggleOverview={mapview.toggle}
        toggleSidepanel={sidewidget.set}
      />,
      target
    )
    : null
}

export default Header
