# TESTRAPPORT AI — Live Poker Handlog v2.7 Build 7.3

**Datum:** 18 augustus 2026  
**Basisbuild:** Build 7.2  
**Testmethode:** directe Node-fixtures tegen de effectieve Build 7.3 `wzInitialStreetState()`, `wzReplayStreet()`, `wzKnownStack()`, `wzUnitToBase()`, `wzTotalContribution()` en `wzRemainingStack()`, aangevuld met de exacte confirm-/call-condities uit Build 7.3.

## 1. Straddle / minimumraise

| Test-ID | Actual | Resultaat |
|---|---|---|
| STR01 | `2` | PASS |
| STR02 | `4` | PASS |
| STR03 | `8` | PASS |
| STR04 | `4` | PASS |
| STR05 | `16` | PASS |
| STR06 | `16` | PASS |

STR02/03/04 bevestigen de gewijzigde verwachtingen 4/8/4. STR05 en STR06 bevestigen 16 bij een laatste straddle van 8. Negatieve controle: geldige raises boven deze grens blijven toegestaan in de overige fixtures.

## 2. Cross-street stackhelper

| Test-ID | Actual | Resultaat |
|---|---|---|
| XS01 | `15` | PASS |
| XS02 | `12` | PASS |
| XS03 | `12` | PASS |
| XS04 | `8` | PASS |
| XS05 | null | PASS |

XS03 is de kerncontrole: na 3 bb preflop blijft de flop-startstack correct 12 bb. XS04 trekt daarna een flopbet van 4 bb af en komt op 8 bb. XS05 laat `null` staan wanneer de villainstack onbekend is.

## 3. Maximumcontrole bet/raise

| Test-ID | Actual | Resultaat |
|---|---|---|
| MAX01 | `[false, "max", "1,5K chips (15 bb)"]` | PASS |
| MAX02 | Geaccepteerd | PASS |
| MAX03 | `[false, "max", "€150 (15 bb)"]` | PASS |
| MAX04 | Geaccepteerd | PASS |
| MAX05 | Geaccepteerd | PASS |
| MAX06 | Geaccepteerd | PASS |
| MAX-CROSS01 | `[false, "max", 12]` | PASS |
| MAX-CROSS02 | Geaccepteerd | PASS |
| MAX-CROSS03 | `[false, "max", 8]` | PASS |
| MAX-BOUND01 | Geaccepteerd | PASS |

Belangrijk:
- MAX-CROSS01 blokkeert 13 bb op de flop na 3 bb preflop, omdat nog 12 bb resteert.
- MAX-CROSS02 accepteert 8 bb.
- MAX-CROSS03 is zo ingericht dat de minimumraise op zichzelf geldig is, zodat specifiek het stackmaximum de raise blokkeert.
- MAX-BOUND01 accepteert exact de resterende stackgrens.
- De voorgeschreven helper toont toernooistacks via de effectieve `chipDisplay()`-formatter, dus bijvoorbeeld **1,5K chips (15 bb)**.

## 4. Call-blokkering

| Test-ID | Actual | Resultaat |
|---|---|---|
| CALL01 | `[false, 8, 5]` | PASS |
| CALL02 | Geaccepteerd | PASS |
| CALL03 | `[true, 8, 8]` | PASS |
| CALL04 | Geaccepteerd | PASS |
| CALL-CROSS01 | `[false, 12, 13]` | PASS |
| CALL-CROSS02 | `[true, 12, 10]` | PASS |
| CALL05 | Geaccepteerd | PASS |

CALL03 bevestigt de exacte grens: resterend 8 bb en call 8 bb wordt geaccepteerd. CALL-CROSS01 blokkeert 13 bb na eerdere 3 bb investering; CALL-CROSS02 accepteert 10 bb bij 12 bb resterend. CALL05 bevestigt dat All-in als alternatief beschikbaar blijft.

## 5. Regressie Build 7.2 + potfix

