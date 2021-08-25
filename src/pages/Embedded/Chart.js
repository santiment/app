import 'webkit/styles/color.css'
import 'webkit/styles/text.css'
import 'webkit/styles/layout.css'
import 'webkit/styles/elements.css'
import EmbeddableChartWidget from 'studio/EmbeddableChartWidget/WithApi'
import { studio } from 'studio/stores/studio'
import { globals } from 'studio/stores/globals'
import { newWidget } from 'studio/stores/widgets'
import { parseQueryString } from 'studio/ChartWidget/Controls/Embed/utils'

const {
  from,
  to,
  slug,
  ticker,
  isNightMode,
  isWithMetricSettings,
  ...widgetProps
} = parseQueryString(window.location.search)

studio.setProject({ from, to, slug, ticker })
globals.toggle('isNightMode', isNightMode)
document.body.classList.toggle('night-mode', isNightMode)

window.onload = () => {
  document.body.innerHTML = ''
  document.body.style.height = '100vh'
  new EmbeddableChartWidget({
    target: document.body,
    props: {
      isWithMetricSettings,
      widget: newWidget(null, widgetProps)
    }
  })
}

export default () => null
