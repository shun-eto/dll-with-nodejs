var ffi = require("ffi-napi");
var path = require("path");

var libPath = path.join(__dirname, "./test");
var dll = ffi.Library(libPath, {
  start: ["int", []],
});

// DLL側のtestCallbackの実行
var result = dll.start(1, 2);

// retはtestCallback自体の戻り値
console.log(result);
