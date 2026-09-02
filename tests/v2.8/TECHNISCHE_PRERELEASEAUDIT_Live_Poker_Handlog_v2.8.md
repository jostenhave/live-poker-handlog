# Technische pre-releaseaudit — Live Poker Handlog v2.8

**Releasekandidaat:** v2.8
**Releasedatum:** 02-09-2026
**PWA-revisie:** v2.8-pwa-1

## Resultaat

**21 PASS / 0 FAIL**

- PASS — index.html en app-v2.8.html exact gelijk
- PASS — Zichtbare versie is v2.8
- PASS — APP_VERSION is v2.8
- PASS — PWA_VERSION_ID is v2.8-pwa-1
- PASS — Fresh-installregistratie wijst naar unieke v2.8-worker
- PASS — pwa-update.json wijst naar dezelfde worker
- PASS — pwa-update.json versionId is v2.8-pwa-1
- PASS — pwa-update.json versionLabel is v2.8
- PASS — Release notes bevatten alleen definitieve versie-entries
- PASS — v2.8-releasedatum is 02-09-2026
- PASS — Buildlabel 4.6.2.10 niet meer zichtbaar in releasebron
- PASS — Oude v2.7-workerregistratie verwijderd
- PASS — Schema 12 behouden
- PASS — Storage hhl:v12:data behouden
- PASS — Handleiding gebruikt target=_blank
- PASS — Handleiding gebruikt noopener noreferrer
- PASS — Service worker behandelt handleiding als documentresource
- PASS — Listeneraantal blijft 104
- PASS — Geen build-/RC-historie in technische comments
- PASS — JavaScript-syntax app PASS
- PASS — JavaScript-syntax service worker PASS

## Release notes

De in-app release notes bevatten uitsluitend de definitieve versie-entries:

`v2.8 → v2.7 → v2.6 → v2.5 → v2.4 → v2.3`

RC-, build- en subbuildhistorie is uit de gebruikersgerichte release notes verwijderd.

## PWA

- `index.html` en `app-v2.8.html` zijn identiek.
- Fresh install registreert `service-worker-v2.8-pwa-1.js`.
- `pwa-update.json` publiceert dezelfde kandidaat.
- De worker gebruikt cache `live-poker-handlog-v2.8-pwa-1` en `app-v2.8.html` als actieve app-entry.
- De handleiding wordt expliciet als echte PDF-resource behandeld en valt niet onder de generieke documentnavigatie naar de app-entry.

## Bestaande assets

De app-iconen zijn niet gewijzigd. Het releasepakket bevat daarom alleen een overzicht van de bestaande repositorypaden; de huidige iconbestanden moeten bij publicatie op die paden behouden blijven.

## Nog fysiek te bewijzen vóór definitieve vrijgave

Deze kandidaat is technisch gereed om te publiceren, maar volgens de afgesproken releasegates kan v2.8 pas definitief worden vrijgegeven na een gehoste test van:

- fresh install;
- updatepad v2.7 → v2.8, inclusief `Later bijwerken` en `Nu bijwerken`;
- openen van de handleiding vanuit browser en geïnstalleerde Android-PWA;
- live GitHub Pages-controle na publicatie.

De eerdere lokale `content://`-test van de handleiding geldt niet als FAIL: die context kan de relatieve `/docs/`-resource niet als normale website benaderen.

## SHA-256

- `ASSETS_BESTAAND.md` — `859175fcba34f0848439e0b359bd410b9978a2bdc00f9d7edeec3c457965511d`
- `CHANGELOG_Live_Poker_Handlog_v2.8_Build4.6.2.10.md` — `e3568f4f31c669eac3844a0a158632016680ac7b6606815352c5e46c1584d3f1`
- `RELEASE_NOTES_v2.8.md` — `b21523e3aafbdfdff605d87072ec677f32f243b6fe20c7d386d43917c0ec3d92`
- `app-v2.8.html` — `bcd0c40dcb02fc6f7468377e2ec57d8b60dc6e7164a6187a0d62e6a93c1f31a3`
- `docs/Gebruikershandleiding Live Poker Handlog v2.8.docx` — `76874605045d92673a9e4861fa308e3ebc8b6610b743075776214ac85bfb5319`
- `docs/Gebruikershandleiding Live Poker Handlog.pdf` — `0239788824d1a3de1e5ae420156706ecb539ae836f976a2a69e6f4bc3629d18d`
- `index.html` — `bcd0c40dcb02fc6f7468377e2ec57d8b60dc6e7164a6187a0d62e6a93c1f31a3`
- `manifest.webmanifest` — `e2b541bb66cd2675a0c074453aa592f85d8681eda328dfd72fa3bef8cc282c8c`
- `pwa-update.json` — `43e88aee9e816398b032d2a093f9a52c8da3c62fd78135c17a00db52cd391d0a`
- `service-worker-v2.8-pwa-1.js` — `b8e7ac391cff5010a89704eedca96880ecc36f295b5d91bd82796fbf63481009`
