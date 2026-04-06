# bydiba

Source for [bydiba.dev](https://bydiba.dev), a portfolio site built to feel polished, expressive, and technically deliberate.

## Live Demo

https://bydiba.dev

This project is a single-page portfolio with section-based storytelling, GSAP-driven motion, a responsive projects experience, a lightweight contact flow, and a custom Three.js creative section to close the site.

## Overview

- Built with the Next.js App Router
- Designed as a motion-led portfolio, not a generic template
- Uses GSAP for section reveals, pinned scroll scenes, and interaction polish
- Uses Three.js for the interactive creative canvas
- Includes a server-side contact route powered by Resend
- Ships with `robots.txt` and `sitemap.xml` metadata routes

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- GSAP
- Three.js
- Resend

## Features

- Strong visual direction with custom typography and layered gradients
- Scroll-based section choreography across Hero, Projects, About, Skills, Contact, and Creative
- Responsive mobile and desktop interaction patterns
- Project previews with direction-aware transitions
- Contact form with lightweight validation and spam honeypot protection
- Public source for reference, iteration, and learning

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a local `.env.local` file with:

```bash
RESEND_API_KEY=your_resend_api_key
```

Without that key, the contact form UI will still render, but the `/api/contact` route will not be able to send messages.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Project Structure

```text
src/app
src/components
public
```

- `src/app`: routes, metadata, API handlers, global styles
- `src/components`: all section components, navigation state, motion logic
- `public`: project media, icons, and static assets

## Notes

- This repo reflects the live portfolio and its interaction design decisions.
- It is intentionally opinionated in layout and motion.
- If you are browsing the source, the most relevant files are in `src/components` and `src/app`.

## License

No license is included at the moment. Please do not reuse the design, branding, or content as a template without permission.
