# BrainrotDrop

Telegram Mini App casino with characters from **Steal a Brainrot**: open cases, upgrade
brainrots, play Color Dice and Crash, and deposit / withdraw real in-game brainrots
through the admin.

All characters (names, base income from 21M/s up to 1B/s, images) come from the
[Steal a Brainrot Wiki](https://stealabrainrot.fandom.com). Everything is priced in
coins — 1M/s of in-game income = 10 coins.

## Features

- **Cases** — free (every 24h), nickname-tag case (`@brainrotdroppbot`, every 24h),
  referral case (every 12h, with a share-invite button) and five paid cases from
  199 to 5 999 coins with published odds.
- **Upgrader (MusorDrop)** — put in a brainrot and/or coins, pick a target, spin the
  circular success gauge.
- **Color Dice** — red ×1.9, blue ×2.85, gold ×5.7.
- **Crash** — live canvas chart with a flying brainrot, manual and auto cash-out.
- **Profile** — inventory with sell / withdraw, deposit request form, request history.

## Tech

TanStack Start (React 19) · Tailwind CSS 4 · Telegram WebApp SDK · Netlify
(hosting, Image CDN; Functions + Netlify Database in upcoming milestones).

## Run locally

```bash
pnpm install
netlify dev        # or: pnpm dev
```

Outside Telegram the app runs in demo mode with a guest user.

## Deploy & connect to Telegram

1. Deploy the site on Netlify (connected git repo deploys automatically).
2. In Netlify → Project configuration → Environment variables, add:
   - `TELEGRAM_BOT_TOKEN` — main bot token (Mini App)
   - `ADMIN_BOT_TOKEN` — admin bot token (request notifications)
   - `ADMIN_TELEGRAM_ID` — `8459031923`
   Never commit tokens to the repository.
3. In @BotFather → your main bot → *Bot Settings → Menu Button* (or `/newapp`), set the
   Web App URL to the site URL (`https://<your-site>.netlify.app`).
4. Open the bot in Telegram and press the menu button.

## Roadmap

The interface is complete and playable on demo data. Next up (see `PLAN.md`):
Telegram `initData` auth with automatic user creation, Netlify Database persistence,
server-side game outcomes, admin-bot deposit/withdraw approvals and the main bot
`/start` flow.
