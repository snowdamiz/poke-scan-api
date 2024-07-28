
import { LitElement, html, css } from 'lit';
import '@mdi/font/css/materialdesignicons.min.css';

class CustomComponent extends LitElement {
  static get styles () {
    return css`
      .clovr-div-div-1 {
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
      }

      .clovr-div-div-1-input-2 {
        background-color: #fff;
        size: 16px;
        color: #000;
        padding: 6px 10px;
        box-shadow: none;
        border: 2px solid gray;
        border-radius: 4px;
        width: fit-content;
      }

      .clovr-div {
        flex-flow: row nowrap;
        padding: 10px;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
      }
    `;
  }

  render () {
    return html`
      <div class="clovr-div">
         <div class="clovr-div-div-1">
            <input class="clovr-div-div-1-input-2"></input>
         </div>
      </div>
    `;
  }
}

customElements.define('clovr-generic', CustomComponent);
