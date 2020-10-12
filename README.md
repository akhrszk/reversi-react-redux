# リバーシ

[React](https://ja.reactjs.org/)で作った[リバーシ](https://en.wikipedia.org/wiki/Reversi)アプリです。

![screenshot](https://github.com/akhrszk/reversi/blob/images/screenshot.png)

## 技術スタック

* [create-react-app](https://github.com/facebook/create-react-app)
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [TypeScript](https://www.typescriptlang.org/)

## 実行方法

```
$ git clone git@github.com:akhrszk/reversi.git
$ cd reversi
$ yarn start
```

## ディレクトリ構造

```
src
├── app
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── config.ts
│   └── store.ts
├── core
│   └── game.ts
├── domain
│   ├── disk.ts
│   └── player.ts
├── features
│   ├── board
│   │   ├── Board.module.css
│   │   ├── Board.tsx
│   │   └── boardSlice.ts
│   ├── game
│   │   └── Game.tsx
│   └── status
│       ├── Status.module.css
│       ├── Status.tsx
│       └── statusSlice.ts
├── index.css
├── index.tsx
├── react-app-env.d.ts
├── serviceWorker.ts
├── setupTests.ts
└── utils
    └── utils.ts
```

### 各ディレクトリの簡単な説明

ディレクトリ|説明
---|---
app|storeやconfigなど
domain|エンティティ
features|コンポーネントなど
core|リバーシのロジック
util|開発をする上で便利関数など

## アーキテクチャ

Reduxで`石の配置` `ターン`をstateで管理。

特に[Gameコンポーネント](https://github.com/akhrszk/reversi/blob/master/src/features/game/Game.tsx)はGameManager的な役割を果たしており、
ターン毎に、 **現在の盤面に対して石を置ける場所の計算の実行**、また**置ける場所がなかった場合にパス処理の実行**、**ゲームが終了したかどうかの管理や終了処理の実行**を行っています。

ゲームが終了したかどうかの判定は、白黒共に置ける場所がなくなった場合をゲームが終了したとみなします。

`features/`配下の`Boardコンポーネント`は盤面、`Statusコンポーネント`は盤面の下のグレーのゲームステータス部分を実装しています。

## ライセンス

[MIT License](https://github.com/akhrszk/reversi/blob/master/LICENSE)
