# Ancient Bowls: Landing Page

Reine HTML/CSS/JS-Seite, ohne Build-Schritt und ohne Datenbank.
Alles, was Phil ändern möchte, steht in **einer** Datei: `content/content.js`.

## Dateien

```
index.html            Grundgerüst der Seite (normalerweise nicht anfassen)
impressum.html        Impressum, deutsch (Muster, muss ausgefüllt werden)
datenschutz.html      Datenschutzerklärung, deutsch (Muster, muss ausgefüllt werden)
legal-notice.html     Impressum, englische Fassung (Übersetzung, ebenfalls ausfüllen)
privacy-policy.html   Datenschutzerklärung, englische Fassung (Übersetzung, ebenfalls ausfüllen)
content/content.js    ALLE Texte (deutsch), Bilder, Links, Termine   <-- hier wird gepflegt
content/content.en.js Die ENGLISCHEN Texte (nur Texte, Bilder/Links/Termine kommen aus content.js)
css/style.css         Design, Farben stehen ganz oben als Variablen
css/legal.css         Design der Rechtsseiten
css/fonts-lokal.css   lokale Schriften (optional, siehe fonts/LIESMICH.txt)
js/main.js            Logik und Animationen
js/boot.js            kleiner Startschalter (nicht ändern)
fonts/LIESMICH.txt    Anleitung: Schriften lokal einbinden
images/               deine Fotos, Logo, Favicons
htaccess-beispiel.txt Beispiel für HTTPS und Sicherheits-Header (Apache)
LIVEGANG-CHECKLISTE.md  Was vor dem Livegang erledigt sein muss  <-- bitte zuerst lesen!
```

## Rechtliches (wichtig, vor dem Livegang lesen)

Die Seite ist technisch auf deutsches Recht (DDG, DSGVO, TDDDG) vorbereitet: keine Cookies, kein Tracking,
keine Google-Schriften, Twitch nur nach Einwilligung, Impressum und Datenschutz immer erreichbar.
Die Rechtstexte in `impressum.html` und `datenschutz.html` sind **Muster mit gelb markierten Platzhaltern**
(Max Mustermann). Sie müssen mit den echten Daten ausgefüllt und von einer Fachperson geprüft werden.
**Alles Weitere steht in `LIVEGANG-CHECKLISTE.md`.** Das ist keine Rechtsberatung.

## Deutsch und Englisch

Die Seite gibt es auf Deutsch und Englisch. Besucher wechseln mit **DE | EN** (in der Kopfzeile am Computer, im Menü
und im Footer). Die Sprache steckt nur in der Adresse (`index.html?lang=en`), es wird nichts im Browser gespeichert.
Ohne Angabe erscheint die Seite auf Deutsch. Den Link zur englischen Seite kannst du direkt teilen:
`https://deine-domain.de/?lang=en`.

- **Deutsche Texte** pflegst du wie bisher in `content/content.js`.
- **Englische Texte** stehen in `content/content.en.js`. Die Datei enthält nur Texte. Was dort fehlt, erscheint auf Deutsch.
- **Listen** (Kollektion, Zeitstrahl, Events, Streamtermine) werden der Reihe nach zusammengeführt: Der 1. Eintrag in
  `content.en.js` gehört zum 1. Eintrag in `content.js` usw. **Fügst du in `content.js` einen Eintrag hinzu, übersetze
  ihn in `content.en.js` an derselben Stelle.** Bilder, Links, Daten und Status stehen nur in `content.js`.
- **Feste Beschriftungen** (Buttons, Zähler, Hinweise) stehen in beiden Dateien im Bereich `ui`.
- **Rechtsseiten:** `impressum.html` und `datenschutz.html` (deutsch) sowie `legal-notice.html` und
  `privacy-policy.html` (englisch). Die englischen Seiten sind Übersetzungen. Jede Änderung (Adresse, Hoster usw.)
  muss in beide Fassungen. Im Streitfall gilt die deutsche Fassung, das steht auf den englischen Seiten.
- Uhrzeiten werden für englische Besucher mit Zeitzone angezeigt (z. B. 19:00 CEST), für deutsche mit "Uhr".

## So bearbeitest du die Seite

1. `content/content.js` mit einem Texteditor öffnen (Notepad++, VS Code, ...). Nicht Word benutzen.
2. Texte ändern, speichern.
3. Geänderte Dateien (und neue Bilder) auf den Webspace hochladen. Fertig.

Regeln: Anführungszeichen `" "` und Kommas `,` nicht löschen. Jeder Eintrag steht in `{ ... }`.
Zwischen zwei Einträgen steht ein Komma, nach dem **letzten** Eintrag einer Liste keins.

