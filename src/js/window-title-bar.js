class WindowTitleBar extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }
}

window.customElements.define('window-title-bar', WindowTitleBar)
