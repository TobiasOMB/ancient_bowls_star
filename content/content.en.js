/* ============================================================
   ANCIENT BOWLS – ENGLISH TEXTS
   ------------------------------------------------------------
   Diese Datei enthält nur die ENGLISCHEN TEXTE. Alles andere (Bilder, Links,
   Termine, Status) wird aus content/content.js übernommen.

   So funktioniert es:
   - Die Struktur entspricht content.js. Was hier fehlt, erscheint auf Deutsch.
   - Listen (Kollektion, Zeitstrahl, Events, Streamtermine) werden der Reihe nach
     zusammengeführt: der 1. Eintrag hier gehört zum 1. Eintrag in content.js usw.
     Bei neuen Einträgen in content.js bitte hier an derselben Stelle ergänzen.
   - Anführungszeichen " " und Kommas , nicht löschen.
   ============================================================ */

window.SITE_CONTENT_EN = {

  meta: {
    title: "Ancient Bowls | Handcrafted Hookah Bowls",
    description: "Ancient Bowls: handcrafted hookah bowls made of clay. Current collection, limited edition, livestream, events and story."
  },

  ui: {
    locale: "en-GB",
    timeSuffix: "",
    until: " to ",
    skip: "Skip to content",
    homeAria: "Ancient Bowls, back to top",
    mainMenu: "Main menu",
    menuClaim: "Handcrafted hookah bowls",
    menuLabel: "Menu", menuLabelClose: "Close", menuOpen: "Open menu", menuClose: "Close menu",
    scrollDown: "Scroll down", toTop: "Scroll to top",
    twitchWatch: "Watch on Twitch",
    legalAria: "Legal",
    imprint: { label: "Legal Notice", href: "legal-notice.html" },
    privacy: { label: "Privacy Policy", href: "privacy-policy.html" },
    privacyTwitchHref: "privacy-policy.html#twitch",
    langLabel: "Language",
    status: { verfuegbar: "Available", bald: "Coming soon", vergeben: "Sold out" },
    inquire: "Inquire", learnMore: "Learn more",
    photosView: "View {n} photos", photoEnlarge: "Enlarge photo", openGallery: "Open gallery",
    imageOf: "Image {i} of {n}", imageShow: "Show image {i}", imageShowTl: "{year}, {title}: view image {i} of {n}",
    lbDialog: "Image gallery", lbClose: "Close gallery", lbPrev: "Previous image", lbNext: "Next image",
    units: ["Days", "Hrs", "Min", "Sec"], cdAria: "{d} days, {h} hours, {m} minutes",
    limitedState: { before: "Coming soon", live: "Available now", ended: "Ended" },
    releaseFrom: "Release: ",
    streamLive: "Live", streamOffline: "Offline",
    eventNow: "Happening now", eventSoon: "Starts in less than 24 hours", eventDays: "{n} days to go", eventProgram: "Programme"
  },

  nav: [
    { label: "Collection" },
    { label: "Limited Edition" },
    { label: "Livestream" },
    { label: "Events" },
    { label: "Story" },
    { label: "Contact & Socials" }
  ],

  hero: {
    eyebrow: "Handcrafted hookah bowls",
    text: "Hookah bowls made of clay, hand-thrown, glazed and fired. Every piece is one of a kind.",
    primaryButton: "View collection",
    secondaryButton: "My story"
  },

  marquee: ["Hand-thrown", "One of a kind", "Stoneware", "Limited", "Glazed", "Fired"],

  collection: {
    title: "Current collection",
    season: "Autumn 2026",
    intro: "The newest bowls from the workshop. Limited, fired in small batches. Tap a piece to see all photos.",
    priceNote: "All prices in euros including statutory VAT, plus shipping. Sales to adults only.",
    items: [
      { material: "Stoneware, basalt grey",       detail: "Ridged body, blue-grey glaze",       price: "€89", linkLabel: "Inquire" },
      { material: "Stoneware, light grey",        detail: "Smooth shape, matte surface",        price: "€79", linkLabel: "Inquire" },
      { material: "Stoneware, grey-blue",         detail: "Slim, tall shape",                   price: "€95" },
      { material: "Porcelain clay, white",        detail: "Wide bowl, glazed rim",              price: "€99", linkLabel: "Inquire" },
      { material: "Stoneware, dark engobe",       detail: "Ridged body",                        price: "€89" },
      { material: "Stoneware, dew blue",          detail: "Smooth shape, dark rim glaze",       price: "€85" }
    ]
  },

  limited: {
    title: "Limited Edition",
    text: "A one-off series in deep obsidian grey with a light-blue rim glaze. Each bowl is hand-thrown, numbered and will only ever be fired in this single edition.",
    facts: [
      "Edition of 25, numbered",
      "Stoneware, double fired",
      "With certificate of authenticity and signature"
    ],
    buttonLabelBefore: "Follow the release on Instagram",
    buttonLabelLive: "Secure yours now",
    textBefore: "Sale starts in",
    textLive: "Available now. Sale ends in",
    textEnded: "The Limited Edition has ended. Thank you to everyone who took part."
  },

  livestream: {
    title: "Live from the workshop",
    intro: "Phil streams on Twitch: from throwing on the wheel to opening the kiln.",
    schedule: [
      { title: "New bowl on the wheel" },
      { title: "Glazing and answering questions" },
      { title: "Kiln opening: Limited Edition" }
    ],
    textLive: "Phil is live right now. Drop by and say hi in the chat.",
    textNext: "Next stream",
    textNone: "The next stream date has not been set yet. Follow the channel so you don't miss it.",
    consent: {
      title: "Livestream from Twitch",
      text: "To show the stream, a connection to Twitch (Twitch Interactive, Inc., USA) is established. Among other things, your IP address is transmitted, and Twitch may use cookies or similar technologies. By clicking “Load livestream” you consent to this, including the transfer of data to the USA. You can withdraw your consent at any time.",
      button: "Load livestream",
      privacy: "More in the privacy policy",
      revoke: "Withdraw consent and remove stream",
      failed: "The stream could not be loaded. You can watch it directly on Twitch."
    }
  },

  events: {
    title: "Events and announcements",
    intro: "This is where Phil shows up as designer and potter. Come by and see the pieces in person.",
    emptyText: "No events are planned right now. New dates will appear here and on Instagram.",
    items: [
      {
        location: "Please add venue",
        text: "Phil presents the new collection at his booth and talks with you about shapes, glazes and firings.",
        program: [
          { time: "Days 1 and 2", label: "Booth with collection and Limited Edition" },
          { time: "Saturday, 8 p.m.", label: "Meet & Greet at Motel One" }
        ],
        linkLabel: "Info on Instagram"
      },
      {
        title: "Potter's evening at the workshop",
        location: "Workshop, date to follow",
        text: "An open evening: watch, try it yourself and ask questions."
      }
    ]
  },

  story: {
    title: "The story behind Ancient Bowls",
    intro: "From the first crooked bowl to my own workshop: this is how it all started.",
    timeline: [
      { title: "The first lump of clay", text: "A pottery course out of curiosity. The first bowl was crooked, but the feeling of shaping something with my own hands never let go of me." },
      { title: "The idea: hookah bowls", text: "A hobby turned into a goal: building bowls that look good and work well. The first prototypes were made at the kitchen table." },
      { title: "Own workshop and own kiln", text: "My own workshop, my own kiln, my own glazes. From now on every shape and every firing is completely in my hands." },
      { title: "Ancient Bowls goes online", text: "The first pieces find their owners. Through Instagram, Twitch and Discord a community grows that cheers along whenever the kiln is opened." },
      { title: "The autumn collection", text: "Six new shapes in grey and blue tones. Calmer, clearer and with more detail than anything I have built so far." }
    ]
  },

  easterEgg: {
    kicker: "Secret archive",
    title: "You found it.",
    lead: "The next collection is called",
    note: "I'm not saying more yet. Keep an eye on the kiln.",
    closeLabel: "Close"
  },

  footer: {
    title: "Stay in touch",
    text: "New firings, streams and glimpses into the workshop can be found here.",
    note: "All offers are directed exclusively at adults aged 18 and over."
  }
};
