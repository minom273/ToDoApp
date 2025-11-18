import { useState } from "react";
import type { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid"; // ◀◀ 追加

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initTodos);
  const uncompletedCount = todos.filter((todo: Todo) => !todo.isDone).length;

  // 追加: addNewTodo関数の実装
  const addNewTodo = () => {
    const newTodo: Todo = {
      id: uuid(),
      name: "新しいタスク",
      isDone: false,
      priority: 3,
      deadline: new Date(2024, 10, 13),
    };
    // スプレッド構文を使って、末尾に新タスクを追加した配列を作成
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos); // 作成した配列をtodosにセット
  };

  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-2xl font-bold">TodoApp</h1>
      <div className="mb-4">
        <WelcomeMessage
          name="寝屋川タヌキ"
          uncompletedCount={uncompletedCount}
        />
      </div>
      <TodoList todos={todos} />

      {/* タスク追加関連のUI実装 ここから... */}
      <div className="mt-5 space-y-2 rounded-md border p-3">
        <h2 className="text-lg font-bold">新しいタスクの追加</h2>
        <button
          type="button"
          onClick={addNewTodo} // ボタンを押下したときの処理
          className="rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600"
        >
          追加
        </button>
      </div>
      {/* ...ここまで */}
    </div>
  );
};

export default App;
