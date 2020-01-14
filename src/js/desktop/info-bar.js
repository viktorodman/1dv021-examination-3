/**
 * Module for InfoBar
 *
 * @module src/js/desktop/InfoBar
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
            position: absolute;
            z-index: 2147;
            font-family: "Courier New", Courier, monospace;
            font-size: 20px;
            color: #7FDBFF;
            text-shadow: #000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px,
             #000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px;
        }
        .wrapper {
            width: 100%;
            height: 3%;
            background-color: rgba(0, 32, 63, 0.4);
            border-bottom: 1px solid rgba(0, 32, 63, 0.9);
            position: fixed;
        }
        
        .content {
            width: fit-content;
            float: right;
            height: 70%;
            text-align:center;
            padding-right: 20px;
            padding-top: 3px;
        }
        .time {
            display: inline-block;
            
            height: 100%;
        }
        .date {
            display: inline-block;
            height: 100%;
            
        }
        .timeText {
            
        }
        .dateText {

        }
        button {
          font-size: 17px;
          background-color: rgba(0, 32, 63, 0.1);
          border: none;
          padding: 0;
          outline: none;
          color: #7FDBFF;
          text-shadow: #000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px,
             #000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px;
        }

    </style>
    <div class="wrapper">
        <div class="content">
            <div class="time">
                <span class="timeText"></span>
            </div>
            <div class="date">
                <span class="dateText"></span>
            </div>
        </div>
    </div>
`
/**
 * Represents a Info Bar
 *
 * @class InfoBar
 * @extends {window.HTMLElement}
 */
class InfoBar extends window.HTMLElement {
  /**
   * Creates an instance of InfoBar.
   * @memberof InfoBar
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._wrapper = this.shadowRoot.querySelector('.wrapper')
    this._dateText = this.shadowRoot.querySelector('.dateText')
    this._timeText = this.shadowRoot.querySelector('.timeText')
    this._dateInfo = undefined

    this._date = new Date()
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof InfoBar
   */
  connectedCallback () {
    this._updateTime()
    this._updateDate()
    this._getDate()
  }

  /**
   * Runs when the element is removed from a document-connected element
   *
   * @memberof InfoBar
   */
  disconnectedCallback () {
    clearInterval(this._intervalID)
  }

  /**
   * Calls _updateTime and updateDate every second
   *
   * @memberof InfoBar
   */
  _getDate () {
    this._intervalID = window.setInterval(() => {
      this._updateTime()
      this._updateDate()
    }, 1000)
  }

  /**
   * Updates the infobars clock
   *
   * @memberof InfoBar
   */
  _updateTime () {
    this._date = new Date()

    const time = this._date.toTimeString().slice(0, 8)

    this._timeText.textContent = time
  }

  /**
   * Updates the infobars date
   *
   * @memberof InfoBar
   */
  _updateDate () {
    const day = this._date.toLocaleDateString()

    this._dateText.textContent = day
  }

  /**
   * Gets the height of the infobar
   *
   * @returns {Number} The infobars height
   * @memberof InfoBar
   */
  getHeight () {
    return this._wrapper.offsetHeight
  }
}

window.customElements.define('info-bar', InfoBar)
