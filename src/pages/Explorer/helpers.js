import { notifications$ } from 'webkit/ui/Notifications'

export function notifyError({ title, description, ...props }) {
  if (props && props[0]) {
    return
  }
  return notifications$.show({
    variant: 'error',
    title: title || 'Something went wrong',
    description:
      description ||
      (title
        ? 'Something went wrong, Please try again or contact support'
        : 'Please try again or contact support'),
  })
}
