import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { useField } from 'formik'
import { getAddressInfrastructure } from 'webkit/utils/address'
import { WALLET_EVENTS } from './constants'
import styles from './EventSelector.module.scss'

const EventSelector = ({ address, onEventChange, setSelectedAsset }) => {
  const [, { value: settings }, { setValue: setSettings }] = useField('settings')
  const hasInitSettings = !!(settings.target && settings.target.address)
  const initialEvent = WALLET_EVENTS.find((event) => event.settings.type === settings.type)
  const [currentEvent, setCurrentEvent] = useState(hasInitSettings ? initialEvent : {})
  const isCorrectAddress = address && !!getAddressInfrastructure(address)

  useEffect(() => {
    if (hasInitSettings) {
      onEventChange(initialEvent)
    }
  }, [])

  function handleSelectEvent(event) {
    const { settings: eventSettings } = event

    setCurrentEvent(event)
    setSelectedAsset(undefined)

    if (eventSettings) {
      eventSettings.target.address = address

      if (eventSettings.type === 'wallet_movement') {
        eventSettings.selector = settings.selector
      }

      if (eventSettings.type === 'wallet_usd_valuation' || eventSettings.type === 'wallet_assets') {
        eventSettings.selector = { infrastructure: settings.selector.infrastructure }
      }

      setSettings(eventSettings)
    } else {
      const defaultSettings = WALLET_EVENTS[0].settings
      defaultSettings.target.address = address
      setSettings(defaultSettings)
    }

    onEventChange(event)
  }

  useEffect(() => {
    if (!isCorrectAddress) {
      handleSelectEvent({})
    }
  }, [isCorrectAddress])

  const hasActiveEvent = !!currentEvent.settings

  return (
    <div className='column mrg--b mrg-xxl'>
      <div className={cx(styles.title, 'body-1 txt-m c-black')}>Event</div>
      <div className={cx(styles.selectorsWrapper, 'column')}>
        {WALLET_EVENTS.map((event) => {
          const { title, description, isNew, settings } = event

          return (
            <div
              onClick={() => isCorrectAddress && handleSelectEvent(event)}
              key={title}
              className={cx(
                'column',
                styles.selector,
                currentEvent.settings &&
                  settings.type === currentEvent.settings.type &&
                  styles.selectorActive,
                hasActiveEvent && styles.hasActiveEvent,
                !isCorrectAddress && styles.selectorDisabled,
              )}
            >
              <div className='row justify v-center'>
                <div className={cx(styles.selectorTitle, 'row body-3')}>
                  {title} {isNew && <div className={styles.new}>NEW</div>}
                </div>
                <div className={styles.point} />
              </div>
              <div className={cx(styles.description, 'body-3 c-waterloo')}>{description}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EventSelector
