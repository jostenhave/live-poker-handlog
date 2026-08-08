# TESTINSTRUCTIES — vaste pokerlogica-regressiesuite — Live Poker Handlog v2.6 RC8

## Doel
Deze suite is bedoeld om de belangrijkste pokerlogica bij iedere relevante toekomstige build automatisch opnieuw te controleren.

## Bestand
`REGRESSIETEST_Pokerlogica_Live_Poker_Handlog_v2.6_RC8.js`

## Uitvoeren
Gebruik Node.js:

`node REGRESSIETEST_Pokerlogica_Live_Poker_Handlog_v2.6_RC8.js <pad-naar-html>`

Voorbeeld:

`node REGRESSIETEST_Pokerlogica_Live_Poker_Handlog_v2.6_RC8.js Live_Poker_Handlog_v2.6_RC8_Build14_Cashgame_BB_Unit_Potengine.html`

## Wat de suite controleert
1. Bekende potfixtures 13 / 19 / 47.
2. Cashgame BB-unit bij BB ≠ 1:
   - €1/€2;
   - €2/€5;
   - postflop.
3. Forced blinds en call vanuit BB.
4. Short-stackbegrenzing.
5. Uncalled bets.
6. Reguliere cashgame-straddle als forced contribution.
7. Tournament BBA.
8. Tournament chips → BB.
9. K/M/B parser/formatter.
10. Punt-2-regressiegrenzen:
    - review pas bij lege pending-queue;
    - replay-state closed pas bij lege pending;
    - structurele historische edit verwijdert downstream-acties en hervat action-mode.

## Acceptatie
- Exitcode `0`: alle fixtures PASS.
- Exitcode `1`: minimaal één fixture FAIL; build niet accepteren voordat oorzaak is onderzocht.
- Exitcode `2`: onjuist gebruik van de testtool.

## Werkafspraak voor toekomstige builds
Bij iedere build die pokerlogica, inputconversie, betting-state, pot-engine, straddles, all-ins, BBA of historische actiecorrecties raakt:
1. voer deze suite uit tegen de nieuwe HTML;
2. bewaar de JSON-output bij het testrapport;
3. voeg nieuwe bewezen regressiegevallen aan deze suite toe;
4. verander bestaande verwachte uitkomsten alleen na expliciete functionele beslissing.
