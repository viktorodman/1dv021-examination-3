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
    </style>
    <span>Test</span>
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
  }
}

window.customElements.define('pong-game', PongGame)
