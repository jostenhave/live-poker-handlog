# TESTRAPPORT AI — Live Poker Handlog v2.7 Build 5.6

**Datum:** 16 augustus 2026  
**Basis:** Build 5.5.1  
**Getest:** `Live_Poker_Handlog_v2_7_Build5_6.html`

## Samenvatting

**TECHNISCH GO.**

De Concept-badgecorrectie is uitgevoerd op de bestaande `rSession()`-override zonder de basisrenderer of andere Build-5-functionaliteit te wijzigen.

## Preflight

| Controle | Resultaat |
|---|---|
| APP_VERSION Build 5.6 | PASS |
| VERSION 16-08-2026 | PASS |
| schema 12 | PASS |
| `node --check` | PASS |
| `RELEASE_NOTES.unshift()` Build 5.6 | PASS |

## 1. Reproductie: identieke positie + kaarten

Fixture:
- concept A: `BTN · Qh Jh`
- concept B: `BTN · Qh Jh`

Uitkomst:
- badges: **2**
- `data-concept-hand`-markers: **2**
- iedere hand bevat exact één badge.

**PASS**

## 2. Lege Hero-positie

Fixture:
- concept-hand;
- `heroPos=''`.

Uitkomst:
- één badge;
- zichtbare HTML bevat `Concept ... Onvoltooid ·`.

Browser-HTML collapseert de extra whitespace, zodat dit visueel `Concept Onvoltooid ·` wordt.

**PASS**

## 3. Verschillende posities

Fixture:
- CO
- BB met fold-emoji
- UTG met lose-emoji

Uitkomst:
- drie concept-handen;
- drie badges;
- iedere badge op de eigen hand;
- emoji's behouden.

**PASS**

## 4. Definitieve hand

Fixture:
- concepthand BTN/Qh Jh;
- definitieve hand BTN/Qh Jh.

Uitkomst:
- concepthand: badge + marker;
- definitieve hand: geen badge, geen marker.

**PASS**

## 5. Bronoorzaak hersteld

Oude tweede vervanging:

`replace(\`${x.heroPos} ·\`, ...)`

is vervangen door een match die begint bij:

`data-concept-hand="1"`

en de exacte outcome-emoji + Hero-positie reconstrueert.

Daarmee is de badgeplaatsing niet langer afhankelijk van niet-unieke positietekst.

## 6. Beschermde bron

De basisfunctie `rSession()` is exact gelijk aan Build 5.5.1.

De drie bestaande `.replace()`-regels boven de conceptloop zijn inhoudelijk ongewijzigd.

Geen Build-5-Light/pickerroute is aangepast.

## Besluit

**TECHNISCH GO.**

Deze correctie sluit volgens de bouwinstructie het Build 5-traject af.
