import { DICTIONARY } from './randomWords.js';
import { getRandom } from './utils.js';

/**
 * ぽていと構文 生成エンジン（YouTubeドリーム・爆死版）
 */
export const translateToPotato = (input) => {
  // 入力文から「主役（YouTuber名・企画名）」を抽出
  const inputCleaned = input.replace('ぽていと構文', '').trim();
  const subjects = inputCleaned.split(/[はがをにへと]/).filter(s => s.length > 0);
  
  // 入力がある場合はそれを「さん」付けで主役にし、ない場合は辞書の肩書きを使う
  const subject = subjects.length > 0 ? `${subjects[0]}（本主役）` : getRandom(DICTIONARY.nouns);

  // テンプレートの選択
  const template = getRandom(DICTIONARY.templates);
  const adjective = getRandom(DICTIONARY.adjectives);

  // 穴埋め
  let result = template
    .replace(/{subject}/g, subject)
    .replace(/{noun}/g, () => getRandom(DICTIONARY.nouns)) // 報酬（ゴミ）枠
    .replace(/{place}/g, () => getRandom(DICTIONARY.places))
    .replace(/{event}/g, () => getRandom(DICTIONARY.events))
    .replace(/{adjectives}/g, adjective);

  // YouTubeらしい煽り：30%の確率で冒頭に「【衝撃】」などの形容詞をさらに追加
  if (Math.random() > 0.7) {
    result = `${adjective}${result}`;
  }

  // 語尾の追加
  result += getRandom(DICTIONARY.suffixes);

  return result;
};

/**
 * YouTubeドリーム版サンプル生成
 */
export const generateSamples = () => {
  const samples = [
    'カップラーメン食べる',
    'ゲーム実況',
    '炎上した',
    '100キロマラソン',
    'モーニングルーティン'
  ];
  return samples.map(s => `入力：${s}\n返信：${translateToPotato(s)}`).join('\n\n');
};
