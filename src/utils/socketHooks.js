import {
  createElement,
  createContext,
  useState,
  useEffect,
  useContext
} from 'react'
import { Socket } from 'phoenix'
import { useUserSessions } from '../pages/Account/SettingsSessions'
import { useUser } from '../stores/user'

export const SocketContext = createContext({
  socket: null,
  showTabLimitModal: false,
  setShowTabLimitModal: null
})

// For local development it uses process.env.REACT_APP_BACKEND_URL
export const HOST_NAME = process.env.REACT_APP_BACKEND_URL
  ? new URL(process.env.REACT_APP_BACKEND_URL).hostname
  : window.location.hostname

export const SocketProvider = ({ children }) => {
  const { user } = useUser()
  const [sessions] = useUserSessions()
  const session = sessions.find(session => session.isCurrent)
  const [socket, setSocket] = useState(null)
  const [showTabLimitModal, setShowTabLimitModal] = useState(false)

  useEffect(() => {
    if (!user || !session || !session.jti) return
    const socket = new Socket(`wss://${HOST_NAME}/socket`, {
      params: { jti: session.jti },
      heartbeatIntervalMs: 3000
    })
    socket.connect()
    setSocket(socket)
  }, [user, session])

  return createElement(
    SocketContext.Provider,
    {
      value: {
        socket,
        showTabLimitModal,
        setShowTabLimitModal
      }
    },
    children
  )
}

export const useSocket = () => useContext(SocketContext)
