# dll-with-nodejs

---

## 調査概要

とりあえず正常に動く dll を用意

少し調べて見た感じ、NodeJS から dll の呼び出しに、`node-ffi-napi` ライブラリを使うのが良さそう

素直にやっていってみると、dll ではなく dylib を呼び出す様。（実行環境が Mac だからっぽい？）

dylib でやってみると `symbol not found`なるエラーが出てスタックする。

\-> 共有して解決の糸口が見つからなそうであれば、別ライブラリや別手法を検討する必要がありそう。

---

## dll ファイルの作成から正常実行までの確認

- 単純なヘッダファイル\[test.h]とソースファイル\[test.cpp]を作成

- オブジェクトファイル\[test.o]の生成

  ```bash
  g++ -c ./test.cpp
  ```

- dll ファイル\[test.dll]の生成

  ```bash
  g++ ./test.o -o test.dll -shared
  ```

- dll を呼び出すソースファイル\[main.cpp]の作成

- コンパイル

  ```bash
  g++ -o ./test.exe ./main.cpp ./test.dll
  ```

- 実行結果確認

  ```bash
  ./test.exe
  ```

---

## dylib ファイルの生成と NodeJS からの実行

- dylib のコンパイル

```bash
g++ -dynamiclib -o test.dylib ./test.cpp
```

- dylib ファイルを実行するソースファイルを作成

- ファイルの実行

  ```bash
  node main
  ```

---

## <2022/05/12>

Windows 環境でソースコードの実行を試みたが `npm install` でスタック。

開発環境の npm version ( v8 系 ) 、Node version ( v16 系 )　で実行したが Error.

問題の要点をまとめると

- ライブラリに依存が存在する

  - OS 依存

  - npm version 依存

  - node version 依存

- 上記を許容し、適切な環境が見つかったとしても、メンテナンスが大変になる可能性が高い
  ( うかつに node や npm のバージョンを上げれなくなることや、開発環境は特定の OS で縛られる可能性がある )

---

## 参考リンク

- [VSCode を使った dll の作成](http://www.toshioblog.com/archives/26678460.html)

- [ffi ライブラリの導入](https://usagi.hatenablog.jp/entry/2020/03/18/191928)

- [MacOS における dylib の作成](https://blog.katty.in/4346#toc1)
