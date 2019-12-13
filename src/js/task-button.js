/**
 * Module for TaskButton
 *
 * @module src/js/task-button
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
    <style>
        .taskButton {
        margin-top:5px;
        margin-left: 5px;
        margin-right: 5px;
        border-radius: 25px;
        background-color: Transparent;
        background-repeat:no-repeat;
        border: none;
        cursor:pointer;
        overflow: hidden;
        outline:none;
        }
        img {
            width: 80px;
        }
    </style>
    <button class="taskButton"><img src="image/default.png"></button>
`
/**
 * Represents a Button
 *
 * @class TaskButton
 * @extends {window.HTMLElement}
 */
class TaskButton extends window.HTMLElement {
  /**
   * Creates an instance of TaskButton.
   * @memberof TaskButton
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._img = this.shadowRoot.querySelector('img')
    this._imgURL = null
    this._appName = undefined
  }

  /**
   * Get what attributes attributeChangedCallback should look for
   *
   * @readonly
   * @static
   * @memberof TaskButton
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
   * @memberof HighScore
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'imgurl') {
      this._imgURL = newValue
    }
    if (name === 'appname') {
      this._appName = newValue
    }
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof TaskButton
   */
  connectedCallback () {
    if (this._imgURL) {
      this._img.setAttribute('src', this._imgURL)
    }
  }
}

window.customElements.define('task-button', TaskButton)
