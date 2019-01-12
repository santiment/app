import React, { Fragment } from 'react'
import { configure, addDecorator, setAddon } from '@storybook/react'
import InfoAddon, { setDefaults } from '@storybook/addon-info'

// addon-info
setDefaults({
  header: false
})

addDecorator(story => (
  <Fragment>
    <div id='dd-modal'>
      <template id='dd-template'>
        <div class='dd'>
          <div class='dd__list' />
          <div class='dd__arrow' />
          <div class='dd__bg' />
        </div>
      </template>
    </div>
    <div style={{ padding: 20, background: '#F6F6F8' }}>{story()}</div>
  </Fragment>
))
setAddon(InfoAddon)

function loadStories() {
  require('../stories/index.js')
}

configure(loadStories, module)
