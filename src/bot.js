import { Client, GatewayIntentBits, Events } from 'discord.js';
import { translateToPotato, generateSamples } from './potatoTranslator.js';
import { logger } from './utils.js';

export const setupBot = (token) => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.once(Events.ClientReady, (c) => {
    logger.info(`Ready! Logged in as ${c.user.tag}`);
  });

  client.on(Events.MessageCreate, async (message) => {
    // Bot自身のメッセージは無視
    if (message.author.bot) return;

    // 「ぽていと構文」で始まらない場合は無視
    if (!message.content.startsWith('ぽていと構文')) return;

    const content = message.content.trim();

    try {
      // ヘルプ機能
      if (content === 'ぽていと構文 ヘルプ') {
        logger.cmd(message.author.tag, 'HELP');
        return message.reply('【ぽていと翻訳ボット 使い方】\n「ぽていと構文 〇〇」と送ると、内容を少しだけ残して世界観を崩壊させた文章を返します。\n\nコマンド：\n・`ぽていと構文 ping` : 生存確認\n・`ぽていと構文 サンプル` : 変換例を表示');
      }

      // Ping機能
      if (content === 'ぽていと構文 ping') {
        logger.cmd(message.author.tag, 'PING');
        return message.reply('Pong! (ジャガイモは鮮度が命です)');
      }

      // サンプル機能
      if (content === 'ぽていと構文 サンプル') {
        logger.cmd(message.author.tag, 'SAMPLE');
        return message.reply(`【ぽていと構文 サンプル集】\n\n${generateSamples()}`);
      }

      // 翻訳実行
      logger.cmd(message.author.tag, 'TRANSLATE');
      const potatoText = translateToPotato(content);
      
      await message.reply(potatoText);

    } catch (error) {
      logger.error('Error handling message:', error);
      await message.reply('エラーが発生しました。ジャガイモの皮を剥きすぎてしまったようです。');
    }
  });

  client.login(token);
};