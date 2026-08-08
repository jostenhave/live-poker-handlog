# TESTRAPPORT — vaste pokerlogica-regressiesuite — Live Poker Handlog v2.6 RC8

## Eindoordeel
**PASS**

De vaste regressiesuite is aangemaakt en uitgevoerd tegen:

`Live_Poker_Handlog_v2.6_RC8_Build14_Cashgame_BB_Unit_Potengine.html`

Resultaat:
- totaal: **19**
- PASS: **19**
- FAIL: **0**

## Uitgevoerde fixtures

| Test | Resultaat | Detail |
|---|---|---|
| A1 €1/€1 raise 6 → 3bet 20 → fold = 13 | **PASS** | pot 13 |
| A2 €1/€1 raise 6 → call → 3bet 20 → folds = 19 | **PASS** | pot 19 |
| A3 €1/€1 raise 6 → call → 3bet 20 → call/fold = 47 | **PASS** | pot 47 |
| B1 €1/€2: raise 3BB → BB call → SB fold = 13 | **PASS** | pot 13 |
| B2 €2/€5: raise 3BB → BB call → SB fold = 32 | **PASS** | pot 32 |
| B3 postflop €1/€2: 2BB bet + call = 11 | **PASS** | pot 11 |
| C1 blind call wordt niet dubbel geteld | **PASS** | pot 13 |
| C2 short-stack call wordt begrensd | **PASS** | pot 21 |
| C3 uncalled bet wordt teruggegeven | **PASS** | pot 3 |
| D1 cash regular straddle blijft forced contribution | **PASS** | pot 7 |
| E1 BBA wordt éénmaal als BB-forced contribution geteld | **PASS** | pot 2.5 BB |
| E2 toernooi chips-input converteert via actuele BB | **PASS** | pot 7.5 BB |
| F 100,25K → 100250 → 100,25K | **PASS** | 100250 → 100,25K |
| F 100,25M → 100250000 → 100,25M | **PASS** | 100250000 → 100,25M |
| F 100,25B → 100250000000 → 100,25B | **PASS** | 100250000000 → 100,25B |
| F 200,55b → 200550000000 → 200,55B | **PASS** | 200550000000 → 200,55B |
| G1 guided flow bevat pending-gate vóór review | **PASS** | review alleen bij lege pending-queue |
| G2 replay-state definieert closed alleen bij lege pending | **PASS** | state.closed gekoppeld aan lege pending |
| G3 structurele edit hervat action-mode | **PASS** | downstream acties worden verwijderd en action-mode hervat |

## Structurele dekking

De suite leest de geselecteerde HTML-build en extraheert de runtime-relevante productiefuncties voor:
- pot-engine (`analyze`);
- unitconversie (`toBase`);
- stackbegrenzing (`actorStackBase`);
- forced contributions/straddles;
- K/M/B-parser/formatter.

Daarnaast controleert hij rechtstreeks in de HTML de regressiegrenzen uit reviewpunt 2:
- review alleen bij lege `pending`;
- replay-state alleen `closed` bij lege `pending`;
- historische structurele wijziging kapt downstream-acties af en hervat in `action`.

## Fixturegroepen

### A — bekende potregressies
13 / 19 / 47.

### B — cashgame BB-unit
€1/€2, €2/€5 en postflop met BB ≠ 1.

### C — forced contributions / stacks / uncalled
Blind-call zonder dubbeltelling, short-stackbegrenzing en uncalled return.

### D — straddle
Reguliere cashgame-straddle als forced contribution.

### E — toernooi
BBA en chips → BB.

### F — K/M/B
K-, M- en B-modelwaarden en presentatie.

### G — reviewpunt 2
Pending-gates en structurele historische correctie.

## Werkafspraak vanaf nu

Voer deze suite uit bij iedere build die raakt aan:
- `analyze()`;
- unitconversie;
- betting-state/replay;
- all-ins/stacks;
- blinds/BBA;
- straddles;
- K/M/B;
- structurele actiecorrecties.

Een nieuwe bewezen regressie wordt als nieuwe fixture toegevoegd. Een bestaande verwachte uitkomst mag alleen veranderen na een expliciete functionele beslissing.

## Status reviewpunt 3
**Afgerond.**

De productie-HTML van Build 14 is voor punt 3 niet gewijzigd.
