import type { Todo } from "./types";
import { v4 as uuid } from "uuid"; // v4 を uuid という名前でインポート

export const initTodos: Todo[] = [
  { id: "1", name: "テスト", isDone: false, priority: 1, deadline: null }
];
