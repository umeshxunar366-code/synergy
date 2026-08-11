# Voyago — Modern Travel Agency Website

Coursework project: a responsive, accessible, multi-page travel-agency website built with vanilla HTML5, CSS3, JavaScript (ES6) and jQuery. Submitted as group work for the Client-Side Development module.

## Course context

This project is an academic submission and is not intended for public distribution. It demonstrates competency in:

- Semantic HTML5 and accessible markup
- Modern CSS3 (Flexbox, Grid, custom properties, animations, responsive design)
- Vanilla JavaScript (ES6) and jQuery
- Client-side form validation
- Client-side storage (`localStorage`)
- UI/UX and accessibility best practice

## Setup

No build step. Any static web server serves the site.

```bash
# Python
python -m http.server 8080

# Node
npx serve .

# VS Code
Right-click index.html → "Open with Live Server"
```

Visit http://localhost:8080

Opening `index.html` directly with `file://` works for most pages, but the packages and testimonials grids use `fetch()` to load JSON — these render empty unless the site is served over HTTP.

## Features

- 9 content pages plus a custom 404
- Fully responsive from 360px through desktop
- Dark mode toggle, saved in `localStorage`
- Hero auto-slider with dot navigation, keyboard controls, real background imagery
- Real photography wired across hero, destinations, packages, and gallery (34 images under `assets/images/`)
- Animated statistic counters
- Scroll-reveal animations (respects `prefers-reduced-motion`)
- Package grid with category filter tabs and live search
- Filterable gallery with lightbox
- FAQ accordion built with jQuery `slideToggle`
- Booking form with full client-side validation, saved to `localStorage`
- Contact form with validation
- Newsletter signup persisted in `localStorage`
- Back-to-top button, loading screen, skip-to-content link, focus-visible outlines

## Technologies

- HTML5 (semantic landmarks, ARIA attributes)
- CSS3 (custom properties, Flexbox, Grid, keyframe animations, glassmorphism header)
- Vanilla JavaScript (ES6, `IntersectionObserver`, `fetch`, `localStorage`)
- jQuery 3.6.1 (`slideToggle`, `fadeIn`, `animate`, `hide`, `show`)
- Font Awesome 6 (icons via CDN)
- Google Fonts — Poppins and Open Sans

## Folder structure

```
voyago-travel-agency/
├── index.html · about.html · destinations.html · packages.html
├── gallery.html · testimonials.html · faq.html · booking.html
├── contact.html · 404.html
├── assets/
│   ├── css/    (reset, variables, style, components, animations, responsive)
│   ├── js/     (main, navbar, slider, gallery, packages, booking, validation, storage, accessibility)
│   ├── jquery/ (jquery.min.js loader + custom.jquery.js)
│   ├── images/ (hero, destinations, packages, gallery, icons — populated; team, testimonials, backgrounds — reserved)
│   ├── videos/ · fonts/ · favicon/
├── data/       (packages.json, testimonials.json)
├── docs/       (wireframes.pdf, screenshots/)
├── README.md · .gitignore
```

## jQuery

`assets/jquery/jquery.min.js` contains the local minified jQuery 3.6.1 library, so the jQuery functionality can run without downloading jQuery at runtime.

## localStorage keys

| Key | Purpose |
|---|---|
| `voyago:theme` | `"light"` or `"dark"` |
| `voyago:bookings` | Array of past booking submissions (max 20) |
| `voyago:newsletter` | Array of subscribed emails |
| `voyago:recentDest` | Array of recently selected destinations (max 5) |

Clear from DevTools → Application → Local Storage.

## Booking form validation

Every field is validated on blur, on input (after first error), and on submit:

- Full name — required, minimum 2 characters
- Email — required, RFC-style pattern
- Phone — required, UK mobile format (`07XXX XXXXXX` or `+44 7XXX XXXXXX`)
- Destination — required (select)
- Package — required (select)
- Travel date — required, today or later
- Number of travelers — required, positive integer

On successful submission the site:

1. Saves the booking to `localStorage`
2. Renders an inline Booking Summary
3. Opens a confirmation modal
4. Appends the entry to visible booking history

## Accessibility

- Semantic `<header>`, `<nav>`, `<main>`, `<footer>` landmarks
- Skip-to-content link
- Visible focus outlines
- ARIA attributes on nav toggle, accordion, tabs, lightbox, and modal
- Labels on every form field
- Colour contrast meets WCAG AA
- `prefers-reduced-motion` respected
- Keyboard navigable slider, gallery, and modal

## Responsive breakpoints

| Device | Max width |
|---|---|
| Desktop | 1200+ |
| Laptop | 1199 |
| Tablet | 991 |
| Mobile | 767 |
| Small mobile | 575 / 360 |

## Team roles

| Member | Role | Focus |
|---|---|---|
| Pawan Kumar Gupta | Founder & CEO | UI/UX, HTML structure, home + about + navigation |
| Gaurav Shrestha | Head of Operations | CSS, responsive layout, animations, reusable components |
| Umesh BK | Lead Guide | JavaScript and jQuery — slider, gallery, FAQ, dark mode |
| Samrajya Dangi | Customer Success | Booking and contact forms, validation, `localStorage`, documentation |

## Git workflow

```
main
├── feature-home
├── feature-about
├── feature-booking
├── feature-gallery
├── feature-js
└── feature-css
```

For any remaining genuine work, each member should commit their own changes using their own Git/GitHub identity. Do not recreate or backdate work that was not originally recorded in Git. The final repository should preserve an accurate contribution history for assessment.

## Submission checklist

- [x] Complete project folder (HTML, CSS, JS, images, JSON data)
- [x] `README.md` with setup instructions and feature summary
- [ ] GitHub repository link (add before submission)
- [ ] Individual 1200-word report (one per member)
- [ ] Peer assessment form (one per member)

## Business details (site content)

- **Address:** 12 High Street, West Bromwich B70 6PY, UK
- **Phone:** 07344 064688
- **Email:** hello@voyago.travel
- **Hours:** Mon–Sat, 9:00–18:00 GMT

## Packages

12 tour packages in `data/packages.json` covering domestic (UK Lake District), international, adventure, honeymoon, and family categories. Cards render from JSON via `assets/js/packages.js` with image, title, price, rating, includes list, and category filter.

## Notes for markers

- Prepared as a university coursework submission for internal assessment only.
- No external distribution rights are granted or implied.
- Third-party assets (Font Awesome, Google Fonts, jQuery) are loaded from their official public CDNs and used under their respective terms.
