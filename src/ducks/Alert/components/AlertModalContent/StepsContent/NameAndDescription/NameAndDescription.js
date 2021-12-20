import React, { useEffect } from 'react'
import { useField, useFormikContext } from 'formik'
import Button from '@santiment-network/ui/Button'
import StepTitle from '../StepTitle/StepTitle'
import BlockInput from './BlockInput/BlockInput'
import { useWatchlistAndScreener } from '../../../../hooks/useWatchlistAndScreener'
import { getDescriptionStr, getTitleStr } from '../../../../utils'
import styles from './NameAndDescription.module.scss'

const NameAndDescription = ({ selectorSettings: { selectedType } }) => {
  const { submitForm, isSubmitting, values } = useFormikContext()
  const [titleField, , { setValue: setTitle }] = useField('title')
  const [descriptionField, , { setValue: setDescription }] = useField(
    'description'
  )
  const watchlist = useWatchlistAndScreener({
    type: selectedType.title,
    settings: values.settings,
    skip:
      selectedType.title !== 'Screener' && selectedType.title !== 'Watchlist'
  })

  useEffect(() => {
    const {
      isRepeating,
      cooldown,
      description,
      title,
      settings: { channel, metric, operation, time_window, target }
    } = values

    if (cooldown) {
      if (!description && cooldown && channel) {
        let descriptionStr = getDescriptionStr({
          cooldown,
          channels: channel,
          isRepeating
        })

        if (metric && operation && time_window) {
          descriptionStr = `Notify me when ${getTitleStr({
            watchlist: watchlist && watchlist.name,
            slug: target && target.slug,
            metric,
            operation,
            timeWindow: time_window
          })}. ${descriptionStr}`
        }

        setDescription(descriptionStr)
      }

      if (!title && metric && operation && time_window) {
        setTitle(
          getTitleStr({
            watchlist: watchlist && watchlist.name,
            slug: target && target.slug,
            metric,
            operation,
            timeWindow: time_window
          })
        )
      }
    }
  }, [])

  function handleSubmit () {
    if (isSubmitting) {
      submitForm()
    }
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <StepTitle
          iconType='settings'
          title='Name & Description'
          className={styles.title}
        />
        <div>
          <BlockInput
            label='Alert name'
            {...titleField}
            blockClassname={styles.titleBlock}
          />
          <BlockInput
            label='Description'
            {...descriptionField}
            blockClassname={styles.descriptionBlock}
          />
        </div>
      </div>
      <Button
        type='submit'
        variant='fill'
        border={false}
        accent='positive'
        className={styles.submit}
        onClick={handleSubmit}
      >
        Create alert
      </Button>
    </div>
  )
}

export default NameAndDescription
