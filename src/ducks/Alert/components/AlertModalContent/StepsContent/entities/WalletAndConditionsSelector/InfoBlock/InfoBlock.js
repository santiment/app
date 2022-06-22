import React from 'react'
import cx from 'classnames'
import { useFormikContext } from 'formik'
import Icon from '@santiment-network/ui/Icon'
import { formatNumber } from '../../../../../../../../utils/formatting'
import { useLastPrice } from '../../../../../../hooks/useLastPrice'
import { useProject } from '../../../../../../../../hooks/project'
import { useCurrentBalance } from '../../../../../../../HistoricalBalance/Address/CurrentBalance'
import { getConditionsStr, parseOperation } from '../../../../../../utils'
import { PERCENT_METRICS, USD_METRICS } from '../../../MetricAndConditions/constants'
import styles from './InfoBlock.module.scss'

const InfoBlock = ({ metric, assets = [] }) => {
  const {
    values: {
      settings: { time_window, operation, selector },
    },
  } = useFormikContext()
  const currentSlug = selector.slug || ''
  const { data, loading } = useLastPrice(currentSlug)
  const [project] = useProject(currentSlug)
  const { usd } = useCurrentBalance(assets)

  const { selectedCount, selectedOperation } = parseOperation(operation)
  const hasPriceIcon = USD_METRICS.has(metric)
  const isPercentIcon = PERCENT_METRICS.has(metric)
  const conditionsStr = getConditionsStr({
    operation: selectedOperation,
    count: selectedCount,
    timeWindow: time_window,
    hasPriceIcon,
    isPercentIcon,
  })

  if ((currentSlug && !data) || (operation && Object.keys(operation).length === 0)) {
    return null
  }

  return (
    <div className={cx(styles.wrapper, 'column')}>
      <div className='row v-center mrg--b mrg-xs'>
        <Icon type='info-round-small' className={cx(styles.icon, 'mrg--r mrg-m')} />
        <span className='txt-m c-black'>
          {currentSlug ? project && project.name : 'Balance'} {conditionsStr}
        </span>
      </div>
      {currentSlug ? (
        <div className='txt-m c-waterloo mrg--l mrg-xl'>
          {!loading &&
            `1 ${project && project.ticker} = ${formatNumber(data, {
              currency: 'USD',
            })}`}
        </div>
      ) : (
        <div className='txt-m c-waterloo mrg--l mrg-xl'>Current balance = {usd}</div>
      )}
    </div>
  )
}

export default InfoBlock
