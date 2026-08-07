import dotenv from 'dotenv';
import { setupBot } from './bot.js';
import { logger } from './utils.js';

// 環境変数の読み込み
dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN;

if (!TOKEN) {
  logger.error('DISCORD_TOKEN が設定されていません。.env ファイルを確認してください。');
  process.exit(1);
}

// ボットの起動
setupBot(TOKEN);

// 予期せぬエラーでの停止を防止
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', reason);
});