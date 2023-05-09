import EmbeddableChartWidget from 'san-studio/lib/EmbeddableChartWidget';
import 'san-webkit/lib/styles/color.css';
import 'san-webkit/lib/styles/text.css';
import 'san-webkit/lib/styles/layout.css';
import 'san-webkit/lib/styles/elements.css';

window.onload = () => {
  document.body.innerHTML = '';
  document.body.style.height = '100vh';
  new EmbeddableChartWidget({
    target: document.body
  });
};

export default (() => null);