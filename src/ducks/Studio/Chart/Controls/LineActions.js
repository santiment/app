import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from './Button'
import styles from './index.module.scss'

const LineActions = ({ chartRef, selectedLineState }) => {
  const [selectedLine, setSelectedLine] = selectedLineState

  function onDelete () {
    const { drawer } = chartRef.current
    drawer.selected = null
    drawer.drawings = drawer.drawings.filter(
      drawing => drawing !== selectedLine
    )
    setSelectedLine()
    drawer.redraw()
  }

  return (
    <>
      <div className={styles.divider} />

      <Button onClick={onDelete}>
        <Icon type='remove-small' className={styles.icon} />
      </Button>
    </>
  )
}

export default LineActions
