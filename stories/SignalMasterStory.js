import React from 'react'
import { storiesOf } from '@storybook/react'
import { SignalMaster } from './../src/ducks/Signals/SignalMaster'

storiesOf('Sonar', module)
  .add('SignalMaster default', () => (
    <div>
      <SignalMaster />
    </div>
  ))
