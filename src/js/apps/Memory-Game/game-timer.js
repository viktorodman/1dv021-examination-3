/**
 * Module for GameTimer
 *
 * @module src/js/apps/Memory-Game/game-timer
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
    <style>
        .timer {
          color: #001f3f;
        }
    </style>
    <span class="timer"></span>
`
/**
 * Represents a timer
 *
 * @export
 * @class GameTimer
 * @extends {window.HTMLElement}
 */
class GameTimer extends window.HTMLElement {
  /**
   * Creates an instance of GameTimer.
   * @memberof GameTimer
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._intervalID = null
    this._maxTime = 20
    this._currentTime = undefined
    this._timerDisplay = this.shadowRoot.querySelector('.timer')
    this._totalTime = undefined
    this._startTime = undefined
    this._stopTime = undefined
    this._descending = false
  }

  /**
   * Get what attributes attributeChangedCallback should look for
   *
   * @readonly
   * @static
   * @memberof GameTimer
   */
  static get observedAttributes () {
    return ['descending', 'starttime']
  }

  /**
   * Is called when some of the observed attributes is called
   *
   * @param {String} name the attribute name
   * @param {String} oldValue old attribute value
   * @param {String} newValue new attribute value
   * @memberof GameTimer
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'descending') {
      if (newValue === 'true') {
        this._descending = true
      }
    }
    if (name === 'starttime') {
      this._maxTime = Number(newValue)
    }
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof GameTimer
   */
  connectedCallback () {
    if (this._descending) {
      this._currentTime = this._maxTime
      this._timerDisplay.textContent = this._currentTime
      this._descendingTimer()
    } else {
      this._currentTime = 0
      this._timerDisplay.textContent = this._currentTime
      this._ascendingTimer()
    }
  }

  /**
   * Runs when the element is removed from a document-connected element
   *
   * @memberof GameTimer
   */
  disconnectedCallback () {
    this._stopTimer()
  }

  /**
   * Starts a descending timer
   *
   * @memberof GameTimer
   */
  _descendingTimer () {
    this._startTime = Date.now()
    this._timerDisplay.textContent = this._maxTime
    this._intervalID = setInterval(() => {
      this._removeTime()
    }, 1000)
  }

  /**
   * Starts a ascending timer
   *
   * @memberof GameTimer
   */
  _ascendingTimer () {
    this._startTime = Date.now()
    this._intervalID = setInterval(() => {
      this._addTime()
    }, 1000)
  }

  /**
   * Removes a second from the timer and display the new time
   *
   * @memberof GameTimer
   */
  _removeTime () {
    this._currentTime -= 1
    this._timerDisplay.textContent = this.currentTime
    if (this.currentTime === 0) {
      this.dispatchEvent(new window.CustomEvent('timezero'))
      this._stopTimer()
    }
  }

  /**
   * Adds a second to the timer and display the new time
   *
   * @memberof GameTimer
   */
  _addTime () {
    this._currentTime += 1
    this._timerDisplay.textContent = this._currentTime
  }

  /**
   * Stops the timer and returns the total timer
   *
   * @returns {Number} The total time
   * @memberof GameTimer
   */
  _stopTimer () {
    clearInterval(this._intervalID)
    return this._getTotalTime()
  }

  /**
   * Returns the total time from when the timer was started
   *
   * @returns {number} the total time from when the timer was started
   * @memberof GameTimer
   */
  _getTotalTime () {
    this._stopTime = Date.now()
    const totalTime = (this._stopTime - this._startTime) / 1000
    return totalTime.toFixed(2)
  }

  /**
   * Resets the timer
   *
   * @memberof GameTimer
   */
  resetTimer () {
    this._startTime = Date.now()
    this._currentTime = 0
    this._timerDisplay.textContent = this._currentTime
  }
}

window.customElements.define('game-timer', GameTimer)
