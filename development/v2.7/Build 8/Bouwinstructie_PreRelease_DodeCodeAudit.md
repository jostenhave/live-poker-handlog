# BOUWINSTRUCTIE — v2.7 Pre-release Audit
## Live Poker Handlog v2.7 — Volledige DODE CODE-markering van overschreven declaraties

**Datum:** 22 augustus 2026
**Basisbuild:** `Live_Poker_Handlog_v2_7_Build8_8_12.html`
**Karakter:** uitsluitend commentaar toevoegen. **Geen enkele functionele wijziging.** Doel: elke daadwerkelijk onbereikbare functiedeclaratie in de bron krijgt vóór de v2.7-release een `DODE CODE — v2.8`-marker, zodat de v2.8-opschoning straks puur uitvoerend werk is.

---

# 0. Omvang (bevestigd, 22-8-2026)
Twee patronen van herhaalde functienamen komen voor in de bron:
- **36 functienamen** gedeclareerd via `function X(){...}`, 2 tot 4 keer elk (bijv. `wzReview`/`wzAction` 4x; `wzTags`/`wzTable`/`wzStart`/`wzSave`/`wzPos`/`wzFirst`/`wzFinish`/`wzConfig`/`rHand`/`rc8TournamentMarkerLayout`/`rc8CashChipLine` 3x elk; nog eens 23 functies 2x elk).
- **91 functienamen** die via `X=function(){...}` worden hertoegewezen, sommige tot wel 13 keer (`rHand`), 10 keer (`d26InlineAHistoryBody`), 8 keer (`shareText`), 7 keer (`newHand`, `editHand`).

Dit is dus in potentie **honderden** individuele declaraties om te beoordelen. Werk dit systematisch en volledig af — niet steekproefsgewijs.

---

# 1. Kernonderscheid — dit moet je per functie zorgvuldig vaststellen

## 1.1 Twee mogelijke situaties per overschreven declaratie
**Situatie A — genuinely dood:** een latere declaratie/toewijzing overschrijft de naam volledig, zonder dat de oude functie-body ergens is vastgelegd of aangeroepen. Voorbeeld van het patroon:
```js
function wzFoo(){ /* versie 1 */ }
function wzFoo(){ /* versie 2, volledig zelfstandig, roept versie 1 nergens aan */ }
```
Hier is versie 1 **onbereikbaar** — markeer met `DODE CODE — v2.8`.

**Situatie B — nog actief via delegatie:** de oudere versie wordt eerst vastgelegd in een `...Base`-variabele, en de nieuwe versie roept die expliciet aan. Voorbeeld (dit patroon komt al tientallen keren voor in de bron, bijv. bij `d26InlineAHistoryBody`, `wzAll`, `rc8FitTableVisual`):
```js
const wzFooF3Base=wzFoo;
wzFoo=function(){ return wzFooF3Base()+'extra'; };
```
Hier is de eerdere `wzFoo`-versie **wél nog actief** (bereikbaar via `wzFooF3Base` binnen de nieuwe body) — dit is **geen** dode code. Niet markeren.

## 1.2 Vereiste werkwijze per functienaam
1. Verzamel alle declaraties/toewijzingen van die naam, in bronvolgorde.
2. Voor elke declaratie behalve de laatste: zoek of de bijbehorende functie-body ergens is vastgelegd in een variabele (`const nameXBase=...` of vergelijkbaar) die vervolgens door een lateré declaratie van dezelfde naam wordt aangeroepen.
3. **Wel** vastgelegd én aangeroepen → situatie B, niet markeren.
4. **Niet** vastgelegd, of wel vastgelegd maar de vastgelegde variabele wordt nergens meer aangeroepen → situatie A, markeer met `DODE CODE — v2.8: [reden — bijv. "overschreven door latere declaratie op regel X, oude versie niet via Base-variabele aangeroepen"], geconstateerd pre-release-audit – 2026-08-22`.
5. De **laatste** declaratie van elke naam is per definitie de effectieve versie — nooit markeren, ook niet als hij zelf weer een oudere Base aanroept.

## 1.3 Voorbeeld ter controle (gebruik dit om je eigen aanpak te verifiëren)
`rc8FitTableVisual` komt 2x voor. De eerste (regel ~9641 in Build 8.7-lijn) wordt in de tweede, effectieve versie **niet** via een Base-variabele aangeroepen — dat is dus situatie A, markeren. Controleer dit specifieke geval eerst als sanity-check voordat je de rest doet, en bevestig dat je conclusie overeenkomt.

---

# 2. Randvoorwaarden (streng)
- **Uitsluitend commentaar toevoegen.** Geen enkele regel functionele code wijzigen, verplaatsen of verwijderen. Geen enkele `Base`-variabele aanmaken of aanpassen.
- Gebruik exact het bestaande marker-format uit het commentaarbeleid: `/* DODE CODE — v2.8: [reden], geconstateerd pre-release-audit – 2026-08-22 */`, direct boven de gemarkeerde declaratie.
- Behandel **alle** 36 + 91 genoemde functienamen (§0) — niet alleen de meest voor de hand liggende. Als je onderweg nog meer herhaalde namen tegenkomt die niet in deze lijst stonden, neem die ook mee en meld dat expliciet.
- Bij twijfel over situatie A vs. B: markeer **niet** en rapporteer het specifieke geval expliciet in het opleververslag voor gezamenlijke beoordeling, in plaats van te gokken.
- Geen wijziging aan `APP_VERSION`/`VERSION`/`<title>` nodig voor deze specifieke audit tenzij je toch een nieuwe build oplevert (dan gewoon de drie versielabels als altijd bijwerken).
- `node --check` moet na afloop nog steeds slagen — puur commentaar toevoegen mag nooit de syntax breken, maar controleer dit sowieso.

# 3. Opleverformat
1. Een volledige lijst (bijv. als apart markdown-document) van alle behandelde functienamen, met per naam: aantal declaraties, welke gemarkeerd zijn als dood en welke niet (met korte reden), en eventuele twijfelgevallen apart uitgelicht.
2. Bevestiging van het totaal aantal toegevoegde `DODE CODE`-markers.
3. `node --check`.
4. Expliciete bevestiging dat er geen functionele wijziging is doorgevoerd (bijv. via een diff die uitsluitend commentaarregels toont).

# 4. GO/NO-GO
- **GO:** alle 36+91 genoemde functienamen behandeld, situatie A correct gemarkeerd, situatie B correct met rust gelaten, twijfelgevallen expliciet gerapporteerd, geen functionele wijziging, geen syntaxfout.
- **NO GO:** een functionele wijziging (ook per ongeluk), een gemiste functienaam uit de lijst, of situatie A/B door elkaar gehaald zonder rapportage van de twijfel.
