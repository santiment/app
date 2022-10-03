import { notifications$ } from 'webkit/ui/Notifications'

export const notifyError = ({ title, description }) =>
  notifications$.show({
    variant: 'error',
    title: title || 'Something went wrong',
    description:
      description || title
        ? 'Something went wrong, Please try again or contact support'
        : 'Please try again or contact support',
  })
