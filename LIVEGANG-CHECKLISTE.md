# Livegang-Checkliste: Ancient Bowls

Diese Seite ist technisch und inhaltlich so vorbereitet, dass sie mit korrekt ausgefüllten Rechtstexten
datenschutz- und impressumskonform online gehen kann. **Das ist keine Rechtsberatung.** Die Rechtstexte sind
Muster. Lass sie vor dem Livegang einmal von einer Rechtsanwältin, einem Rechtsanwalt oder einem
spezialisierten Rechtstext-Dienst gegenprüfen. Ein fehlerhaftes Impressum kann abgemahnt werden.

Stand der Rechtslage bei Erstellung: Oktober 2026. Rechtslage ändert sich. Prüfe die Texte mindestens einmal im Jahr.

---

## 1. Pflicht: Platzhalter ersetzen (nichts davon darf mit Musterdaten online gehen)

- [ ] `impressum.html`: Name, Anschrift, E-Mail, Telefon, ggf. USt-IdNr., ggf. Handwerkskammer
- [ ] `datenschutz.html`: Verantwortlicher, Hoster, Speicherdauer der Logfiles, Versand-/Zahlungsdienstleister, Aufsichtsbehörde
- [ ] **Dieselben Angaben auch in den englischen Fassungen** `legal-notice.html` und `privacy-policy.html` eintragen (sie sind Übersetzungen der deutschen Seiten und müssen inhaltlich identisch sein). Jede spätere Änderung immer in beiden Sprachen vornehmen.
- [ ] Alle gelben Markierungen (`class="ph"`), Hinweiskästen (`class="dev-hint"`) und den Kasten oben (`class="dev-note"`) entfernen
- [ ] Suche in allen Dateien (auch den englischen Rechtsseiten) nach diesen Begriffen, es darf nichts mehr gefunden werden:
      `Mustermann`, `Musterstra`, `Musterstadt`, `example.com`, `class="ph"`, `dev-hint`, `dev-note`, `DE 000000000`, `Beispiel-Hoster`
- [ ] Nicht zutreffende Abschnitte löschen (z. B. USt-IdNr. bei Kleinunternehmern, Handwerkskammer, Altersprüfung)
- [ ] `content/content.js`: Social-Links (Discord-Einladungslink ist ein Platzhalter), Termine, Preise, Texte
- [ ] `content/content.en.js`: englische Texte prüfen und an die deutschen anpassen (bei neuen Einträgen in `content.js` dort an derselben Stelle ergänzen)
- [ ] Platzhalter-Grafiken in `images/` durch echte Fotos ersetzen

## 2. Pflicht: Hosting und Betrieb

