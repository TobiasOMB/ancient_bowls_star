/* ============================================================
   ANCIENT BOWLS – INHALTE  (hier pflegt Phil alles)
   ------------------------------------------------------------
   Diese Datei ist die EINZIGE, die für Änderungen nötig ist.
   Mit einem Texteditor öffnen (Notepad++, VS Code, TextEdit im
   Nur-Text-Modus), Texte in "Anführungszeichen" ändern, speichern.

   Regeln:
   - Anführungszeichen " " und Kommas , nicht löschen.
   - Jeder Eintrag steht in { geschweiften Klammern } und wird mit
     einem Komma vom nächsten getrennt. Nach dem LETZTEN Eintrag
     einer Liste kommt kein Komma.
   - Bilder liegen im Ordner "images". Dateinamen hier eintragen.
   - Datum und Uhrzeit immer so: "2026-10-24T18:00:00+02:00"
     (Jahr-Monat-Tag, T, Uhrzeit, Zeitzone).
     Zeitzone Deutschland: Sommerzeit +02:00 (Ende März bis Ende
     Oktober), Winterzeit +01:00 (Ende Oktober bis Ende März).
   Ausführliche Anleitung: siehe README.md
   ============================================================ */

window.SITE_CONTENT = {

  meta: {
    title: "Ancient Bowls | Handgetöpferte Shisha-Köpfe",
    description: "Ancient Bowls: handgetöpferte Shisha-Köpfe aus Ton. Aktuelle Kollektion, Limited Edition, Livestream, Events und Geschichte."
  },

  /* ---------- Feste Beschriftungen der Oberfläche (Buttons, Zähler, Hinweise) ----------
     Die englische Fassung steht in content/content.en.js.
     {n}, {i}, {d} usw. sind Platzhalter, nicht ändern.                                  */
  ui: {
    locale: "de-DE",
    timeSuffix: " Uhr",
    until: " bis ",
    skip: "Zum Inhalt springen",
    homeAria: "Ancient Bowls, zurück zum Anfang",
    mainMenu: "Hauptmenü",
    menuClaim: "Handgetöpferte Shisha-Köpfe",
    menuLabel: "Menü", menuLabelClose: "Schließen", menuOpen: "Menü öffnen", menuClose: "Menü schließen",
    scrollDown: "Nach unten scrollen", toTop: "Nach oben scrollen",
    twitchWatch: "Auf Twitch ansehen",
    legalAria: "Rechtliches",
    imprint: { label: "Impressum", href: "impressum.html" },
    privacy: { label: "Datenschutz", href: "datenschutz.html" },
    privacyTwitchHref: "datenschutz.html#twitch",
    langLabel: "Sprache",
    status: { verfuegbar: "Verfügbar", bald: "Bald verfügbar", vergeben: "Vergeben" },
    inquire: "Anfragen", learnMore: "Mehr erfahren",
    photosView: "{n} Fotos ansehen", photoEnlarge: "Foto vergrößern", openGallery: "Galerie öffnen",
    imageOf: "Bild {i} von {n}", imageShow: "Bild {i} anzeigen", imageShowTl: "{year}, {title}: Bild {i} von {n} ansehen",
    lbDialog: "Bildergalerie", lbClose: "Galerie schließen", lbPrev: "Vorheriges Bild", lbNext: "Nächstes Bild",
    units: ["Tage", "Std.", "Min.", "Sek."], cdAria: "{d} Tage, {h} Stunden, {m} Minuten",
    limitedState: { before: "Bald erhältlich", live: "Jetzt erhältlich", ended: "Beendet" },
    releaseFrom: "Release: ",
    streamLive: "Live", streamOffline: "Offline",
    eventNow: "Läuft gerade", eventSoon: "Beginnt in weniger als 24 Stunden", eventDays: "Noch {n} Tage", eventProgram: "Programm"
  },

  /* ---------- Menü (nur "label" ändern, "id" nicht!) ---------- */
  nav: [
    { id: "kollektion", label: "Kollektion" },
    { id: "limited",    label: "Limited Edition" },
    { id: "livestream", label: "Livestream" },
    { id: "events",     label: "Events" },
    { id: "geschichte", label: "Geschichte" },
    { id: "kontakt",    label: "Kontakt & Socials" }
  ],

  /* ---------- Startbereich ---------- */
  hero: {
    eyebrow: "Handgetöpferte Shisha-Köpfe",
    title: "Ancient Bowls",
    text: "Shisha-Köpfe aus Ton, von Hand gedreht, glasiert und gebrannt. Jedes Stück ist ein Unikat.",
    primaryButton: "Kollektion ansehen",
    secondaryButton: "Meine Geschichte"
  },

  /* ---------- Laufband zwischen Start und Kollektion ---------- */
  marquee: ["Handgedreht", "Unikat", "Steinzeug", "Limitiert", "Glasiert", "Gebrannt"],

  /* ---------- Aktuelle Kollektion ----------
     images: Liste aller Fotos zu diesem Kopf. Das ERSTE Bild ist das
             Titelbild der Karte. Alle weiteren sieht man per Klick in
             der Galerie. Bilder ergänzen = Dateiname einfach anhängen.
     status: "verfuegbar" | "bald" | "vergeben"
     link:   Shop, Instagram-Post oder "mailto:…". Leer ("") = kein Link. */
  collection: {
    title: "Aktuelle Kollektion",
    season: "Herbst 2026",
    intro: "Die neuesten Köpfe aus der Werkstatt. Limitiert, in kleiner Auflage gebrannt. Tippe auf ein Stück, um alle Fotos zu sehen.",
    /* Pflichthinweis zu Preisen (Preisangabenverordnung). Für Kleinunternehmer stattdessen z. B.:
       "Preise in Euro. Gemäß § 19 UStG wird keine Umsatzsteuer berechnet. Zzgl. Versandkosten." */
    priceNote: "Alle Preise in Euro inkl. gesetzlicher Umsatzsteuer, zzgl. Versandkosten. Verkauf nur an Volljährige.",
    items: [
      {
        name: "Basalt Ridge",
        images: [
          "images/collection/basalt-ridge-1.svg",
          "images/collection/basalt-ridge-2.svg",
          "images/collection/basalt-ridge-3.svg"
        ],
        material: "Steinzeug, basaltgrau",
        detail: "Gerillter Korpus, blaugraue Glasur",
        price: "89 €",
        status: "verfuegbar",
        link: "https://www.instagram.com/ancientbowls.hookah",
        linkLabel: "Anfragen"
      },
      {
        name: "Nebelkopf",
        images: [
          "images/collection/nebelkopf-1.svg",
          "images/collection/nebelkopf-2.svg",
          "images/collection/nebelkopf-3.svg"
        ],
        material: "Steinzeug, hellgrau",
        detail: "Glatte Form, matte Oberfläche",
        price: "79 €",
        status: "verfuegbar",
        link: "https://www.instagram.com/ancientbowls.hookah",
        linkLabel: "Anfragen"
      },
      {
        name: "Schiefer Tall",
        images: [
          "images/collection/schiefer-tall-1.svg",
          "images/collection/schiefer-tall-2.svg",
          "images/collection/schiefer-tall-3.svg"
        ],
        material: "Steinzeug, graublau",
        detail: "Schlanke, hohe Form",
        price: "95 €",
        status: "bald",
        link: "",
        linkLabel: ""
      },
      {
        name: "Kalk Wide",
        images: [
          "images/collection/kalk-wide-1.svg",
          "images/collection/kalk-wide-2.svg",
          "images/collection/kalk-wide-3.svg"
        ],
        material: "Porzellanton, weiß",
        detail: "Breite Schale, Rand glasiert",
        price: "99 €",
        status: "verfuegbar",
        link: "https://www.instagram.com/ancientbowls.hookah",
        linkLabel: "Anfragen"
      },
      {
        name: "Graphit Ridge",
        images: [
          "images/collection/graphit-ridge-1.svg",
          "images/collection/graphit-ridge-2.svg",
          "images/collection/graphit-ridge-3.svg"
        ],
        material: "Steinzeug, dunkel engobiert",
        detail: "Gerillter Korpus",
        price: "89 €",
        status: "vergeben",
        link: "",
        linkLabel: ""
      },
      {
        name: "Tau",
        images: [
          "images/collection/tau-1.svg",
          "images/collection/tau-2.svg",
          "images/collection/tau-3.svg"
        ],
        material: "Steinzeug, taublau",
        detail: "Glatte Form, dunkle Randglasur",
        price: "85 €",
        status: "vergeben",
        link: "",
        linkLabel: ""
      }
    ]
  },

  /* ---------- Limited Edition ----------
     releaseStart: Beginn des Verkaufs  → davor läuft der Countdown.
     releaseEnd:   Ende des Verkaufs (optional, "" = offen)
                   → nach Start läuft der Countdown bis zum Ende.
     Nach dem Ende zeigt die Seite "Ausverkauft / beendet".               */
  limited: {
    title: "Limited Edition",
    name: "Obsidian Crown",
    text: "Eine einmalige Serie in tiefem Obsidian-Grau mit hellblauer Randglasur. Jeder Kopf ist von Hand gedreht, nummeriert und wird nur in dieser einen Auflage gebrannt.",
    facts: [
      "Auflage: 25 Stück, nummeriert",
      "Steinzeug, doppelt gebrannt",
      "Mit Echtheitskarte und Signatur"
    ],
    images: [
      "images/limited/obsidian-crown-1.svg",
      "images/limited/obsidian-crown-2.svg",
      "images/limited/obsidian-crown-3.svg"
    ],
    releaseStart: "2026-10-24T18:00:00+02:00",
    releaseEnd:   "2026-11-07T23:59:00+01:00",
    buttonLink: "https://www.instagram.com/ancientbowls.hookah",
    buttonLabelBefore: "Release auf Instagram verfolgen",
    buttonLabelLive: "Jetzt sichern",
    textBefore: "Der Verkauf startet in",
    textLive: "Jetzt erhältlich. Der Verkauf endet in",
    textEnded: "Die Limited Edition ist beendet. Danke an alle, die dabei waren."
  },

  /* ---------- Livestream (Twitch) ----------
     Läuft Phil live, erscheint der Stream automatisch. Ist er offline,
     zeigt der Twitch-Player das Offline-Bild des Kanals.
     schedule: Liste der kommenden Streams. Die Seite nimmt automatisch
               den nächsten, der noch in der Zukunft liegt. Alte Einträge
               kannst du stehen lassen oder löschen.                       */
  livestream: {
    title: "Live aus der Werkstatt",
    intro: "Phil streamt auf Twitch: vom Drehen auf der Scheibe bis zum Öffnen des Ofens.",
    channel: "ancientbowls_phoenix",
    channelUrl: "https://www.twitch.tv/ancientbowls_phoenix",
    offlineImage: "images/stream/offline.svg",
    schedule: [
      { start: "2026-10-08T19:00:00+02:00", title: "Neuer Kopf auf der Scheibe" },
      { start: "2026-10-15T19:00:00+02:00", title: "Glasieren und Fragen beantworten" },
      { start: "2026-10-22T19:00:00+02:00", title: "Ofen auf: Limited Edition" }
    ],
    textLive: "Phil ist gerade live. Schau vorbei und schreib in den Chat.",
    textNext: "Nächster Stream",
    textNone: "Der nächste Streamtermin steht noch nicht fest. Folge dem Kanal, dann verpasst du ihn nicht.",
    /* Einwilligung vor dem Laden des Twitch-Players (Pflicht nach DSGVO/TDDDG).
       Der Player wird erst nach Klick geladen. Texte bitte nur mit Rücksprache ändern. */
    consent: {
      title: "Livestream von Twitch",
      text: "Zum Anzeigen des Streams wird eine Verbindung zu Twitch (Twitch Interactive, Inc., USA) hergestellt. Dabei werden unter anderem deine IP-Adresse übertragen, und Twitch kann Cookies oder ähnliche Technologien einsetzen. Mit dem Klick auf „Livestream laden“ willigst du darin ein, auch in die Übermittlung in die USA. Du kannst die Einwilligung jederzeit widerrufen.",
      button: "Livestream laden",
      privacy: "Mehr in der Datenschutzerklärung",
      revoke: "Einwilligung widerrufen und Stream entfernen",
      failed: "Der Stream konnte nicht geladen werden. Du kannst ihn direkt auf Twitch ansehen."
    }
  },

  /* ---------- Events ----------
     Es wird automatisch das nächste Event groß angezeigt, danach die
     weiteren. Vergangene Events verschwinden von selbst.
     start / end: "2027-03-19" (nur Datum) oder mit Uhrzeit.
     program:     Ablauf des Events (optional, darf leer sein: [])       */
  events: {
    title: "Events und Ankündigungen",
    intro: "Hier ist Phil als Designer und Töpfer unterwegs. Komm vorbei und lerne die Köpfe live kennen.",
    emptyText: "Aktuell sind keine Events geplant. Neue Termine erscheinen hier und auf Instagram.",
    items: [
      {
        title: "Shishamesse 2027",
        start: "2027-03-19",
        end: "2027-03-20",
        location: "Ort bitte eintragen",
        text: "Phil präsentiert die neue Kollektion am Stand und spricht mit euch über Formen, Glasuren und Brände.",
        program: [
          { time: "Tag 1 und 2", label: "Messestand mit Kollektion und Limited Edition" },
          { time: "Samstag, 20:00 Uhr", label: "Meet & Greet im Motel One" }
        ],
        link: "https://www.instagram.com/ancientbowls.hookah",
        linkLabel: "Infos auf Instagram"
      },
      {
        title: "Töpfer-Abend in der Werkstatt",
        start: "2027-05-08T18:00:00+02:00",
        end: "",
        location: "Werkstatt, Termin folgt",
        text: "Ein offener Abend: zuschauen, ausprobieren und Fragen stellen.",
        program: [],
        link: "",
        linkLabel: ""
      }
    ]
  },

  /* ---------- Geschichte / Werdegang (Zeitstrahl) ----------
     Weiterführen: Den letzten Block { … } kopieren, ein Komma davor
     setzen und Jahr, Titel, Text anpassen. Neue Einträge erscheinen unten.
     images: Fotos zum Eintrag (darf leer sein: []). Mehrere möglich,
             Klick öffnet die Galerie.                                    */
  story: {
    title: "Die Geschichte hinter Ancient Bowls",
    intro: "Vom ersten schiefen Napf bis zur eigenen Werkstatt: Hier steht, wie alles angefangen hat.",
    timeline: [
      {
        year: "2019",
        title: "Der erste Klumpen Ton",
        text: "Ein Töpferkurs aus Neugier. Der erste Napf war schief, aber das Gefühl, etwas mit den Händen zu formen, hat mich nicht mehr losgelassen.",
        images: []
      },
      {
        year: "2020",
        title: "Die Idee: Shisha-Köpfe",
        text: "Aus einem Hobby wurde ein Ziel: Köpfe zu bauen, die gut aussehen und gut funktionieren. Die ersten Prototypen entstanden am Küchentisch.",
        images: ["images/story/skizze.svg"]
      },
      {
        year: "2022",
        title: "Eigene Werkstatt und eigener Brennofen",
        text: "Eigene Werkstatt, eigener Ofen, eigene Glasuren. Ab jetzt ist jede Form und jeder Brand komplett in meiner Hand.",
        images: ["images/story/werkstatt-1.svg", "images/story/werkstatt-2.svg", "images/story/werkzeug.svg"]
      },
      {
        year: "2024",
        title: "Ancient Bowls geht online",
        text: "Die ersten Köpfe finden ihre Besitzer. Über Instagram, Twitch und Discord wächst eine Community, die mitfiebert, wenn der Ofen geöffnet wird.",
        images: []
      },
      {
        year: "2026",
        title: "Die Herbst-Kollektion",
        text: "Sechs neue Formen in Grau- und Blautönen. Klarer, ruhiger und mit mehr Details als alles, was ich bisher gebaut habe.",
        images: ["images/collection/basalt-ridge-1.svg"]
      }
    ]
  },

  /* ---------- Easter Egg (geheim!) ----------
     Wird ausgelöst, wenn jemand ein verstecktes Zeichen findet.
     nextCollection: Name der nächsten Kollektion. Steht Phil der Name fest,
                     hier einfach ändern. Mit enabled: false schaltest du es ab. */
  easterEgg: {
    enabled: true,
    nextCollection: "Redacted",
    kicker: "Geheimes Archiv",
    title: "Du hast es gefunden.",
    lead: "Die nächste Kollektion trägt den Namen",
    note: "Mehr verrate ich noch nicht. Behalte den Ofen im Auge.",
    closeLabel: "Schließen"
  },

  /* ---------- Social Media (Menü und Footer) ---------- */
  social: [
    { name: "Instagram", url: "https://www.instagram.com/ancientbowls.hookah",   icon: "instagram" },
    { name: "Twitch",    url: "https://www.twitch.tv/ancientbowls_phoenix",       icon: "twitch" },
    { name: "Discord",   url: "https://discord.gg/DEIN-EINLADUNGSLINK",           icon: "discord" }
  ],

  /* ---------- Footer ----------
     Die Pflichtlinks "Impressum" und "Datenschutz" stehen fest in index.html
     (damit sie auch ohne JavaScript erreichbar sind). Nicht entfernen!        */
  footer: {
    title: "Bleib in Kontakt",
    text: "Neue Brände, Streams und Einblicke in die Werkstatt findest du hier.",
    note: "Alle Angebote richten sich ausschließlich an Erwachsene ab 18 Jahren."
  }
};
