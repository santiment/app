function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import 'webkit/styles/color.css';
import 'webkit/styles/text.css';
import 'webkit/styles/layout.css';
import 'webkit/styles/elements.css';
import EmbeddableChartWidget from 'studio/EmbeddableChartWidget/WithApi';
import { studio } from 'studio/stores/studio';
import { globals } from 'studio/stores/globals';
import { newWidget } from 'studio/stores/widgets';
import { parseQueryString } from 'studio/ChartWidget/Controls/Embed/utils';

const _parseQueryString = parseQueryString(window.location.search),
      {
  from,
  to,
  slug,
  ticker,
  isNightMode,
  isWithMetricSettings
} = _parseQueryString,
      widgetProps = _objectWithoutProperties(_parseQueryString, ["from", "to", "slug", "ticker", "isNightMode", "isWithMetricSettings"]);

studio.setProject({
  from,
  to,
  slug,
  ticker
});
globals.toggle('isNightMode', isNightMode);
document.body.classList.toggle('night-mode', isNightMode);

window.onload = () => {
  document.body.innerHTML = '';
  document.body.style.height = '100vh';
  new EmbeddableChartWidget({
    target: document.body,
    props: {
      isWithMetricSettings,
      widget: newWidget(null, widgetProps)
    }
  });
};

export default (() => null);