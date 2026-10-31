# AI Radio Landing Page

Landingpage für `ai-radio.cc` mit Live-Player, aktueller Sendung, Programmkarussell, Programmplan, Community-Bereich und Podcast-/Textbook-Links.

Die Seite ist eine Vite-App mit Vanilla JavaScript, CSS, Three.js für die drehende Hero-Sphäre und Lucide-Icons.

## Aktueller Funktionsstand

- Mehrsprachige Oberfläche mit Sprachumschalter im Kopfbereich.
- Hell-/Dunkelmodus bleibt im Browser gespeichert.
- Programmkarussell läuft als durchgehende Wochenliste: Beim Wechsel von 23:00 auf 00:00 sind die Sendungen des nächsten Tages schon während der Bewegung sichtbar, rückwärts entsprechend.
- Schnelle Pfeiltasten- und Button-Eingaben werden gepuffert, damit mehrere schnelle Klicks mehrere Kartenwechsel auslösen.
- Nach 20 Sekunden ohne Karussell-Bedienung rollt die Vorschau automatisch zur aktuellen Live-Sendung zurück. Weitere Bedienung startet die Wartezeit neu; „Jetzt live“ führt sofort zurück.
- Community-Einträge und E-Mail-Abonnenten werden serverseitig auf dem Pi4 gespeichert und dürfen beim Deployment nicht gelöscht werden.

## Entwicklung

```bash
npm install
npm run dev
```

Der lokale Dev-Server läuft standardmäßig auf `http://127.0.0.1:5173/`.

## Build

```bash
npm run build
```

Der Produktionsbuild wird in `dist/` erzeugt.

## Projektstruktur

```text
index.html                 Vite-Einstieg
src/main.js                App-Logik, Player, Programm, Karussell, Community
src/styles.css             Layout, Theme, responsive Darstellung
public/data/program.json   Programmdaten und Tagespläne
public/assets/covers/      Hero- und Coverbilder der Sendungen
public/assets/img/         App-/Logo-Bilder
public/podcast/ai-radio/   Podcast-Seite, Feed, Episoden und Textbook-App
```

## Programm pflegen

Das Programm liegt in `public/data/program.json`.

- `shows` enthält die Sendungen mit Titel, Kurzname, Untertitel, Cover und Beschreibung.
- `templates.default` enthält den Standard-Tagesplan nach Stunden.
- `days` ordnet Wochentage einem Plan zu.

Nach Änderungen:

```bash
npm run build
```

## Deployment auf den Pi4

Die Live-Version liegt auf dem Pi4 unter `/home/pi4/web` und wird lokal durch den Server auf Port `8080` ausgeliefert. Der öffentliche Zugriff erfolgt über `https://ai-radio.cc/`.

Wichtig: Nicht den kompletten Webroot mit `rsync --delete dist/ pi4:/home/pi4/web/` überschreiben. In `/home/pi4/web` liegen auch `server.py` und persistente Dateien wie `data/comments.json` und `data/subscribers.json`.

Frontend-Deployment (Programmdaten nur bei gezielt beauftragten Änderungen übertragen):

```bash
npm run build
rsync -av dist/assets/ pi4:/home/pi4/web/assets/
scp dist/index.html pi4:/home/pi4/web/index.html.new
ssh pi4 'mv /home/pi4/web/index.html.new /home/pi4/web/index.html'
```

Verifikation:

```bash
ssh pi4 'curl -fsS http://127.0.0.1:8080/ | sed -n "1,24p"'
curl -fsS https://ai-radio.cc/ | sed -n '1,24p'
curl -fsS https://ai-radio.cc/api/health
```

## Hinweise

- `dist/`, `node_modules/` und `artifacts/` werden nicht versioniert.
- Coverbilder müssen unter `public/assets/covers/` liegen und in `program.json` referenziert werden.
- Sichtbare deutsche Texte sind UTF-8 und sollen mit echten Umlauten gepflegt werden.
- Textbook-Cover werden als kleine `*-512.webp`-Dateien ausgeliefert, damit Safari und Chrome nicht an großen Originalbildern hängen bleiben.

## Landingpage · 31.10.2026

Programmkarussell direkt unter der Navigation; anschließend YouTube-Playlist und Radio.
Die Playlist lässt sich direkt auf der Landingpage abspielen; ein externer Link bleibt als Alternative. Ein kompakter Player bleibt erreichbar, wenn der
große Player außerhalb des sichtbaren Bereichs liegt; beide steuern dieselbe Audioinstanz.
Neue Texte sind in allen elf vorhandenen Sprachen enthalten (`src/landing-copy.js`).
Auf kleinen Displays entfällt die dekorative Sphäre; reduzierte Bewegung verwendet ein Standbild.

