# TECHNISCH RELEASERAPPORT — Live Poker Handlog v2.9

## Status

De definitieve releasebestanden zijn opgebouwd vanuit de fysiek goedgekeurde bron:

`Live_Poker_Handlog_v2.9_Build2.1.html`

De functionele freeze is gehandhaafd.

## Release-identiteit

- HTML title: `Live Poker Handlog v2.9`
- `APP_VERSION='v2.9'`
- `VERSION='v2.9 · 2026-09-20'`
- `PWA_VERSION_ID='v2.9-pwa-1'`
- definitieve app-entry: `app-v2.9.html`
- service worker: `service-worker-v2.9-pwa-1.js`
- cache: `live-poker-handlog-v2.9-pwa-1`

## Data-invarianten

- `SCHEMA_VERSION=12` — behouden
- `KEY='hhl:v12:data'` — behouden
- bestaande migratie-/opslaglogica — functioneel ongewijzigd
- geen nieuwe datamigratie toegevoegd

## Release notes

v2.9 is als nieuwste item boven v2.8.1 toegevoegd met datum `20-09-2026`.

Opgenomen:
- uitgebreidere historische bewerking/navigatie en Villain koppelen/ontkoppelen;
- rapportage NL/EN;
- Ik/I of Hero;
- holecards van Hero en Villains zichtbaar/onzichtbaar maken voor delen;
- persistente standaardinstellingen voor het verslag;
- relevantere spelersinformatie;
- consistente Hero/Villain-identiteit;
- algemene correcties in registratie, berekening en weergave.

Bestaande release notes van v2.8.1 en ouder zijn niet inhoudelijk gewijzigd.

## PWA

Aangemaakt:
- `service-worker-v2.9-pwa-1.js`
- `pwa-update.json`
- `manifest.webmanifest`
- `index.html` gesynchroniseerd met `app-v2.9.html`

`pwa-update.json` bevat:
- `versionId: v2.9-pwa-1`
- `versionLabel: v2.9`
- `worker: ./service-worker-v2.9-pwa-1.js`

De service worker activeert de kandidaat niet tijdens installatie. Activering via `SKIP_WAITING` blijft gekoppeld aan de bestaande expliciete **Nu bijwerken**-route.

### Repository-assets

De goedgekeurde HTML verwijst al naar bestaande repository-assets onder `./assets/icons/`.
Deze iconen zijn niet als losse bronbestanden in deze bouwopdracht aangeleverd en zijn daarom niet opnieuw gegenereerd of gewijzigd. Het releasepakket veronderstelt dat de bestaande `assets/icons/`-map in de repository behouden blijft.

Het manifest is voor deze release gereconstrueerd op basis van de paden en PWA-metadata die aantoonbaar in de goedgekeurde HTML aanwezig zijn. Er is geen los v2.8.1-manifestbestand als bron aangeleverd. Controleer bij deployment daarom dat de bestaande repository-iconpaden overeenkomen met de opgenomen manifestpaden.

## Handleiding

De aangeleverde definitieve `Gebruikershandleiding Live Poker Handlog v2.9.pdf` is opgenomen als:

`docs/Gebruikershandleiding Live Poker Handlog.pdf`

Daarmee blijft de reeds bestaande Handleiding-link in de app geldig.

## Statische controles

- release title — PASS
- `APP_VERSION` — PASS
- zichtbare `VERSION` — PASS
- `PWA_VERSION_ID` — PASS
- schema 12 — PASS
- storage key `hhl:v12:data` — PASS
- nieuwe serviceworkerverwijzing — PASS
- `data-wz-jump` afwezig — PASS
- v2.9-release notes aanwezig — PASS
- oude `v2.8.1-pwa-1` identiteit afwezig uit definitieve HTML — PASS
- JSON-syntax manifest — PASS
- JSON-syntax `pwa-update.json` — PASS
- JavaScript-syntax app — PASS (`node --check`)
- JavaScript-syntax service worker — PASS (`node --check`)

## Diffcontrole Build 2.1 → v2.9

De definitieve HTML is teruggenormaliseerd door uitsluitend de expliciet toegestane wijzigingen terug te draaien:

1. release title;
2. `APP_VERSION`;
3. zichtbare `VERSION`;
4. `PWA_VERSION_ID`;
5. serviceworker-URL;
6. toegevoegd v2.9-release-note-item.

Na die normalisatie is de HTML **byte-for-byte gelijk aan Build 2.1**.

### Functionele codeverschillen buiten toegestane releasewijzigingen

**Geen.**

## Checksums

- bron Build 2.1 SHA-256: `fc6c8035bbc489ae80bbf9760f323a54cdb69592ff4b182270060e0fa79c243a`
- `app-v2.9.html` SHA-256: `e96ec373adb74fabe9dd176d033225c4539d080492f3a708c216a68ec4e07261`
- `service-worker-v2.9-pwa-1.js` SHA-256: `ecc51f128962a68cb44dd14033dfcfbda24431ecd41aa7dff2f40e4aa619ead0`

## Nog uit te voeren fysieke smoketest

De technische releasebuild is gereed voor review, maar de PWA-release is pas volledig gevalideerd na de afgesproken Android-smoketest:

1. update naar v2.9 wordt aangeboden en geïnstalleerd;
2. versienummer toont v2.9;
3. bestaande lokale data blijft behouden;
4. bestaande sessie en opgeslagen hand openen;
5. `Vorige stap` / `Volgende stap` werken;
6. `Naar begin` / `Naar eind` werken;
7. rapportagepagina opent en v2.9-verslaginstellingen zijn beschikbaar.
