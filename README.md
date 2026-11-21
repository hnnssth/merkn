# Merkn.

Minimalistische Notizen-App für Privat, Beruflich und Freelance. Läuft ohne KI, ohne Abo und ohne eigenen Server.

- **App:** dieses Repo, veröffentlicht über GitHub Pages
- **Daten:** privates Repo `merkn-daten`. Jede Notiz ist eine Markdown-Datei in `notes/`, Bilder liegen in `images/`.

## Funktionen
- Drei Bereiche, automatisch einsortiert nach Stichwörtern und deinen bisherigen Tags (in den Einstellungen anpassbar)
- Tags per `#tag` im Text oder als Chip, Suche mit `#tag` und Volltext
- Checklisten mit Abhaken, Bilder, Anheften, Archiv
- Diktat über das Mikrofon in Chrome (Android und Desktop)
- Übergabe an Claude: Aktuelle Ansicht oder einzelne Notiz mit einem Knopf kopieren. Antworten aus Claude über „Von Claude übernehmen“ wieder einfügen.
- Funktioniert offline und synchronisiert, sobald wieder Netz da ist

## Einrichtung auf einem neuen Gerät
1. App-Adresse öffnen: `https://hnnssth.github.io/merkn/`
2. Benutzername, Repo `merkn-daten` und Zugangsschlüssel eintragen
3. Android: in Chrome im Menü auf **Zum Startbildschirm hinzufügen** tippen

## Zugangsschlüssel erstellen
github.com → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token
- Repository access: **Only select repositories** → `merkn-daten`
- Permissions → Repository permissions → **Contents: Read and write**
- Ablaufdatum nach Wunsch (z. B. 1 Jahr). Läuft er ab, erstellst du einen neuen und trägst ihn in den Einstellungen ein.
