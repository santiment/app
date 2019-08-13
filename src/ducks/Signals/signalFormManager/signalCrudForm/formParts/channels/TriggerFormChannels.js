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
  const settingsForTelegramEnabled =
    !isTelegramConnected && channels.some(type => type === 'Telegram')
  const settingsForEmailEnabled =
    !isEmailConnected && channels.some(type => type === 'Email')

  return (
    <div className={cx(styles.row, styles.rowSingle)}>
      <div className={cx(styles.Field, styles.fieldFilled)}>
        <FormikLabel text='Notify me via' />
        <div className={styles.notifyBlock}>
          <FormikCheckboxes
            name='channels'
            labelOnRight
            options={['Email', 'Telegram']}
            disabledIndexes={['Email']}
            classes={styles}
          />
          <TriggerChannelSettings
            isTelegramSettings={settingsForTelegramEnabled}
            isEmailSettings={settingsForEmailEnabled}
          />
        </div>
        {errors.channels && (
          <SidecarExplanationTooltip
            closeTimeout={500}
            localStorageSuffix='_TRIGGER_FORM_EXPLANATION'
            position='top'
            title='Connect channels'
            description='Get fast notifications through Email or Telegram'
            className={styles.explanation}
          >
            <div className={cx(styles.row, styles.messages)}>
              <Message variant='warn'>{errors.channels}</Message>
            </div>
          </SidecarExplanationTooltip>
        )}
      </div>
    </div>
  )
}

export default TriggerFormChannels
