# CHANGELOG — Live Poker Handlog v2.8 Build 2

**Build:** v2.8 Build 2 — Gecontroleerde consolidatie actieve wrapperketens  
**Datum:** 23 augustus 2026  
**Bouwbasis:** formeel geaccepteerde `Live_Poker_Handlog_v2.8_Build1.html`  
**Type:** technische consolidatie zonder beoogde functionele wijziging

## 1. Doel en uitgangspunt

Build 2 reduceert uitsluitend actieve wrapper-/overrideketens waarvan de runtimevolgorde, state-effecten, autosave-/persistgedrag en DOM-neveneffecten overtuigend konden worden gereconstrueerd. Build 1 is als gedragsoracle gebruikt. Er zijn geen nieuwe helpers, wrappers, overrides of eventhandlers toegevoegd.

## 2. Ronde 2A — `render` + autosave/persistence

### Uitgevoerd

#### `render`

**Voor:** 6 runtime-actieve lagen.  
**Na:** 1 runtime-actieve laag.

Geconsolideerd zijn de lagen die achtereenvolgens verantwoordelijk waren voor:

- RC3-autosave-aanleiding;
- D1-checkpointregistratie;
- v2.7-thematoepassing en themeswitch-injectie;
- de neutrale Build-2-doorstuurlaag;
- Build-2.1 suffixdecoratie en keyboard-/viewportwatch.

De overblijvende effectieve `render()` voert dezelfde volgorde uit:

1. D1-checkpoint registreren;
2. autosave aanroepen indien wizard actief;
3. basisrender uitvoeren;
4. themeswitch toevoegen en thema opnieuw toepassen;
5. suffixvelden decoreren;
6. keyboard-/viewportwatch via `requestAnimationFrame` plannen.

**Behouden invariant:** scherm-/wizardrendering, autosave-aanleiding, thema, suffixcontrols en keyboard-/viewportgedrag blijven functioneel equivalent.

#### `wzAutosave`

**Voor:** 4 runtime-actieve lagen.  
**Na:** 1 runtime-actieve laag.

Geconsolideerd zijn:

- basis conceptautosave/runout-state;
- D1-navigatiemetadata vóór/na opslag;
- D2 transactionele edit-guard;
- historische read-only guard.

De transactionele/historische early returns blijven expliciet behouden. De dubbele `save()`-aanleiding van de live route is bewust behouden, zodat debounce-/persistgedrag gelijk blijft.

### Automatische gate 2A

- F1 live burst: **PASS** — 10 renders, 1 `persistNow()`;
- F2 live spaced: **PASS** — 3 renders, 3 `persistNow()`;
- F3 historical read-only: **PASS** — 0 `save()`, 0 `persistNow()`, working copy ongewijzigd.

Diagnostische runtimecounts:

- `render`: **6 → 1** laag per directe render;
- `wzAutosave`: **4 → 1** laag per live autosave.

## 3. Ronde 2B — `newHand`

### Uitgevoerd

**Voor:** 8 runtime-actieve lagen.  
**Na:** 1 runtime-actieve laag.

De acht lagen zijn samengebracht in één bronimplementatie met behoud van de oorspronkelijke uitvoeringsvolgorde:

- initiële draft + `UI.wz`;
- conceptstatus en autosave;
- RC5-spelersaantal/defaults;
- D1-navigationinitialisatie;
- RC8-tafelgrootte;
- v2.7 flow/reset van setupvelden;
- cash-/toernooiblinddefaults;
- v2.7 Build 1.4 tijdelijke BBA-/reviewstate.

De oorspronkelijke opeenvolgende render/autosavemomenten blijven bewust bestaan. `hand.ts` wordt uitsluitend in de initiële creatie toegewezen en niet later herschreven.

### Automatische gate 2B

F4 nieuwe hand: **PASS**.

- `ts`: aanwezig;
- `status`: `concept`;
- screen: `hand`;
- `UI.wz`: aanwezig;
- startstep: `config`;
- runtime-laagtrace `newHand`: **8 → 1**;
- directe rendercalls tijdens de route: **7** na consolidatie; functionele state gelijk aan Build 1.

Alle overige runtimefixtures bleven eveneens PASS.

## 4. Ronde 2C — `editHand`

### Onderzocht maar behouden

Geen consolidatie uitgevoerd.

De runtimeanalyse bevestigt twee wezenlijk verschillende paden:

- concept: 8 actieve lagen;
- definitieve/opgeslagen hand: 4 actieve lagen, met conditionele afkapping in de transactionele D2-route.

