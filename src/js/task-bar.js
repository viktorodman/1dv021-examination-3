/**
 * Module for TaskBar
 *
 * @module src/js/task-bar
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
            
        }
        
       .wrapper {
        width: 100%;
        height: 80px;
        bottom:0%;
        position: fixed;
       }
       .taskBar {
        background-color: rgba(15, 20, 167, 0.2);
        width: 350px;
        height: 100%;
        margin: auto;
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
        text-align: center;
       }
    </style>
    
    <div class="wrapper">
        <div class="taskBar">
            <task-button imgurl="image/memory.png" appname="memorygame"></task-button>
            <task-button imgurl="image/chat.png" appname="chatapp"></task-button>
            <task-button appname="default"></task-button>
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
   *
   *
   * @memberof TaskBar
   */
  _onButtonClick (event) {
    if (event.target.nodeName !== 'TASK-BUTTON') {
      return
    }
    const appName = event.target.getAttribute('appname')
    const appImg = event.target.getAttribute('imgurl')
    this.dispatchEvent(new window.CustomEvent('appclicked', { detail: { appName, appImg } }))
  }
}

window.customElements.define('task-bar', TaskBar)
