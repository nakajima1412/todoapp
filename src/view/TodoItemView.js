import { element } from './html-util.js';

export class TodoItemView {
  /**
   * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
   * @param {TodoitemModel} todoItem
   * @param {function({ id: string, completed: boolean })} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({ id: string })} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element}
   */
  createElement (todoItem, { onUpdateTodo, onDeleteTodo }) {
    const todoItemElement = todoItem.completed
      ? element`<li><input type="checkbox" class="checkbox" checked>
        <s>${todoItem.title}</s>
        <button class="delete">x</button>
      </input></li>`
      : element`<li><input type="checkbox" class="checkbox">
        ${todoItem.title}
        <button class="delete">x</button>
      </input></li>`;
    // チェックボックスがトグルしたときのイベントにリスナー関数を登録
    const inputCheckboxElement = todoItemElement.querySelector('.checkbox');
    inputCheckboxElement.addEventListener('change', () => {
      // callback関数に変更
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed
      });
    });
    const deleteButtonElement = todoItemElement.querySelector('.delete');
    deleteButtonElement.addEventListener('click', () => {
      onDeleteTodo({
        id: todoItem.id
      });
    });
    // 作成したTodoアイテムのHTML要素を返す
    return todoItemElement;
  }
}