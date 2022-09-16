import React from 'react'
import { Link } from 'react-router-dom'
import SourceToggle from '../SourceToggle'

const EmailToggle = ({ disabled, email, isActive, onChange }) => (
  <SourceToggle
    label={
      <div className='row v-center nowrap'>
        Email
        {disabled && (
          <Link to='/account#notifications' className='btn c-green mrg-xs mrg--l'>
            Enable notifications
          </Link>
        )}
      </div>
    }
    disabled={disabled}
    onChange={onChange}
    isActive={isActive}
  >
    {email}
  </SourceToggle>
)

export default EmailToggle
