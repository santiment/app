import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SharePanel from '../src/components/SharePanel/SharePanel'
import ShareBtn from '../src/components/SharePanel/ShareBtn'
import ShareModalTrigger from '../src/components/SharePanel/ShareModalTrigger'

storiesOf('SharePanel', module)
  .add('Default', () => (
    <div>
      <SharePanel
        shareLink='http://share.santiment.net/ffd689tset.com'
        onCloseBtnClick={() => action('Close click')()}
      />
    </div>
  ))
  .add('Buttons', () => (
    <div>
      <ShareBtn />
      <br />
      <ShareBtn asIcon />
    </div>
  ))
  .add('Modal', () => (
    <div>
      <ShareModalTrigger shareLink='http://share.santiment.net/ffd689tset.com' />
      <br />

      <ShareModalTrigger
        shareLink='http://share.santiment.net/ffd689tset.com'
        asIcon
      />
    </div>
  ))
