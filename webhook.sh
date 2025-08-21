#!/bin/bash
# پس از deploy، آدرس Worker را جایگزین کن:
WORKER_URL="https://<YOUR-WORKER-NAME>.<YOUR-ACCOUNT>.workers.dev"
BOT_TOKEN="<YOUR_BOT_TOKEN>"               # همان که به صورت secret ست کردی
WEBHOOK_SECRET_VAL="<YOUR_WEBHOOK_SECRET>" # همان که به صورت secret ست کردی

# ست وبهوک
curl -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setWebhook" \
  -d "url=${WORKER_URL}$(wrangler print --var WEBHOOK_PATH 2>/dev/null || echo /webhook)" \
  -d "secret_token=${WEBHOOK_SECRET_VAL}" \
  -d 'allowed_updates=["message"]' \
  -d "drop_pending_updates=true"

# بررسی وضعیت
curl -s "https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo" | jq .

# حذف وبهوک (اختیاری)
curl -s "https://api.telegram.org/bot${BOT_TOKEN}/deleteWebhook?drop_pending_updates=true" | jq .
