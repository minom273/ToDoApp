import React from "react";

// 引数の型を定義
// Propsという名前で定義することが一般的です。
type Props = {
  name: string;
  uncompletedCount: number;  // ← これを追加
};

// WelcomeMessage という関数コンポーネントの定義
// 関数コンポーネントはパスカルケースで名前を設定します。
const WelcomeMessage = (props: Props) => {
  // いわゆる普通のロジックを記述する
  const currentTime = new Date();

// 現在の時刻に基づいて挨拶を決定
const currentHour = currentTime.getHours();
let greeting: string;
if (currentHour >= 4 && currentHour < 12) {
  greeting = "おはようございます"; // 午前4時～午前11時59分
} else if (currentHour >= 12 && currentHour < 18) {
  greeting = "こんにちは"; // 正午～午後5時59分
} else if (currentHour >= 18 && currentHour <= 23) {
  greeting = "こんばんは"; // 午後6時～午後11時59分
} else {
  greeting = "お疲れ様です"; // 午前0時～午前3時59分
}
  //【重要!】JSX構文で描いた「JSX要素」を return で返す
  return (
    <div className="text-blue-700">
      {greeting}、{props.name}さん。現在の未完了タスクは{props.uncompletedCount}個です。
    </div>
  );
};

// 他のファイルで WelcomeMessage を import できるようにする
export default WelcomeMessage;