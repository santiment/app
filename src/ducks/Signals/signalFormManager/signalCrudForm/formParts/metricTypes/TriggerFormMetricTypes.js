import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Dialog from '@santiment-network/ui/Dialog'
import {
  getNearestTypeByMetric,
  getSlugFromSignalTarget
} from '../../../../utils/utils'
import {
  METRICS_OPTIONS,
  PRICE_METRIC,
  TRENDING_WORDS
} from '../../../../utils/constants'
import MetricTypeRenderer from '../metricTypeRenderer/MetricTypeRenderer'
import SupportedMetricsList, {
  useAvailableMetrics
} from './SupportedMetricsList'
import { showNotification } from '../../../../../../actions/rootActions'
import { capitalizeStr } from '../../../../../../utils/utils'
import { useDialogState } from '../../../../../../hooks/dialog'
import styles from '../../signal/TriggerForm.module.scss'
import metricStyles from './TriggerFormMetricTypes.module.scss'

const checkPossibleTarget = ({ metaFormSettings, setFieldValue, target }) => {
  if (!target || (Array.isArray(target) && target.length === 0)) {
    setFieldValue('target', metaFormSettings.target.value)
  }
}

const TriggerFormMetricTypes = ({
  metric,
  target,
  setFieldValue,
  metaFormSettings,
  trigger,
  showErrorAlert
}) => {
  const defaultMetric = metaFormSettings.metric

  const { isOpened, openDialog, closeDialog } = useDialogState(false)

  const onSelectMetric = newMetric => {
    metric &&
      newMetric &&
      newMetric.value !== metric.value &&
      setFieldValue('type', getNearestTypeByMetric(newMetric))

    if (newMetric) {
      if (newMetric.value !== TRENDING_WORDS) {
        checkPossibleTarget({
          metaFormSettings,
          setFieldValue,
          target
        })
      }
    } else {
      if (target) {
        setFieldValue('target', '')
      }
    }

    setFieldValue('metric', newMetric)

    closeDialog()
  }

  const slug = getSlugFromSignalTarget(trigger)

  const [{ availableMetrics }, loading] = useAvailableMetrics(slug)

  useEffect(
    () => {
      if (slug && !loading) {
        const checking = trigger.settings.metric

        const notAvailable = availableMetrics.indexOf(checking) === -1
        const notDefined = !METRICS_OPTIONS.some(
          ({ metric }) => metric === checking
        )

        if (notAvailable && notDefined) {
          onSelectMetric(PRICE_METRIC)
          showErrorAlert(
            `${capitalizeStr(
              slug
            )} does't support alerts with metric '${checking}'`,
            `Selected default metric ${PRICE_METRIC.metric}`
          )
        }
      }
    },
    [slug, availableMetrics]
  )

  return (
    <div className={styles.row}>
      <Dialog
        open={isOpened}
        onOpen={openDialog}
        onClose={closeDialog}
        classes={metricStyles}
        trigger={<MetricTypeRenderer metric={metric || defaultMetric.value} />}
      >
        <Dialog.ScrollContent>
          <div className={metricStyles.content}>
            <div className={metricStyles.metricsHeader}>
              <div className={metricStyles.metricsTitle}>Choose alert type</div>
              <div className={metricStyles.metricsExplanation}>
                Pick one of the most popular metrics
              </div>
            </div>

            <div className={metricStyles.baseTypes}>
              {METRICS_OPTIONS.map(item => (
                <div className={metricStyles.listItem} key={item.value}>
                  <MetricTypeRenderer
                    metric={item}
                    onClick={onSelectMetric}
                    showLabel={false}
                  />
                </div>
              ))}
            </div>

            <SupportedMetricsList
              slug={slug}
              onSelectMetric={onSelectMetric}
              availableMetrics={availableMetrics}
            />
          </div>
        </Dialog.ScrollContent>
      </Dialog>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    showErrorAlert: (title, description) => {
      dispatch(
        showNotification({
          variant: 'error',
          title,
          description
        })
      )
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(TriggerFormMetricTypes)
