# TodoApp

React + TypeScript で作成した Todo アプリです。  
タスクの追加・削除・完了管理に加えて、カテゴリ分けや優先度設定、期限設定、ユーザー名のカスタマイズ機能を備えています。  
LocalStorage を利用してデータを永続化しているため、ブラウザをリロードしてもタスクやユーザー名が保持されます。

![TodoApp Screenshot](public\todoApp1.png)

---

## 機能一覧
- タスクの追加・削除
- タスクの完了/未完了切り替え（完了タスクは取り消し線表示）
- 完了済みタスクの一括削除
- タスクのカテゴリ分け（課題 / 持ち物 / テスト / その他）

![TodoApp Screenshot](public\todoApp2.png)

- 表示フィルタ機能（カテゴリごと / 全てのタスク）

![TodoApp Screenshot](public\todoApp3.png)

- 優先度設定（1〜3）
- 期限設定（日時入力）
- ユーザー名の設定（WelcomeMessage に反映）
- LocalStorage によるデータ永続化

---

## 技術スタック
- React (Vite)
- TypeScript
- Tailwind CSS
- dayjs
- uuid
- FontAwesome
- LocalStorage API

## 開発期間
2025.10.23 ~ 2025.11.23 (約18時間)