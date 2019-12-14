class AppWindow extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }
}

window.customElements.define('app-window', AppWindow)
