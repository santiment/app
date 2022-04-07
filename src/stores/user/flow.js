import { currentUser } from 'studio/stores/user'
import { refetchUser, updateUser } from './index.js'
import { refetchUserSubscriptions, updateUserSubscriptions } from './subscriptions'
import { refetchUserSettings, updateUserSettingsCache } from './settings'

const setStoreData = ({ data }) => currentUser.set(data && data.currentUser)

export function loginUser () {
  refetchUser().then(setStoreData)
  refetchUserSubscriptions()
  refetchUserSettings()
}

export function logoutUser () {
  currentUser.set(null)
  updateUser(null)
  updateUserSettingsCache(null)
  updateUserSubscriptions(null)
}
