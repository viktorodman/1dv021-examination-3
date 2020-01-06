/**
 * Module for PongGame
 *
 * @module src/js/Pong/pong-game
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
    <style>
        .wrapper {
            width: 100%;
            height: 100%;
            background-color: #FF4136;
        }
    </style>
    <div class="wrapper">
        <!-- <pong-table></pong-table> -->
        <pong-home></pong-home>
    </div>
`
/**
 * Represents a Pong Game
 *
 * @class PongGame
 * @extends {window.HTMLElement}
 */
class PongGame extends window.HTMLElement {
  /**
   * Creates an instance of PongGame.
   * @memberof PongGame
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._pongTable = this.shadowRoot.querySelector('pong-table')
    this._wrapper = this.shadowRoot.querySelector('.wrapper')
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof PongGame
   */
  connectedCallback () {
    /* this._pongTable.addEventListener('win', event => {
      const gameOver = document.createElement('game-over')
      this._pongTable.remove()
      this._wrapper.appendChild(gameOver)
    }) */
  }
}

window.customElements.define('pong-game', PongGame)
