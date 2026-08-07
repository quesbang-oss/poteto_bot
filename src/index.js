import dotenv from "dotenv";
import { setupBot } from "./bot.js";
import { logger } from "./utils.js";
import http from "http"; // 追加

dotenv.config();
const TOKEN = process.env.DISCORD_TOKEN;

if (!TOKEN || TOKEN.includes("ここに")) {
  logger.error("DISCORD_TOKEN が設定されていません。.env を編集してください。");
  process.exit(1);
}

// --- ここから追加：Render用の簡易サーバー設定 ---
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.write("Potato Bot is Alive!"); // 呼びかけへの返事
  res.end();
}).listen(PORT);
logger.info(`Web server is running on port ${PORT}`);
// --- ここまで追加 ---

setupBot(TOKEN);
