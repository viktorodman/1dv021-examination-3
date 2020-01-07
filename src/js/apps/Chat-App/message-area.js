/**
 * Module for message-area
 *
 * @module src/js/apps/Chat-App/message-area
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
  <style>
  :host {
        font-family: "Courier New", Courier, monospace;
    }
    .messageBox {
      height: 15%;
    }
    textarea::placeholder {
      color: #7FDBFF;
    }
    textarea {
      background-color: #111111;
      width: 93%;
      height: 100%;
      outline: none;
      resize: none;
      display: block;
      margin: auto;
      border-radius: 5px;
      border: 2px solid #111111;
      font-size: 20px;
      box-sizing: border-box;
      padding: 15px;
      color: #7FDBFF;
    }
  </style>
    <div class="messageBox">
        <textarea></textarea>
    </div>
`
/**
 * Represents a Message Area
 *
 * @class MessageArea
 * @extends {window.HTMLElement}
 */
class MessageArea extends window.HTMLElement {
  /**
   * Creates an instance of MessageArea.
   * @memberof MessageArea
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._textArea = this.shadowRoot.querySelector('textarea')
  }

  /**
   * Get what attributes attributeChangedCallback should look for
   *
   * @readonly
   * @static
   * @memberof ChatDisplay
   */
  static get observedAttributes () {
    return ['chatchannel']
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
    if (name === 'chatchannel') {
      this._updatePlaceHolder(newValue)
    }
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof MessageArea
   */
  connectedCallback () {
    this._boundOnEnter = this._onEnter.bind(this)
    this._textArea.addEventListener('keydown', this._boundOnEnter)
  }

  /**
   * Runs when the element is removed from a document-connected element
   *
   * @memberof MessageArea
   */
  disconnectedCallback () {
    this._textArea.removeEventListener('keydown', this._boundOnEnter)
  }

  /**
  * Runs when a key is pressed
  * Calls _sendMessage() if the the pressed key is 'enter'
  *
  * @param {Event} event A click Event
  * @memberof MessageArea
  */
  _onEnter (event) {
    if (event.code === 'Enter') {
      if (!event.shiftKey) {
        this._sendMessage(this._textArea.value)
        event.preventDefault()
        this._textArea.value = ''
      }
    }
  }

  /**
   * Dispatches an event with entered message
   *
   * @param {String} message A message
   * @memberof MessageArea
   */
  _sendMessage (message) {
    this.dispatchEvent(new window.CustomEvent('sendmessage', { detail: message }))
  }

  /**
   * Updates the placeholder text on the textarea
   *
   * @param {String} channel A channel name
   * @memberof MessageArea
   */
  _updatePlaceHolder (channel) {
    this._textArea.placeholder = `Message #${channel}`
  }
}
window.customElements.define('message-area', MessageArea)
