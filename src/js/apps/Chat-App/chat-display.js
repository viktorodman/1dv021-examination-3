/**
 * Module for ChatDisplay
 *
 * @module src/js/apps/Chat-App/chat-display
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
    <style>
    .messageContainer {
        height: 70%;
        overflow: auto;
        padding: 12px;
    }
    </style>
    <div class="messageContainer">
    </div>
    <message-area></message-area>
`
class ChatDisplay extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._socket = undefined
    this._socketURL = undefined
    this._userMessage = this.shadowRoot.querySelector('message-area')
    this._messageContainer = this.shadowRoot.querySelector('.messageContainer')
    this._data = {
      type: 'message',
      data: '',
      username: 'testname',
      channel: '',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
    this._userName = JSON.parse(window.localStorage.getItem('chat')).username
  }

  /**
   * Get what attributes attributeChangedCallback should look for
   *
   * @readonly
   * @static
   * @memberof ChatDisplay
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
   * @memberof ChatDisplay
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
    console.log(this._userName)
  }

  disconnectedCallback () {
    this._socket.close()
    this._socket.removeEventListener('open', this._boundOnOpen)
    this._socket.removeEventListener('message', this._boundOnMessage)
    this._userMessage.removeEventListener('sendmessage', this._boundOnSendMessage)
  }

  _onOpen (event) {
    /* this._socket.send(JSON.stringify(this._data)) */
  }

  _onMessage (event) {
    const data = JSON.parse(event.data)
    console.log(data)
    if (data.username === 'The Server' && data.type === 'heartbeat') {
      return
    }
    const message = document.createElement('chat-message')
    if (data.username === 'The Server') {
      message.setAttribute('server', 'true')
    }
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
      username: this._userName,
      channel: '',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
    this._socket.send(JSON.stringify(sendmessage))
  }
}
window.customElements.define('chat-display', ChatDisplay)
