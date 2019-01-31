import React, { Fragment } from 'react'
import { Toggle } from '@santiment-network/ui'

const AccountAppearance = ({ onNightModeToggleChange, isNightModeEnabled }) => (
  <Fragment>
    <h3>Appearance</h3>
    <div className='account-control account-control-appearance'>
      <p>Night Mode</p>
      <Toggle
        isActive={isNightModeEnabled}
        onClick={() => onNightModeToggleChange(isNightModeEnabled)}
      />
    </div>
  </Fragment>
)

export default AccountAppearance
