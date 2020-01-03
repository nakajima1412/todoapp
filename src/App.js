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
        // 完了済みならchecked属性をつけ、未完了ならchecked属性を外す
        const todoItemElement = item.completed
          ? element`<li><input type="checkbox" class="checkbox" checked>
            <s>${item.title}</s>
            <button class="delete">x</button>
          </input></li>`
          : element`<li><input type="checkbox" class="checkbox">
            ${item.title}
            <button class="delete">x</button>
          </input></li>`;
        // チェックボックスがトグルしたときのイベントにリスナー関数を登録
        const inputCheckboxElement = todoItemElement.querySelector('.checkbox');
        inputCheckboxElement.addEventListener('change', () => {
          // 指定したTodoアイテムの完了状態を反転させる
          this.TodoListModel.updateTodo({
            id: item.id,
            completed: !item.completed
          });
        });
        // 削除ボタン(x)をクリック時にTodoModelからアイテムを削除する
        const deleteButtonElement = todoItemElement.querySelector('.delete');
        deleteButtonElement.addEventListener('click', () => {
          this.TodoListModel.deleteTodo({
            id: item.id
          });
        });
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