# ぽていと翻訳ボット

特定の構文で話しかけると、文章をカオスに変換して返信します。

## セットアップ

1. **Discord Developer Portal** でボットを作成し、`MESSAGE CONTENT INTENT` を有効にしてください。
2. ボットのトークンを取得します。

## インストール

```bash
# 依存関係のインストール
npm install

# .envの作成と編集
cp .env.example .env
# .env内の DISCORD_TOKEN を書き換えてください