- [ ] Hoster mit Sitz/Servern in der EU wählen und **Auftragsverarbeitungsvertrag (AVV)** abschließen
- [ ] **HTTPS** aktivieren (kostenloses Zertifikat beim Hoster, z. B. Let's Encrypt) und HTTP auf HTTPS umleiten
- [ ] Optional empfohlen: `htaccess-beispiel.txt` in `.htaccess` umbenennen (Apache), setzt HTTPS und Sicherheits-Header
- [ ] Logfile-Speicherdauer beim Hoster auf kurze Zeit stellen (z. B. 7 Tage) und in der Datenschutzerklärung angeben
- [ ] Impressum und Datenschutz müssen von jeder Seite mit einem Klick erreichbar sein (sind im Footer verlinkt, auch ohne JavaScript)

## 3. Schriften (Datenschutz)

- [ ] Die Seite lädt **keine** Schriften von Google. Ohne weitere Schritte sieht sie mit Systemschriften etwas anders aus.
- [ ] Für das Originaldesign: Anleitung in `fonts/LIESMICH.txt` befolgen (Schriften lokal speichern, ca. 10 Minuten)
- [ ] Niemals einen Link auf `fonts.googleapis.com` einbauen

## 4. Twitch-Livestream

- [ ] Der Player lädt erst nach Klick auf "Livestream laden" (Einwilligung). Das ist eingebaut und getestet: vorher gibt es keine Verbindung zu Twitch.
- [ ] Anschrift und Datenschutzlink von Twitch, Instagram, Discord in `datenschutz.html` (Abschnitte 8 und 9) auf Aktualität prüfen
- [ ] Möchtest du den Stream nicht einbetten: Bereich `livestream` in `content/content.js` entfernen und die Datenschutzerklärung anpassen
- [ ] Die Seite funktioniert nur unter einer echten Domain (https), der Player braucht die Domain als "parent"

## 5. Verkauf, Preise, Jugendschutz (bitte rechtlich prüfen lassen)

- [ ] **Preise:** Auf der Seite stehen Preise. Sie müssen die Endpreise inkl. Umsatzsteuer nennen und auf Versandkosten hinweisen. Der Text steht in `content/content.js` unter `collection.priceNote`. Bist du Kleinunternehmer (§ 19 UStG), ändere ihn laut Kommentar dort.
- [ ] **Jugendschutz / Tabakbezug:** Shisha-Köpfe sind Zubehör für Tabakkonsum. Lass prüfen, ob du bei Verkauf eine Altersverifikation brauchst und ob die Darstellung als Werbung problematisch sein kann (Tabakerzeugnisgesetz, Jugendschutzgesetz). Auf der Seite steht der Hinweis "ab 18 Jahren". Zeige keine rauchenden Personen und keinen Tabak.
- [ ] **Gewerbeanmeldung:** Gewerbe angemeldet? Ggf. Handwerkskammer, Finanzamt, Betriebsnummer. Das Impressum muss dazu passen.
- [ ] **Verbraucherschlichtung:** Entscheide, ob du teilnimmst (Impressum, Abschnitt "Verbraucherstreitbeilegung"). Ein Hinweis auf die abgeschaltete EU-OS-Plattform ist nicht mehr nötig und wäre falsch.

## 6. Bilder, Texte, Rechte Dritter

- [ ] Nur eigene Fotos oder Bilder mit schriftlichen Nutzungsrechten verwenden. Bei erkennbaren Personen: Einwilligung einholen
- [ ] Bildnachweis im Impressum prüfen (Abschnitt "Urheberrecht und Bildnachweis")
- [ ] **Easter Egg und Stargate-Motive:** Die Erd-Glyphe im Footer, der Tipp-Code "stargate" und die Stargate-Animation beziehen sich auf die Marke und das Werk "Stargate" (Rechteinhaber: MGM/Amazon). Die Grafiken sind selbst gezeichnet, ahmen aber ein geschütztes Design nach. Auf einer gewerblichen Seite kann das Marken- oder Urheberrechte verletzen. Sicherer: Easter Egg mit `enabled: false` abschalten, die Variante ohne Stargate-Animation nutzen und die Glyphe im Footer durch ein eigenes Zeichen ersetzen, oder eine Freigabe prüfen lassen.
- [ ] Logo und Schriften: Das Logo muss dir gehören. Die genannten Schriften stehen unter der SIL Open Font License und dürfen lokal gehostet werden (Lizenzdatei mitliefern)

## 7. Was die Seite technisch schon erfüllt

- Keine Cookies, kein Tracking, keine Webanalyse, kein Browser-Speicher (Local/Session Storage). Dadurch ist kein Cookie-Banner nötig.
- Keine Verbindung zu Dritten beim Laden der Seite (Schriften und alle Grafiken liegen lokal). Geprüft: null externe Anfragen.
- Twitch nur nach ausdrücklichem Klick (Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG), jederzeit widerrufbar.
- Externe Links geben keinen Referrer weiter.
- Impressum und Datenschutz auch ohne JavaScript erreichbar (deutsch und englisch).
- Zweisprachig (Deutsch/Englisch): Die Sprachwahl steckt nur in der Adresse, es wird nichts gespeichert.
- Reine Informationsseite ohne Shop: Das Barrierefreiheitsstärkungsgesetz greift nach unserer Einschätzung nicht. Baust du später einen Shop oder eine Online-Buchung ein, musst du das neu bewerten (für Kleinstunternehmen gibt es Ausnahmen).
- Bedienung per Tastatur, Fokus-Rahmen, Alternativtexte und reduzierte Bewegung (`prefers-reduced-motion`) sind berücksichtigt.

## 8. Wenn du die Seite später erweiterst

Jede dieser Änderungen braucht eine Anpassung der Datenschutzerklärung (und oft eine Einwilligung):
Kontaktformular, Newsletter, Webanalyse (z. B. Matomo, Google Analytics), eingebettete Karten, Videos, Instagram-Feed,
Shop, Zahlungsdienste, Kommentarfunktion. Frage vorher nach, bevor du so etwas einbaust.

## 9. Letzter Test vor dem Livegang

- [ ] Alle Links klicken (Menü, Footer, Social, Impressum, Datenschutz) und die Seite einmal ganz auf Englisch ansehen (`?lang=en`), inklusive der englischen Rechtsseiten
- [ ] Auf Handy und Computer ansehen, auch mit abgeschaltetem JavaScript (Impressum/Datenschutz müssen erreichbar sein)
- [ ] Im Browser unter "Netzwerk" prüfen, dass beim Laden nur Anfragen an die eigene Domain gehen
- [ ] Rechtstexte von Fachperson prüfen lassen
