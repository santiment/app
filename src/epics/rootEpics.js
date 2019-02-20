import 'rxjs'
import { combineEpics } from 'redux-observable'
import handleOffline from './handleOffline'
import handleLauched from './handleLaunch'
import handleLogout from './handleLogout'
import handleEmailLogin, { handleLoginSuccess } from './handleEmailLogin'
import handleEthLogin, {
  removeConnectedWallet,
  connectNewWallet
} from './handleEthLogin'
import handleGDPR from './handleGDPR'
import handleRouter from './handleRouter'
import apikeyGenerateEpic from './apikeyGenerateEpic'
import apikeyRevokeEpic from './apikeyRevokeEpic'
import createWatchlistEpic, {
  createWatchlistSuccessEpic
} from './createWatchlistEpic'
import copyWatchlistEpic from './copyWatchlistEpic'
import addAssetToWatchlistEpic from './addAssetToWatchlistEpic'
import removeWatchlistEpic from './removeWatchlistEpic'
import removeAssetFromWatchlistEpic from './removeAssetFromWatchlistEpic'
import {
  fetchAssetsEpic,
  fetchAssetsFromListEpic,
  fetchAssetsFromSharedListEpic
} from './fetchAssetsEpic'
import fetchTimeseriesEpic from '../ducks/GetTimeSeries/epics'
import { createSignalEpic, fetchSignalsEpic } from '../ducks/Signals/epics'
import handleNightModeToggle from './handleNightModeToggle'
import handleBetaModeToggle from './handleBetaModeToggle'
import {
  fetchHypedTrends,
  selectHypedTrend
} from '../components/Trends/fetchHypedTrends'
import { fetchWordContextEpic } from '../components/WordCloud/fetchWordContextEpic'
import { fetchSocialVolumeEpic } from '../components/SocialVolumeWidget/socialVolumeEpic'
import fetchAllTickersSlugs from '../components/Trends/fetchAllTickersSlugs'
import {
  generateTelegramDeepLinkEpic,
  revokeTelegramDeepLinkEpic,
  toggleNotificationChannelEpic,
  connectTelegramEpic
} from '../pages/Account/epics'
import keyboardEpic from './keyboardEpic'

export default combineEpics(
  handleOffline,
  handleLauched,
  handleLogout,
  handleEmailLogin,
  handleLoginSuccess,
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
  copyWatchlistEpic,
  // assets
  fetchAssetsEpic,
  fetchAssetsFromListEpic,
  fetchAssetsFromSharedListEpic,
  // timeseries
  fetchTimeseriesEpic,
  // trends
  fetchHypedTrends,
  selectHypedTrend,
  fetchAllTickersSlugs,
  // WordCloud
  fetchWordContextEpic,
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
  fetchSignalsEpic
)
