import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import ProjectSelector from '../../ducks/Studio/Sidebar/ProjectSelector'

const Sidebar = ({ studio, settings, onProjectSelect }) => {
  const [target, setTarget] = useState()

  useEffect(
    () => {
      if (!studio) return
      setTarget(document.querySelector('.sidebar-project'))
    },
    [studio]
  )

  return target
    ? ReactDOM.createPortal(
      <ProjectSelector
        project={settings}
        onProjectSelect={onProjectSelect}
      />,
      target
    )
    : null
}

export default Sidebar
