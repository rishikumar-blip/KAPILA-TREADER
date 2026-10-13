# Kapila Traders website

A responsive website built with HTML, CSS, browser JavaScript and a small Node.js server. It has no third-party runtime dependencies.

## Run locally

Install Node.js 20 or newer, open this folder in a terminal, then run:

```bash
npm start
```

Open `http://localhost:3000`. The local Node server serves the site and `/api/health`; no `npm install` is needed because the project uses built-in Node.js modules only. `npm run dev` starts the same server.

## Before publishing

Edit `business-config.js` to update the business name, phone numbers, address, hours and map listing. The Google Maps listing/CID is the one supplied for Kapila Traders. Verify hours and service availability with the business owner. The JSON-LD block is synchronized from `business-config.js` at page load.

The address and Google Maps directions use the business listing shared for Kapila Traders (CID 3773533492889029941), with Metro Pillar Number 683 and Shop No. 4, G 1/448. Hours (10:00 AM–9:00 PM daily) and potential repair/refilling services came from the supplied brief and are marked for confirmation. Product prices, stock and compatibility are not claimed. A floating call button and WhatsApp enquiry button use +91 99109 85547.

## Contact enquiries

The current contact options are click-to-call, WhatsApp and a Google Maps address search. The Node API health route at `/api/health` confirms the backend is reachable. No enquiry form is presented as working because no receiving backend/service was supplied. To add an online form, connect a backend or form provider, configure its endpoint and spam protection, and add a clear privacy notice before collecting personal data.

## Images

The ten individual images in `kapila_traders_10_images/` are used in the matching product and service sections. The four supplied catalogue PNGs appear in the catalogue gallery. `Kapila Traders visiting Card.png` is displayed on the page with a direct download button. Supplied graphics and photos are presented as catalogue imagery, not verified current stock or photographs of the shop.

## Deployment

This folder is ready to deploy to Vercel; `vercel.json` sets the framework to Other, disables the build command, serves the project root, and configures clean URLs and browser security headers. Vercel serves the HTML/CSS/JS and images as static files and deploys `api/health.js` as a Node.js Function. There are no third-party packages or environment variables. Import the repository in Vercel and set the Root Directory to the folder containing this `index.html` and `vercel.json`.

`robots.txt`, a custom `404.html`, and a favicon are included. Add a canonical URL and XML sitemap after the production domain is assigned. The Google Fonts stylesheet is optional; the page falls back to system sans-serif fonts when it cannot load.
