# CHANGELOG — Live Poker Handlog v2.6 RC8 Build 10

## Hersteld
- K/M/B-chipinvoer wordt bij commit één keer naar de exacte waarde genormaliseerd.
- `100,25B` blijft `100,25B` in compacte weergave en representeert 100.250.000.000 chips.
- Handmatige potinvoer gebruikt dezelfde K/M/B-parser.

## Toegevoegd
- Actieve/inactieve seatweergave bij gedeeltelijk bezette tafels.
- Fysieke sessietafel blijft volledig zichtbaar.
- Seat 1 t/m huidig spelersaantal zijn actief; hogere seatnummers zijn uitgegrijsd en tonen alleen `Seat X`.
- Inactieve seats zijn niet selecteerbaar en krijgen geen pokerpositie of forced-contributionmarkers.
- Nieuwe handen bewaren de fysieke tafeldimensie voor stabiele historische weergave.

## Behouden
- RC8 racetrack-geometrie.
- Geaccepteerde cashgamechipplaatsing.
- Geaccepteerde toernooi-SB/BB/BBA-weergave.
- Eén stippellijn naar de BB, geen lijn naar BBA.
- 10-handed brede BB/BBA-polish.
