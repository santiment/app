import React from 'react'
import { Link } from 'react-router-dom'
import SourceToggle from '../SourceToggle'

const PushToggle = ({ disabled, isActive, onChange }) => (
  <SourceToggle
    disabled={disabled}
    isActive={isActive}
    onChange={onChange}
    label={
      <div className='row v-center nowrap'>
        Push
        {disabled && (
          <Link to='/account#notifications' className='btn c-green mrg-xs mrg--l'>
            Enable notifications
          </Link>
        )}
      </div>
    }
  >
    Get fast notifications
  </SourceToggle>
)

export default PushToggle
