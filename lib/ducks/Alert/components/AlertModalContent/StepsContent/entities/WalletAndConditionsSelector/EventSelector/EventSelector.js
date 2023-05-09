import React, { useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import { useField } from 'formik';
import { getAddressInfrastructure } from 'webkit/utils/address';
import { WALLET_EVENTS } from './constants';
import styles from './EventSelector.module.css';

const EventSelector = ({
  address,
  onEventChange,
  setSelectedAsset
}) => {
  const [, {
    value: settings
  }, {
    setValue: setSettings
  }] = useField('settings');
  const hasInitSettings = !!(settings.target && settings.target.address);
  const initialEvent = useMemo(() => WALLET_EVENTS.find(event => event.settings.type === settings.type), [settings.type]);
  const [currentEvent, setCurrentEvent] = useState(hasInitSettings ? initialEvent : {});
  const isCorrectAddress = address && !!getAddressInfrastructure(address);
  useEffect(() => {
    if (hasInitSettings) {
      onEventChange(initialEvent);
    }
  }, []);

  function handleSelectEvent(event) {
    const {
      settings: eventSettings
    } = event;
    setCurrentEvent(event);
    setSelectedAsset(undefined);

    if (eventSettings) {
      if (eventSettings.type !== settings.type && settings.selector.infrastructure) {
        eventSettings.target.address = address;
        eventSettings.channel = settings.channel;

        if (eventSettings.type === 'wallet_movement') {
          eventSettings.selector = settings.selector;
        }

        if (eventSettings.type === 'wallet_usd_valuation' || eventSettings.type === 'wallet_assets_held') {
          eventSettings.selector = {
            infrastructure: settings.selector.infrastructure
          };
        }

        setSettings(eventSettings);
      }
    } else {
      const defaultSettings = WALLET_EVENTS[0].settings;
      defaultSettings.target.address = address;
      defaultSettings.channel = settings.channel;
      setSettings(defaultSettings);
    }

    onEventChange(event);
  }

  useEffect(() => {
    if (!isCorrectAddress) {
      handleSelectEvent({});
    }
  }, [isCorrectAddress]);
  const hasActiveEvent = !!currentEvent.settings;
  return /*#__PURE__*/React.createElement("div", {
    className: "column mrg--b mrg-xxl"
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.title, 'body-1 txt-m c-black')
  }, "Event"), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.selectorsWrapper, 'column')
  }, WALLET_EVENTS.map(event => {
    const {
      title,
      description,
      isNew,
      settings
    } = event;
    return /*#__PURE__*/React.createElement("div", {
      onClick: () => isCorrectAddress && handleSelectEvent(event),
      key: title,
      className: cx('column', styles.selector, currentEvent.settings && settings.type === currentEvent.settings.type && styles.selectorActive, hasActiveEvent && styles.hasActiveEvent, !isCorrectAddress && styles.selectorDisabled)
    }, /*#__PURE__*/React.createElement("div", {
      className: "row justify v-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: cx(styles.selectorTitle, 'row')
    }, title, " ", isNew && /*#__PURE__*/React.createElement("div", {
      className: styles.new
    }, "NEW")), /*#__PURE__*/React.createElement("div", {
      className: styles.point
    })), /*#__PURE__*/React.createElement("div", {
      className: cx(styles.description, 'c-waterloo')
    }, description));
  })));
};

export default EventSelector;