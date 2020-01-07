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
        height: 65%;
        overflow: auto;
        padding: 12px;
    }
    .nameChange {
        margin-left: 15px;
        color: #7FDBFF;
        background-color: #111111;
        border: none;
        margin-bottom: 2px;
        outline: none;
        transition-duration: 0.4s;
    }
    .nameChange:hover {
        background-color: #7FDBFF; /* Green */
        color: #111111;
    }
    </style>
    <channel-picker></channel-picker>
    <div class="messageContainer">
    </div>
    <button class="nameChange">Change Name</button>
    <message-area></message-area>
`
/**
 * Represent a Chat Display
 *
 * @class ChatDisplay
 * @extends {window.HTMLElement}
 */
class ChatDisplay extends window.HTMLElement {
  /**
   * Creates an instance of ChatDisplay.
   * @memberof ChatDisplay
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._socket = undefined
    this._socketURL = undefined
    this._userMessage = this.shadowRoot.querySelector('message-area')
    this._messageContainer = this.shadowRoot.querySelector('.messageContainer')
    this._changeName = this.shadowRoot.querySelector('.nameChange')
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

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof ChatDisplay
   */
  connectedCallback () {
    this._socket = new window.WebSocket(this._socketURL)

    this._boundOnMessage = this._onMessage.bind(this)
    this._boundOnSendMessage = this._onSendMessage.bind(this)
    this._boundOnNameChange = this._onNameChange.bind(this)

    this._socket.addEventListener('message', this._boundOnMessage)
    this._userMessage.addEventListener('sendmessage', this._boundOnSendMessage)
    this._changeName.addEventListener('click', this._boundOnNameChange)
  }

  /**
   * Runs when the element is removed from a document-connected element
   *
   * @memberof ChatDisplay
   */
  disconnectedCallback () {
    this._socket.close()
    this._socket.removeEventListener('message', this._boundOnMessage)
    this._userMessage.removeEventListener('sendmessage', this._boundOnSendMessage)
    this._changeName.removeEventListener('click', this._boundOnNameChange)
  }

  /**
   * Creates a new chat-message when the chat receives a new
   * message from the websocket
   *
   * @param {Event} event An message Event
   * @memberof ChatDisplay
   */
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

  /**
   * Send a message to the websocket server
   *
   * @param {CustomEvent} event A Custom Event
   * @memberof ChatDisplay
   */
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

  /**
  * Dispatches a Custom Event when the change name button is clicked
  *
  * @param {Event} event A click Event
  * @memberof ChatDisplay
  */
  _onNameChange (event) {
    this.dispatchEvent(new window.CustomEvent('changeName'))
  }
}
window.customElements.define('chat-display', ChatDisplay)
