/**
 * Module for message-area
 *
 * @module src/js/apps/Chat-App/message-area
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
    <div class="messageBox">
        text
    </div>
`

class MessageArea extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}
window.customElements.define('message-box', MessageArea)
