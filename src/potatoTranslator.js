import { DICTIONARY } from './randomWords.js';
import { getRandom } from './utils.js';

/**
 * ぽていと構文 生成エンジン
 */
export const translateToPotato = (input) => {
  // 入力文から名詞っぽいものを抽出（簡易版：文字数や特定の助詞で分割）
  // 完璧な解析より、ランダム性の勢いを重視
  const inputCleaned = input.replace('ぽていと構文', '').trim();
  
  // 入力文の要素を「主役」として抽出（なければランダム）
  const subjects = inputCleaned.split(/[はがをにへと]/).filter(s => s.length > 0);
  const subject = subjects.length > 0 ? getRandom(subjects) : getRandom(DICTIONARY.nouns);

  // テンプレートの選択
  const template = getRandom(DICTIONARY.templates);

  // 穴埋め
  let result = template
    .replace(/{subject}/g, subject)
    .replace(/{noun}/g, getRandom(DICTIONARY.nouns))
    .replace(/{place}/g, getRandom(DICTIONARY.places))
    .replace(/{event}/g, getRandom(DICTIONARY.events))
    .replace(/{result}/g, getRandom(DICTIONARY.nouns));

  // 装飾（形容詞をたまに付ける）
  if (Math.random() > 0.5) {
    result = getRandom(DICTIONARY.adjectives) + result;
  }

  // 語尾の追加
  result += getRandom(DICTIONARY.suffixes);

  return result;
};

/**
 * サンプルを5個生成
 */
export const generateSamples = () => {
  const samples = [
    '今日は学校へ行く',
    'お腹が空いた',
    'プログラミング難しい',
    '猫になりたい',
    '定時で帰りたい'
  ];
  return samples.map(s => `入力：${s}\n返信：${translateToPotato(s)}`).join('\n\n');
};