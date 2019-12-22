/**
 * Module for ChatApp
 *
 * @module src/js/apps/Chat-App/chat-app
 * @author Viktor Ödman
 * @version 1.0.0
*/

class ChatApp extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }
}
window.customElements.define('chat-app', ChatApp)
