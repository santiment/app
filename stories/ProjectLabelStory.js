import React from 'react'
import { storiesOf } from '@storybook/react'
import ProjectLabel from '../src/components/ProjectLabel'

storiesOf('Cashflow page', module)
  .add('Project Label', () => (
    <div style={{padding: 20}}>
      <ProjectLabel name='0x' ticker='0x' />
    </div>
  ))
  .add('Project Label with default icon', () => (
    <div style={{padding: 20}}>
      <ProjectLabel name='Factom' ticker='factom' />
    </div>
  ))
