class MyDesktop extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }
}

window.customElements.define('my-desktop', MyDesktop)
