# TESTINSTRUCTIES AI — Live Poker Handlog v2.6 RC8 Build 10

## Testdoel
Heracceptatie van twee wijzigingen: K/M/B end-to-end en actieve/inactieve seats. Voer daarnaast gerichte regressie uit op de geaccepteerde RC8-tafel- en chipweergave.

## A. Statische analyse
1. Bevestig dat `100,25B` via de centrale parser exact 100250000000 oplevert.
2. Bevestig dat K, M en B hoofdletterongevoelig zijn en komma/punt ondersteunen.
3. Bevestig dat handmatige potinvoer dezelfde parser gebruikt.
4. Bevestig dat `tableSeats` de fysieke rendergrootte bepaalt en `players` alleen het actieve deel.
5. Bevestig dat inactieve seats geen entries in `positionBySeat` vereisen en disabled renderen.
6. Bevestig dat cash- en tournamentchipgeometrie de fysieke tafel gebruikt.

## B. Runtime — K/M/B
Test minimaal:
- `1,25K` -> `1,25K`
- `100,25M` -> `100,25M`
- `100,25B` -> `100,25B`
- `1.25b` -> `1,25B`
Controleer na blur, volgende stap, terugkeren en bewerken opnieuw.

## C. Runtime — actieve/inactieve seats
### C1 9-seat sessie, 6 actieve spelers
- Maak sessie met standaard 9-handed.
- Nieuwe hand: 6 spelers.
- Verwacht: Seat 1-6 actief met 6-handed posities `BTN/SB/BB/LJ/HJ/CO` volgens buttonrotatie.
- Seat 7, 8 en 9 zichtbaar als `Seat 7`, `Seat 8`, `Seat 9`, uitgegrijsd en niet klikbaar.

### C2 10-seat sessie, 8 actieve spelers
- Verwacht Seat 1-8 actief, Seat 9-10 inactief.
- Geen verschuiving van fysieke seatlocaties.

### C3 Interactie
Controleer in button-, Hero-, villain- en first-actorfase dat inactieve seats niet gekozen kunnen worden.

### C4 Forced contributions
- Cash: geen SB/BB/straddle op inactieve seats.
- Toernooi: geen SB/BB/BBA op inactieve seats.
- Markers blijven op felt en lijnen lopen naar de juiste actieve fysieke seat.

## D. Regressie
Herhaal minimaal één volledig bezette 6-, 8-, 9- en 10-handed tafel. Bij volledig bezet moet visueel geen verschil met Build 9 ontstaan.

## Besluit
- GO: alle bovenstaande checks slagen.
- GO onder voorwaarden: uitsluitend cosmetische afwijking zonder interactie/data-impact.
- NO GO: foutieve positie, selecteerbare inactieve seat, ontbrekende/verkeerde marker, K/M/B-schaalfout of wijziging van handlogica.
