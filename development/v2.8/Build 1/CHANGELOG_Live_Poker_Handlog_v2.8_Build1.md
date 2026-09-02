# CHANGELOG — Live Poker Handlog v2.8 Build 1

**Build:** v2.8 Build 1 — Veilige codeconsolidatie  
**Datum:** 23 augustus 2026  
**Bouwbasis:** definitieve gepubliceerde `app-v2.7.html`  
**Output:** `Live_Poker_Handlog_v2.8_Build1.html`

## 1. Doel en scope

Build 1 voert uitsluitend conservatieve technische cleanup uit op aantoonbaar overschreven of niet meer aangeroepen historische code, plus de expliciet gevraagde sessiecopycorrectie. Er zijn geen nieuwe helpers, wrappers, overrides of eventhandlers toegevoegd. Actieve pokerlogica, stateflows, opslag-/recoveryarchitectuur, PWA-updatearchitectuur en overige non-scopeonderdelen zijn niet gewijzigd.

## 2. Pre-buildmeting

| Metriek | v2.7-basis |
|---|---:|
| Bestandsgrootte | 852.009 bytes |
| Regels | 12.245 |
| Top-level functiedeclaraties | 671 |
| Unieke top-level functienamen | 620 |
| Dubbele top-level functienamen | 36 |
| Extra declaraties bovenop unieke namen | 51 |
| Base-/wrappertoewijzingen | 121 |
| `DODE CODE` | 165 |
| `AANDACHTSPUNT` | 0 |
| `WIJZIGING` | 99 |
| `loadV24` aanwezig | ja — 1 voorkomen, uitsluitend de declaratie |
| `saveV24` aanwezig | ja — 1 voorkomen, uitsluitend de declaratie |

Callercheck vóór de bouw bevestigde dat `loadV24` en `saveV24` nergens anders werden gerefereerd.

## 3. Uitgevoerde cleanup

### 3.1 Parser-/formatterhistorie

Verwijderd zijn uitsluitend de vroege declaraties van:

- `parseChipValue`
- `num`
- `compactK`
- `chipDisplay`
- `invalidKMessage`

**Gate-onderbouwing:** voor iedere verwijderde declaratie bestaat later in hetzelfde top-level script een vervangende declaratie met dezelfde functienaam; de verwijderde variant had geen eigen Base-/aliasreferentie; er was geen actieve wrapper die specifiek de oude implementatie kon vasthouden; de finale v2.7-parser-/formatterroute blijft ongewijzigd. De effectieve runtime gebruikt nog steeds `rc8Build10ParseChip()` en `rc8Build11FormatChip()` via de bestaande finale toewijzingen.

Niet verwijderd zijn onder meer historische declaraties die nog als strict-mode binding dienen voor latere toewijzingen, zoals `fmtChips` en `validateVisibleChipInputs`. Het verwijderen daarvan zou zonder extra structurele wijziging een nieuwe foutmogelijkheid introduceren en valt daarom onder de stopregel.

### 3.2 Vroege wizardbasisdeclaraties

Verwijderd zijn uitsluitend vroege, volledig overschreven declaraties van:

- `wzCoords`
- `wzPos`
- `wzOrder`
- `wzButton`
- `wzOpts`

**Gate-onderbouwing:** deze geselecteerde namen hebben latere top-level declaraties, geen toewijzing aan een `*Base`-alias en geen eigen actieve wrapperketen. De actieve wizardwrapperketens (`wzAction`, `wzPlayers`, `wzSave`, `wzTable`, `wzApply`, `wzFinish`, enz.) zijn bewust niet geconsolideerd.

### 3.3 Oude RC8 tafel-/chipformattervarianten

Verwijderd zijn aantoonbaar overschreven oudere declaraties van:

