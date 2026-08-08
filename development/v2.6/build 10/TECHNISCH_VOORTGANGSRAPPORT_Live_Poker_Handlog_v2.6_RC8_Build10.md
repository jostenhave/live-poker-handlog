# TECHNISCH VOORTGANGSRAPPORT — Live Poker Handlog v2.6 RC8 Build 10

## Basis
Gebouwd op `Live_Poker_Handlog_v2.6_RC8_Build9_KMB_En_10Handed_BBA_Polish.html`.

## 1. K/M/B end-to-end
Er is een Build 10-parser toegevoegd die K, M en B naar een exacte numerieke waarde converteert. Tijdens `change` en `blur` wordt een chipveld eerst naar de exacte modelwaarde gecommit en daarna compact weergegeven. Hiermee wordt voorkomen dat meerdere oude normalisatieroutes een suffix opnieuw schalen.

Voorbeeld:
- invoer: `100,25B`
- exacte modelwaarde: `100250000000`
- presentatie: `100,25B`

Ook `d26ParsePotOverrideInput` gebruikt deze centrale parser.

## 2. Vaste fysieke tafel versus actieve spelers
Build 10 maakt onderscheid tussen:
- fysieke tafeldimensie: sessietafel / opgeslagen `tableSeats`;
- actieve spelers: `players` van de hand.

De visuele seatgeometrie wordt berekend over de volledige fysieke tafel. Alleen seatnummers 1 t/m `players` krijgen een positie uit `positionBySeat`.

## 3. Inactieve seats
Een inactieve seat:
- krijgt CSS-klasse `inactive-seat`;
- toont uitsluitend `Seat X`;
- is disabled;
- heeft geen Hero-, blind-, all-in-, fold- of turnstatus;
- heeft geen spelersnaam;
- komt niet voor in `positionBySeat` en dus niet in actor-/forced-contributionlogica.

## 4. Chipgeometrie
`rc8CashPreferredTrackPoint`, cash- en tournament-lijnen, tournament markerlayout en fit-to-container gebruiken de fysieke tafeldimensie. Daardoor blijft een chip bij Seat 4 op exact de fysieke Seat-4-locatie staan, ook wanneer bijvoorbeeld een 9-seat tafel slechts 6 actieve spelers heeft.

## 5. Historische handen
Nieuwe handen krijgen `tableSeats`. Bij oudere handen zonder dit veld wordt tijdens openen/bewerken een compatibele waarde afgeleid uit sessietafel en spelersaantal.

## Statische validatie
- JavaScript syntax via `node --check`: PASS.
- Parserfixtures K/M/B: PASS.
- `100,25B -> 100250000000`: PASS.
- Aanwezigheid inactive-seat renderpad: PASS.
- Geaccepteerde Build 9-geometrie niet numeriek gewijzigd.

## Nog fysiek te valideren
- 9-seat sessietafel met 6 actieve spelers.
- 10-seat sessietafel met 8 of 9 actieve spelers.
- Inactieve seats niet klikbaar in button-, Hero-, villain- en first-actorstappen.
- Geen markers op inactieve seats.
- B-invoer op Android end-to-end.
