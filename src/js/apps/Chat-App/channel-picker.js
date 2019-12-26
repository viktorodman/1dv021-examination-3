/**
 * Module for ChannelPicker
 *
 * @module src/js/apps/Chat-App/channel-picker
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
    <style>
    
    </style>
    <div class="channel">
    
    </div>
`
/**
 * Represents a Channel Picker
 *
 * @class ChannelPicker
 * @extends {window.HTMLElement}
 */
class ChannelPicker extends window.HTMLElement {
  /**
   * Creates an instance of ChannelPicker.
   * @memberof ChannelPicker
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('channel-picker', ChannelPicker)
