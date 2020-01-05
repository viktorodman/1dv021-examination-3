/**
 * Module for GameOver
 *
 * @module src/js/Pong/game-over
 * @author Viktor Ödman
 * @version 1.0.0
*/
const template = document.createElement('template')
template.innerHTML = `
    <div class="wrapper">
        <span class="wintext">You win</span>
        <button>Play Again</button>
    </div>
`
class GameOver extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback () {

  }
}

window.customElements.define('game-over', GameOver)
