import { element } from './view/html-util.js';

console.log('App.js: loaded');

export class App {
  mount() {
    const formElement = document.querySelector('#js-form');
    const inputElement = document.querySelector('#js-form-input');
    const containerElement = document.querySelector('#js-todo-list');
    const todoItemCountElelment = document.querySelector('#js-todo-count');
    // Todoアイテム数
    let todoItemCount = 0;
    formElement.addEventListener('submit', (event) => {
      // submitイベントの本来の動作を止める
      event.preventDefault();
      // 追加するTodoアイテムの要素(li要素)を作成する
      const todoItemElement = element`<li>${inputElement.value}</li>`;
      // Todoアイテムをcontainerに追加する
      containerElement.appendChild(todoItemElement);
      // Todoアイテムを+1し、表示されているテキストを更新
      todoItemCount += 1;
      todoItemCountElelment.textContent = `Todoアイテム数: ${todoItemCount}`;
      // 入力欄を空文字列にしてリセットする
      inputElement.value = '';
    })
    
  }
}