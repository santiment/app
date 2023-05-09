import { useCallback, useEffect, useState } from 'react';
import { useField } from 'formik';
import { useUserSettings } from '../../../stores/user/settings';
import { getSanSonarSW } from '../../../pages/Account/SettingsSonarWebPushNotifications';
export const useUpdateNotificationSettings = ({
  values,
  visitedSteps,
  setSelectedStep,
  selectedType,
  setInvalidSteps,
  invalidStepsMemo
}) => {
  const [, {
    value
  }, {
    setValue
  }] = useField('settings.channel');
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const {
    settings: {
      alertNotifyTelegram: isTelegramConnected,
      alertNotifyEmail: isEmailConnected
    },
    loading
  } = useUserSettings();
  const {
    id
  } = values;
  const checkPushAvailability = useCallback(() => {
    navigator.serviceWorker && navigator.serviceWorker.getRegistrations && navigator.serviceWorker.getRegistrations().then(registrations => setIsPushEnabled(!!getSanSonarSW(registrations)));
  }, [setIsPushEnabled]);
  useEffect(() => {
    checkPushAvailability();
  }, []);
  useEffect(() => {
    if (!loading) {
      if (typeof value === 'string' ? !!value : value.length === 0 && !id) {
        let lastSavedNotificationSettings = JSON.parse(localStorage.getItem('LAST_TRIGGER_NOTIFICATION_SETTINGS'));

        if (lastSavedNotificationSettings && visitedSteps.size === 1) {
          if (!isPushEnabled) {
            lastSavedNotificationSettings = lastSavedNotificationSettings.filter(item => item !== 'push');
          }

          if (!isEmailConnected) {
            lastSavedNotificationSettings = lastSavedNotificationSettings.filter(item => item !== 'email');
          }

          if (!isTelegramConnected) {
            lastSavedNotificationSettings = lastSavedNotificationSettings.filter(item => item !== 'telegram');
          }

          setValue(lastSavedNotificationSettings);
        }
      } else {
        const hasUncheckedChannels = !isPushEnabled && value.includes('push') || !isEmailConnected && value.includes('email') || !isTelegramConnected && value.includes('telegram');

        if (hasUncheckedChannels) {
          let updatedValues = value;

          if (!isPushEnabled) {
            updatedValues = updatedValues.filter(item => item !== 'push');
          }

          if (!isEmailConnected) {
            updatedValues = updatedValues.filter(item => item !== 'email');
          }

          if (!isTelegramConnected) {
            updatedValues = updatedValues.filter(item => item !== 'telegram');
          }

          setValue(updatedValues);

          if (updatedValues.length === 0) {
            setInvalidSteps([...invalidStepsMemo, 'notifications']);

            if (selectedType.steps.length === 4) {
              setSelectedStep(2);
            } else {
              setSelectedStep(1);
            }
          }
        }
      }
    }
  }, [values, visitedSteps, loading]);
};