import React from 'react'
import { Form } from 'formik'
import isEqual from 'lodash.isequal'
import { useAlertCooldown } from './hooks'
import RadioBtns from '@santiment-network/ui/RadioBtns'
import Button from '@santiment-network/ui/Button'
import FormikEffect from '../../../components/formik-santiment-ui/FormikEffect'
import FormikLabel from '../../../components/formik-santiment-ui/FormikLabel'
import TriggerFormChannels from '../signalFormManager/signalCrudForm/formParts/channels/TriggerFormChannels'
import { TriggerFormBlockDivider } from '../signalFormManager/signalCrudForm/formParts/block/TriggerFormBlock'
import SignalFormDescription from '../signalFormManager/signalCrudForm/formParts/description/SignalFormDescription'
import AlertWeeklyReports from '../signalFormManager/signalCrudForm/formParts/weeklyReports/AlertWeeklyReports'
import { ToggleSignal } from '../../../components/SignalCard/card/SignalCardBottom'
import externalStyles from '../signalFormManager/signalCrudForm/signal/TriggerForm.module.scss'
import styles from './ScreenerSignal.module.scss'
import { SCREENER_FREQUENCES } from './utils'

const FREQUENCE_TYPES = SCREENER_FREQUENCES.map(({ label }) => label)

const ScreenerAlertForm = ({
  form: { values, errors, isSubmitting, setFieldValue, isValid, validateForm },
  setInitialValues,
  isNew,
  watchlist,
  onCancel,
  toggleSignalActive
}) => {
  const { description, channels = [], isActive } = values

  const isValidForm = isValid || !errors || Object.keys(errors).length === 0

  const { toggleSignalFrequency, cooldownInitial } = useAlertCooldown({
    values,
    setInitialValues
  })

  return (
    <Form className={styles.form}>
      <FormikEffect
        onChange={(current, prev) => {
          let { values: newValues } = current

          if (!isEqual(newValues, prev.values)) {
            validateForm()
          }
        }}
      />

      <div>
        <FormikLabel text='Notify me via' />

        <TriggerFormChannels
          isNew={isNew}
          channels={channels}
          errors={errors}
          setFieldValue={setFieldValue}
        />
      </div>

      <TriggerFormBlockDivider className={styles.divider} />

      <div>
        <FormikLabel text='Frequency of notifications' />

        <div className={styles.frequency}>
          <RadioBtns
            options={FREQUENCE_TYPES}
            labelOnRight
            defaultSelectedIndex={cooldownInitial}
            onSelect={toggleSignalFrequency}
            labelClassName={styles.checkboxLabel}
          />
        </div>
      </div>

      <TriggerFormBlockDivider className={styles.divider} />

      <div>
        <div className={externalStyles.row}>
          <SignalFormDescription
            description={description}
            setFieldValue={setFieldValue}
            className={styles.textarea}
          />
        </div>
      </div>

      <div className={styles.reports}>
        <AlertWeeklyReports watchlist={watchlist} />
      </div>

      <div className={styles.actions}>
        <Button
          type='submit'
          disabled={!isValidForm || isSubmitting}
          variant='fill'
          accent='positive'
          className={styles.submit}
        >
          {!isNew ? 'Save changes' : 'Create'}
        </Button>
        <Button
          disabled={isSubmitting}
          border
          className={styles.cancel}
          onClick={onCancel}
        >
          Cancel
        </Button>

        {!isNew && (
          <ToggleSignal
            isActive={isActive}
            toggleSignal={() => toggleSignalActive(values)}
          />
        )}
      </div>
    </Form>
  )
}

export default ScreenerAlertForm
