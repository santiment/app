import { store } from '../../../redux';
import { showNotification } from '../../../actions/rootActions';

const dispatchNotification = payload => store.dispatch(showNotification(payload));

export function notifyCreation() {
  return dispatchNotification({
    variant: 'success',
    title: 'Chart Layout created',
    description: 'New Chart Layout has been created successfully.'
  });
}
export function notifyAnonCreation() {
  return dispatchNotification({
    variant: 'info',
    title: 'Your chart was saved and will be created after sign up'
  });
}
export function notifyDuplication() {
  return dispatchNotification({
    variant: 'success',
    title: 'Chart Layout duplicated',
    description: 'Your Chart Layout has been duplicated successfully.'
  });
}
export function notifyRename() {
  return dispatchNotification({
    variant: 'success',
    title: 'Template rename',
    description: 'Your template has been renamed successfully.'
  });
}
export function notifySave() {
  return dispatchNotification({
    variant: 'success',
    title: 'Template saved',
    description: 'Your template has been saved successfully.'
  });
}