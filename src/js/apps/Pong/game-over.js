/**
 * Module for GameOver
 *
 * @module src/js/Pong/game-over
 * @author Viktor Ödman
 * @version 1.0.0
*/
const template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
            color: #FFFFFF;
        }
        .wrapper {
            margin: auto;
            width: 80%;
            text-align: center;
        }
    </style>
    <div class="wrapper">
        <div ></div>
        <span class="wintext">You win</span>
        
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
