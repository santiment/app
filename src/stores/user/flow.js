import { refetchUser, updateUser } from './index.js'
import {
  refetchUserSubscriptions,
  updateUserSubscriptions
} from './subscriptions'
import { refetchUserSettings, updateUserSettings } from './settings'

export function loginUser () {
  refetchUser()
  refetchUserSubscriptions()
  refetchUserSettings()
}

export function logoutUser () {
  updateUser(null)
  updateUserSettings(null)
  updateUserSubscriptions(null)
}
