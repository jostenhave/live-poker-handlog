# BOUWINSTRUCTIE — Live Poker Handlog v2.6 RC8 Build 10

## Doel
Gerichte herstel- en polishbuild op basis van RC8 Build 9.

## Scope
1. K/M/B-invoer end-to-end corrigeren.
2. Actieve/inactieve seats toevoegen bij een hand met minder spelers dan de fysieke sessietafel.

## K/M/B
- Accepteer gewone getallen en suffixen K, M en B.
- Hoofdletterongevoelig.
- Komma of punt als decimaalteken toegestaan.
- Normaliseer bij commit exact één keer naar de onderliggende numerieke chipwaarde.
- `100,25B` = exact `100250000000` en moet daarna compact weer `100,25B` tonen.
- Geen factor-1000 terugval.
- Gebruik dezelfde parser voor handmatige potinvoer.
- Exacte opgeslagen waarde blijft leidend; compacte notatie is uitsluitend presentatie.

## Actieve/inactieve seats
- De sessietafel bepaalt het vaste fysieke aantal seats: 6, 8, 9 of 10.
- Een hand mag minder actieve spelers bevatten.
- Seat 1 t/m N zijn actief, waarbij N het actuele spelersaantal is.
- Seats N+1 t/m sessietafelgrootte blijven zichtbaar maar zijn inactief.
- Actieve seats tonen de canonieke pokerpositie voor het actuele spelersaantal.
- Inactieve seats tonen uitsluitend `Seat X`.
- Inactieve seats worden duidelijk uitgegrijsd.
- Inactieve seats zijn niet selecteerbaar.
- Geen Hero-status, spelersnaam, SB/BB/BBA/straddle-marker of actorstatus op inactieve seats.
- Inactieve seats doen niet mee aan pokerlogica of actorvolgorde.
- De fysieke seatgeometrie blijft die van de sessietafel; seats verschuiven niet wanneer N lager wordt.
- Chipmarkers en stippellijnen blijven gekoppeld aan de vaste fysieke seatlocaties.
- Wanneer spelersaantal gelijk is aan sessietafelgrootte moet de render identiek blijven aan Build 9.

## Historische stabiliteit
- Nieuwe handen slaan de fysieke tafeldimensie op in de handstate.
- Bij oudere handen zonder dit veld wordt de huidige sessietafel als compatibele fallback gebruikt en bij bewerking vastgelegd.

## Buiten scope
Geen wijzigingen aan potengine, guided action flow, winner/chop, bountylogica, reportinhoud, Class A/B/C, transactionele historical edit, PWA/service worker of releaseproces.
