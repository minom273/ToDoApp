import type { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge"; // ◀◀ 追加
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // ◀◀ 追加
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"; // ◀◀ 追加
import { useState, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState<string>("");
  const [newTodoCategory, setNewTodoCategory] = useState<"課題" | "持ち物" | "テスト" | "その他">("課題"); //追加用カテゴリ
  const [filterCategory, setFilterCategory] = useState<"全て" | "課題" | "持ち物" | "テスト" | "その他">("全て"); //表示フィルタ用カテゴリ
  const [newTodoPriority, setNewTodoPriority] = useState(3);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [newTodoNameError, setNewTodoNameError] = useState("");
  const [userName, setUserName] = useState("寝屋川タヌキ");

  const [initialized, setInitialized] = useState(false);
  const localStorageKey = "TodoApp";



  useEffect(() => {
    const todoJsonStr = localStorage.getItem(localStorageKey);
    if (todoJsonStr && todoJsonStr !== "[]") {
      const storedTodos: Todo[] = JSON.parse(todoJsonStr);
      const convertedTodos = storedTodos.map((todo) => ({
        ...todo,
        deadline: todo.deadline ? new Date(todo.deadline) : null,
      }));
      setTodos(convertedTodos);
    } else {
      // LocalStorage にデータがない場合は initTodos をセットする
      setTodos(initTodos);
    }
    setInitialized(true);
  }, []);
  // 状態 todos または initialized に変更があったときTodoデータを保存
  useEffect(() => {
    if (initialized) {
      localStorage.setItem(localStorageKey, JSON.stringify(todos));
    }
  }, [todos, initialized]);

  useEffect(() => {
    const todoJsonStr = localStorage.getItem(localStorageKey);
    if (todoJsonStr && todoJsonStr !== "[]") {
      const parsed = JSON.parse(todoJsonStr) as unknown;

      if (Array.isArray(parsed)) {
        const convertedTodos: Todo[] = parsed.map((raw) => {
          const t = raw as Partial<Todo> & { deadline?: string | null };
          return {
            id: t.id ?? uuid(),
            name: typeof t.name === "string" ? t.name : "",
            isDone: !!t.isDone,
            priority: typeof t.priority === "number" ? t.priority : 3,
            deadline: t.deadline ? new Date(t.deadline) : null,
            category: (t.category as Todo["category"]) ?? "その他",
          };
        });
        setTodos(convertedTodos);
      } else {
        setTodos(initTodos);
      }
    } else {
      setTodos(initTodos);
    }
    setInitialized(true);
  }, []);
  const uncompletedCount = todos.filter((todo: Todo) => !todo.isDone).length;

  // ▼▼ 追加
  const isValidTodoName = (name: string): string => {
    if (name.length < 2 || name.length > 32) {
      return "2文字以上、32文字以内で入力してください";
    } else {
      return "";
    }
  };


  const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoNameError(isValidTodoName(e.target.value)); // ◀◀ 追加
    setNewTodoName(e.target.value);
  };

  const updateNewTodoPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoPriority(Number(e.target.value));
  };

  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value; // UIで日時が未設定のときは空文字列 "" が dt に格納される
    console.log(`UI操作で日時が "${dt}" (${typeof dt}型) に変更されました。`);
    setNewTodoDeadline(dt === "" ? null : new Date(dt));
  };

  const addNewTodo = () => {
    const err = isValidTodoName(newTodoName);
    if (err !== "") {
      setNewTodoNameError(err);
      return;
    }
    const newTodo: Todo = {
      id: uuid(),
      name: newTodoName,
      isDone: false,
      priority: newTodoPriority,
      deadline: newTodoDeadline,
      category: newTodoCategory,  //保存するカテゴリ
    };
    setTodos([...todos, newTodo]);
    setNewTodoName("");
    setNewTodoPriority(3);
    setNewTodoDeadline(null)
    setNewTodoCategory("課題");
  };
  
  const updateIsDone = (id: string, value: boolean) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: value }; // スプレッド構文
      }  else {
      return todo;
      }
    });
    setTodos(updatedTodos);
  }

  const removeCompletedTodos = () => {
    const updatedTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updatedTodos);
  };

  const remove = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filteredTodos = filterCategory === "全て"
    ? todos
    : todos.filter((todo) => todo.category === filterCategory);

  
  

  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-2xl font-bold">TodoApp</h1>
      <div className="mb-4 flex items-center space-x-2">
        <label htmlFor="userName" className="font-bold">ユーザー名</label>
        <input
          id="userName"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="rounded-md border p-2"
          placeholder="名前を入力してください"
        />
      </div>
      <div className="mb-4">
        <WelcomeMessage
          name={userName}
          uncompletedCount={uncompletedCount}
        />
      </div>
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value as typeof filterCategory)}
        className="border border-gray-300 rounded px-2 py-1 mb-4"
      >
        <option value="全て">全てのタスク</option>
        <option value="課題">課題</option>
        <option value="持ち物">持ち物</option>
        <option value="テスト">テスト</option>
        <option value="その他">その他</option>
      </select>



      <TodoList todos={filteredTodos} updateIsDone={updateIsDone} remove={remove} />

        {/*これ以降タスク追加部分*/}
      <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto mt-10">
        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-4 h-16 bg-pink-400 rounded-r-full shadow-md"></div>
        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-white rounded-full border border-gray-300"></div>
        <h2 className="text-lg font-bold">新しいタスクの追加</h2>
        <div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="newTodoName">
              名前
            </label>
            <input
              id="newTodoName"
              type="text"
              value={newTodoName}
              onChange={updateNewTodoName}
              className={twMerge(
                "grow rounded-md border p-2",
                newTodoNameError && "border-red-500 outline-red-500"
              )}
              placeholder="2文字以上、32文字以内で入力してください"
            />
          </div>
          {newTodoNameError && (
            <div className="ml-10 flex items-center space-x-1 text-sm font-bold text-red-500">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="mr-0.5"
              />
              <div>{newTodoNameError}</div>
            </div>
          )}
        </div>
        {/*ここまででタスク名入力*/}

        {/*タスク追加フォームのカテゴリ選択*/}
        <select
          value={newTodoCategory}
          onChange={(e) => 
            setNewTodoCategory(e.target.value as "課題" | "持ち物" | "テスト" | "その他")
          }
          className="border border-gray-300 rounded px-2 py-1 mb-2"

