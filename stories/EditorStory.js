import React from 'react'
import { storiesOf } from '@storybook/react'
import Editor from '../src/pages/SonarInsights/Editor'
import ColorModeComparison from './ColorModeComparison'

storiesOf('Editor', module)
  .add('Simple', () => (
    <div style={{ padding: 20 }}>
      <Editor />
    </div>
  ))
  .add('Suggestions', () => (
    <div>
      <ColorModeComparison>
        <SearchWithSuggestions
          data={[
            'Bibox Token',
            'Bigbom',
            'Binance Coin',
            'BioCoin',
            'BitBay',
            'bitcoin'
          ]}
          suggestionContent={suggestion => suggestion}
          predicate={searchTerm => item =>
            item.toUpperCase().includes(searchTerm.toUpperCase())}
          maxSuggestions={5}
        />
      </ColorModeComparison>
    </div>
  ))
