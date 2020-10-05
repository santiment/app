import { refetchUser, updateUser } from './index.js'
import {
  refetchUserSubscriptions,
  updateUserSubscriptions
} from './subscriptions'
import { refetchUserSettings, updateUserSettingsCache } from './settings'

export function loginUser () {
  refetchUser()
  refetchUserSubscriptions()
  refetchUserSettings()
}

export function logoutUser () {
  updateUser(null)
  updateUserSettingsCache(null)
  updateUserSubscriptions(null)
}
