import EmbeddableChartWidget from 'studio/EmbeddableChartWidget';
import 'webkit/styles/color.css';
import 'webkit/styles/text.css';
import 'webkit/styles/layout.css';
import 'webkit/styles/elements.css';

window.onload = () => {
  document.body.innerHTML = '';
  document.body.style.height = '100vh';
  new EmbeddableChartWidget({
    target: document.body
  });
};

export default (() => null);