>
          <option value="課題">課題</option>
          <option value="持ち物">持ち物</option>
          <option value="テスト">テスト</option>
          <option value="その他">その他</option>
        </select>

        <div className="flex gap-5">
          <div className="font-bold">優先度</div>
          {[1, 2, 3].map((value) => (
            <label key={value} className="flex items-center space-x-1">
              <input
                id={`priority-${value}`}
                name="priorityGroup"
                type="radio"
                value={value}
                checked={newTodoPriority === value}
                onChange={updateNewTodoPriority}
              />
              <span>{value}</span>
            </label>
          ))}
        </div>

        <div className="flex items-center gap-x-2">
          <label htmlFor="deadline" className="font-bold">
            期限
          </label>
          <input
            type="datetime-local"
            id="deadline"
            value={
              newTodoDeadline
                ? dayjs(newTodoDeadline).format("YYYY-MM-DDTHH:mm:ss")
                : ""
            }
            onChange={updateDeadline}
            className="rounded-md border border-gray-400 px-2 py-0.5"
          />
        </div>

        

        <button
          type="button"
          onClick={addNewTodo}
          className={twMerge(
            "rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600",
            newTodoNameError && "cursor-not-allowed opacity-50"
          )}
        >
          追加
        </button>
        <button
          type="button"
          onClick={removeCompletedTodos}
          className={
            "mt-5 rounded-md bg-red-500 px-3 py-1 font-bold text-white hover:bg-red-600"
          }
        >
          完了済みのタスクを削除
        </button>
      </div>
    </div>

    

  );
};

export default App;