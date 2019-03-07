import React from 'react'
import { storiesOf } from '@storybook/react'
import Editor from '../src/components/Editor/Editor'

storiesOf('Editor', module).add('Simple', () => (
  <div style={{ padding: 20 }}>
    <Editor />
  </div>
))
