# Landingpage-Release vom 31.10.2026

## Verhalten

Das Programmkarussell steht über YouTube und Radio. Nach 20 Sekunden ohne
Bedienung kehrt es zur aktuellen Live-Sendung zurück. Jede weitere Bedienung
setzt die Wartezeit zurück; „Jetzt live“ führt sofort zurück.

YouTube startet erst nach „Hier abspielen“. Die Playlist steht am Desktop rechts
neben dem Player und auf schmalen Bildschirmen darunter. Radio und Video stoppen
sich gegenseitig. Ein kompakter Radioplayer bleibt beim Scrollen erreichbar.
Die bestehende Hörerbefragung v4 bleibt integriert. Der aktuelle Stand bewahrt
auch die zuvor lokal vorhandenen Safari-Audio- und Sphärenanpassungen.

Die Liste stammt aus `GET /api/youtube-playlist`: beim Öffnen, bei Rückkehr in den
sichtbaren Tab sowie alle 60 Sekunden bei geöffnetem Player. Der Server bündelt
Abrufe innerhalb von fünf Sekunden. Antworten tragen `Cache-Control: no-store`.

Änderungen an Titeln, Reihenfolge und Einträgen werden ohne Neubau der Webseite
übernommen. Ein weiterhin vorhandenes laufendes Video bleibt im selben Iframe.
Bei Entfernung des laufenden Videos wird der nächste gültige Listenplatz
gewählt. Eine leere Liste stoppt den Player.

## Betrieb und Grenzen

`server/youtube_playlist.py` liest die öffentliche YouTube-Watch-Seite für die
festgelegte Playlist. Es benötigt weder API-Schlüssel noch Besucher-Cookies.
Die extrahierte Anzahl muss mit der von YouTube gemeldeten Gesamtzahl stimmen.
Ein unvollständiger Ausschnitt wird nicht als komplette Playlist ausgegeben.
Ändert YouTube das Datenformat oder liefert bei großen Playlists nur einen
Ausschnitt, muss der Abruf angepasst werden; aktuell sind 39 Einträge geprüft.

Bei einem Abruffehler wird ein vorhandener Cache mit `stale: true` geliefert;
die Oberfläche weist auf den älteren Stand hin. Ohne Cache liefert der Server
HTTP 503 und die Oberfläche bietet einen erneuten Abruf an.

YouTube-Fehler 100, 101 und 150 führen nach einem Hinweis zum nächsten verfügbaren
Titel. Fehler 5 bzw. anhaltendes Laden lösen höchstens einen automatischen
Neuaufbau pro Titel aus. Danach ist ein manueller Wiederholungsversuch möglich.
Pausieren und browserseitig blockierter Autostart lösen keinen dauernden Neustart
aus. Einbettungen müssen im jeweiligen YouTube-Video erlaubt sein.

## Dateien

- `src/main.js`, `src/styles.css`: Layout, Einbindung und automatische Listenaktualisierung.
- `src/youtube-player.js`: Wiedergabesteuerung, Fehlerbehandlung und Abgleich nach Video-ID.
- `src/landing-copy.js`: Oberflächentexte in elf Sprachen.
- `server/youtube_playlist.py`: Metadaten-Abruf und kurzzeitiger Cache.
- `server/youtube-endpoint.patch`: Integration in den vorhandenen Pi4-Webserver.
- `public/datenschutz.html`: YouTube-Hinweis und vorhandene Hörerbefragung.

## Deployment

Die Landingpage liegt unter `/home/pi4/web` auf `pi4`. Der vorhandene Python-Server
läuft als `ai-radio-web.service` auf `127.0.0.1:8080`. Dieser Server ist ein anderer
als die Community-Verwaltung im benachbarten Repository.

1. `node --test tests/youtube-player.test.js`,
   `python3 tests/test_youtube_playlist.py` und `npm run build` ausführen.
2. Den aktuellen Live-Stand von `index.html` und `server.py` außerhalb des
   Webroots sichern. Bei Updates auch ein vorhandenes `youtube_playlist.py` sichern.
3. `server/youtube_playlist.py` neben den Live-Webserver übertragen.
   `server/youtube-endpoint.patch` zunächst mit `patch --dry-run` gegen eine Kopie
   der aktuellen Live-`server.py` prüfen und dort anwenden. Bei bereits vorhandener
   Route den Patch nicht erneut anwenden. Den vollständigen Server niemals durch
   das Community-Backend ersetzen.
4. Den angepassten Server atomar ersetzen und `sudo systemctl restart
   ai-radio-web.service` ausführen. Radio- und Icecast-Dienste bleiben unverändert.
   Der Webserver-Neustart kann bestehende HTTP-Verbindungen kurz unterbrechen.
5. Lokal `/api/health` und `/api/youtube-playlist` prüfen. Der Playlist-Abruf muss
   eine vollständige Liste mit `stale: false` liefern.
6. Neue gehashte JS-/CSS-Dateien aus `dist/assets` hochladen und zuletzt
   `dist/index.html` atomar ersetzen. Vorhandene Assets für geöffnete Tabs behalten.
   Persistente Community-Daten, Programmdaten und Podcast-Inhalte nicht überschreiben.
7. Öffentliche URLs und Browserdarstellung kontrollieren. Bei einem Fehler die
   gesicherten Dateien zurückspielen und den Webserver erneut starten.

Der angewendete Backend-Patch basiert auf dem Live-Server mit SHA-256
`47b36e16901e131c29b538c83a14eaf59854f9642dd8cb8b08e813a317bb72c5`.
Sicherung des letzten Releases: `/home/pi4/youtube-sync-backup-20261031`.
Ausführliche lokale Release-Artefakte liegen im Community-Arbeitsverzeichnis unter
`.codex-work/youtube-sync-20261031/` und gehören nicht zum veröffentlichten Quellcode.

## Verifikation

- Acht JavaScript-Tests: Weiterlauf, manuelle Auswahl, Fehler, Autostart-Blockade,
  verspätete Ereignisse beim Schließen sowie Entfernen/Umordnen/Leeren der Liste.
- Vier Python-Tests: Reihenfolge, leere Liste, fehlende/unvollständige Daten und
  ausdrücklich als veraltet markierter Cache bei einem Abruffehler.
- Browsertest mit lokalen Testdaten: 39 auf 38 Einträge, laufender Titel von
  Position 1 auf 2 verschoben; nach dem Minutenabruf gleicher Iframe und weiterhin
  laufende Wiedergabe.
- Live geprüft: 39 Einträge, entfernte Video-ID `I0iV-eZ11mE` fehlt; auf Position 16
  steht nun „Dust of the Last Horizon“. HTML-Asset-Verweise, JS-/CSS-Prüfsummen,
  Health-Endpunkt und `no-store`-Header wurden kontrolliert.
- Desktop und 390 Pixel breite Mobilansicht geprüft; kein horizontaler Überlauf.

Die [separate Duplikatprüfung](playlist-check-2026-10-31.md) dokumentiert die
verbleibenden gleichnamigen Uploads. Sie entfernt keine Videos aus YouTube.
