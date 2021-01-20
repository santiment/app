import 'rxjs'
import { combineEpics } from 'redux-observable'
import handleLauched from './handleLaunch'
import handleLogout from './handleLogout'
import handleEmailLogin, {
  digestSubscriptionEpic,
  handleLoginSuccess
} from './handleEmailLogin'
import handleEthLogin, {
  connectNewWallet,
  removeConnectedWallet
} from './handleEthLogin'
import logoutEpic from './../pages/Logout/LogoutEpic'
import handleGDPR from './handleGDPR'
import apikeyGenerateEpic from './apikeyGenerateEpic'
import apikeyRevokeEpic from './apikeyRevokeEpic'
import createWatchlistEpic, {
  createWatchlistSuccessEpic
} from './createWatchlistEpic'
import removeWatchlistEpic from './removeWatchlistEpic'
import {
  removeAssetFromWatchlistEpic,
  addAssetToWatchlistEpic,
  editAssetsInWatchlistEpic
} from '../ducks/Watchlists/Actions/Edit/editAssetsInWatchlistEpic'
import { watchlistToggleMonitoringEpic } from '../ducks/Watchlists/Actions/WeeklyReport/watchlistToggleMonitoringEpic'
import {
  changeColumnsSettingsEpic,
  saveWatchlistsSettingsAfterLaunch
} from './changeWatchlistSettings'
import {
  fetchAssetsFromListEpic,
  fetchAssetsFromListWithEditEpic
} from './fetchAssetsEpic'
import {
  createSignalEpic,
  removeSignalEpic,
  toggleSignalEpic,
  updateSignalEpic
} from '../ducks/Signals/epics'
import handleNightModeToggle, {
  saveNightModeAfterLaunch,
  sendNightModeIfDiff
} from './handleNightModeToggle'
import handleBetaModeToggle, {
  sendBetaModeIfDiff,
  saveBetaModeAfterLaunch
} from './handleBetaModeToggle'
import {
  connectTelegramEpic,
  generateTelegramDeepLinkEpic,
  revokeTelegramDeepLinkEpic
} from '../pages/Account/epics'
import keyboardEpic from './keyboardEpic'
import { insightslikesEpic } from '../components/Like/insightslikesEpic'
import { feedEventlikesEpic } from '../components/Like/feedEventlikesEpic'
import { trialSubscriptionEpic } from './trialSubscriptionEpic'
import handleWideChartToggle from './handleWideChartToggle'

export default combineEpics(
  handleLauched,
  handleLogout,
  logoutEpic,
  handleEmailLogin,
  // First handler after user is logged in (Ethereum or Email Provider)
  handleLoginSuccess,
  digestSubscriptionEpic,
  handleEthLogin,
  handleGDPR,
  keyboardEpic,
  // user's assets lists
  createWatchlistEpic,
  createWatchlistSuccessEpic,
  removeWatchlistEpic,
  addAssetToWatchlistEpic,
  removeAssetFromWatchlistEpic,
  editAssetsInWatchlistEpic,
  // assets
  fetchAssetsFromListEpic,
  fetchAssetsFromListWithEditEpic,
  // assets settings
  changeColumnsSettingsEpic,
  saveWatchlistsSettingsAfterLaunch,
  watchlistToggleMonitoringEpic,
  // Settings
  removeConnectedWallet,
  connectNewWallet,
  generateTelegramDeepLinkEpic,
  revokeTelegramDeepLinkEpic,
  connectTelegramEpic,
  apikeyGenerateEpic,
  apikeyRevokeEpic,
  handleNightModeToggle,
  handleWideChartToggle,
  saveNightModeAfterLaunch,
  sendNightModeIfDiff,
  handleBetaModeToggle,
  saveBetaModeAfterLaunch,
  sendBetaModeIfDiff,
  // Signals
  createSignalEpic,
  updateSignalEpic,
  toggleSignalEpic,
  removeSignalEpic,
  // likes
  insightslikesEpic,
  feedEventlikesEpic,
  // trial subscription
  trialSubscriptionEpic
)