| Test-ID | Actual | Resultaat |
|---|---|---|
| VAL01 | Geblokkeerd | PASS |
| VAL02 | Geaccepteerd | PASS |
| VAL03 | Geaccepteerd | PASS |
| VAL04 | Geblokkeerd | PASS |
| VAL05 | Geaccepteerd | PASS |
| VAL06 | Geblokkeerd | PASS |
| VAL07 | Geblokkeerd | PASS |
| VAL08 | Geaccepteerd | PASS |
| VAL09 | Geaccepteerd | PASS |
| VAL10 | Geaccepteerd | PASS |
| VAL11 | Geaccepteerd | PASS |
| VAL12 | Geblokkeerd | PASS |
| VAL13 | Geblokkeerd | PASS |
| VAL14 | Geblokkeerd | PASS |
| VAL15 | Geblokkeerd | PASS |
| VAL16 | Geblokkeerd | PASS |
| VAL17 | Geblokkeerd | PASS |
| VAL18 | Geaccepteerd | PASS |

**VAL01–15: 15/15 PASS. VAL16–18: 3/3 PASS.** Daarmee is bevestigd dat de `% Pot`-referentiefix de minimumcontrole activeert zonder de bestaande waardetypes te breken.

## 6. Verplicht combinatiescenario

1. **straddle** — currentBet=2, lastFullRaise=2, minRaise=4
2. **raise5** — ok=True
3. **afterPF** — remaining=10
4. **flopTooBig** — ok=False, reason=max, remaining=10
5. **flop6** — ok=True
6. **afterFlop** — remaining=4
7. **turnCall9** — ok=False, toCall=9, remaining=4
8. **allinButton** — accepted=True

Interpretatie:
- laatste straddle 2 → `lastFullRaise=2`, minimum eerste raise 4;
- Hero raise 5 wordt geaccepteerd;
- resterend op flop = 10 bb;
- flopbet 11 wordt door stackmaximum geblokkeerd;
- flopbet 6 wordt geaccepteerd;
- resterend op turn = 4 bb;
- call 9 wordt geblokkeerd;
- All-in-keuze zelf blijft beschikbaar.

**COMBO01: PASS voor de vier in-scope onderdelen.**

## 7. Extra diagnostiek buiten de voorgeschreven scope
`DIAG-ALLIN-CROSS` laat zien dat de beschermde replayroute voor een latere-straat all-in zonder expliciet bedrag nog de hand-startstack gebruikt. In het hierboven beschreven combinatiescenario kan `wzReplayStreet('turn')` daardoor een Hero-all-inbijdrage van 15 bb reconstrueren terwijl cross-street nog 4 bb resteert.

Dit is geen wijziging die in Build 7.3 mocht worden aangebracht: `wzReplayStreet()` en All-in waren expliciet beschermd/buiten scope. Het punt is daarom afzonderlijk gelogd en **niet** verborgen door de fixtureverwachting aan te passen.

## 8. DODE CODE-markers
Nieuwe markers na verschuiving:
- regel **451** — `/* DODE CODE — v2.8: overschreven door latere toewijzing op regel 9926, niet runtime-effectief. Build 7.3 – 2026-08-18 */`
- regel **453** — `/* DODE CODE — v2.8: overschreven door latere toewijzing op regel 9928, niet runtime-effectief. Build 7.3 – 2026-08-18 */`
- regel **2476** — `/* DODE CODE — v2.8: overschreven door latere toewijzingen op regel 9926-9928, niet runtime-effectief. Build 7.3 – 2026-08-18 */`
- regel **9739** — `/* DODE CODE — v2.8: overschreven door latere toewijzing op regel 9926, niet runtime-effectief. Build 7.3 – 2026-08-18 */`
- regel **9741** — `/* DODE CODE — v2.8: overschreven door latere toewijzing op regel 9928, niet runtime-effectief. Build 7.3 – 2026-08-18 */`

`rc8CompactChipValue()` is bewust niet gemarkeerd: de conditionele broncontrole uit de bouwinstructie faalt doordat er buiten de twee genoemde wrapperfuncties nog een aanroep in `rc8TournamentChipDisplay()` staat.

## 9. Beschermde bron
Byte-/functie-inhoudelijk ongewijzigd:
- effectieve `wzReplayStreet()`;
- `wzApply()`;
- `wzLegalActions()`;
- `renderReportCanvas()`;
- `d26ClassALibraryOptions`.

De volledige diff bevat geen inhoudelijke wijziging in de historical-edit-route.

## 10. Syntax
`node --check`: **PASS**

## Besluit
**GO voor Build 7.3-scope.** Alle verplichte fixtures zijn groen. Het afzonderlijke cross-street All-in-restpunt moet in een vervolgbuild worden beoordeeld voordat de stacklogica als volledig afgerond wordt beschouwd.
