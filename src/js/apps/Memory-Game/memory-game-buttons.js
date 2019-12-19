const template = document.createElement('template')
template.innerHTML = `
    <style>

    </style>

    <div class="gameButtons">
        <button class="restart" name="restart">Restart</button>
        <button class="home" name="home">HOME</button>
    </div>
`
class MemoryGameButtons extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._gameButtons = this.shadowRoot.querySelector('.gameButtons')
  }

  connectedCallback () {
    this._boundOnButtonClick = this._onButtonClick.bind(this)

    this._gameButtons.addEventListener('click', this._boundOnButtonClick)
  }

  _onButtonClick (event) {
    if (event.target.nodeName !== 'BUTTON') {
      return
    }
    if (event.target.name === 'restart') {
      this.dispatchEvent(new window.CustomEvent('restartclick'))
    }
    if (event.target.name === 'home') {
      this.dispatchEvent(new window.CustomEvent('homeclick'))
    }
  }
}
window.customElements.define('memory-game-buttons', MemoryGameButtons)
