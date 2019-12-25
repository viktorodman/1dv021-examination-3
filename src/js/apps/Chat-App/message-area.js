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
    .messageBox {
      height: 20%;
    }
    textArea {
      background-color: red;
      width: 100%;
      height: 100%;
      outline: none;
      resize: none;
    }
    button {
      font-size: 30px;
    }
  </style>
    <div class="messageBox">
        <textarea></textarea>
        
    </div>
`

class MessageArea extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._textArea = this.shadowRoot.querySelector('textarea')
    this._button = this.shadowRoot.querySelector('button')
  }

  connectedCallback () {
    this._boundOnButtonClick = this._onButtonClick.bind(this)
    this._boundOnEnter = this._onEnter.bind(this)
    /* this._button.addEventListener('click', this._boundOnButtonClick) */
    this._textArea.addEventListener('keydown', this._boundOnEnter)
  }

  _onEnter (event) {
    if (event.code === 'Enter') {
      if (!event.shiftKey) {
        this._sendMessage(this._textArea.value)
        event.preventDefault()
        this._textArea.value = ''
      }
    }
    /* event.preventDefault() */
  }

  _onButtonClick (event) {
    event.preventDefault()
    if (this._textArea.value.length > 0) {
      this._sendMessage(this._textArea.value)
    }
  }

  _sendMessage (message) {
    this.dispatchEvent(new window.CustomEvent('sendmessage', { detail: message }))
  }
}
window.customElements.define('message-area', MessageArea)
