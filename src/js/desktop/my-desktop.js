/**
 * Module for MyDesktop
 *
 * @module src/js/desktop/my-desktop
 * @author Viktor Ödman
 * @version 1.0.0
*/
import './info-bar.js'
import '../taskbar/task-bar.js'
import '../window/app-window.js'
import '../apps/Memory-Game/memory-game.js'
import '../apps/Chat-App/chat-app.js'
import '../apps/Pong/pong-game.js'

const template = document.createElement('template')
template.innerHTML = `
<style>
  .main {
    max-height: 100%;
    max-width: 100%;
    min-height: 100%;
    min-width: 100%;
    background-image: url('image/background.jpg');
    background-size: cover;
    background-attachment:fixed;
    background-repeat: no-repeat;
    background-position: bottom;
    
  }
  a {
    position: absolute;
  }
  a:focus {
    background-color: yellow;
  }
  
</style>
<div class="main">
  <info-bar></info-bar>
  <task-bar></task-bar>
</div>
`
/**
 * Represents a Desktop
 *
 * @class MyDesktop
 * @extends {window.HTMLElement}
 */
class MyDesktop extends window.HTMLElement {
  /**
   * Creates an instance of MyDesktop.
   * @memberof MyDesktop
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._taskBar = this.shadowRoot.querySelector('task-bar')
    this._mainWindow = this.shadowRoot.querySelector('.main')
    this._windowID = 0
    this._storage = window.localStorage
    this._startAppPos = {
      x: 40,
      y: 40
    }
    this._appPosition = {
      x: this._startAppPos.x,
      y: this._startAppPos.y
    }

    this.appPosIncrement = 50
    this._latestWindow = undefined
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof MyDesktop
   */
  connectedCallback () {
    if (this._storage.getItem('chat') === null) {
      this._storage.setItem('chat', '{}')
    }

    this._boundOnAppClick = this._onAppClick.bind(this)
    this._boundOnAppExit = this._onAppExit.bind(this)
    this._boundOnWindowClick = this._onWindowClick.bind(this)

    this._taskBar.addEventListener('appclicked', this._boundOnAppClick)
    this._mainWindow.addEventListener('mousedown', this._boundOnWindowClick)
  }

  /**
   * Runs when the element is removed from a document-connected element
   *
   * @memberof MyDesktop
   */
  disconnectedCallback () {
    if (this._mainWindow.querySelectorAll('app-window').length > 0) {
      this._mainWindow.querySelectorAll('app-window').forEach(window => {
        window.removeEventListener('windowexit', this._boundOnAppExit)
      })
    }
    this._taskBar.removeEventListener('appclicked', this._boundOnAppClick)
    this._mainWindow.removeEventListener('click', this._boundOnWindowClick)
  }

  /**
   *  Handels the clicks on the taskbars buttons
   *
   * @param {CustomEvent} event A custom event
   * @memberof MyDesktop
   */
  _onAppClick (event) {
    this._windowID++
    event.preventDefault()
    if (this._latestWindow) {
      this._checkWindowPosition(this._latestWindow)
    }

    switch (event.detail.appName) {
      case 'memorygame' : this._openAppWindow('memory-game', 400, 450, event.detail)
        break
      case 'chatapp' : this._openAppWindow('chat-app', 400, 450, event.detail)
        break
      case 'pong' : this._openAppWindow('pong-game', 600, 400, event.detail)
        break
    }
  }

  /**
   * Opens a new app-window with the passed height, width and app
   *
   * @param {String} elementName A custom element name
   * @param {Number} width The app-windows width
   * @param {*} height The app-windows height
   * @param {Object} appDetails The name of the app and a img URL
   * @memberof MyDesktop
   */
  _openAppWindow (elementName, width, height, appDetails) {
    const appWindow = document.createElement('app-window')

    appWindow.setAttribute('appwidth', width)
    appWindow.setAttribute('appheight', height)

    appWindow.setAttribute('elementname', elementName)
    appWindow.setAttribute('imgurl', appDetails.appImg)
    appWindow.setAttribute('appname', appDetails.appName)
    appWindow.setAttribute('windowid', this._windowID)

    appWindow.setAttribute('zindex', this._windowID)
    appWindow.setAttribute('startx', `${this._appPosition.x}px`)
    appWindow.setAttribute('starty', `${this._appPosition.y}px`)

    this._appPosition.x += this.appPosIncrement
    this._appPosition.y += this.appPosIncrement
    this._latestWindow = this._mainWindow.appendChild(appWindow)
    appWindow.addEventListener('windowexit', this._boundOnAppExit)
  }

  /**
   * Checks the next app-windows position is going to appear outside of
   * the desktop.
   *
   * @param {HTMLElement} appWindow The most recently opened window
   * @memberof MyDesktop
   */
  _checkWindowPosition (appWindow) {
    if (appWindow.getBottomPosition() + this.appPosIncrement > this._mainWindow.offsetHeight) {
      this._appPosition.x += this._startAppPos.x * 4
      this._appPosition.y = this._startAppPos.y
    }
    if (appWindow.getRightPosition() + this.appPosIncrement > this._mainWindow.offsetWidth) {
      this._appPosition.x = this._startAppPos.x
      this._appPosition.y = this._startAppPos.y
    }
  }

  /**
   * Removes the clicked app-window from the dom
   *
   * @param {Event} event A Custom Event
   * @memberof MyDesktop
   */
  _onAppExit (event) {
    const appWindows = this._mainWindow.querySelectorAll('app-window')
    let selectedWindow
    appWindows.forEach(window => {
      if (window.getAttribute('windowid') === event.detail) {
        selectedWindow = window
      }
    })
    selectedWindow.removeEventListener('windowexit', this._boundOnAppExit)
    selectedWindow.remove()
  }

  /**
   * Changes the windows Z-index.
   *
   * @param {Event} event A click event
   * @memberof MyDesktop
   */
  _onWindowClick (event) {
    if (event.target.nodeName !== 'APP-WINDOW' || this._mainWindow.querySelectorAll('app-window').length < 1) {
      return
    }
    const clickedZIndex = event.target.getAttribute('zindex')
    const windowCollection = this._mainWindow.querySelectorAll('app-window')
    const sortedWindows = this.sortByZIndex(windowCollection)

    if (event.target !== sortedWindows[0]) {
      const filteredWindows = sortedWindows.filter(windows => windows.getAttribute('zindex') > clickedZIndex)
      event.target.setAttribute('zindex', sortedWindows[0].getAttribute('zindex'))

      filteredWindows.forEach(appwindow => {
        const newZIndex = Number(appwindow.getAttribute('zindex')) - 1
        appwindow.setAttribute('zindex', newZIndex)
      })
    }
  }

  /**
   * Sorts the passed elements by the z-index
   *
   * @param {HTMLCollection} elements a collection of app-windows
   * @returns {Array} Returns a sorted array
   * @memberof MyDesktop
   */
  sortByZIndex (elements) {
    const elementsArray = Array.from(elements)
    return elementsArray.sort((a, b) => Number(b.getAttribute('zindex')) - Number(a.getAttribute('zindex')))
  }
}

window.customElements.define('my-desktop', MyDesktop)
