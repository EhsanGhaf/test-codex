# test-codex

Telegram bot starter for Cloudflare Workers.

## Setup commands
```bash
# Prereqs: Node 18+, Wrangler logged in: wrangler login

# 1) ساخت پوشه و پروژه
mkdir tg-worker && cd tg-worker
npm init -y
wrangler init --yes --type=typescript

# 2) نصب تایپ‌ها
npm i -D @cloudflare/workers-types

# 3) ساخت KV (IDها را بعداً در wrangler.toml جایگزین کن)
wrangler kv:namespace create BOT_KV
wrangler kv:namespace create BOT_KV --preview

# 4) افزودن Secrets (مقادیر را هنگام اجرا وارد کن)
wrangler secret put TELEGRAM_BOT_TOKEN
wrangler secret put WEBHOOK_SECRET

# 5) Deploy
wrangler deploy
```

## Webhook helpers
See [`webhook.sh`](./webhook.sh) for curl commands to set and manage the Telegram webhook.