Die zuvor direkt im Live-Bundle ergänzten Karussell-Navigation und Befragungsereignisse
sind jetzt auch im Quellcode enthalten. `index.html` bindet die bestehende Befragung v4 ein.
Der erste Design-Release umfasste den HTML-Einstieg und seine JS-/CSS-Assets.
Die anschließende automatische Playlist-Aktualisierung ergänzt den bestehenden
Pi4-Webserver um eine Route und `youtube_playlist.py`; siehe
[Deployment und Prüfung](docs/landing-release-2026-10-31.md).

Release, Sicherung und Prüfergebnisse: im Community-Projekt unter
`.codex-work/landing-20261031/`.

### YouTube direkt auf der Seite

„Hier abspielen“ lädt nach dem sichtbaren Datenhinweis einen YouTube-Player über
youtube-nocookie.com mit der bestehenden Playlist. Vorher wird kein YouTube-Iframe
angelegt. Der Radio-Stream wird dabei einschließlich laufender Verbindungsversuche
und Wiederholungen gestoppt. Ein erneuter Radiostart entfernt den Video-Player.
„Video schließen“ entfernt ihn ebenfalls, ohne das Radio automatisch zu starten.
Beim Umschalten von Programm, Sprache und Theme bleibt der laufende Iframe im DOM.
Die Datenschutzhinweise enthalten den neuen Abschnitt `#youtube`.


### Playlist mit Titelauswahl (31.10.2026)

Der Player nutzt die YouTube IFrame API mit einer eigenen Warteschlange. Rechts
stehen die aktuellen Videos mit Titel, Vorschaubild und Dauer; unter
920 px wandert die Liste unter den Player. Ein Klick lädt den gewählten Titel im
bestehenden Iframe. Am Ende eines Videos startet das nächste; am Playlist-Ende
stoppt die Wiedergabe. Nicht einbettbare/entfernte Videos werden übersprungen.
Bei Ladeproblemen erfolgt höchstens ein automatischer Neuaufbau pro Titel,
anschließend erscheinen Wiederholen und manuelle Titelauswahl. Pausierte Videos
werden nicht neu gestartet. Browserseitig blockierte Wiedergabe erhält eine
Start-Schaltfläche. Die Radio-Mediensteuerung bleibt währenddessen inaktiv.

YouTube-API, Iframe und Vorschaubilder werden erst nach „Hier abspielen“ geladen.
Die Titelmetadaten kommen über `/api/youtube-playlist` direkt vom Pi4. Beim
Öffnen, bei Rückkehr zur sichtbaren Seite und alle 60 Sekunden im geöffneten
Player wird die aktuelle Liste angefordert. Der Browser/CDN darf die Antwort
nicht speichern; der Server fasst Abrufe innerhalb von fünf Sekunden zusammen.
Reihenfolge, neue und entfernte Einträge werden übernommen, ohne ein weiterhin
enthaltenes laufendes Video neu zu laden. Wird das laufende Video entfernt,
wechselt der Player zum nächsten gültigen Listenplatz. Eine leere Playlist
beendet die Wiedergabe. Abruffehler werden sichtbar als veralteter Stand
gekennzeichnet; ohne zuvor geladene Liste erscheint ein Wiederholen-Button.
Es gibt keine im JavaScript-Bundle fest eingebaute Playlist mehr.

`server/youtube_playlist.py` gehört neben den bestehenden Webserver nach
`/home/pi4/web`; `server/youtube-endpoint.patch` dokumentiert die kleine Route
im Pi4-Webserver. Die Metadaten werden aus der öffentlichen YouTube-Seite
abgerufen, ohne API-Schlüssel oder Besucherdaten. Unvollständige oder geänderte
Quellformate werden abgewiesen statt als vollständige Playlist ausgegeben.
Backendtest: `python3 tests/test_youtube_playlist.py`.

Regressionstests: `node --test tests/youtube-player.test.js`.

## Dokumentation und Prüfungen

- [Release, Backend-Deployment und Wiederherstellung](docs/landing-release-2026-10-31.md)
- [Prüfung auf doppelte Playlist-Einträge](docs/playlist-check-2026-10-31.md)
