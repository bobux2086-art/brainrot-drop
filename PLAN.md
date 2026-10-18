# BrainrotDrop — Roadmap

BrainrotDrop is a Telegram Mini App where players open cases, upgrade and gamble
Steal a Brainrot characters for coins, and deposit / withdraw real in-game
brainrots through the main admin (Telegram ID `8459031923`).

The product is delivered in milestones. Each milestone is self-contained and
shippable on its own.

## ✅ Milestone 1 — Product surface (done)

- Branded TMA shell: header with balance, live drop ticker, hero, bottom nav.
- 48 real brainrots from the Steal a Brainrot Wiki (21M/s → 1B/s): images, names,
  base income, coin prices (`src/data/brainrots.ts`).
- Cases: free (24h, 99% coins / 1% brainrot), tag case (24h, nickname contains
  `@brainrotdroppbot`, 80/20), referral case (12h, 70/30, invite button with a ready
  share template) and five paid cases whose odds are auto-balanced to a 92% return.
- Upgrader (MusorDrop) with a circular success gauge, Color Dice with a 3D die,
  Crash with a canvas chart and a flying brainrot.
- Profile: inventory (sell / withdraw), deposit form, request list.
- All state is client-side demo data in `src/lib/store.tsx` + `src/data/fixtures.ts`.

## Milestone 1.5 — Fixes & persistence (in progress)

- ✅ 210 brainrots from the wiki (162 new, images in `public/img/brainrots/`).
- ✅ `db/schema.ts` `players` table (tg_id → jsonb state) + migration.
- ⬜ `netlify/functions/api.mts` `/api/state` GET/PUT with initData verification; store syncs through it.
- ⬜ Case-opening modal not visible: render `CaseModal` via `createPortal(document.body)` with a high z-index.
- ⬜ Upgrader shows 0% / empty gauge: fix the chance calculation and the gauge's strokeDasharray.
- ⬜ Unique design per case (cover art, accent, frame).

## Milestone 2 — Telegram auth & users

- `netlify/functions/api.mts` with a single router (`/api/*`).
- `auth()`:
  1. Read `initData` from the `Authorization: tma <initData>` header.
  2. Verify the HMAC with `TELEGRAM_BOT_TOKEN` (`secret = HMAC_SHA256("WebAppData", botToken)`),
     reject if `auth_date` is older than 24h.
  3. **Always `upsertUser(tgUser)`** — insert on first visit (starting balance,
     `start_param` → referrer), update name/username/photo on later visits. First
     launch must never fail with "Не удалось войти, ошибка сервера".
  4. Fallback when `NETLIFY_DEV === "true"` and no initData: use a fixed dev user so
     the app works in a regular browser locally.
  5. Return a typed error (`401 invalid_init_data`) instead of a generic 500, and log
     the cause.
- `GET /api/me` → user, balance, inventory, cooldowns, referral count.
- Swap `StoreProvider` to load/mutate through the API (keep the same `useStore` shape).

## Milestone 3 — Database (Netlify Database + Drizzle)

Tables in `db/schema.ts`:
`users` (tg id, names, balance, referrer_id, has_tag_checked_at),
`inventory_items`, `case_opens`, `cooldowns` (user, case_id, last_at),
`referrals` (inviter, invitee, created_at, consumed_at),
`transfer_requests` (type, brainrot_id, roblox_nick, credit_as, status, admin_msg_id),
`game_rounds` (game, bet, result, payout, seed hash).
All balance changes happen in transactions with `balance >= cost` checks.

## Milestone 4 — Server-authoritative games

- Move `rollCase`, upgrader, dice and crash outcomes to the server
  (`/api/cases/:id/open`, `/api/upgrade`, `/api/dice`, `/api/crash/*`).
- Provably-fair seeds (server seed hash shown before play, revealed after).
- Cooldowns, tag-in-nickname check (from verified initData) and referral-case
  eligibility (a new invitee within the last 12h) enforced on the server.

## Milestone 5 — Admin bot: deposits & withdrawals

- On a new request, the admin bot (`ADMIN_BOT_TOKEN`) DMs `ADMIN_TELEGRAM_ID` with
  the player, Roblox nick, brainrot (image + income) and inline buttons
  ✅ Принять / ❌ Отклонить.
- `netlify/functions/admin-bot.mts` webhook handles `callback_query`, verifies the
  sender is the admin, updates the request, credits coins or the brainrot (deposit)
  or finalises the withdrawal, then edits the admin message and notifies the
  player through the main bot.
- `setWebhook` helper script + secret token header check.

## Milestone 6 — Main bot & launch

- Main bot (`TELEGRAM_BOT_TOKEN`) webhook: `/start` with a "Играть" WebApp button,
  `ref_<id>` deep links, menu button pointing at the site URL.
- Rate limiting, anti-multi-account checks for referrals, admin stats page.
