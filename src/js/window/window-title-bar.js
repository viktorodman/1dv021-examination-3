/**
 * Module for WindowTitleBar
 *
 * @module src/js/window/window-title-bar.js
 * @author Viktor Ödman
 * @version 1.0.0
*/
const template = document.createElement('template')
template.innerHTML = `
    <style>
        .titlebar {
            width: 100%;
            height: 8%;
            background-color: white;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            display: flex;
        }
        button {
            width: 17px;
            height: 17px;
            background-color: red;
            border-radius: 50%;
            border: 1px solid red;
            text-align: center;
            padding: 0px;
            font-size: 10px;
            margin-left: 8px;
            margin-top: 4px;
            outline:none;
        }
        .titleButtons {
            width: 10%;
        }
        .titleText {
            width: 80%;
            text-align: center;
        }
        .titleImage {
            width: 10%;
        }
        .appImage {
            width: 20px;
            margin-top: 2px;
        }
    </style>
    <div class="titlebar">
        <div class="titleButtons">
            <button name="exit">X</button>
        </div>
        <div class="titleText">
            <span class="title">Sample</span>
        </div>
        <div class="titleImage">
            <img class="appImage" src="image/app-icons/memory.png">
        </div>
    </div>
`
/**
 * Represents a Window Title Bar
 *
 * @class WindowTitleBar
 * @extends {window.HTMLElement}
 */
class WindowTitleBar extends window.HTMLElement {
  /**
   * Creates an instance of WindowTitleBar.
   * @memberof WindowTitleBar
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._title = this.shadowRoot.querySelector('.title')
    this._image = this.shadowRoot.querySelector('.appImage')
    this._buttons = this.shadowRoot.querySelector('.titleButtons')
    this._titleText = undefined
    this._imgURL = undefined
    this._clickedButton = null
  }

  /**
   * Get what attributes attributeChangedCallback should look for
   *
   * @readonly
   * @static
   * @memberof WindowTitleBar
   */
  static get observedAttributes () {
    return ['imgurl', 'appname']
  }

  /**
   * Is called when some of the observed attributes is called
   *
   * @param {String} name the attribute name
   * @param {String} oldValue old attribute value
   * @param {String} newValue new attribute value
   * @memberof TaskButton
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'imgurl') {
      this._imgURL = newValue
    }
    if (name === 'appname') {
      this._titleText = newValue
    }
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof WindowTitleBar
   */
  connectedCallback () {
    this._image.setAttribute('src', this._imgURL)
    this._title.textContent = this._titleText
    this._boundOnButtonClick = this._onButtonClick.bind(this)
    this._buttons.addEventListener('click', this._boundOnButtonClick)
  }

  _onButtonClick (event) {
    if (event.target.nodeName !== 'BUTTON') {
      return
    }
    console.log('hej')
    this._clickedButton = event.target.name
    console.log(this._clickedButton)
    this.dispatchEvent(new window.CustomEvent('titlebutton', { detail: this._clickedButton }))
  }
}

window.customElements.define('window-title-bar', WindowTitleBar)
