# Quantora — Arabic AI & Smart Tools Platform

A full right-to-left Arabic platform with a purple/violet look, soft gradients, rounded cards, and light + dark modes, matching the reference screens.

## Pages

1. **Home** — logo hero on a soft gradient, one big search field ("what do you want to calculate?"), a row of main tool cards, and a features strip. Footer with links.
2. **AI Assistant** — a chat workspace: friendly robot illustration, message input, and ready-made example prompts users can tap (best time to shop, price of 750 dollars in Turkish lira, etc.). Answers come from Lovable AI, streamed as they are written.
3. **Tools directory** — grid of all tools grouped in cards: calculator, currency converter, global prices, AI assistant, unit converter, date/time converter, travel budget, and more.
4. **Global prices** — search a product, category filter chips, and a list of products with price per country, so people can compare where it is cheapest.
5. **Product detail** — one product with its photo, prices by country, and a breakdown card (ticket, hotel, transport, total).
6. **Working tools** — calculator page, currency converter page, unit converter page. All fully functional, calculating instantly on the page.
7. **Account** — profile sheet (name, email, avatar), account security, notification settings, language & appearance, and sign out.
8. **Saved analyses** — list of saved comparisons with dates and a download/detail action, plus the analysis detail view with the result total.
9. **Auth screens** — sign in, create account, and reset password, styled like the reference.

## Behaviour decisions

- Currency rates use a free live exchange-rate service, with sensible fallback values if it is unavailable.
- Global prices and saved analyses start from built-in sample data so every screen is populated immediately.
- Sign in / create account are built as complete screens; real accounts, saved data per user, and password reset emails need Lovable Cloud, which I will offer to switch on afterwards.
- Dark and light mode with a toggle in the header, remembered between visits.
- Mobile: hamburger menu with the side sheet shown in the reference.

## Technical notes

- Route per page under `src/routes` (`/`, `/ai`, `/tools`, `/prices`, `/prices/$id`, `/tools/calculator`, `/tools/currency`, `/tools/units`, `/account`, `/analyses`, `/analyses/$id`, `/auth/*`), each with its own Arabic page title and description for sharing/SEO.
- `dir="rtl"` and `lang="ar"` on the document shell; Arabic web font (Cairo/IBM Plex Sans Arabic) loaded via a link tag in the root route.
- Design tokens (violet primary, gradient surfaces, soft shadows, large radii) defined in `src/styles.css` for both themes; no hardcoded colors in components.
- Shared UI: header/nav, footer, tool card, section shell, theme toggle.
- AI chat runs through a server route calling Lovable AI (key stays server-side), rendered with AI Elements chat primitives.
- Generated illustrations (robot mascot, logo mark, product images) saved under `src/assets`.
