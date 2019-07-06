import React from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import Button from '@santiment-network/ui/Button'
import ChartWidget from '../../ducks/SANCharts/ChartPage'
import styles from './ChartWidgetModal.module.scss'

const ChartWidgetModal = ({ from, to, slug, timeRange }) => {
  return (
    <Dialog
      title='Smart Chart'
      classes={styles}
      trigger={<Button border>Smart chart</Button>}
    >
      <Dialog.ScrollContent>
        <ChartWidget from={from} to={to} slug={slug} timeRange={timeRange} />
      </Dialog.ScrollContent>
    </Dialog>
  )
}

export default ChartWidgetModal
