import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SharePanel from '../src/components/Share/SharePanel'
import ShareBtn from '../src/components/Share/ShareBtn'
import ShareModalTrigger from '../src/components/Share/ShareModalTrigger'

storiesOf('Share', module)
  .add('Default', () => (
    <div>
      <SharePanel
        shareTitle='Sanbase'
        shareText='Check it out!'
        shareLink='http://share.santiment.net/ffd689tset.com'
        onCloseBtnClick={() => action('Close click')()}
      />
    </div>
  ))
  .add('Buttons', () => (
    <div>
      <ShareBtn />
      <br />
      <ShareBtn border={false} />
    </div>
  ))
  .add('Modal', () => (
    <div>
      <ShareModalTrigger
        shareTitle='Santiment'
        shareText='Check it out!'
        shareLink='http://share.santiment.net/ffd689tset.com'
      />

      <br />

      <ShareModalTrigger
        shareLink='http://share.santiment.net/ffd689tset.com'
      />
    </div>
  ))
