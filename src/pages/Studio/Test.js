import React, { useState, useRef, useEffect } from 'react'
import Studio from 'studio'
import { Metric } from 'studio/metrics'
import { newWidget } from 'studio/stores/widgets'
import { globals } from 'studio/stores/globals'
import { studio as settingsStore } from 'studio/stores/studio'
import ChartWidget from 'studio/ChartWidget'
import HolderDistributionWidget from 'studio/HolderDistributionWidget'
import 'webkit/styles/color.css'
import 'webkit/styles/text.css'
import 'webkit/styles/layout.css'
import 'webkit/styles/elements.css'

import { useStore, getSvelteContext } from './stores'
import { useTheme } from '../../stores/ui/theme'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import styles from './index.module.scss'
import Widget, { useWidgets } from './ChartWidget'
import Sidewidget from './Sidewidget'
import ProjectInfo from './ProjectInfo'
import Header from './Header'
import Sidebar from './Sidebar'
import Subwidgets, { useSubwidgetsController } from './Subwidgets'

const settingsImmute = store => Object.assign({}, store)
const Test = ({ ...props }) => {
  const ref = useRef()
  const [studio, setStudio] = useState()
  const theme = useTheme()
  const userInfo = useUserSubscriptionStatus()
  const settings = useStore(settingsStore, settingsImmute)
  const widgets = useStore(getSvelteContext(studio, 'widgets')) || []
  const widgetsController = useWidgets()
  const subwidgetsController = useSubwidgetsController()

  useEffect(() => {
    const page = ref.current
    const studio = new Studio({
      target: page,
      props: {
        onSubwidget: subwidgetsController.onSubwidget,
        onWidget: widgetsController.onWidget,
        widgets: [
          newWidget(ChartWidget, {
            metrics: [Metric.price_usd]
          }),
          newWidget(HolderDistributionWidget, {})
        ]
      }
    })

    setStudio(studio)

    return () => studio.$destroy()
  }, [])

  useEffect(
    () => {
      globals.toggle('isNightMode', theme.isNightMode)
      globals.toggle('isLoggedIn', userInfo.isLoggedIn)
      globals.toggle('isPro', userInfo.isPro)
      globals.toggle('isProPlus', userInfo.isProPlus)
    },
    [userInfo, theme]
  )

  function onProjectSelect (project) {
    if (project) {
      const { slug, ticker, name } = project
      settingsStore.setProject({ slug, ticker, name })
    }
  }

  return (
    <div ref={ref} className={styles.wrapper}>
      <ProjectInfo
        studio={studio}
        settings={settings}
        onProjectSelect={onProjectSelect}
      />

      <Header studio={studio} settings={settings} widgets={widgets} />

      <Sidebar
        studio={studio}
        settings={settings}
        onProjectSelect={onProjectSelect}
      />

      {widgetsController.widgets.map(item => (
        <Widget key={item.widget.id} {...item} />
      ))}

      <Sidewidget studio={studio} project={settings} />

      <Subwidgets
        subwidgets={subwidgetsController.subwidgets}
        settings={settings}
      />
    </div>
  )
}

export default Test
