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
        <pong-table></pong-table>
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
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof PongGame
   */
  connectedCallback () {
    console.log('From PongGame')
  }
}

window.customElements.define('pong-game', PongGame)
