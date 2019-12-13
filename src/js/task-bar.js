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
        .taskButton {
           margin-top:5px;
           margin-left: 5px;
           margin-right: 5px;
           border-radius: 25px;
           
           background-color: Transparent;
        background-repeat:no-repeat;
        border: none;
        cursor:pointer;
        overflow: hidden;
        outline:none;
        }
        img {
            width: 80px;
        }
       .wrapper {
        width: 100%;
        height: 80px;
        bottom:0%;
        position: fixed;
       }
       .taskBar {
        background-color: rgba(103, 103, 103, 0.5);
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
            <button class="taskButton"><img src="image/memory.png"></button>
            <button class="taskButton"><img src="image/chat.png"></button>
            <button class="taskButton"><img src="image/chat.png"></button>
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
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof TaskBar
   */
  connectedCallback () {

  }
}

window.customElements.define('task-bar', TaskBar)
