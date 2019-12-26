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
     .channel {
      text-align: center;
    }
      input[type="text"] {
        font-size: 16px;
        background-color: #111111;
        color: #7FDBFF;
        outline: none;
        border: none;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        box-sizing: border-box;
        text-align: center;
    }
    input[type="text"]::placeholder {
        color: #7FDBFF;
        opacity: 1;
        font-style: oblique;
    }
    </style>
    <div class="channel">
      <input class="name" type="text" placeholder="Pick A Channel">
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
