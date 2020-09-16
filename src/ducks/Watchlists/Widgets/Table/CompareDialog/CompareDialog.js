import React, { useCallback, useState } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import { useDialogState } from '../../../../../hooks/dialog'
import CompareContent from './CompareContent'
import styles from './CompareDialog.module.scss'

const FIND_PREDICATE = target => item => item === target

export const addOrRemove = (source, target, predicate) => {
  const index = source.findIndex(predicate || FIND_PREDICATE(target))

  let newList = [...source]

  if (index >= 0) {
    newList.splice(index, 1)
  } else {
    newList.push(target)
  }

  return newList
}

const CompareDialog = ({ trigger, assets }) => {
  const { closeDialog, isOpened, openDialog } = useDialogState()

  const [metrics, setMetrics] = useState([])

  const onSelectMetric = useCallback(
    metric => {
      setMetrics(addOrRemove(metrics, metric))
    },
    [metrics, setMetrics]
  )

  const onClear = useCallback(
    () => {
      setMetrics([])
    },
    [metrics, setMetrics]
  )

  const removeMetric = useCallback(
    metric => {
      setMetrics(metrics.filter(m => m !== metric))
    },
    [metrics, setMetrics]
  )

  return (
    <Dialog
      open={isOpened}
      onClose={closeDialog}
      onOpen={openDialog}
      title='Choose metric to compare'
      trigger={trigger}
      classes={styles}
    >
      <CompareContent
        closeDialog={closeDialog}
        onSelectMetric={onSelectMetric}
        onClear={onClear}
        removeMetric={removeMetric}
        assets={assets}
        metrics={metrics}
      />
    </Dialog>
  )
}

export default CompareDialog
