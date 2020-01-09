/**
 * Module for TaskBar
 *
 * @module src/js/taskbar/task-bar
 * @author Viktor Ödman
 * @version 1.0.0
*/

import './task-button.js'

const template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
            position: absolute;
            z-index: 2147;
        }
        
       .wrapper {
        width: 100%;
        height: 80px;
        bottom:0%;
        position: fixed;
       }
       .taskBar {
        background-color: rgba(0, 32, 63, 0.4);
        width: 350px;
        height: 100%;
        margin: auto;
        border-left: 1px solid rgba(53, 53, 53, 0.9);
        border-right: 1px solid rgba(53, 53, 53, 0.9);
        border-top: 1px solid rgba(53, 53, 53, 0.9);
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
        text-align: center;
        backdrop-filter: blur(2px);
       }
    </style>
    
    <div class="wrapper">
        <div class="taskBar">
            <task-button imgurl="image/app-icons/memory.png" appname="memorygame" elementname="memory-game"></task-button>
            <task-button imgurl="image/app-icons/chat.png" appname="chatapp" elementname="chat-app"></task-button>
            <task-button imgurl="image/app-icons/pong.png" appname="pong" elementname="pong-game"></task-button>
        </div>
    </div>
`
/**
 *  Represents a TaskBar
 *
 * @class TaskBar
 * @extends {window.HTMLElement}
 */
class TaskBar extends window.HTMLElement {
/**
 * Creates an instance of TaskBar.
 * @memberof TaskBar
 */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._taskBar = this.shadowRoot.querySelector('.taskBar')
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof TaskBar
   */
  connectedCallback () {
    this._boundOnButtonClick = this._onButtonClick.bind(this)

    this._taskBar.addEventListener('click', this._boundOnButtonClick)
  }

  /**
   * Runs when the element is removed from a document-connected element
   *
   * @memberof TaskBar
   */
  disconnectedCallback () {
    this._taskBar.removeEventListener('click', this._boundOnButtonClick)
  }

  /**
   * Dispatches an event with the clicked apps
   * name and image
   *
   * @param {Event} event A click event
   * @memberof TaskBar
   */
  _onButtonClick (event) {
    if (event.target.nodeName !== 'TASK-BUTTON') {
      return
    }
    const appName = event.target.getAttribute('appname')
    const appImg = event.target.getAttribute('imgurl')
    const appElement = event.target.getAttribute('elementname')
    this.dispatchEvent(new window.CustomEvent('appclicked', { detail: { appName, appImg, appElement } }))
  }
}

window.customElements.define('task-bar', TaskBar)
