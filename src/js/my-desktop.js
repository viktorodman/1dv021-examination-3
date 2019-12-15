/**
 * Module for MyDesktop
 *
 * @module src/js/my-desktop
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
<style>
  .main {
    /* height: 100%;
    width: 100%; */
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
  
</style>
<div class="main">
  <!-- <app-window imgurl="image/memory.png" appname="memoryGame"></app-window> -->
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
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof MyDesktop
   */
  connectedCallback () {
    this._boundOnAppClick = this._onAppClick.bind(this)
    this._boundOnAppExit = this._onAppExit.bind(this)

    this._taskBar.addEventListener('appclicked', this._boundOnAppClick)
  }

  /**
   *  Handels the clicks on the taskbars buttons
   *
   * @param {CustomEvent} event A custom event
   * @memberof MyDesktop
   */
  _onAppClick (event) {
    this._windowID++
    const appWindow = document.createElement('app-window')
    appWindow.setAttribute('imgurl', event.detail.appImg)
    appWindow.setAttribute('appname', event.detail.appName)
    appWindow.setAttribute('windowid', this._windowID)
    this._mainWindow.appendChild(appWindow)
    appWindow.addEventListener('windowexit', this._boundOnAppExit)
  }

  _onAppExit (event) {
    const appWindows = this._mainWindow.querySelectorAll('app-window')
    let selectedWindow
    appWindows.forEach(window => {
      if (window.getAttribute('windowid') === event.detail) {
        selectedWindow = window
      }
    })
    selectedWindow.remove()
  }
}

window.customElements.define('my-desktop', MyDesktop)
