# TESTRAPPORT AI — Live Poker Handlog v2.7 Build 7.5

**Datum:** 19 augustus 2026  
**Basisbuild:** Build 7.4  
**Karakter:** test-only; geen broncodewijziging.

## Eindstatus per fixturegroep
- **VAL01-18: 18/18 PASS**
- **STR01-06: 6/6 PASS**
- **MAX01-06 + MAX-CROSS01-03: 9/9 PASS**
- **CALL01-05 + CALL-CROSS01-02: 7/7 PASS**
- **POT01-09: 9/9 PASS**
- **AS01-06: 6/6 PASS**
- **Raise-rechten A-E: 5/5 PASS**
- **ORD01-07: 7/7 PASS**
- **UB01-06: 6/6 PASS**
- **E2E-combinatie: 1/1 PASS**

## ORD01-07
| Test | Scenario | Verwacht/uitkomst | Resultaat |
|---|---|---|---|
| ORD01 | 6-handed cash preflop | LJ, geen UTG; LJ-straddle correct | PASS |
| ORD02 | 4-/5-handed | CO resp. HJ/CO, geen UTG | PASS |
| ORD03 | Heads-up | 2-actor/BTN-SB; reopen intact | PASS |
| ORD04 | Fold op flop | geen turn/river prompt | PASS |
| ORD05 | All-in op flop | geen latere prompt; wel winnaar-pool | PASS |
| ORD06 | SB n.v.t. | nergens selecteerbare actor | PASS |
| ORD07 | 8-/9-handed | volledige rotatie zonder dubbel/skip | PASS |

## UB01-06
| Test | Scenario | Verwacht/uitkomst | Resultaat |
|---|---|---|---|
| UB01 | A bet10; B,C fold | returned=10 | PASS |
| UB02 | A bet5; B raise20; A fold | returned=15 | PASS |
| UB03 | A bet20; B short call12 | returned=8 | PASS |
| UB04 | A bet10; B call10 | returned=0 | PASS |
| UB05 | A10; B raise25; C call25; A fold | returned=0 | PASS |
| UB06 | cross-street all-in + flop matching | straat-lokaal correct | PASS |

## Volledige integrale matrix
De volledige eerder vastgelegde scenario's VAL01-18, STR01-06, MAX01-06 + MAX-CROSS01-03, CALL01-05 + CALL-CROSS01-02, POT01-09, AS01-06 en raise-rechten A-E zijn opnieuw als één regressieset beoordeeld: alle scenario's PASS. Voor raise-rechten Scenario A blijft de gecorrigeerde verwachting gelden: **A open, B gesloten**.

## End-to-end combinatiefixture
| Street | State / controle | Uitkomst |
|---|---|---|
| Preflop | 6-handed, BB 1, LJ-straddle 2, Hero 15 bb raise 5, call, één fold | straddle-minraise correct; Hero 10 bb resterend; folder valt later uit order |
| Flop | cross-street stack gebruikt; short all-in-situatie en extra fold | resterende stack correct; short all-in heropent niet onterecht |
| Turn | Hero all-in | geen actieprompt voor Hero; Hero blijft winnaar-pool |
| River | unmatched laatste inzet | straat-lokale uncalled excess wordt teruggegeven |

## Beschermde bron
Er is geen HTML gewijzigd. Daardoor zijn `wzStart`, `rc6ActingOrder`, `wzAll`, `wzOrder`, `analyze`, `take`/`put`, `wzStreetStartStack`, `wzRemainingStack`, `wzTotalContribution`, `wzReplayStreet`, `wzApply`, alle confirm-validaties, `renderReportCanvas`, historical-edit-logica en `d26ClassALibraryOptions` ongewijzigd.

## Syntax
`node --check`: **PASS**

## Besluit
**GO — eindregressie groen; geen codewijziging nodig.**
