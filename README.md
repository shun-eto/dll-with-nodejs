# dll-with-nodejs



***



## 調査概要

とりあえず正常に動くdllを用意

少し調べて見た感じ、NodeJSからdllの呼び出しに、`node-ffi-napi` ライブラリを使うのが良さそう

素直にやっていってみると、dllではなくdylibを呼び出す様。（実行環境がMacだからっぽい？）

dylibでやってみると `symbol not found`なるエラーが出てスタックする。

\-> 共有して解決の糸口が見つからなそうであれば、別ライブラリや別手法を検討する必要がありそう。



***



## dllファイルの作成から正常実行までの確認

*   単純なヘッダファイル\[test.h]とソースファイル\[test.cpp]を作成

*   オブジェクトファイル\[test.o]の生成

    ```bash
    g++ -c ./test.cpp
    ```

*   dllファイル\[test.dll]の生成

    ```bash
    g++ ./test.o -o test.dll -shared
    ```

*   dllを呼び出すソースファイル\[main.cpp]の作成

*   コンパイル

    ```bash
    g++ -o ./test.exe ./main.cpp ./test.dll
    ```

*   実行結果確認

    ```bash
    ./test.exe
    ```



***



## dylibファイルの生成とNodeJSからの実行

*   dylibのコンパイル

```bash
g++ -dynamiclib -o test.dylib ./test.cpp
```

*   dylibファイルを実行するソースファイルを作成

*   ファイルの実行

    ```bash
    node main
    ```



***

### 参考リンク

*   [VSCodeを使ったdllの作成](http://www.toshioblog.com/archives/26678460.html)

*   [ffiライブラリの導入](https://usagi.hatenablog.jp/entry/2020/03/18/191928)

*   [MacOSにおけるdylibの作成](https://blog.katty.in/4346#toc1)
