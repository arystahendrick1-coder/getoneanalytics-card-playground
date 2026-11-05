# GetOneAnalytics Master Index

This repository contains the original GetOneAnalytics Master Index React application, updated against the approved card configuration and platform default-view references.

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

Vite output: `dist/`

## What is included

- Original Master Index application structure and existing interactions.
- Original cover page and report page navigation.
- Four-column dashboard canvas. Existing card sizes and placements are retained.
- Seven card visualisation types: Number, Line Chart, Bar Chart, Pie Chart, Number and Chart, Table, and Maps.
- Metric type compatibility catalogue synchronised with `GetOneAnalytics_Master_Metrics_QA_Reviewed_v3.xlsx` (437 metrics across 9 reporting surfaces).
- Compare presentation for supported visual types.
- TikTok Organic default page includes the four small KPI cards: Followers, Profile Views, Video Views, and Link Clicks.

## Important scope notes

This is a front-end prototype with sample display values. It does not connect to live platform APIs or validate account-level API access. Sample chart and table values are illustrative. The workbook remains the source of truth for metric inventory and allowed visualisation types.

## QA status

- JSX/TSX transpilation syntax check: passed (zero diagnostics).
- Workbook catalogue count: 437 metrics across 9 platforms.
- Production build: not verified in this environment because dependency installation timed out. Run `npm install` and `npm run build` before deploying.


## Default View corrections (5 November 2026)
- Google Analytics: Bar Chart rows now place each category title above its horizontal bar, with the value aligned to the right. Maps, Traffic Acquisition, and Top Landing Pages use 4 × 2 grid units.
- Google Ads: default canvas now follows the approved 13-card arrangement: two 2 × 2 charts, four 1 × 1 KPI cards, four 2 × 2 analysis cards (including Campaign by Country as Maps with a country table), and one 4 × 2 Campaign Performance table.
- Canvas remains four grid units wide; card interactions and resize controls are retained.
- JSX transpilation check passed. Production build has not been verified because dependency installation timed out in this environment.
