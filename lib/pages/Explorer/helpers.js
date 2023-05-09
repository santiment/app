import { notifications$ } from 'webkit/ui/Notifications';
export async function notifyError({
  title,
  description,
  user
}) {
  // Check if we should check unauthenticated users
  if (user !== undefined && !user) {
    return;
  }

  return notifications$.show({
    variant: 'error',
    title: title || 'Something went wrong',
    description: description || (title ? 'Something went wrong, Please try again or contact support' : 'Please try again or contact support')
  });
}