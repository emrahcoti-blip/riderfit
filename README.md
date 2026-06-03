# RiderFit — AI Motorcycle Gear Advisor

AI-powered motorcycle gear recommendation tool. Users input their riding profile and receive a personalised full setup recommendation with affiliate links.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Anthropic Claude API (server-side)
- Deployed on Vercel

## Local Development

```bash
npm install
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm run dev
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Import project in Vercel dashboard
3. Add environment variable: `ANTHROPIC_API_KEY`
4. Deploy
5. Add custom domain `riderfit.net` in Vercel project settings
6. Update DNS in Porkbun with Vercel's provided records

## Affiliate Setup

Once approved on Webgains (Fc-Moto program), replace the `affiliateUrl` function in `app/page.tsx` with your actual Webgains affiliate deep link format.

## Monetization

- Primary: Fc-Moto affiliate program via Webgains (7% commission, 30-day cookie)
- Secondary: Apply to Louis Moto, Polo Motorrad on Awin/Tradedoubler
