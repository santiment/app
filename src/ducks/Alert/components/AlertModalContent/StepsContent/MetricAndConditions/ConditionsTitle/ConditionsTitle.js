import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Steps from '../../../../../../../components/Steps/Steps'
import { getSelectedAssetMetricCardDescription } from '../../../../../utils'
import styles from './ConditionsTitle.module.scss'

const ConditionsTitle = ({ metric, onClick }) => (
  <Steps
    initial={0}
    current={1}
    icons={{
      process: <Icon type='customize' className={styles.conditionsIcon} />
    }}
  >
    <Steps.Step
      key={0}
      title='Choose Metric'
      description={
        <div className={styles.wrapper}>
          <div className={styles.title}>
            {metric.label}
            <Icon
              fill='var(--jungle-green)'
              type='edit'
              className={styles.editIcon}
              onClick={onClick}
            />
          </div>
          <div className={styles.description}>
            {getSelectedAssetMetricCardDescription(metric)}
          </div>
        </div>
      }
    />
    <Steps.Step key={1} title='Conditions' description='' />
  </Steps>
)

export default ConditionsTitle