- `rc8FitTableVisual` — oude variant
- `rc8CashMarkerLayout` — oude variant
- `rc8CashChipLine` — twee oude varianten
- `rc8CashPreferredTrackPoint` — oude variant
- `rc8TournamentChipDisplay` — oude variant
- `rc8TournamentMarkerLayout` — twee oude varianten
- `rc8TournamentChipLine` — oude variant

**Gate-onderbouwing:** iedere verwijderde variant wordt later door dezelfde functienaam opnieuw gedeclareerd en heeft geen Base-/aliasreferentie naar de verwijderde implementatie. De finale RC8-geometrie, cash-/toernooichipweergave en K/M/B-formatting zijn intact gebleven.

### 3.4 `loadV24` en `saveV24`

Beide legacyfuncties zijn na de laatste callercheck verwijderd. De actieve functies `load()`, `save()`, `persistNow()`, `safeStorageSet()`, `migrate()` en recovery-/stagingroutes zijn niet gewijzigd.

Post-build bevatten de bestanden **geen** voorkomen meer van de identifiers `loadV24` en `saveV24`.

### 3.5 Twee onjuiste `DODE CODE`-markers bij kaartkeuze

De twee defensieve guards zelf zijn ongewijzigd behouden. Alleen het onjuiste label is vervangen door actueel commentaar dat vastlegt dat de guard als backstop actief blijft wanneer een ongeldige kaartkeuze toch de defensieve mutatieroute bereikt.

### 3.6 UI-copy sessiescherm

Exact gewijzigd:

`Tafelmodel / aantal seats`

naar:

`Tafelformaat / Max. aantal spelers`

De tekst kwam tweemaal in de historische/effectieve sessierendercode voor en is op beide plaatsen gelijkgetrokken. Er is geen layout-, state- of validatielogica aangepast.

## 4. Bewust niet uitgevoerd / doorgeschoven

De volgende categorieën zijn niet geconsolideerd omdat zij de vijfdelige gate niet overtuigend doorstonden of expliciet non-scope zijn:

- actieve `render`, `rHand`, `newHand`, `editHand`-wrapperketens;
- complexe `newSession`-/sessierenderketens buiten de expliciete copywijziging;
- wizardfuncties met actieve Base-/wrapperketens;
- historische declaraties die nog als strict-mode binding voor een latere assignment dienen;
- `regularStraddleRows` en vergelijkbare unieke declaraties die later worden toegewezen maar waarvan het verwijderen een nieuwe declaratie/binding zou vereisen;
- oudere suffixhelpers `v27Build2Suffixes` en `v27Build2SuffixHtml`: hun implementatie is later overschreven, maar de bestaande declaratie levert de binding voor de latere assignment. Cleanup zou een structurele refactor vereisen en is daarom niet uitgevoerd;
- mutation guards, commandrouting, capture/bubblevolgorde, `stopImmediatePropagation()`, synthetische seat-click/replay, keyboard-/`visualViewport`-architectuur;
- import/recovery/staging, PWA-updatearchitectuur, bountyhoogteketen, legacy pre-geleide fallback, registratie-metadata, handleiding-openroute, side pots en overige nieuwe functionaliteit.

## 5. Post-buildmeting

| Metriek | v2.7 | Build 1 | Delta |
|---|---:|---:|---:|
| Bestandsgrootte | 852.009 | 838.453 | -13.556 bytes |
| Regels | 12.245 | 12.090 | -155 |
| Top-level functiedeclaraties | 671 | 650 | -21 |
| Unieke top-level functienamen | 620 | 618 | -2 |
| Dubbele top-level functienamen | 36 | 20 | -16 |
| Extra declaraties bovenop unieke namen | 51 | 32 | -19 |
| Base-/wrappertoewijzingen | 121 | 121 | 0 |
| `DODE CODE` | 165 | 146 | -19 |
| `AANDACHTSPUNT` | 0 | 0 | 0 |
| `WIJZIGING` | 99 | 108 | +9 |
| `loadV24` | 1 | 0 | -1 |
| `saveV24` | 1 | 0 | -1 |