De lagen combineren conceptresume, runoutresume, D1-navigation, D2 transactionele normalisatie, historische previewtrail, RC8-tafelmetadata en v2.7-historische trail. Omdat deze effecten per branch verschillen en niet volledig met één kleine, geïsoleerde wijziging konden worden bewezen, is de stopregel toegepast.

**F5 blijft PASS** en `hand.ts` blijft op beide editroutes exact behouden.

## 5. Ronde 2D — sessieketens

### Onderzocht maar behouden

`newSession`, `saveSession` en `rSession` zijn geanalyseerd. Er is geen consolidatie uitgevoerd.

Reden:

- `saveSession` bevat meerdere overlappende maar niet identieke validatielagen met UI-foutstate, focusgedrag en conditionele renderpaden;
- `rSession` bevat een lange historische HTML-transformatieketen met conceptbadge-, sessiecontext- en v2.7-layoutdecoratie;
- voor deze build was onvoldoende bewijs beschikbaar om die lagen zonder grotere refactor veilig samen te voegen.

**F6 sessie-edit: PASS.** `session.created` blijft exact gelijk bij aanmaken, opslaan, openen voor edit en opnieuw opslaan; de naamswijziging wordt daadwerkelijk opgeslagen.

Diagnostische laagtraces blijven:

- `saveSession`: 5 lagen;
- `rSession`: 6 lagen.

## 6. Ronde 2E — `d26InlineAHistoryBody`

### Onderzocht maar behouden

Geen consolidatie uitgevoerd.

De keten telt 11 actieve lagen en raakt historische read-only/editweergave, editorverplaatsingen, resultaat-/poteditoren, kaartweergave en mutation-guards. Event ownership en conditionele historische routes zijn te verweven om in deze build aantoonbaar veilig te verkorten.

**F7 historische body: PASS.** Output blijft string, basisinhoud blijft aanwezig, working state blijft ongewijzigd en `save()`/`persistNow()` blijven beide 0.

Diagnostische laagtrace blijft **11**.

## 7. Ronde 2F — eventhandleroverlap

### Onderzocht maar niet gewijzigd

Geen eventhandler is geconsolideerd. De uitgevoerde 2A/2B-consolidaties vereisten geen wijziging aan capture-/bubblevolgorde, `stopImmediatePropagation()` of event ownership.

Statische aantallen `addEventListener` en `stopImmediatePropagation` zijn ongewijzigd.

## 8. `rHand`

Onderzocht als bijzondere kandidaat maar niet gewijzigd. De finale directe runtime-entry blijft intact; oudere historische `rHand`-lagen/aliases zijn niet aangeraakt omdat volledige onbereikbaarheid niet voor alle indirecte routes is bewezen.

## 9. Zeven runtimefixtures

Het aangeleverde script `TEST_RUNTIMEFIXTURES_PreBuild2_7FIXTURES_Live_Poker_Handlog_v2.8.py` is opnieuw uitgevoerd tegen Build 1 en tegen de uiteindelijke Build 2.

| Fixture | Resultaat Build 2 |
|---|---|
| F1 live burst autosave | PASS |
| F2 live spaced autosave | PASS |
| F3 historical read-only | PASS |
| F4 nieuwe hand | PASS |
| F5 editHand concept/definitief | PASS |
| F6 sessie-edit + `created` | PASS |
| F7 historische body | PASS |

Build-1-oracle: **7/7 PASS**.  
Build 2: **7/7 PASS**.

## 10. Autosave-/persistence-uitkomsten

- burst: 10 renders → 1 `persistNow()`;
- spaced: 3 renders → 3 `persistNow()`;
- historical read-only: 0 `save()`, 0 `persistNow()`;
- working copy historische read-only: ongewijzigd.

## 11. Pokertechnische regressie

De verplichte potengine-smoke is opnieuw uitgevoerd tegen zowel Build 1 als Build 2:

| Scenario | Verwacht | Build 1 | Build 2 |
|---|---:|---:|---:|
| raise €6 → 3-bet €20 → fold | €13 | €13 | €13 |
| raise €6 → call → 3-bet €20 → folds | €19 | €19 | €19 |
| raise €6 → 3-bet €20 → 4-bet €50 → fold | €41 | €41 | €41 |

Bij alle drie bleef het fixture-handobject vóór/na `analyze()` byte-equivalent via `JSON.stringify()`.

`analyze()`, `wzReplayStreet()` en `wzLegalActions()` zijn in de volledige Build-1→Build-2-diff niet gewijzigd.

Aanvullend zijn replay-/bettingstates baseline-equivalent gecontroleerd voor:

- raise → call → undo;
- short all-in → call → undo;
- full raise → reraise → undo;
- flop;
- turn;
- river;
- speler die vóór een short raise al gehandeld had.

