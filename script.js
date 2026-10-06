/* ============================================================
   PRO SNOOKER CLUB — App Script v2
   ============================================================ */

const A = 'images/';

/* ── Club data ── */
const data = {
  tables: [
    ['Championship Table',  'Tournament-grade cloth, precision cushions and a perfectly level playing surface.',   'Rs. 1,800 / hr', 'Championship', 'club-table.jpg'],
    ['Premium Table',       'A refined setup for serious practice and relaxed competitive play.',                  'Rs. 1,200 / hr', 'Premium',      'club-interior.jpg'],
    ['Club Table',          'Comfortable, dependable tables for casual games and club sessions.',                  'Rs. 800 / hr',   'Club',         'club-night.jpg'],
    ['Pro Practice Table',  'A fast, responsive table for sharpening your break.',                                'Rs. 1,500 / hr', 'Premium',      'club-practice.jpg'],
    ['Private Table',       'A quieter reserved setting for focused sessions and coaching.',                       'Rs. 2,200 / hr', 'Championship', 'club-player.jpg']
  ],
  testimonials: [
    ['The kind of place where you come in for one frame and leave three hours later.',     'Hamza R.'],
    ['A beautifully maintained club with a serious playing atmosphere.',                   'Ayesha K.'],
    ['The perfect place to sharpen your game and meet serious players.',                   'Omar S.'],
    ['Professional tables, great events and a community that keeps you coming back.',     'Fahad M.']
  ],
  tournaments: [
    ['Pro Open Championship', '12 October 2026', 'Rs. 5,000', 'Rs. 250,000'],
    ['Friday Night Shootout', '02 October 2026', 'Rs. 1,500', 'Rs. 60,000'],
    ['Rising Stars Cup',      '24 October 2026', 'Rs. 2,000', 'Rs. 100,000']
  ]
};

/* ── XSS escape ── */
const esc = s => String(s).replace(/[&<>"']/g,
  c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));

