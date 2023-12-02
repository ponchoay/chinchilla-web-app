#!/bin/bash
set -e

# Rails特有の問題を解決するためのコマンド
rm -f /backend/tmp/pids/server.pid

# ローカル環境用
# 初回コンテナ起動時のマイグレーションエラーを回避するため
rails db:migrate RAILS_ENV=development

# サーバー実行(DockerfileのCMDをセット)
exec "$@"