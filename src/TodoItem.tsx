import React from "react";
import type { Todo } from "./types";

type Props = {
  todo: Todo;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
};

const TodoItem = ({ todo, updateIsDone, remove }: Props) => {
  return (
    <div className="flex items-center justify-between p-2 bg-white shadow rounded">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) => updateIsDone(todo.id, e.target.checked)}
          className="mr-2 cursor-pointer"
        />
        <span
          className={`${
            todo.isDone ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.name}
        </span>
      </div>
      <button
        onClick={() => remove(todo.id)}
        className="rounded-md bg-slate-200 px-2 py-1 text-sm font-bold text-white hover:bg-red-500"
      >
        削除
      </button>
    </div>
  );
};

export default TodoItem;
