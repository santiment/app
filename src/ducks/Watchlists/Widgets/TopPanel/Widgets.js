import React, { useEffect, useMemo, useCallback } from 'react'
import cx from 'classnames'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Toggle from '@santiment-network/ui/Toggle'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import styles from './Widgets.module.scss'

const Widgets = ({
  widgets: { isPriceChart, isPriceTreeMap, isVolumeTreeMap } = {},
  togglers = {},
  history,
  location
}) => {
  const { priceToggle, togglePriceTreeMap, toggleVolumeTreeMap } = togglers
  const parsedUrl = useMemo(() => queryString.parse(location.search), [
    location.search
  ])

  const getCharts = useCallback(
    () => {
      return parsedUrl && parsedUrl.charts ? JSON.parse(parsedUrl.charts) : {}
    },
    [parsedUrl]
  )

  useEffect(
    () => {
      const charts = getCharts()
      if (charts) {
        if (charts.isPriceChart) {
          priceToggle(true)
        }

        if (charts.isPriceTreeMap) {
          togglePriceTreeMap(true)
        }

        if (charts.isVolumeTreeMap) {
          toggleVolumeTreeMap(true)
        }
      }
    },
    [parsedUrl]
  )

  const urlChange = useCallback(
    data => {
      const oldCharts = getCharts()
      history.replace(
        `${window.location.pathname}?${queryString.stringify({
          ...parsedUrl,
          charts: JSON.stringify({
            ...oldCharts,
            ...data
          })
        })}`
      )
    },
    [parsedUrl]
  )

  return (
    <ContextMenu
      trigger={
        <Button
          variant='flat'
          className={cx(
            styles.triggerButton,
            (isPriceChart || isPriceTreeMap || isVolumeTreeMap) &&
              styles.triggerButton__active
          )}
          icon='view-option'
        >
          Infographics
        </Button>
      }
      passOpenStateAs='isActive'
      position='bottom'
      align='end'
    >
      <Panel variant='modal' className={styles.wrapper}>
        <ToggleWidget
          index={1}
          title='Price Treemap'
          isActive={isPriceTreeMap}
          toggle={() => {
            togglePriceTreeMap(!isPriceTreeMap)
            urlChange({ isPriceTreeMap: !isPriceTreeMap })
          }}
        />
        <ToggleWidget
          index={1}
          title='Social Volume Treemap'
          isActive={isVolumeTreeMap}
          toggle={() => {
            toggleVolumeTreeMap(!isVolumeTreeMap)
            urlChange({ isVolumeTreeMap: !isVolumeTreeMap })
          }}
        />
        <ToggleWidget
          index={0}
          title='Price Bar Chart'
          isActive={isPriceChart}
          toggle={() => {
            priceToggle(!isPriceChart)
            urlChange({ isPriceChart: !isPriceChart })
          }}
        />
      </Panel>
    </ContextMenu>
  )
}

const ToggleWidget = ({ index, isActive, toggle, title }) => {
  return (
    <div className={styles.widgetInfo} onClick={toggle}>
      {SVGs[index]}

      <div className={styles.label}>{title}</div>

      <Toggle
        isActive={isActive}
        className={cx(styles.toggle, isActive && styles.toggle__active)}
      />
    </div>
  )
}

const SVGs = [
  <svg
    width='14'
    height='14'
    viewBox='0 0 14 14'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect width='4.66667' height='14' fill='var(--jungle-green)' />
    <rect
      width='4.66662'
      height='10'
      transform='matrix(-1 0 0 1 9.33203 4)'
      fill='#E7E4FF'
    />
    <rect
      x='9.33203'
      y='8'
      width='4.66662'
      height='6'
      fill='var(--texas-rose)'
    />
  </svg>,
  <svg
    width='14'
    height='14'
    viewBox='0 0 14 14'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect width='7' height='8' fill='#DCF6EF' />
    <rect x='7' width='7' height='8' fill='#E7E4FF' />
    <rect y='8' width='14' height='6' fill='#FFE7CA' />
  </svg>
]

export default withRouter(Widgets)
