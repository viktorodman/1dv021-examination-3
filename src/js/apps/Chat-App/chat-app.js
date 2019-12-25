/**
 * Module for ChatApp
 *
 * @module src/js/apps/Chat-App/chat-app
 * @author Viktor Ödman
 * @version 1.0.0
*/
const template = document.createElement('template')
template.innerHTML = `
    <style>
        .chatContainer {
            background-color: #42c2f5;
            height: 100%;
        }
    </style>
    <div class="chatContainer">
    </div>
`
/**
 * Represent a Chat app
 *
 * @class ChatApp
 * @extends {window.HTMLElement}
 */
class ChatApp extends window.HTMLElement {
  /**
   * Creates an instance of ChatApp.
   * @memberof ChatApp
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._storage = window.localStorage
    this._chatContainer = this.shadowRoot.querySelector('.chatContainer')
    this._socketURL = 'ws://vhost3.lnu.se:20080/socket/'
    this._newName = undefined
    this._chat = undefined
  }

  /**
   * Get what attributes attributeChangedCallback should look for
   *
   * @readonly
   * @static
   * @memberof ChatApp
   */
  static get observedAttributes () {
    return ['socketurl']
  }

  /**
   * Is called when some of the observed attributes is called
   *
   * @param {String} name the attribute name
   * @param {String} oldValue old attribute value
   * @param {String} newValue new attribute value
   * @memberof ChatApp
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'socketurl') {
      this._socketURL = newValue
    }
  }

  connectedCallback () {
    if (JSON.parse(this._storage.getItem('chat')).username) {
      this._displayChat()
    } else {
      this._enterName()
    }
  }

  _enterName () {
    this._boundOnNameEntered = this._onNameEntered.bind(this)
    const nameEnter = document.createElement('enter-name')
    this._chatContainer.appendChild(nameEnter)
    this._newName = this.shadowRoot.querySelector('enter-name')

    this._newName.addEventListener('nameEntered', this._boundOnNameEntered)
  }

  _onNameEntered (event) {
    this._storage.setItem('chat', `{"username": "${event.detail}"}`)
    this._newName.removeEventListener('nameEntered', this._boundOnNameEntered)
    this._newName.remove()
    this._displayChat()
  }

  _displayChat () {
    const chat = document.createElement('chat-display')
    chat.setAttribute('socketurl', this._socketURL)
    this._chatContainer.appendChild(chat)
  }
}
window.customElements.define('chat-app', ChatApp)
