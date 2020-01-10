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
        :host {
            /* font-family: monospace; */
            font-family: "Courier New", Courier, monospace;
            font-size: 15px;
            letter-spacing: 1px;
        }
        .messageContainer {
            /* background-color:grey; */
            border-bottom: 1px solid #7FDBFF;
            color: #7FDBFF;
            margin-top: 10px;
            margin-bottom: 10px;
            padding-bottom: 10px;
            overflow-wrap: break-word;
        }
        .username {
            text-transform: uppercase;
        }
        .server {
            color: #FF4136;
            font-style: oblique;
        }
    </style>
    <div class="messageContainer">
        <span class="username"></span>
        <span>: </span>
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
  /**
   * Creates an instance of ChatMessage.
   * @memberof ChatMessage
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._userName = undefined
    this._message = undefined

    this._nameSpan = this.shadowRoot.querySelector('.username')
    this._messageSpan = this.shadowRoot.querySelector('.message')
    this._serverMessage = false
    this._messageContainer = this.shadowRoot.querySelector('.messageContainer')
  }

  /**
   * Get what attributes attributeChangedCallback should look for
   *
   * @readonly
   * @static
   * @memberof ChatMessage
   */
  static get observedAttributes () {
    return ['username', 'message', 'server']
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
    if (name === 'server') {
      if (newValue === 'true') {
        this._serverMessage = true
      }
    }
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof ChatMessage
   */
  connectedCallback () {
    this._messageSpan.textContent = this._message
    this._nameSpan.textContent = this._userName
    if (this._serverMessage) {
      this._messageContainer.classList.add('server')
    }
  }
}
window.customElements.define('chat-message', ChatMessage)