/* ── SVG icons ── */
const icons = {
  pin:       `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  phone:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  mail:      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  clock:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  check:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  arrow:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  fb:        `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  instagram: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  whatsapp:  `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>`,
  tiktok:    `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.55V6.79a4.85 4.85 0 0 1-1.07-.1z"/></svg>`,
  youtube:   `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
};

/* ── Button ── */
function btn(url = '/book', text = 'Book a Table', outline = false) {
  return `<a class="button${outline ? ' outline' : ''}" href="${url}" data-route>${text} ${icons.arrow}</a>`;
}

/* ============================================================
   NAV
   ============================================================ */
function nav() {
  const links = [
    ['/', 'Home'], ['/about', 'About'], ['/tables', 'Tables'],
    ['/membership', 'Membership'], ['/tournaments', 'Tournaments'],
    ['/events', 'Events'], ['/gallery', 'Gallery'], ['/contact', 'Contact']
  ];
  return `
  <header>
    <nav id="mainNav">
      <a class="brand" href="/" data-route>
        <span class="brandmark">P</span>
        <div class="brand-text">
          <span class="brand-name">Pro</span>
          <span class="brand-sub">Snooker Club</span>
        </div>
      </a>
      <div class="navlinks" id="navLinks">
        ${links.map(([u, t]) => `<a href="${u}" data-route>${t}</a>`).join('')}
        <a href="/book" class="navbook" data-route>Book a Table</a>
      </div>
      <button class="menub" id="menuBtn" aria-label="Toggle navigation" aria-expanded="false">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="3" y1="6"  x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
    </nav>
  </header>`;
}

/* ============================================================
   FOOTER
   ============================================================ */
function footer() {
  return `
  <footer>
    <div class="footergrid">
      <div>
        <a class="brand" href="/" data-route>
          <span class="brandmark">P</span>
          <div class="brand-text">
            <span class="brand-name">Pro</span>
            <span class="brand-sub">Snooker Club</span>
          </div>
        </a>
        <p class="footer-brand-desc">Professional snooker. Premium environment. A competitive community built around the game.</p>
        <div class="social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">${icons.fb}</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">${icons.instagram}</a>
          <a href="https://wa.me/92300229301" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp">${icons.whatsapp}</a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" title="TikTok">${icons.tiktok}</a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube">${icons.youtube}</a>
        </div>
      </div>
      <div>
        <h4>Explore</h4>
        <a href="/about" data-route>Our Story</a>
        <a href="/tables" data-route>Tables</a>
        <a href="/membership" data-route>Membership</a>
        <a href="/tournaments" data-route>Tournaments</a>
        <a href="/events" data-route>Events</a>
        <a href="/gallery" data-route>Gallery</a>
      </div>
      <div>
        <h4>Visit Us</h4>
        <div class="footer-contact-item">${icons.pin}<span>14 Civic Centre, Bahria Town<br>Rawalpindi, Pakistan</span></div>
        <div class="footer-contact-item">${icons.phone}<span>+92 300 2293 01</span></div>
        <div class="footer-contact-item">${icons.mail}<span>hello@prosnookerclub.pk</span></div>
        <div class="footer-contact-item">${icons.clock}<span>Daily 10:00 AM – 12:00 AM</span></div>
      </div>
    </div>
    <div class="copyright">
      <span>&copy; 2026 Pro Snooker Club &mdash; Rawalpindi, Pakistan</span>
      <span>Built for the game.</span>
    </div>
  </footer>`;
}

function layout(content) {
  return nav() + `<main>${content}</main>` + footer();
}

/* ============================================================
   PAGE HERO (sub-pages) — NO floating image
   ============================================================ */
function pageHero(eyebrow, title, subtitle) {
  return `
  <section class="pagehero">
    <div class="pageheroCopy">
      <span class="eyebrow">${eyebrow}</span>
      <h1>${title}</h1>
      <p>${subtitle}</p>
    </div>
  </section>`;
}

/* ============================================================
   TABLE CARDS
   ============================================================ */
function tableCards(filter = 'All') {
  const filtered = data.tables.filter(t => filter === 'All' || t[3] === filter);
  return `<div class="cards">${filtered.map(t => `
    <article class="tablecard">
      <div class="tableimg">
        <img src="${A + t[4]}" alt="${esc(t[0])}" loading="lazy">
        <span class="tableimg-badge">${t[3]}</span>
      </div>
      <div class="tablebody">
        <h3>${t[0]}</h3>
        <p>${t[1]}</p>
        <div class="tablebody-price">
          <strong>${t[2]}</strong>
          ${btn()}
        </div>
      </div>
    </article>`).join('')}</div>`;
}

/* ============================================================
   GOOGLE MAP COMPONENT
   ============================================================ */
function googleMap() {
  // Bahria Town, Civic Centre, Rawalpindi — using OpenStreetMap embed (no API key needed)
  // Replace the src below with a Google Maps embed URL if a key is available:
  // https://www.google.com/maps/embed/v1/place?key=YOUR_KEY&q=Bahria+Town+Rawalpindi
  const OSM_EMBED = 'https://www.openstreetmap.org/export/embed.html?bbox=73.03,33.52,73.07,33.56&layer=mapnik&marker=33.5400,73.0500';
  const GMAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Bahria+Town+Rawalpindi+Pakistan';

  return `
  <div class="mapEmbed">
    <iframe
      src="${OSM_EMBED}"
      title="Pro Snooker Club Location — Bahria Town, Rawalpindi"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      aria-label="Map showing Pro Snooker Club location">
    </iframe>
  </div>
  <div class="details">
    <div class="detail-item">${icons.pin}<span>14 Civic Centre, Bahria Town, Rawalpindi</span></div>
    <div class="detail-item">${icons.phone}<span>+92 300 2293 01</span></div>
    <div class="detail-item">${icons.mail}<span>hello@prosnookerclub.pk</span></div>
    <div class="detail-item">${icons.clock}<span>Open daily &mdash; 10:00 AM to 12:00 AM</span></div>
  </div>
  <a href="${GMAPS_URL}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:7px;margin-top:20px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold-lt);border-bottom:1px solid rgba(184,134,60,0.3);padding-bottom:3px;">
    ${icons.pin} Open in Google Maps
  </a>`;
}

/* ============================================================
   CONTACT / BOOKING FORM
   ============================================================ */
function contactForm(book = false) {
  const bookExtra = book ? `
    <div class="formrow">
      <label class="floatLabel"><span>Date</span><input required type="date"></label>
      <label class="floatLabel"><span>Preferred Time</span>
        <select>
          <option value="">Select time slot</option>
          <option>7:00 PM</option><option>8:00 PM</option>
          <option>9:00 PM</option><option>10:00 PM</option><option>11:00 PM</option>
        </select>
      </label>
    </div>
    <div class="formrow">
      <label class="floatLabel"><span>Number of Players</span>
        <select><option value="">Select players</option>
          <option>2 players</option><option>3 players</option><option>4 players</option>
        </select>
      </label>
      <label class="floatLabel"><span>Table Type</span>
        <select><option value="">Select table</option>
          <option>Championship Table &mdash; Rs. 1,800/hr</option>
          <option>Premium Table &mdash; Rs. 1,200/hr</option>
          <option>Club Table &mdash; Rs. 800/hr</option>
          <option>Pro Practice Table &mdash; Rs. 1,500/hr</option>
          <option>Private Table &mdash; Rs. 2,200/hr</option>
        </select>
      </label>
    </div>` : '';

  return `
  <form id="siteForm" class="premiumForm" novalidate>
    <div class="formHeader">
      <span class="eyebrow">${book ? 'Reservation' : 'Contact Us'}</span>
      <h2>${book ? 'Reserve Your Table' : 'Send a Message'}</h2>
      <p>${book
        ? 'Fill in the details below and we\'ll confirm your booking within the hour.'
        : 'Have a question or just want to talk snooker? We\'d love to hear from you.'}</p>
    </div>
    <div class="formBody">
      <div class="formrow">
        <label class="floatLabel"><span>Full Name</span><input required name="name" autocomplete="name"></label>
        <label class="floatLabel"><span>Phone</span><input required name="phone" type="tel" autocomplete="tel"></label>
      </div>
      <label class="floatLabel"><span>Email Address</span><input required type="email" name="email" autocomplete="email"></label>
      ${bookExtra}
      <label class="floatLabel" style="display:block">
        <span>${book ? 'Special Notes' : 'Your Message'}</span>
        <textarea required rows="4">${book ? '' : ''}</textarea>
      </label>
      <button class="button formBtn" type="submit">
        <span>${book ? 'Confirm Booking' : 'Send Message'}</span>
        ${icons.arrow}
      </button>
      <p class="success" hidden>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        Thank you &mdash; we'll be in touch shortly.
      </p>
    </div>
  </form>`;
}

/* ============================================================
   HOME PAGE
   ============================================================ */
function homeIntroImages() {
  return ['club-interior.jpg', 'club-night.jpg', 'club-table.jpg', 'club-practice.jpg'];
}

function home() {
  const imgs = homeIntroImages();
  return `
  <!-- HERO: Video Background -->
  <section class="hero" id="hero">
    <div class="herobg"></div>
    <video
      class="heroVideo"
      id="heroVideo"
      autoplay
      muted
      loop
      playsinline
      webkit-playsinline
      preload="auto"
      poster="images/hero-bg.jpg">
      <source src="videos/snooker-hero.mp4" type="video/mp4">
    </video>
    <div class="herooverlay"></div>

    <div class="heroText">
      <span class="eyebrow">Welcome to Pro Snooker Club &mdash; Rawalpindi</span>
      <div class="heroSubhead">Play. Compete. Master.</div>
      <h1>Precision<br>& <em>Passion</em></h1>
      <p>Professional snooker tables, competitive tournaments and a focused community — all in one premium club in Bahria Town, Rawalpindi.</p>
      <div class="actions">
        ${btn('/book', 'Book a Table')}
        ${btn('/membership', 'Explore Membership', true)}
      </div>
    </div>

    <div class="scrollhint" aria-hidden="true">
      <div class="scrollhint-line"><span></span></div>
      Scroll
    </div>
  </section>

  <!-- INTRO SPLIT -->
  <section class="intro split">
    <div>
      <span class="eyebrow">The Pro Standard</span>
      <h2>More than a<br><em>snooker club.</em></h2>
      <span class="section-rule"></span>
      <p style="margin-top:20px">We created Pro for players who care about the details. From the roll of a tournament cloth to the quiet focus before a break, every part of your experience is considered.</p>
      <div style="margin-top:28px">${btn('/about', 'Our Story', true)}</div>
    </div>
    <div class="imagecard">
      <img id="introImage" src="${A + imgs[0]}" alt="Pro Snooker Club interior" loading="eager">
      <span class="imagecard-counter" id="introCount">01 / 04</span>
      <div class="imageDots" id="imageDots">
        ${imgs.map((_, i) => `<button class="${i === 0 ? 'active' : ''}" aria-label="Image ${i + 1}"></button>`).join('')}
      </div>
    </div>
  </section>

  <!-- FEATURES -->
  <section class="darksection">
    <div class="sectionhead">
      <span class="eyebrow">Why Pro</span>
      <h2>Built for the<br><em>serious player.</em></h2>
      <span class="section-rule"></span>
    </div>
    <div class="featuregrid">
      ${[
        ['01', 'Professional Tables',   'Tournament-quality cloth and cushions, maintained to exacting standards every day.'],
        ['02', 'Premium Environment',   'A calm, focused space where the game takes centre stage — no distractions.'],
        ['03', 'Competitive Community', 'Regular tournaments, practice nights and a club that pushes you to improve.'],
        ['04', 'Flexible Booking',      'Reserve your preferred table online in seconds. No queues, no hassle.']
      ].map(([n, h, p]) => `
        <div class="feature">
          <b>${n}</b>
          <h3>${h}</h3>
          <p>${p}</p>
        </div>`).join('')}
    </div>
  </section>

  <!-- TABLES PREVIEW -->
  <section class="section">
    <div class="sectionhead">
      <span class="eyebrow">The Tables</span>
      <h2>Your game deserves<br><em>a better table.</em></h2>
      <span class="section-rule"></span>
      <p style="margin-top:16px">Choose your setting. Every table is brushed and ready before you arrive.</p>
    </div>
    ${tableCards()}
    <div class="center">${btn('/tables', 'View All Tables', true)}</div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="quote" id="testimonials">
    <span class="quoteMark">&#x201C;</span>
    <div id="testimonialText" class="testimonial"></div>
    <div class="testimonialControls">
      <button id="prevTestimonial" class="testimonialArrow" aria-label="Previous">&#x2039;</button>
      <div id="testimonialDots" class="testimonialDots"></div>
      <button id="nextTestimonial" class="testimonialArrow" aria-label="Next">&#x203A;</button>
    </div>
  </section>`;
}

/* ============================================================
   PAGE ROUTER
   ============================================================ */
function page(path) {
  if (path === '/') return layout(home());

  /* ── ABOUT ── */
  if (path === '/about') return layout(
    pageHero('Our Story', 'A club with a<br><em>point of view.</em>',
      'Built for the focused, the curious and everyone who knows the feeling of a perfect break.') +
    `<section class="section split aboutsplit">
      <div>
        <div class="sectionhead">
          <span class="eyebrow">Our Story</span>
          <h2>The game,<br><em>done properly.</em></h2>
          <span class="section-rule"></span>
        </div>
        <p style="color:var(--muted2);font-size:15px;line-height:1.75;margin-top:16px">Pro Snooker Club began with a simple idea: create the kind of club we always wanted to play in. From day one, we obsessed over the details — the cloth, the cushions, the lighting, the atmosphere.</p>
        <div style="margin-top:28px">${btn()}</div>
      </div>
      <img src="${A}club-player.jpg" alt="Player preparing a shot" loading="lazy">
    </section>
    <section class="darksection">
      <div class="sectionhead">
        <span class="eyebrow">Our Values</span>
        <h2>What drives us.</h2>
        <span class="section-rule"></span>
      </div>
      <div class="values">
        ${[
          ['◈', 'Precision', 'Every table maintained to tournament spec.'],
          ['◈', 'Community', 'Welcoming for all levels of player.'],
          ['◈', 'Excellence', 'No compromise on quality.'],
          ['◈', 'Passion', 'Snooker is in everything we do.'],
          ['◈', 'Respect', 'For the game, for players, for the space.']
        ].map(([s, h, p]) => `<div><span>${s}</span><h3>${h}</h3><p>${p}</p></div>`).join('')}
      </div>
    </section>
    <section class="section">
      <div class="stats">
        <div><b>5+</b><span>Premium Tables</span></div>
        <div><b>2,000+</b><span>Members</span></div>
        <div><b>50+</b><span>Tournaments Held</span></div>
        <div><b>2021</b><span>Est. Rawalpindi</span></div>
      </div>
    </section>`
  );

  /* ── TABLES ── */
  if (path === '/tables') return layout(
    pageHero('The Table Room', 'Find your perfect<br><em>playing surface.</em>',
      'Every table is maintained for consistency, speed and that professional feel.') +
    `<section class="section">
      <div class="filters" id="tableFilters">
        ${['All', 'Championship', 'Premium', 'Club'].map((x, i) =>
          `<button data-filter="${x}"${i === 0 ? ' class="selected"' : ''}>${x}</button>`).join('')}
      </div>
      <div id="tableResults">${tableCards()}</div>
    </section>`
  );

  /* ── MEMBERSHIP ── */
  if (path === '/membership') return layout(
    pageHero('Membership', 'Make the club<br><em>part of your game.</em>',
      'More time on the table, more reasons to stay for another frame.') +
    `<section class="section">
      <div class="sectionhead">
        <span class="eyebrow">Choose Your Plan</span>
        <h2>Play more.<br><em>Pay less.</em></h2>
        <span class="section-rule"></span>
        <p style="margin-top:16px">Every membership includes priority booking, exclusive member benefits and access to club events.</p>
      </div>
      <div class="plans">
        ${[
          ['Basic',  'Rs. 2,500', false, ['Priority booking access', '5% tournament discount', 'Access to member events', 'Monthly newsletter']],
          ['Pro',    'Rs. 5,500', true,  ['Priority booking access', '10% tournament discount', 'Free guest pass monthly', 'Dedicated locker', 'Pro coaching session']],
          ['Elite',  'Rs. 9,500', false, ['VIP booking privileges', '20% tournament discount', 'Unlimited guest passes', 'Private table sessions', 'Personal coaching plan']]
        ].map(([n, p, f, ul]) => `
          <article class="plan${f ? ' featured' : ''}">
            <span class="eyebrow">${n}</span>
            <div class="plan-price">${p}<small> / month</small></div>
            <p>For players who want more from every session.</p>
            <ul>
              ${ul.map(li => `<li>${icons.check}<span>${li}</span></li>`).join('')}
            </ul>
            ${btn('/contact', 'Become a Member')}
          </article>`).join('')}
      </div>
    </section>`
  );

  /* ── TOURNAMENTS ── */
  if (path === '/tournaments') return layout(
    pageHero('Competition', 'There is always<br><em>another frame.</em>',
      'Enter the room, find your rhythm and play for something bigger.') +
    `<section class="section">
      <div class="sectionhead">
        <span class="eyebrow">Upcoming Events</span>
        <h2>Compete.<br><em>Win. Repeat.</em></h2>
        <span class="section-rule"></span>
      </div>
      <div class="tournamentlist">
        ${data.tournaments.map(t => {
          const [day, month, year] = t[1].split(' ');
          return `
          <article class="trow">
            <div class="datebox">
              <b>${day}</b>
              <span>${month}</span>
            </div>
            <div>
              <h3>${t[0]}</h3>
              <p>${t[1]} &middot; Entry ${t[2]} &middot; Prize pool ${t[3]}</p>
            </div>
            <span class="status">Open</span>
            ${btn('/contact', 'Register')}
          </article>`;
        }).join('')}
      </div>
    </section>`
  );

  /* ── EVENTS ── */
  if (path === '/events') return layout(
    pageHero('Club Life', 'Good frames.<br><em>Better company.</em>',
      'The calendar is full of reasons to walk through the door.') +
    `<section class="section">
      <div class="eventgrid">
        ${['Weekly Practice Night', 'Beginners&#x2019; Session', 'Club Championship', 'Social Night'].map((x, i) => `
          <article class="event">
            <span class="eyebrow">0${i + 1} / Event</span>
            <h2>${x}</h2>
            <p>Open tables, friendly frames and focused practice for every level of player.</p>
            ${btn('/contact', 'Register Interest', true)}
          </article>`).join('')}
      </div>
    </section>`
  );

  /* ── GALLERY ── */
  if (path === '/gallery') return layout(
    pageHero('Inside Pro', 'A closer look<br><em>at the club.</em>',
      'The lights, the cloth, the quiet before the break.') +
    `<section class="section">
      <div class="filters">
        <button class="selected">All</button>
        <button>Club</button>
        <button>Players</button>
        <button>Tables</button>
      </div>
      <div class="gallery">
        ${['club-interior.jpg', 'club-table.jpg', 'club-player.jpg', 'club-night.jpg', 'club-practice.jpg', 'hero-bg.jpg'].map((x, i) => `
          <button class="galleryItem" data-image="${A + x}" aria-label="View image ${i + 1}">
            <img src="${A + x}" alt="Pro Snooker Club — image ${i + 1}" loading="lazy">
            <div class="galleryItem-overlay"><span>View &#x2197;</span></div>
          </button>`).join('')}
      </div>
    </section>
    <div class="lightbox" id="lightbox" hidden>
      <button id="closeLightbox" aria-label="Close lightbox">&times;</button>
      <img id="lightboxImage" alt="Gallery image expanded">
    </div>`
  );

  /* ── CONTACT / BOOK ── */
  if (path === '/contact' || path === '/book') {
    const isBook = path === '/book';
    return layout(
      pageHero(
        isBook ? 'Reserve Your Frame' : 'Get in Touch',
        isBook ? 'Your table is<br><em>waiting.</em>' : 'Come play<br><em>with us.</em>',
        'Questions, bookings, coaching or just want to talk snooker? We\'d love to hear from you.'
      ) +
      `<section class="section contactgrid">
        <div class="contactLeft">
          <h2>${isBook ? 'Book a Table' : 'Find Us'}</h2>
          <p style="margin-bottom:20px">14 Civic Centre, Bahria Town, Rawalpindi &mdash; open daily.</p>
          ${googleMap()}
        </div>
        ${contactForm(isBook)}
      </section>`
    );
  }

  /* ── 404 ── */
  return layout(
    pageHero('404', 'That frame<br><em>isn&#x2019;t on the table.</em>',
      'The page you are looking for doesn\'t exist.') +
    `<section class="notfound">${btn('/', 'Back to Home')}</section>`
  );
}

/* ============================================================
   BIND — Events & Interactivity
   ============================================================ */
function bind() {
  /* ── SPA routing ── */
  document.querySelectorAll('[data-route]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const href = el.getAttribute('href');
      if (href !== location.pathname) {
        history.pushState({}, '', href);
        render();
      }
    });
  });

  /* ── Active nav link ── */
  const path = location.pathname;
  document.querySelectorAll('.navlinks > a:not(.navbook)').forEach(a => {
    const href = a.getAttribute('href');
    const active = href === path || (href !== '/' && path.startsWith(href));
    a.classList.toggle('active', active);
  });

  /* ── Nav scroll class ── */
  const navEl = document.getElementById('mainNav');
  if (navEl) {
    const onScroll = () => navEl.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile menu ── */
  const menuBtn  = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', e => {
      e.stopPropagation();
      const open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.innerHTML = open
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
    });
    const closeMenu = e => {
      if (!e.target.closest('nav')) {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
      }
    };
    document.addEventListener('click', closeMenu);
  }

  /* ── Table filter buttons ── */
  document.querySelectorAll('[data-filter]').forEach(b => {
    b.onclick = () => {
      document.querySelectorAll('[data-filter]').forEach(x => x.classList.remove('selected'));
      b.classList.add('selected');
      const res = document.getElementById('tableResults');
      if (res) { res.innerHTML = tableCards(b.dataset.filter); bind(); }
    };
  });

  /* ── Gallery lightbox ── */
  document.querySelectorAll('.galleryItem').forEach(item => {
    item.onclick = () => {
      const box = document.getElementById('lightbox');
      const img = document.getElementById('lightboxImage');
      if (box && img) {
        img.src = item.dataset.image;
        box.hidden = false;
        document.body.style.overflow = 'hidden';
      }
    };
  });
  const lightbox = document.getElementById('lightbox');
  document.getElementById('closeLightbox')?.addEventListener('click', () => {
    if (lightbox) { lightbox.hidden = true; document.body.style.overflow = ''; }
  });
  lightbox?.addEventListener('click', e => {
    if (e.target === lightbox) { lightbox.hidden = true; document.body.style.overflow = ''; }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) {
      lightbox.hidden = true; document.body.style.overflow = '';
    }
  });

  /* ── Form submit ── */
  const f = document.getElementById('siteForm');
  f?.addEventListener('submit', e => {
    e.preventDefault();
    const sb  = f.querySelector('button[type=submit]');
    const suc = f.querySelector('.success');
    const fb  = f.querySelector('.formBody');
    if (sb) { sb.disabled = true; sb.innerHTML = '<span>Sending&hellip;</span>'; }
    setTimeout(() => {
      if (suc) suc.hidden = false;
      if (fb)  fb.style.opacity = '0.4';
      if (sb)  sb.style.display = 'none';
    }, 800);
  });

  /* ── Image carousel ── */
  const imgs = homeIntroImages();
  let imgIdx = 0, imgTimer;
  const imgEl = document.getElementById('introImage');
  const ctEl  = document.getElementById('introCount');
  const dotsEl = document.getElementById('imageDots');

  function showImg(i) {
    imgIdx = ((i % imgs.length) + imgs.length) % imgs.length;
    if (imgEl) {
      imgEl.style.opacity = '0';
      setTimeout(() => { imgEl.src = A + imgs[imgIdx]; imgEl.style.opacity = '1'; }, 280);
    }
    if (ctEl) ctEl.textContent = `0${imgIdx + 1} / 0${imgs.length}`;
    dotsEl?.querySelectorAll('button').forEach((b, n) => b.classList.toggle('active', n === imgIdx));
  }

  if (imgEl) {
    imgEl.style.transition = 'opacity 0.35s ease';
    dotsEl?.querySelectorAll('button').forEach((b, n) => {
      b.onclick = () => { showImg(n); clearInterval(imgTimer); imgTimer = setInterval(() => showImg(imgIdx + 1), 3400); };
    });
    imgTimer = setInterval(() => showImg(imgIdx + 1), 3400);
  }

  /* ── Testimonials ── */
  const tTextEl = document.getElementById('testimonialText');
  const tDotsEl = document.getElementById('testimonialDots');
  const tPrev   = document.getElementById('prevTestimonial');
  const tNext   = document.getElementById('nextTestimonial');

  if (tTextEl) {
    let ti = 0, tTimer;
    const drawT = () => {
      const t = data.testimonials[ti];
      tTextEl.className = '';
      void tTextEl.offsetWidth; // reflow to retrigger animation
      tTextEl.className = 'testimonial';
      tTextEl.innerHTML = `<p>&ldquo;${t[0]}&rdquo;</p><strong>&mdash; ${t[1]}, Pro member</strong>`;
      if (tDotsEl) {
        tDotsEl.innerHTML = data.testimonials.map((_, n) =>
          `<button class="${n === ti ? 'active' : ''}" aria-label="Testimonial ${n + 1}"></button>`).join('');
        tDotsEl.querySelectorAll('button').forEach((b, n) => {
          b.onclick = () => { ti = n; drawT(); resetT(); };
        });
      }
    };
    const resetT = () => {
      clearInterval(tTimer);
      tTimer = setInterval(() => { ti = (ti + 1) % data.testimonials.length; drawT(); }, 4000);
    };
    if (tPrev) tPrev.onclick = () => { ti = (ti - 1 + data.testimonials.length) % data.testimonials.length; drawT(); resetT(); };
    if (tNext) tNext.onclick = () => { ti = (ti + 1) % data.testimonials.length; drawT(); resetT(); };
    drawT(); resetT();
  }

  /* ── Hero video: 10s autoplay loop muted ── */
  const video = document.getElementById('heroVideo');
  if (video) {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;

    // Reset loop at 10 seconds exactly per requirement
    video.ontimeupdate = () => {
      if (video.currentTime >= 10) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    const tryPlayVideo = () => {
      video.muted = true;
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {
          // In case mobile/browser autoplay policy requests user gesture
          const playOnGesture = () => {
            video.muted = true;
            video.play().catch(() => {});
          };
          window.addEventListener('click', playOnGesture, { once: true });
          window.addEventListener('touchstart', playOnGesture, { once: true });
          window.addEventListener('scroll', playOnGesture, { once: true });
        });
      }
    };

    if (video.readyState >= 2) {
      tryPlayVideo();
    } else {
      video.addEventListener('canplay', tryPlayVideo, { once: true });
      video.addEventListener('loadeddata', tryPlayVideo, { once: true });
    }
    tryPlayVideo();
  }
}

/* ============================================================
   RENDER
   ============================================================ */
function render() {
  document.getElementById('app').innerHTML = page(location.pathname);
  bind();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

window.addEventListener('popstate', render);
render();