Aanvullende non-scopecontrole:

- `document.addEventListener(`: 75 → 75
- `stopImmediatePropagation(`: 116 → 116
- `visualViewport`: 13 → 13

De Base-/wrapperlaag is dus niet verkleind.

## 6. Automatische regressie

### 6.1 JavaScript-/HTML-smoke

- Eén scriptslot uit de HTML geëxtraheerd.
- `node --check` op de volledige JavaScriptinhoud: **geslaagd**.
- Geen parse-/syntaxfout vastgesteld.

### 6.2 Parser-/formattervergelijking met v2.7-baseline

Automatisch baseline versus Build 1 vergeleken voor onder meer:

- integer: `1500` → 1.500;
- K: `1,5K` en `1.5k` → 1.500;
- M: `100,25M` en `100.25m` → 100.250.000;
- B: `1B` → 1.000.000.000;
- locale/spatievariant: `12 500` → 12.500;
- ongeldig: `1,2X`, `1.2.3K`, `-1K` → invalid;
- compact formattergedrag bleef identiek;
- report absolute notatie: 9.999 → `9.999`, 10.000 → `10K`, 12.500 → `12,5K`, 1.000.000 → `1M`.

**Uitkomst:** baseline en Build 1 zijn voor alle geteste parser-/formattercases exact gelijk.

### 6.3 Potengine-smoke

| Scenario | Verwacht | v2.7 | Build 1 |
|---|---:|---:|---:|
| raise €6 → 3-bet €20 → fold | €13 | €13 | €13 |
| raise €6 → call → 3-bet €20 → folds | €19 | €19 | €19 |
| raise €6 → 3-bet €20 → 4-bet €50 → fold | €41 | €41 | €41 |

Voor alle drie fixtures is vóór/na `analyze()` tevens `JSON.stringify()` vergeleken. **Geen fixture-input werd gemuteerd.**

## 7. Volledige diffcontrole

Een volledige unified diff tussen `app-v2.7.html` en `Live_Poker_Handlog_v2.8_Build1.html` is gecontroleerd.

Diffstatistiek:

- 17 hunks;
- 11 toegevoegde regels;
- 166 verwijderde regels;
- netto -155 regels.

Alle diffhunks vallen binnen één van deze expliciete Build-1-categorieën:

1. verwijderen van de twee legacy V24-load/savefuncties;
2. verwijderen van vijf vroege parser-/formatterdeclaraties;
3. verwijderen van vijf vroege wizardbasisdeclaraties zonder Base-/aliasroute;
4. corrigeren van twee onjuiste kaartguardmarkers;
5. verwijderen van negen oude RC8 tafel-/chipformatterdeclaraties;
6. exact twee voorkomens van de gevraagde sessiecopy;
7. nabijgelegen Build-1-wijzigingscommentaar.

Er is geen opportunistische herformattering, whitespacecleanup, CSS-cleanup of andere inhoud buiten de bouwinstructie aangetroffen.

## 8. Zelfcontrole

- HTML/JavaScript syntactisch intact: **ja**.
- Geen actieve caller verwijderd volgens de uitgevoerde caller-/aliaschecks: **ja**.
- Vijfdelige gate toegepast op iedere verwijderde codefamilie: **ja**.
- Nieuwe helper/wrapper/override/eventhandler toegevoegd: **nee**.
- Base-/wrapperaantal gewijzigd: **nee**.
- Non-scope geraakt: **nee**, behoudens de expliciet opgedragen UI-copy.
- Automatische regressie geslaagd: **ja**.
- Statische delta verklaard: **ja**.

## 9. Handmatige acceptatie

Niet in deze bouw uitgevoerd. Conform bouwinstructie volgt handmatige acceptatie later in de coördinatiechat, minimaal voor sessie-aanmaak, cashgame, toernooi, chip-/suffixinvoer, handaanmaak, basiswizard en het sessieoverzicht met de nieuwe copy.
