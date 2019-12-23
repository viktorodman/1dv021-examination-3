/**
 * Module for ChatMessage
 *
 * @module src/js/apps/Chat-App/chat-message
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
    <div class="messageContainer">
        <span class="message"></span>
    </div>
`
/**
 * Represent a chat message
 *
 * @class ChatMessage
 * @extends {window.HTMLElement}
 */
class ChatMessage extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}
window.customElements('chat-message', ChatMessage)
