import 'webkit/styles/color.css'
import 'webkit/styles/text.css'
import 'webkit/styles/layout.css'
import 'webkit/styles/elements.css'
import EmbeddableChartWidget from 'studio/EmbeddableChartWidget/WithApi'
import { studio } from 'studio/stores/studio'
import { parseUrl } from '../Studio/sharing/parse.js'

const { settings, widgets } = parseUrl(window.location.search)
studio.setProject(settings)

window.onload = () => {
  document.body.innerHTML = ''
  document.body.style.height = '100vh'
  new EmbeddableChartWidget({
    target: document.body,
    props: {
      widget: widgets[0] || {}
    }
  })
}

export default () => null
