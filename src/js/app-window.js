/**
 * Module for TaskButton
 *
 * @module src/js/app-window
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
    <style>
        .window {
            width: 150px;
            height: 150px;
            background-color: black;
            position: absolute;
            left: 0px;
            top: 0px;

        }
    </style>
    <div class="window"></div>
`
/**
 * Represents a App Window
 *
 * @class AppWindow
 * @extends {window.HTMLElement}
 */
class AppWindow extends window.HTMLElement {
  /**
   * Creates an instance of AppWindow.
   * @memberof AppWindow
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._window = this.shadowRoot.querySelector('.window')
    this._mousePosition = undefined
    this._offset = [0, 0]
    this._isDown = false
  }

  /**
   * Sourse for moving windows
   * https://stackoverflow.com/questions/24050738/javascript-how-to-dynamically-move-div-by-clicking-and-dragging
   *
   * Runs when the element is appended to a document-connected element
   *
   * @memberof AppWindow
   */
  connectedCallback () {
    this._boundOnMouseMove = this._onMouseMove.bind(this)
    this._boundOnMouseUp = this._onMouseUp.bind(this)
    this._boundOnMouseDown = this._onMouseDown.bind(this)

    this._window.addEventListener('mousedown', this._boundOnMouseDown)
    document.addEventListener('mouseup', this._boundOnMouseUp)
    document.addEventListener('mousemove', this._boundOnMouseMove)
  }

  _onMouseDown (event) {
    this._isDown = true
    this._offset = [
      this._window.offsetLeft - event.clientX,
      this._window.offsetTop - event.clientY
    ]
  }

  _onMouseUp (event) {
    this._isDown = false
  }

  _onMouseMove (event) {
    event.preventDefault()
    if (this._isDown) {
      this._mousePosition = {
        x: event.clientX,
        y: event.clientY
      }
      this._window.style.left = (this._mousePosition.x + this._offset[0]) + 'px'
      this._window.style.top = (this._mousePosition.y + this._offset[1]) + 'px'
    }
  }
}

window.customElements.define('app-window', AppWindow)
