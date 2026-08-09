# PUBLICATIEPLAN — Live Poker Handlog v2.6

## Naar de GitHub-root

**Vervangen**
- `index.html`
- `pwa-update.json`

**Nieuw toevoegen**
- `app-v2.6.html`
- `service-worker-v2.6.js`

**Niet wijzigen**
- `manifest.webmanifest`
- `assets/`

## Tijdens de fysieke updateproef nog laten staan

Laat de RC9-baselinebestanden voorlopig staan:
- `app-v2.6-rc9-baseline.html`
- `service-worker-v2.6-rc9-baseline.js`

De reeds geïnstalleerde baseline-PWA heeft deze bestanden nodig totdat de overgang naar v2.6 succesvol is afgerond.

## Pas na succesvolle fysieke acceptatie

Na volledige GO mogen de tijdelijke baseline-runtimebestanden worden verwijderd, mits eerst is bevestigd dat de definitieve v2.6-worker actief is en offline opent.

## Git-commit

**Summary**

`Release Live Poker Handlog v2.6`

**Description**

`Publish the definitive v2.6 app and version-bound PWA runtime. Consolidate release notes to final version entries, add explicit user-controlled PWA updating, and preserve the RC9 baseline files temporarily for the physical upgrade acceptance test.`
