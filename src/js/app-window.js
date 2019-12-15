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
            width: 300px;
            height: 300px;
            background-color: #333;
            position: absolute;
            left: 0px;
            top: 0px;
            border-radius: 5px;
        }
        .app {
            width: 100%;
            height: 100%;
            background-color: red;
        }
    </style>
    <div class="window">
        <window-title-bar imgurl="image/chat.png" appname="Chat App"></window-title-bar>
        <div class="app"></div>
    </div>
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
    this._titleBar = this.shadowRoot.querySelector('window-title-bar')
    this._mousePosition = undefined
    this._offset = [0, 0]
    this._isDown = false

    this._windowTitleBar = this.shadowRoot.querySelector('window-title-bar')
    this._appElement = undefined
    this._appName = undefined
    this._appImg = undefined
    this._windowID = undefined
  }

  /**
   * Get what attributes attributeChangedCallback should look for
   *
   * @readonly
   * @static
   * @memberof WindowTitleBar
   */
  static get observedAttributes () {
    return ['appelement', 'imgurl', 'appname', 'windowid']
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
      this._appImg = newValue
    }
    if (name === 'appname') {
      this._appName = newValue
    }
    if (name === 'appelement') {
      this._appElement = newValue
    }
    if (name === 'windowid') {
      this._windowID = newValue
    }
  }

  /**
   * Source for moving windows
   * https://stackoverflow.com/questions/24050738/javascript-how-to-dynamically-move-div-by-clicking-and-dragging
   *
   * Runs when the element is appended to a document-connected element
   *
   * @memberof AppWindow
   */
  connectedCallback () {
    this._updateRendering()

    this._boundOnMouseMove = this._onMouseMove.bind(this)
    this._boundOnMouseUp = this._onMouseUp.bind(this)
    this._boundOnMouseDown = this._onMouseDown.bind(this)
    this._boundOnTitleEvent = this._onTitleEvent.bind(this)

    this._titleBar.addEventListener('mousedown', this._boundOnMouseDown)
    document.addEventListener('mouseup', this._boundOnMouseUp)
    document.addEventListener('mousemove', this._boundOnMouseMove)
    this._titleBar.addEventListener('titlebutton', this._boundOnTitleEvent)
  }

  /**
   * Runs when the element is removed from a document-connected element
   *
   * @memberof AppWindow
   */
  disconnectedCallback () {
    this._titleBar.removeEventListener('mousedown', this._boundOnMouseDown)
    document.removeEventListener('mouseup', this._boundOnMouseUp)
    document.removeEventListener('mousemove', this._boundOnMouseMove)
    this._titleBar.removeEventListener('titlebutton', this._boundOnTitleEvent)
  }

  _updateRendering () {
    if (this._appImg) {
      this._windowTitleBar.setAttribute('imgurl', this._appImg)
    }
    if (this._appName) {
      this._windowTitleBar.setAttribute('appname', this._appName)
    }
  }

  /**
   * Handels a custom event from window-title-bar
   *
   * @param {Event} event A custom event
   * @memberof AppWindow
   */
  _onTitleEvent (event) {
    this.dispatchEvent(new window.CustomEvent('windowexit', { detail: this._windowID }))
    console.log('då')
  }

  /**
   * Runs when a mousebutton is pressed on the window-title-bar element.
   * Sets this._isDown to true
   * @param {Event} event A mousedown event
   * @memberof AppWindow
   */
  _onMouseDown (event) {
    this._isDown = true
    this._offset = [
      this._window.offsetLeft - event.clientX,
      this._window.offsetTop - event.clientY
    ]
  }

  /**
   * Runs when the mouse button is released.
   * Sets this._isDown to false
   *
   * @param {Event} event A mouseup event
   * @memberof AppWindow
   */
  _onMouseUp (event) {
    this._isDown = false
  }

  /**
   * Runs when a mousebutton is pressed on the window-title-bar element
   * and the mouse is moved.
   *
   * @param {Event} event
   * @memberof AppWindow
   */
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
