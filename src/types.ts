export type Todo = {
  id: string;
  name: string;
  isDone: boolean;
  priority: number;
  deadline: Date | null; // 注意
  category: "課題" | "持ち物" | "テスト" | "その他";

};