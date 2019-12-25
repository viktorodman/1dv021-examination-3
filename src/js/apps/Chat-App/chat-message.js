/**
 * Module for ChatMessage
 *
 * @module src/js/apps/Chat-App/chat-message
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
    <style>
        .messageContainer {
            background-color:grey;
            border-top: 1px solid white;
            border-bottom: 1px solid white;
        }
    </style>
    <div class="messageContainer">
        <span class="username"></span>
        <span> : </span>
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

    this._userName = undefined
    this._message = undefined

    this._nameSpan = this.shadowRoot.querySelector('.username')
    this._messageSpan = this.shadowRoot.querySelector('.message')
  }

  /**
   * Get what attributes attributeChangedCallback should look for
   *
   * @readonly
   * @static
   * @memberof ChatMessage
   */
  static get observedAttributes () {
    return ['username', 'message']
  }

  /**
   * Is called when some of the observed attributes is called
   *
   * @param {String} name the attribute name
   * @param {String} oldValue old attribute value
   * @param {String} newValue new attribute value
   * @memberof ChatMessage
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'username') {
      this._userName = newValue
    }
    if (name === 'message') {
      this._message = newValue
    }
  }

  connectedCallback () {
    this._messageSpan.textContent = this._message
    this._nameSpan.textContent = this._userName
  }
}
window.customElements.define('chat-message', ChatMessage)
