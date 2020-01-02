import { TodoListModel } from './model/TodoListModel.js';
import { TodoItemModel } from './model/TodoItemModel.js';
import { element, render } from './view/html-util.js';

console.log('App.js: loaded');

export class App {
  constructor () {
    // 1. TodoListの初期化
    this.TodoListModel = new TodoListModel();
  }
  mount() {
    const formElement = document.querySelector('#js-form');
    const inputElement = document.querySelector('#js-form-input');
    const containerElement = document.querySelector('#js-todo-list');
    const todoItemCountElelment = document.querySelector('#js-todo-count');
    // 2. TodoListModelの状態が更新されたら表示を更新する
    this.TodoListModel.onChange(() => {
      // TodoリストをまとめるList要素
      const todoListElement = element`<ul />`;
      // それぞれのTodoItem要素をtodolistElement以下へ追加する
      const todoItems = this.TodoListModel.getTodoItems();
      todoItems.forEach(item => {
        const todoItemElement = element`<li>${item.title}`;
        todoListElement.appendChild(todoItemElement);
      });
      // containerElementの中身をtodoListElementで上書きする
      render(todoListElement, containerElement);
      // アイテム数の表示を更新
      todoItemCountElelment.textContent = `Todoアイテム数: ${this.TodoListModel.getTotalCount()}`;
    });
    // 3. フォームを送信したら、新しいTodoListへ追加する
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      // 新しいTodoItemをTodoListへ追加する
      this.TodoListModel.addTodo(new TodoItemModel({
        title: inputElement.value,
        completed: false
      }));
      inputElement.value = '';
    });
  }
}