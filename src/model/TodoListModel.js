import { EventEmitter } from '../EventEmiter.js';

export class TodoListModel extends EventEmitter {
  /**
   * @param {TodoItemModel[]} [items] 初期アイテム一覧(デフォルトはからの配列)
   */
  constructor (items = []) {
    super();
    this.items = items;
  }

  /**
   * TodoItemの合計個数を返す
   * @returns {number}
   */
  getTotalCount () {
    return this.items.length;
  }

  /**
   * 表示できるTodoItemの配列を返す
   * @returns {TodoItemModel[]}
   */
  getTodoItems () {
    return this.items;
  }

  /**
   * TodoListの状態が更新されたときに呼び出されるリスナー関数を登録する
   * @param {Function} listener
   */ 
  onChange (listener) {
    this.addEventListener('change', listener);
  }

  /**
   * TodoListの状態が更新されたときに呼ぶ。登録済みのリスナー関数を呼び出す
   */
  emitChange () {
    this.emit('change');
  }

  /**
   * TodoItemを追加する
   * @param {TodoItemModel} TodoItem
   */
  addTodo (todoItem) {
    this.items.push(todoItem);
    this.emitChange();
  }
}