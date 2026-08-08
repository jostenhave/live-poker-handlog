# TECHNISCH VOORTGANGSRAPPORT — Live Poker Handlog v2.6 RC8 Build 13

## Diagnose
Build 12D liet zien dat de B-parser/modelroute correct kan zijn: `200,55B` werd als `200550000000` in `UI.draft.bb` vastgelegd. Het mobiele `inputmode="decimal"` verhinderde echter handmatige letters.

## Wijzigingen
- Dedicated tournament chip inputs zijn veranderd naar `inputmode="text"`.
- Parser/formatter uit Build 12 zijn inhoudelijk behouden.
- `rc8Build12CommitTournamentChip()` synchroniseert bij BB-mutaties nu naast `UI.draft.ante` ook het zichtbare BBA-element.
- De BBA-togglehandler neemt expliciet `checked` over, synchroniseert de actuele BB en zet het BBA-veld readonly bij actieve BBA.

## Regressiegrens
Geen wijziging in cashgamevelden, tafelgeometrie, actieve/inactieve seats, markerbaan, potengine of handregistratielogica.
