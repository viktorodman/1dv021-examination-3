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
            background-color: #001f3f;
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

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof ChatApp
   */
  connectedCallback () {
    this._boundOnNameEntered = this._onNameEntered.bind(this)
    this._boundOnNameChange = this._onNameChange.bind(this)
    if (JSON.parse(this._storage.getItem('chat')).username) {
      this._displayChat()
    } else {
      this._enterName()
    }
  }

  /**
   * Runs when the element is removed from a document-connected element
   *
   * @memberof ChatApp
   */
  disconnectedCallback () {
    if (this._newName) {
      this._newName.removeEventListener('nameEntered', this._boundOnNameEntered)
    }

    if (this._chat) {
      this._chat.removeEventListener('changeName', this._boundOnNameChange)
    }
  }

  /**
  * Creates an enter-name element and appends it to the chatContainer
  *
  * @memberof ChatApp
  */
  _enterName () {
    const nameEnter = document.createElement('enter-name')

    this._newName = this._chatContainer.appendChild(nameEnter)

    this._newName.addEventListener('nameEntered', this._boundOnNameEntered)
  }

  /**
   * Adds the entered name to the local storage.
   * Also removes the enter-name element and adds a chat-display
   *
   * @param {CustomEvent} event A custom event
   * @memberof ChatApp
   */
  _onNameEntered (event) {
    this._storage.setItem('chat', `{"username": "${event.detail}"}`)
    this._newName.removeEventListener('nameEntered', this._boundOnNameEntered)
    this._newName.remove()
    this._displayChat()
  }

  /**
   * Creates a chat-display element and appends it to the chatContainer
   *
   * @memberof ChatApp
   */
  _displayChat () {
    const chat = document.createElement('chat-display')
    chat.setAttribute('socketurl', this._socketURL)
    this._chat = this._chatContainer.appendChild(chat)

    this._chat.addEventListener('changeName', this._boundOnNameChange)
  }

  /**
   * Removes the chat and adds a enter-name element
   *
   * @param {CustomEvent} event A custom event
   * @memberof ChatApp
   */
  _onNameChange (event) {
    this._chat.removeEventListener('changeName', this._boundOnNameChange)
    this._chat.remove()
    this._enterName()
  }
}
window.customElements.define('chat-app', ChatApp)
