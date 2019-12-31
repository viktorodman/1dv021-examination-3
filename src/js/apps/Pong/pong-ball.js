/**
 * Module for PongPaddle
 *
 * @module src/js/Pong/pong-paddle
 * @author Viktor Ödman
 * @version 1.0.0
*/

class PongBall extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }
}

window.customElements.define('pong-ball', PongBall)
