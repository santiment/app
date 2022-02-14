import {
  createElement,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react'
import { Socket } from 'phoenix'
import { useUserSessions } from '../pages/Account/SettingsSessions'
import { useUser } from '../stores/user'

export const HOST_NAME = new URL(process.env.REACT_APP_BACKEND_URL).hostname

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
    const _socket = new Socket(`wss://${HOST_NAME}/socket`, {
      params: { jti: session.jti }
    })
    _socket.connect()
    setSocket(_socket)
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
