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
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof MyDesktop
   */
  connectedCallback () {
    this._boundOnAppClick = this._onAppClick.bind(this)

    this._taskBar.addEventListener('appclicked', this._boundOnAppClick)
  }

  /**
   *  Handels the clicks on the taskbars buttons
   *
   * @param {CustomEvent} event A custom event
   * @memberof MyDesktop
   */
  _onAppClick (event) {
    switch (event.detail.appName) {
      case 'memorygame': this._openNewMemoryGame(event.detail.appImg)
        break
      case 'chatapp': this._openNewChat(event.detail.appImg)
        break
      case 'default': this._openDefaultApp(event.detail.appImg)
    }
  }

  /**
   * Opens a new Memory Game Window
   *
   * @param {String} image A image url
   * @memberof MyDesktop
   */
  _openNewMemoryGame (image) {
    console.log('IN MEMORY GAME')
    console.log(image)
  }

  /**
   * Opens a new Chat Window
   *
   * @param {String} image A image url
   * @memberof MyDesktop
   */
  _openNewChat (image) {
    console.log('IN CHAT APP')
    console.log(image)
  }

  /**
   * Opens a new Default App Window
   *
   * @param {String} image A image url
   * @memberof MyDesktop
   */
  _openDefaultApp (image) {
    console.log('IN DEFAULT APP')
    console.log(image)
  }
}

window.customElements.define('my-desktop', MyDesktop)
