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
        .messageContainer {
            height: 80%;
            overflow: auto;
        }
    </style>
    <div class="chatContainer">
        <div class="messageContainer">
        </div>
        <message-area></message-area>
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

    this._socket = undefined
    this._socketURL = 'ws://vhost3.lnu.se:20080/socket/'
    this._userMessage = this.shadowRoot.querySelector('message-area')
    this._messageContainer = this.shadowRoot.querySelector('.messageContainer')
    this._data = {
      type: 'message',
      data: '',
      username: 'testname',
      channel: '',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
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
    this._socket = new window.WebSocket(this._socketURL)

    this._boundOnOpen = this._onOpen.bind(this)
    this._boundOnMessage = this._onMessage.bind(this)
    this._boundOnSendMessage = this._onSendMessage.bind(this)

    this._socket.addEventListener('open', this._boundOnOpen)
    this._socket.addEventListener('message', this._boundOnMessage)
    this._userMessage.addEventListener('sendmessage', this._boundOnSendMessage)
  }

  disconnectedCallback () {
    this._socket.close()
    this._socket.removeEventListener('open', this._boundOnOpen)
    this._socket.removeEventListener('message', this._boundOnMessage)
    this._userMessage.removeEventListener('sendmessage', this._boundOnSendMessage)
  }

  _onOpen (event) {
    this._socket.send(JSON.stringify(this._data))
  }

  _onMessage (event) {
    const data = JSON.parse(event.data)
    console.log(data)
    const message = document.createElement('chat-message')
    message.setAttribute('username', data.username)
    message.setAttribute('message', data.data)
    this._messageContainer.appendChild(message)
    this._messageContainer.scrollTop = this._messageContainer.scrollHeight
  }

  _onSendMessage (event) {
    console.log(event.detail)
    const sendmessage = {
      type: 'message',
      data: event.detail,
      username: 'testname',
      channel: '',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
    this._socket.send(JSON.stringify(sendmessage))
  }
}
window.customElements.define('chat-app', ChatApp)
