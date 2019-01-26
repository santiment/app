import React from 'react'
import { Modal } from 'semantic-ui-react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SharePanel from '../src/components/SharePanel/SharePanel'
import ShareBtn from '../src/components/SharePanel/ShareBtn'
import ModalSharePanel from '../src/components/SharePanel/ModalSharePanel'

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
      <ModalSharePanel
        trigger={<button>Show modal</button>}
        shareLink='http://share.santiment.net/ffd689tset.com'
      />
    </div>
  ))