### Datum und Uhrzeit
Immer so schreiben: `"2026-10-24T18:00:00+02:00"`, also Jahr-Monat-Tag, `T`, Uhrzeit, Zeitzone.
Zeitzone Deutschland: **Sommerzeit `+02:00`** (Ende März bis Ende Oktober), **Winterzeit `+01:00`**.
Bei ganzen Tagen reicht `"2027-03-19"`.

---

## Kollektion austauschen oder erweitern

Bereich `collection` → `items`. Pro Kopf ein Block:

```js
{
  name: "Basalt Ridge",
  images: [
    "images/collection/basalt-ridge-1.jpg",   // erstes Bild = Titelbild
    "images/collection/basalt-ridge-2.jpg",
    "images/collection/basalt-ridge-3.jpg"
  ],
  material: "Steinzeug, basaltgrau",
  detail: "Gerillter Korpus, blaugraue Glasur",
  price: "89 €",
  status: "verfuegbar",        // oder "bald" oder "vergeben"
  link: "https://…",           // leer lassen "" = kein Link
  linkLabel: "Anfragen"
}
```

- **Bild ersetzen:** neues Foto mit **demselben Dateinamen** in `images/collection/` speichern. Fertig.
- **Bild ergänzen:** Foto in `images/collection/` legen und den Dateinamen in der Liste `images` anhängen
  (Komma nicht vergessen). Auf der Karte erscheint automatisch ein Zähler, ein Klick öffnet die Galerie
  (Wischen, Pfeiltasten und Vorschaubilder funktionieren).
- **Neue Kollektion:** Saison bei `season` ändern, alte Blöcke überschreiben oder löschen, neue Blöcke
  kopieren und anpassen.

Tipp zu Bildern: quadratisch (z. B. 1200 x 1200 px), JPG oder WebP, möglichst unter 300 KB pro Bild.

## Limited Edition

Bereich `limited`: `name`, `text`, `facts` (Stichpunkte), `images` (mehrere möglich) und die Zeiten:

- `releaseStart`: ab da ist der Kopf erhältlich. Davor läuft der **Countdown bis zum Release**.
- `releaseEnd`: Ende des Verkaufs (optional, `""` = offen). Danach läuft der Countdown bis zum Ende.
- Nach `releaseEnd` zeigt die Seite automatisch "Beendet" (Text bei `textEnded`).

Für die nächste Limited Edition einfach alle Felder überschreiben.

## Livestream (Twitch)

Bereich `livestream`. Kanal: `ancientbowls_phoenix`.

- Ist Phil **live**, läuft der Stream automatisch auf der Seite (stumm, per Klick einschaltbar).
  Der Hinweis zeigt "Live" an.
- Ist Phil **offline**, zeigt der Twitch-Player das Offline-Bild des Kanals. Das Bild pflegst du direkt
  bei Twitch (Kanal-Einstellungen, Branding).
- **Nächster Stream:** Unter `schedule` die kommenden Termine eintragen. Die Seite nimmt automatisch den
  nächsten zukünftigen Termin und zählt herunter. Vergangene Termine darfst du stehen lassen oder löschen.

Wichtig: Der Twitch-Player funktioniert nur, wenn die Seite über eine Domain (`https://…`) aufgerufen wird,
nicht beim Doppelklick auf `index.html` vom Desktop. Dort siehst du stattdessen das Ersatzbild
`images/stream/offline.svg` und den Twitch-Link. Lokal testen: im Ordner `python3 -m http.server`
starten und `http://localhost:8000` öffnen (der Player ist für `localhost` erlaubt).

## Events

Bereich `events` → `items`. Das **nächste** Event wird groß mit Datum, Ort, Programm und
"Noch X Tage" angezeigt, weitere darunter. Vergangene Events verschwinden automatisch.

```js
{
  title: "Shishamesse 2027",
  start: "2027-03-19",
  end: "2027-03-20",
  location: "Ort und Halle",
  text: "Kurzbeschreibung",
  program: [
    { time: "Tag 1 und 2", label: "Messestand" },
    { time: "Samstag, 20:00 Uhr", label: "Meet & Greet im Motel One" }
  ],
  link: "https://…", linkLabel: "Infos"
}
```
Die Termine in der Vorlage sind Platzhalter. Bitte Datum und Ort prüfen und anpassen.

## Geschichte (Zeitstrahl) weiterführen

Bereich `story` → `timeline`. Den letzten Block kopieren, Komma davor setzen, `year`, `title`, `text` ändern.
Neue Einträge erscheinen unten. Fotos zum Eintrag: Liste `images` (leer lassen mit `[]`, mehrere möglich,
Klick öffnet die Galerie). Bilder in `images/story/` ablegen.


## Startbereich und Laufband

