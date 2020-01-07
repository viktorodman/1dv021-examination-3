/**
 * Module for EnterName
 *
 * @module src/js/apps/Chat-App/enter-name
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
<style>
    :host {
        text-align: center;
        font-size: 30px;
        color: #7FDBFF;
    }
  .wrapper {
    height: 100%;
    width: 100%;
    
  }
  button {
        font-size: 30px;
        margin-bottom: 20px;
        background-color: #7FDBFF;
        transition-duration: 0.4s;
        padding-left: 30px;
        padding-right: 30px;
        margin-top: 20px;
        outline: none;
    }
    button:hover {
        background-color: #cfcfcf;
    }
    input[type="text"] {
        font-size: 30px;
        text-align: center;
        margin-bottom: 20px;
        border: none;
        border-bottom: 2px solid #7FDBFF;
        background-color: #001f3f;
        width: 30%;
        color: #7FDBFF;
    }
    input[type="text"]::placeholder {
        color: #7FDBFF;
        opacity: 1;
    }
    .title {
        font-size: 60px;
        margin: 0px;
        padding-top: 15px;
    }
    .errorMessage {
      color: red;
    }
</style>
<div class="wrapper">
    <div>
      <h2 class="title">CHAT APP</h2>
    </div>
    <div>
      <p class="description">Enter your name</p>
    </div>
    <div>
      <input class="name" type="text" placeholder="Name">
    </div>
    <div>
    <button class="nameButton">Start</button>
    </div>
    <div>
        <p class="errorMessage"></p>
    </div>
  </div>
`
/**
 * Represents a Enter name form
 *
 * @class EnterName
 * @extends {window.HTMLElement}
 */
class EnterName extends window.HTMLElement {
  /**
   * Creates an instance of EnterName.
   * @memberof EnterName
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._button = this.shadowRoot.querySelector('.nameButton')
    this._input = this.shadowRoot.querySelector('.name')
    this._error = this.shadowRoot.querySelector('.errorMessage')
    this._name = undefined
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof EnterName
   */
  connectedCallback () {
    this._boundOnButtonClick = this._addName.bind(this)
    this._boundOnEnter = this._onEnter.bind(this)

    this._button.addEventListener('click', this._boundOnButtonClick)
    this._input.addEventListener('keydown', this._boundOnEnter)
  }

  /**
   * Runs when the element is removed from a document-connected element
   *
   * @memberof EnterName
   */
  disconnectedCallback () {
    this._button.removeEventListener('click', this._boundOnButtonClick)
    this._input.removeEventListener('keydown', this._boundOnEnter)
  }

  /**
  * Runs when a key is pressed
  * Calls this._addName() if the the pressed key is 'enter'
  *
  * @param {*} event
  * @memberof EnterName
  */
  _onEnter (event) {
    if (event.code === 'Enter') {
      this._addName()
    }
  }

  /**
  * Dispatches a new event with the entered name
  * if a name is entered
  *
  * @memberof EnterName
  */
  _addName () {
    if (this._input.value.length > 0) {
      this._name = this._input.value
      this.dispatchEvent(new window.CustomEvent('nameEntered', { detail: this._name }))
    } else {
      this._error.textContent = 'Please Enter A Name'
    }
  }
}

window.customElements.define('enter-name', EnterName)
