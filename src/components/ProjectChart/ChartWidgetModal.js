import React from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import Button from '@santiment-network/ui/Button'
import ChartWidget from '../../ducks/SANCharts/ChartPage'
import styles from './ChartWidgetModal.module.scss'

const ChartWidgetModal = ({ from, to, slug, timeRange, title }) => {
  return (
    <Dialog
      title='Smart Chart'
      classes={styles}
      trigger={
        <Button border className={styles.btn} isLoading={!slug}>
          <span className={styles.icon} role='img' aria-label='cool'>
            😻
          </span>{' '}
          Smart chart
        </Button>
      }
    >
      <Dialog.ScrollContent>
        <ChartWidget
          from={from}
          to={to}
          slug={slug}
          timeRange={timeRange}
          title={title}
        />
      </Dialog.ScrollContent>
    </Dialog>
  )
}

export default ChartWidgetModal
