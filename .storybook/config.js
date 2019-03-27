import React from 'react'
import { configure, addDecorator, setAddon } from '@storybook/react'
import { withInfo, setDefaults } from '@storybook/addon-info'

// addon-info
setDefaults({
  header: false
})

if (window.document) {
  const ddModal = window.document.createElement('div')
  ddModal.id = 'dd-modal'
  ddModal.innerHTML = `
      <template id='dd-template'>
        <div class='dd'>
          <div class='dd__list' ></div>
          <div class='dd__arrow' ></div>
          <div class='dd__bg' ></div>
        </div>
      </template>
  `
  window.document.body.appendChild(ddModal)
}


addDecorator(withInfo)
addDecorator(story => <div style={{ padding: 20, background: '#F6F6F8' }}>{story()}</div>)

function loadStories() {
  require('../stories/index.js')
}

configure(loadStories, module)
