import React from 'react'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import Chart from '../../SANCharts/Chart'
import FullscreenDialogBtn from '../../../components/FullscreenDialogBtn'
import styles from './ChartFullscreenBtn.module.scss'

export default ({ settings, options, metrics, ...props }) => (
  <FullscreenDialogBtn
    title={settings.title}
    className={styles.btn}
    iconClassName={styles.icon}
    dialogClasses={styles}
  >
    <div className={styles.content}>
      <Chart
        {...options}
        {...settings}
        {...props}
        onPointHover={undefined}
        syncTooltips={undefined}
        isMultiChartsActive={false}
        metrics={metrics}
        scale={options.isLogScale ? logScale : linearScale}
      />
    </div>
  </FullscreenDialogBtn>
)
