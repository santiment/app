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

export const HOST_NAME = new URL(process.env.REACT_APP_BACKEND_URL).hostname

export const PhoenixContext = createContext({ channel: null })

export const PhoenixProvider = ({ children }) => {
  const { user } = useUser()
  const [sessions] = useUserSessions()
  const session = sessions.find(session => session.isCurrent)
  const [channel, setChannel] = useState(null)

  useEffect(() => {
    if (!user || !session || !session.jti) return
    const socket = new Socket(`wss://${HOST_NAME}/socket`, {
      params: { jti: session.jti }
    })
    socket.connect()
    const _channel = socket.channel(`users:${user.id}`, {})
    _channel.join().receive('ok', () => setChannel(_channel))
  }, [user, session])

  return createElement(
    PhoenixContext.Provider,
    {
      value: {
        channel
      }
    },
    children
  )
}

export const useChannel = () => useContext(PhoenixContext).channel
