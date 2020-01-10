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
            /* margin-top: 5px; */
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
class InfoBar extends window.HTMLElement {
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

  connectedCallback () {
    /* this._dateText.textContent = this._dateInfo.toDateString()
    this._timeText.textContent = this._dateInfo.toTimeString() */
    this._updateTime()
    this._updateDate()
    this._getDate()
  }

  disconnectedCallback () {
    clearInterval(this._intervalID)
  }

  _getDate () {
    this._intervalID = window.setInterval(() => {
      this._updateTime()
      this._updateDate()
    }, 1000)
  }

  _updateTime () {
    this._date = new Date()

    const time = this._date.toTimeString().slice(0, 8)

    this._timeText.textContent = time
  }

  _updateDate () {
    const day = this._date.toLocaleDateString()

    this._dateText.textContent = day
  }

  getHeight () {
    return this._wrapper.offsetHeight
  }
}

window.customElements.define('info-bar', InfoBar)