Daarbij zijn `currentBet`, `lastFullRaise`, actorstatus/contributions, raise rights, pending en street-closure tussen Build 1 en Build 2 vergeleken: **PASS**.

Dit dekt tevens de kerninvarianten voor minimumraise/full raise, short/full all-in en raise-rights. De betrokken enginefuncties zijn niet aangepast.

## 12. Timestampfixtures

- nieuwe sessie → geldige `created`: PASS;
- sessie-edit → exact dezelfde `created`: PASS;
- nieuwe hand → geldige `ts`: PASS;
- conceptedit → exact dezelfde `ts`: PASS;
- definitieve/historische edit → exact dezelfde `ts`: PASS;
- records zonder `created`/`ts` blijven na `migrate(false)` zonder deze velden: PASS.

Er is geen reconstructie van ontbrekende historische registratiemetadata toegevoegd.

## 13. Statische pre-/postmeting

| Metriek | Build 1 | Build 2 | Delta |
|---|---:|---:|---:|
| Top-level functiedeclaraties | 650 | 650 | 0 |
| Unieke functienamen | 618 | 618 | 0 |
| Functienamen met duplicaten | 20 | 20 | 0 |
| Extra duplicate declarations | 32 | 32 | 0 |
| Base-/aliascaptures | 120 | 107 | -13 |
| `DODE CODE` | 146 | 146 | 0 |
| `AANDACHTSPUNT` | 0 | 0 | 0 |
| `WIJZIGING` | 108 | 111 | +3 |
| `addEventListener` | 104 | 104 | 0 |
| `stopImmediatePropagation` | 116 | 116 | 0 |

De -13 Base-/aliascaptures bestaat uitsluitend uit de verwijderde actieve wrappercaptures van `render`, `wzAutosave` en `newHand`.

## 14. Volledige diffcontrole

De volledige unified diff tussen Build 1 en Build 2 is gecontroleerd.

Diffomvang:

- 55 toegevoegde regels;
- 108 verwijderde regels;
- wijzigingen uitsluitend in de drie geconsolideerde ketens en hun Build-2-commentaar.

Expliciet gecontroleerd:

- geen wijziging aan `analyze()`;
- geen wijziging aan `wzReplayStreet()`;
- geen wijziging aan `wzLegalActions()`;
- geen wijziging aan `addEventListener`-routes;
- geen wijziging aan `stopImmediatePropagation()`;
- geen wijziging aan service worker/PWA-updatearchitectuur;
- geen wijziging aan `PWA_VERSION_ID`;
- geen CSS-/UI-copywijziging;
- geen opportunistische herformattering buiten de betrokken hunks.

Tijdelijke runtime-instrumentatie is niet in productie-HTML achtergebleven (`window.__RT`: 0). Debuglogging/tellers zijn eveneens afwezig.

## 15. Non-scope bevestigd

Niet gewijzigd:

- nieuwe functionele features;
- datum-/tijdweergave in UI;
- Handleiding-openroute;
- side pots;
- bountyfunctionaliteit;
- CSS-cleanup;
- volledige eventarchitectuur;
- PWA-runtime/releasebestanden;
- service worker / `pwa-update.json`;
- definitieve v2.8-versionering/Git-tag/GitHub Release;
- pokerregels en enginefunctionaliteit.

## 16. Doorgeschoven / onvoldoende bewijs

Bewust doorgeschoven:

- `editHand`-consolidatie wegens branchafhankelijke concept-/transactionele routes;
- `saveSession`/`rSession` wegens verweven validatie-, focus- en HTML-transformatielagen;
- `d26InlineAHistoryBody` wegens 11 historische lagen en event-/mutation-ownership;
- eventhandleroverlap;
- oude `rHand`-historie.

Er zijn hiervoor geen pleisterlagen toegevoegd.

## 17. Bouwacceptatie door bouwende AI

Bevestigd:

- HTML/JavaScript syntactisch intact;
- iedere daadwerkelijk verwijderde actieve wrapperlaag is volledig gereconstrueerd en door de relevante automatische gates gegaan;
- concept-/definitieve editroutes zijn ongewijzigd en PASS;
- autosave/persistence is functioneel equivalent aan Build 1;
- F6 PASS en `session.created` exact behouden;
- F7 PASS en historical read-only zonder save/persist;
- `created` en `ts` blijven oorspronkelijke registratiemetadata;
- pot-/replayregressies PASS;
- geen nieuwe parallelle fixlagen;
- geen tijdelijke instrumentation/debugcode;
- volledige diff gecontroleerd;
- output beperkt tot HTML + changelog.

Handmatige end-to-endacceptatie blijft, conform bouwinstructie, een aparte stap in de coördinatiechat.
