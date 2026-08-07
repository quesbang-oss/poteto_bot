/**
 * ユーティリティ関数群
 */

// 配列からランダムに要素を取得
export const getRandom = (array) => array[Math.floor(Math.random() * array.length)];

// ログ出力用
export const logger = {
  info: (msg) => console.log(`[INFO] ${new Date().toLocaleString()} : ${msg}`),
  error: (msg, err) => console.error(`[ERROR] ${new Date().toLocaleString()} : ${msg}`, err),
  cmd: (user, cmd) => console.log(`[CMD] ${user}: ${cmd}`)
};