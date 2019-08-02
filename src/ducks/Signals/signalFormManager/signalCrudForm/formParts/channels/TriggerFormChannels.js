import React from 'react'
import cx from 'classnames'
import Message from '@santiment-network/ui/Message'
import SidecarExplanationTooltip from '../../../../../SANCharts/SidecarExplanationTooltip'
import FormikLabel from '../../../../../../components/formik-santiment-ui/FormikLabel'
import FormikCheckboxes from '../../../../../../components/formik-santiment-ui/FormikCheckboxes'
import TriggerChannelSettings from './TriggerChannelSettings'
import styles from '../../signal/TriggerForm.module.scss'

const TriggerFormChannels = ({
  channels,
  errors,
  isTelegramConnected,
  isEmailConnected
}) => {
  return (
    <SidecarExplanationTooltip
      closeTimeout={500}
      localStorageSuffix='_TRIGGER_FORM_EXPLANATION'
      position='top'
      title='Connect channels'
      description='Get fast notifications through Email or Telegram'
      className={styles.explanation}
    >
      <div className={cx(styles.row, styles.rowTop)}>
        <div className={cx(styles.Field, styles.fieldFilled)}>
          <FormikLabel text='Notify me via' />
          <div className={styles.notifyBlock}>
            <FormikCheckboxes
              name='channels'
              labelOnRight
              options={['Email', 'Telegram']}
            />
            <TriggerChannelSettings
              channels={channels}
              isTelegramConnected={isTelegramConnected}
              isEmailConnected={isEmailConnected}
            />
          </div>
          {errors.channels && (
            <div className={cx(styles.row, styles.messages)}>
              <Message variant='warn'>{errors.channels}</Message>
            </div>
          )}
        </div>
      </div>
    </SidecarExplanationTooltip>
  )
}

export default TriggerFormChannels
