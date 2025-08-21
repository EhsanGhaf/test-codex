/// <reference types="@cloudflare/workers-types" />

export interface Env {
  TELEGRAM_BOT_TOKEN: string; // set via wrangler secret
  WEBHOOK_SECRET?: string;    // set via wrangler secret
  BOT_KV: KVNamespace;
}

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(req.url);

    if (req.method === "GET" && url.pathname === "/") {
      return new Response("ok", { status: 200 });
    }

    if (req.method === "POST" && url.pathname === (env.WEBHOOK_PATH || "/webhook")) {
      // Optional: verify Telegram secret token header
      if (env.WEBHOOK_SECRET) {
        const sig = req.headers.get("x-telegram-bot-api-secret-token");
        if (sig !== env.WEBHOOK_SECRET) {
          return new Response("unauthorized", { status: 401 });
        }
      }

      // Validate JSON
      try {
        await req.json(); // در مراحل ۱-۴ فقط صحت JSON مهم است
      } catch {
        return new Response("bad json", { status: 400 });
      }

      // پاسخ سریع برای موفقیت وبهوک
      return new Response("ok", { status: 200 });
    }

    return new Response("not found", { status: 404 });
  }
};
