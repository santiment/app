import 'rxjs'
import { combineEpics } from 'redux-observable'
import handleOffline from './handleOffline'
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
import handleRouter from './handleRouter'
import apikeyGenerateEpic from './apikeyGenerateEpic'
import apikeyRevokeEpic from './apikeyRevokeEpic'
import createWatchlistEpic, {
  createWatchlistSuccessEpic
} from './createWatchlistEpic'
import copyWatchlistEpic from './copyWatchlistEpic'
import removeWatchlistEpic from './removeWatchlistEpic'
import {
  removeAssetFromWatchlistEpic,
  addAssetToWatchlistEpic,
  editAssetsInWatchlistEpic
} from './../components/WatchlistEdit/editAssetsInWatchlistEpic'
import {
  fetchAssetsEpic,
  fetchAssetsFromListEpic,
  fetchAssetsFromListWithEditEpic,
  fetchRestAllAssetsEpic
} from './fetchAssetsEpic'
import fetchTimeseriesEpic from '../ducks/GetTimeSeries/epics'
import {
  createSignalEpic,
  fetchHistorySignalPoints,
  fetchSignalsEpic,
  removeSignalEpic,
  toggleSignalEpic,
  updateSignalEpic
} from '../ducks/Signals/epics'
import handleNightModeToggle from './handleNightModeToggle'
import handleBetaModeToggle from './handleBetaModeToggle'
import {
  fetchHypedTrends,
  selectHypedTrend
} from '../components/Trends/fetchHypedTrends'
import { fetchSocialVolumeEpic } from '../components/SocialVolumeWidget/socialVolumeEpic'
import fetchAllTickersSlugs from '../components/Trends/fetchAllTickersSlugs'
import {
  connectTelegramEpic,
  generateTelegramDeepLinkEpic,
  revokeTelegramDeepLinkEpic,
  toggleNotificationChannelEpic
} from '../pages/Account/epics'
import keyboardEpic from './keyboardEpic'
import {
  insightDraftPublishEpic,
  insightDraftUpdateEpic
} from '../pages/Insights/insightDraftEpic'
import { likesEpic } from '../components/Like/likesEpic'
import { wordTrendSocialVolumeEpic } from '../pages/Trends/changesEpic.js'
import {
  connectedWordsEpic,
  connectedWordsOptimizationEpic
} from '../pages/Trends/connectedWordsEpic.js'

export default combineEpics(
  handleOffline,
  handleLauched,
  handleLogout,
  logoutEpic,
  handleEmailLogin,
  handleLoginSuccess,
  digestSubscriptionEpic,
  handleEthLogin,
  handleGDPR,
  handleRouter,
  keyboardEpic,
  // user's assets lists
  createWatchlistEpic,
  createWatchlistSuccessEpic,
  removeWatchlistEpic,
  addAssetToWatchlistEpic,
  removeAssetFromWatchlistEpic,
  editAssetsInWatchlistEpic,
  copyWatchlistEpic,
  // assets
  fetchAssetsEpic,
  fetchRestAllAssetsEpic,
  fetchAssetsFromListEpic,
  fetchAssetsFromListWithEditEpic,
  // timeseries
  fetchTimeseriesEpic,
  // trends
  fetchHypedTrends,
  selectHypedTrend,
  fetchAllTickersSlugs,
  // SocialVolume
  fetchSocialVolumeEpic,
  // Settings
  removeConnectedWallet,
  connectNewWallet,
  generateTelegramDeepLinkEpic,
  revokeTelegramDeepLinkEpic,
  toggleNotificationChannelEpic,
  connectTelegramEpic,
  apikeyGenerateEpic,
  apikeyRevokeEpic,
  handleNightModeToggle,
  handleBetaModeToggle,
  // Signals
  createSignalEpic,
  updateSignalEpic,
  fetchSignalsEpic,
  toggleSignalEpic,
  removeSignalEpic,
  fetchHistorySignalPoints,
  // insight draft creation
  insightDraftUpdateEpic,
  insightDraftPublishEpic,
  // likes
  likesEpic,
  // trend changes
  wordTrendSocialVolumeEpic,
  // connected trends
  connectedWordsOptimizationEpic,
  connectedWordsEpic
)
