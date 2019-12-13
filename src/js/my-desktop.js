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
    height: 100%;
    width: 100%;
    background-image: url('image/background.jpg');
    background-size: cover;
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

  _onAppClick (event) {
    console.log(event.detail.appName)
    console.log(event.detail.appImg)

    switch (event.detail.appName) {
      case 'memorygame': this._openNewMemoryGame(event.detail.appImg)
    }
  }

  _openNewMemoryGame (image) {
    console.log('memoryGame')
    console.log(image)
  }
}

window.customElements.define('my-desktop', MyDesktop)
