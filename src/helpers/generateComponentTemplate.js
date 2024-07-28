export function createComponentTemplate(globalStyles, componentHTML, componentType) {
  return `
import { LitElement, html, css } from 'lit';
import '@mdi/font/css/materialdesignicons.min.css';

class CustomComponent extends LitElement {
  static get styles () {
    return css\`
${globalStyles}
    \`;
  }

  render () {
    return html\`${componentHTML}\`;
  }
}

customElements.define('clovr-${componentType}', CustomComponent);
`;
}