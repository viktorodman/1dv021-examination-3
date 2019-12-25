/**
 * Module for ChatDisplay
 *
 * @module src/js/apps/Chat-App/chat-display
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `

`
class ChatDisplay extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}
window.customElements.define('chat-display', ChatDisplay)
