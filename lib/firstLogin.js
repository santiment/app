import { query } from 'san-webkit/lib/api';
import { parseAuthSearchParams } from 'san-webkit/lib/utils/auth';
import { Tracker } from 'san-webkit/lib/analytics';
import { trackLoginFinish } from 'san-webkit/lib/analytics/events/general';
import { trackSignupFinish } from 'san-webkit/lib/analytics/events/onboarding';
query(`{
  currentUser {
    firstLogin
  }
}`).then(({
  currentUser
}) => {
  window.isFirstLogin = Boolean(currentUser && currentUser.firstLogin);
  const {
    auth
  } = parseAuthSearchParams();

  if (auth) {
    trackSignupLogin(window.isFirstLogin, auth);
    window.history.replaceState(window.history.state, null, window.location.pathname);
  }
});
export function trackSignupLogin(isFirstLogin, method) {
  if (isFirstLogin) {
    trackSignupFinish(method, [Tracker.GA, Tracker.AMPLITUDE]);

    window.onGdprAccept = () => trackSignupFinish(method, [Tracker.SAN]);
  } else {
    trackLoginFinish(method);
  }
}