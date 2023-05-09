import { ONE_DAY_IN_MS } from './dates';
export const PLANS = {
  FREE: 'FREE',
  BASIC: 'BASIC',
  PRO: 'PRO',
  PRO_PLUS: 'PRO_PLUS',
  ENTERPRISE: 'ENTERPRISE'
};
export const STATUSES = {
  ACTIVE: 'ACTIVE',
  TRIALING: 'TRIALING'
};
const NormalizedPlanName = {
  'PRO+': PLANS.PRO_PLUS
};
export const sanbaseProductId = '2';
export const neuroProductId = '1';
export const ProductNameById = {
  [sanbaseProductId]: 'Sanbase',
  [neuroProductId]: 'SanAPI'
};
export const calculateTrialDaysLeft = trialEnd => Math.ceil((new Date(trialEnd) - Date.now()) / ONE_DAY_IN_MS);
export const checkIsActiveSubscription = ({
  status
}) => status === STATUSES.ACTIVE || status === STATUSES.TRIALING;
export const formatOnlyPrice = amount => `$${parseInt(amount / 100, 10)}`;
export const formatPrice = (price, name, billing) => {
  if (name === PLANS.FREE) return ['$0'];
  if (!price) return ['Custom'];
  const devider = 100 * (billing === 'year' ? 12 : 1);
  return [`$${parseInt(price / devider, 10)}`, '/ mo'];
};
const YEAR_MULT_DIV = [1, 12];
const MONTH_MULT_DIV = [12, 1];
export const getYearMonthPrices = (amount, billing) => {
  const [mult, div] = billing === 'year' ? YEAR_MULT_DIV : MONTH_MULT_DIV;
  return [formatOnlyPrice(amount * mult), formatOnlyPrice(amount / div)];
};
export const findSanbasePlan = ({
  id
}) => id === sanbaseProductId;
export const noFreePlan = ({
  name
}) => name !== PLANS.FREE;
export const noBasicPlan = ({
  name
}) => name !== PLANS.BASIC;
export const noEnterprisePlan = ({
  name
}) => name !== PLANS.ENTERPRISE;

const checkIsSanbaseSubscription = ({
  plan: {
    product: {
      id
    }
  }
}) => id === sanbaseProductId;

export const getSanbaseSubscription = subscriptions => subscriptions.find(subscription => checkIsSanbaseSubscription(subscription) && checkIsActiveSubscription(subscription));
export const getCurrentSanbaseSubscription = user => {
  if (!user) return;
  const {
    subscriptions: subs
  } = user;
  if (!subs) return;
  return getSanbaseSubscription(subs);
};
export const getAlternativeBillingPlan = (plans, oldPlan) => {
  const {
    name,
    interval: oldInterval = 'month'
  } = oldPlan;
  const oldName = (NormalizedPlanName[name.toUpperCase()] || name).toUpperCase();
  return plans.filter(({
    isDeprecated
  }) => !isDeprecated).find(({
    name,
    interval
  }) => name.toUpperCase() === oldName && interval !== oldInterval);
};
export const getTrialLabel = (trialEnd, status) => trialEnd && status === STATUSES.TRIALING ? '(trial)' : '';
export function getShowingPlans(plans, billing) {
  return plans.filter(noFreePlan).filter(noBasicPlan).filter(noEnterprisePlan).filter(({
    name,
    interval
  }) => interval === billing || name === 'FREE');
}
export function hasInactiveTrial(subscription) {
  if (!subscription) {
    return false;
  }

  const {
    trialEnd,
    cancelAtPeriodEnd,
    status
  } = subscription;
  return subscription && trialEnd && cancelAtPeriodEnd && status === STATUSES.TRIALING;
}
export function hasActiveTrial(subscription) {
  if (!subscription) {
    return false;
  }

  const {
    trialEnd,
    cancelAtPeriodEnd,
    status
  } = subscription;
  return subscription && trialEnd && !cancelAtPeriodEnd && status === STATUSES.TRIALING;
}