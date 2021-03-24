import cx from 'classnames'
import React, { useEffect } from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import Header from './Header'
import ChartPreview from './ChartPreview'
import { Phase } from '../phases'
import { useKeyDown } from '../hooks'
import { SvgNew } from '../../../components/Illustrations/NewCard'
import styles from './Overview.module.scss'

const SortableItem = SortableElement(
  ({
    widget,
    currentPhase,
    selectedMetrics,
    onWidgetClick,
    useWidgetMessage
  }) => (
    <ChartPreview
      key={widget.id}
      widget={widget}
      currentPhase={currentPhase}
      selectedMetrics={selectedMetrics}
      onClick={onWidgetClick}
      useWidgetMessage={useWidgetMessage}
    />
  )
)

const SortableList = SortableContainer(
  ({ widgets, onNewChartClick, ...props }) => {
    const isSelectionPhase = props.currentPhase === Phase.MAPVIEW_SELECTION

    return (
      <div className={styles.grid}>
        {widgets.map((widget, index) => (
          <SortableItem
            {...props}
            key={widget.id}
            index={index}
            disabled={isSelectionPhase}
            widget={widget}
          />
        ))}

        {isSelectionPhase && (
          <div
            className={cx(styles.item, styles.item_new, styles.idle)}
            onClick={() => onNewChartClick()}
            // NOTE: Not passing `onNewChartClick` as a reference since arguments will be mapped incorrectly [@vanguard | Aug  5, 2020]
          >
            <SvgNew className={styles.iconNew} />
            Add new chart
          </div>
        )}
      </div>
    )
  }
)

const Overview = ({ widgets, children, onClose, setWidgets, ...props }) => {
  useKeyDown(onClose, 'Escape')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = null
    }
  }, [])

  function onSortEnd ({ newIndex, oldIndex }) {
    if (newIndex === oldIndex) return

    const newWidgets = widgets.slice()
    newWidgets.splice(oldIndex, 1)
    newWidgets.splice(newIndex, 0, widgets[oldIndex])

    setWidgets(newWidgets)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.sticky}>
        <Header />
        <div className={styles.visible}>
          <SortableList
            {...props}
            widgets={widgets}
            axis='xy'
            lockToContainerEdges
            distance={20}
            onSortEnd={onSortEnd}
            helperClass={styles.dragged}
          />

          {children}
        </div>
      </div>
    </div>
  )
}

export default Overview
