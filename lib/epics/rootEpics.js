import 'rxjs';
import { combineEpics } from 'redux-observable';
import handleLauched from './handleLaunch';
import handleLogout from './handleLogout';
import handleEmailLogin, { handleLoginSuccess } from './handleEmailLogin';
import handleEthLogin, { connectNewWallet, removeConnectedWallet } from './handleEthLogin';
import logoutEpic from './../pages/Logout/LogoutEpic';
import handleGDPR from './handleGDPR';
import apikeyGenerateEpic from './apikeyGenerateEpic';
import apikeyRevokeEpic from './apikeyRevokeEpic';
import { removeAssetFromWatchlistEpic, addAssetToWatchlistEpic, editAssetsInWatchlistEpic } from '../ducks/Watchlists/Actions/Edit/editAssetsInWatchlistEpic';
import { fetchAssetsFromListEpic, fetchAssetsFromListWithEditEpic } from './fetchAssetsEpic';
import { createSignalEpic, removeSignalEpic, toggleSignalEpic, updateSignalEpic } from '../ducks/Signals/epics';
import handleBetaModeToggle, { sendBetaModeIfDiff, saveBetaModeAfterLaunch } from './handleBetaModeToggle';
import { connectTelegramEpic, generateTelegramDeepLinkEpic, revokeTelegramDeepLinkEpic } from '../pages/Account/epics';
import { insightslikesEpic } from '../components/Like/insightslikesEpic';
import { feedEventlikesEpic } from '../components/Like/feedEventlikesEpic';
export default combineEpics(handleLauched, handleLogout, logoutEpic, handleEmailLogin, // First handler after user is logged in (Ethereum or Email Provider)
handleLoginSuccess, handleEthLogin, handleGDPR, // user's assets lists
addAssetToWatchlistEpic, removeAssetFromWatchlistEpic, editAssetsInWatchlistEpic, // assets
fetchAssetsFromListEpic, fetchAssetsFromListWithEditEpic, // Settings
removeConnectedWallet, connectNewWallet, generateTelegramDeepLinkEpic, revokeTelegramDeepLinkEpic, connectTelegramEpic, apikeyGenerateEpic, apikeyRevokeEpic, handleBetaModeToggle, saveBetaModeAfterLaunch, sendBetaModeIfDiff, // Signals
createSignalEpic, updateSignalEpic, toggleSignalEpic, removeSignalEpic, // likes
insightslikesEpic, feedEventlikesEpic);