import {
  createElement,
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback
} from 'react'
import { Socket } from 'phoenix'
import { track } from 'webkit/analytics'
import { useUserSessions } from '../pages/Account/SettingsSessions'
import { useUser } from '../stores/user'
import { API_HOST_NAME } from '../utils/utils'

export const SocketContext = createContext({
  socket: null,
  showTabLimitModal: false,
  setShowTabLimitModal: null
})

export const SocketProvider = ({ children }) => {
  const { user } = useUser()
  const [sessions] = useUserSessions()
  const session = sessions.find(session => session.isCurrent)
  const [socket, setSocket] = useState(null)
  const [showTabLimitModal, setShowTabLimitModal] = useState(false)

  useEffect(() => {
    if (!user || !session || !session.jti) return
    const socket = new Socket(`wss://${API_HOST_NAME}/socket`, {
      params: { jti: session.jti },
      heartbeatIntervalMs: 3000
    })
    socket.connect()
    setSocket(socket)
  }, [user, session])

  const upgradeButtonClick = useCallback(() => {
    if (showTabLimitModal) {
      track.event('tab_limit_modal_upgrade_button_clicked')
    }
  }, [showTabLimitModal])

  return createElement(
    SocketContext.Provider,
    {
      value: {
        socket,
        showTabLimitModal,
        setShowTabLimitModal,
        upgradeButtonClick
      }
    },
    children
  )
}

export const useSocket = () => useContext(SocketContext)