Bereich `hero`: `eyebrow` (kleine Zeile oben), `title` (Name, der zweite Teil erscheint kursiv),
`text` und die beiden Buttons. Bereich `marquee`: die Wörter des Laufbands unter dem Startbild.
Das Band läuft langsam von selbst und wird schneller, wenn man scrollt (Richtung folgt der Scrollrichtung).

## Effekte (zur Info)

- Intro-Animation beim ersten Besuch pro Sitzung, danach nicht mehr.
- Startbild (cineastisch): Dein Logo (`images/logo.png`) steht exakt mittig und löst sich an den Rändern in
  rauchige Energiestränge auf (zwei Rauchebenen, die sich langsam verformen). Dahinter liegen viele feine
  Ringe, Strahlenbänder und ein technisches Overlay mit Fadenkreuz, Diagonalen und Messmarken, außerdem
  Nebeltextur, Vignette und schwebende Lichtpartikel.
  Die Rauch-Bewegung läuft nur am Desktop. Auf dem Handy bleibt sie als stehendes Bild (spart Akku).
- Zeitstrahl: Die Linie füllt sich beim Scrollen. An ihrem Ende wandert ein Optical Flare mit (Lichtkern,
  Strahlenstern, anamorphe Streifen, Farbsaum, Funken und Linsenreflexe, die auf der Achse zur Bildmitte
  liegen) sowie ein senkrechter Funkenschweif wie bei einer Sternschnuppe: Die Funken bleiben beim Scrollen hinter
  dem Lichtpunkt zurück, ziehen kurze Linien und blenden nach oben aus. Läuft der Flare an einem Text
  vorbei, zieht er seine Streifen auf einen kurzen Lichtstreif im Freiraum zusammen, der Text liegt
  über dem Licht. Jeder Meilenstein bekommt beim Erreichen einen Lichtblitz, einen Schockring und leuchtet auf.
- Limited Edition: Hinter dem Bild liegt eine große Aura aus ruhenden Ringen, drehenden welligen Linien mit
  wandernden Lichtpunkten, Bögen und geschwungenen S-Kurven, exakt auf das Bild zentriert. Durch die Sektion
  fließen zusätzlich lange Wellenlinien (nahtlose Schleife).
- Countdown-Ziffern rollen, das Laufband reagiert auf das Scrolltempo.
- Back-to-top-Button erscheint beim Hochscrollen, sein Ring zeigt den Scrollfortschritt.
- Alle Effekte schalten sich ab, wenn Besucher "Bewegung reduzieren" im Betriebssystem aktiviert haben.

## Easter Egg (geheim)

Auf der Seite ist ein verstecktes Easter Egg, das den Namen der nächsten Kollektion verrät.
Der Name steht in `content/content.js` im Bereich `easterEgg` bei `nextCollection`
(aktuell "Redacted"). Sobald der Name feststeht, dort einfach ändern. Mit `enabled: false` wird es abgeschaltet.
Dort lassen sich auch alle Texte des Easter Eggs anpassen.

Auslöser (bitte nicht verraten):
- Am Computer: irgendwo auf der Seite das Wort "stargate" auf der Tastatur tippen.
- Am Handy und am Computer: die kleine Glyphe ganz unten im Footer fünfmal schnell hintereinander antippen
  (die Erd-Glyphe aus Stargate, in der Mitte der letzten Zeile).

Animation: Beim Auslösen erscheint ein Stargate. Der Glyphenring dreht sich ein, die neun Chevrons verriegeln
nacheinander, der Ereignishorizont öffnet sich und fließt danach in einer ruhigen Endlosschleife, dann erscheint der Name.
Das Tor ist komplett als Vektorgrafik gebaut (immer scharf, keine Bilddatei). Die Animation steckt in zwei Dateien:
`js/egg-stargate.js` und `css/egg-stargate.css`. Wer sie nicht möchte, löscht diese beiden Dateien und die beiden
Zeilen mit `egg-stargate` in `index.html`. Dann erscheint die einfache Variante (Lichtblitz und Entschlüsselung des Namens).

## Socials
Bereich `social`: Instagram (`ancientbowls.hookah`), Twitch (`ancientbowls_phoenix`) und Discord.
**Den Discord-Einladungslink bitte eintragen**, der aktuelle ist ein Platzhalter.

## Vor dem Livegang
Siehe `LIVEGANG-CHECKLISTE.md`. Kurzfassung: Platzhalter in Impressum und Datenschutz ersetzen, Hoster mit
Auftragsverarbeitungsvertrag und HTTPS, Schriften lokal einbinden (optional), Preise und Jugendschutz prüfen lassen,
echte Fotos einsetzen, Rechtstexte von einer Fachperson prüfen lassen.

## Farben ändern
In `css/style.css` ganz oben im Block `:root`. Der Dunkelmodus passt sich automatisch dem Gerät an.
