import React from 'react'
import { Link } from 'react-router-dom'
import SourceToggle from '../SourceToggle'

const TelegramToggle = ({ disabled, isActive, onChange }) => {
  return (
    <SourceToggle
      disabled={disabled}
      isActive={isActive}
      onChange={onChange}
      label={
        <div className='row v-center nowrap'>
          Telegram
          {disabled && (
            <Link to='/account#notifications' className='btn c-green mrg-xs mrg--l'>
              Enable notifications
            </Link>
          )}
        </div>
      }
    >
      You will receive notifications to the connected telegram account
    </SourceToggle>
  )
}

export default TelegramToggle
