import { useQuery } from '@apollo/react-hooks'
import { IS_TELEGRAM_CHAT_VALID_QUERY } from './queries'

export const useCheckTelegramValid = ({ chatId, skip }) => {
  const { data, loading, error } = useQuery(IS_TELEGRAM_CHAT_VALID_QUERY, {
    skip: skip || !chatId,
    variables: { id: chatId },
  })

  return { data, loading, error }
}
