# AI Radio Landing Page

Landingpage für `ai-radio.cc` mit Live-Player, aktueller Sendung, Programmkarussell, Programmplan, Community-Bereich und Podcast-/Textbook-Links.

Die Seite ist eine Vite-App mit Vanilla JavaScript, CSS, Three.js für die drehende Hero-Sphäre und Lucide-Icons.

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
podcast/ai-radio/textbooks Textbook-App mit Liedtexten und optimierten Covern
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

Direktes Deployment:

```bash
npm run build
rsync -av dist/assets/ pi4:/home/pi4/web/assets/
rsync -av dist/data/ pi4:/home/pi4/web/data/
scp dist/index.html pi4:/home/pi4/web/index.html.new
ssh pi4 'mv /home/pi4/web/index.html.new /home/pi4/web/index.html'
```

Verifikation:

```bash
ssh pi4 'curl -fsS http://127.0.0.1:8080/ | sed -n "1,24p"'
curl -fsS https://ai-radio.cc/ | sed -n '1,24p'
```

## Hinweise

- `dist/`, `node_modules/` und `artifacts/` werden nicht versioniert.
- Coverbilder müssen unter `public/assets/covers/` liegen und in `program.json` referenziert werden.
- Sichtbare deutsche Texte sind UTF-8 und sollen mit echten Umlauten gepflegt werden.
- Textbook-Cover werden als kleine `*-512.webp`-Dateien ausgeliefert, damit Safari und Chrome nicht an großen Originalbildern hängen bleiben.
