# Bouwhandleiding – Live Poker Handlog v2.6 RC8 Build 6

## Onderwerp
Cashgamechips op het felt: symmetrische, rustigere plaatsing met behoud van schaalbaarheid en zonder overlap.

## Aanleiding t.o.v. Build 5
De eerste felt-variant uit Build 5 werkte functioneel, maar gaf visueel nog drie aandachtspunten:

1. De chipplaatsing oogde nog te veel als losse individuele oplossingen per seat.
2. De visuele balans tussen overeenkomstige seats in de boven- en onderhelft van de tafel was nog niet rustig genoeg.
3. De stippellijnen waren nog gebaseerd op seat-normalen in plaats van op de echte richting tussen seat en chip.

## Goedgekeurde ontwerpuitgangspunten
- We spreken visueel over **seats** en niet over pokertechnische posities.
- De **tafel en seat-baan blijven ongewijzigd**.
- De **chips blijven op het groene felt** staan.
- **Stippellijnen mogen elkaar kruisen**, maar **chips mogen elkaar niet overlappen**.
- De plaatsing moet **wiskundig schaalbaar** en **deterministisch** blijven.
- De chipweergave voor cashgames blijft geschikt voor **1 t/m 99.999**, met compacte notatie tot **99,99K**.

## Bouwbeslissing Build 6
### 1. Vaste symmetrische markerbaan
Gebruik voor cashgamechips een vaste binnenbaan op het felt, gemodelleerd als een tweede verticale racetrack:
- radius: `60`
- straightHalf: `86`

Elke cashchip krijgt op basis van de bestaande seatfractie op de seat-baan een overeenkomstig punt op deze markerbaan. Daardoor ontstaat vanzelf een spiegelende en consistente chipverdeling.

### 2. Plaatsing per seat
- Bepaal eerst de bestaande seatpositie op de seat-baan.
- Bepaal daarna de corresponderende fractie op de markerbaan.
- Plaats de chip primair exact op dat markerpunt.
- Alleen als dat markerpunt tot overlap of buiten-felt-plaatsing leidt, mag een beperkte fallback worden toegepast.

### 3. Fallbackregels
Fallback is uitsluitend toegestaan als de primaire markerplaats niet voldoet.
Gebruik dan kleine verschuivingen:
- inward: `0, 8, 16, 24`
- tangent: `0, -14, 14, -24, 24`

Volgorde:
1. primary point
2. inward/tangent fallback
3. laatste defensieve inward fallback

### 4. Lijnlogica
De stippellijn moet niet langer worden afgeleid van alleen de seatnormaal.
Gebruik de **echte vector van seatcentrum naar chipcentrum** en projecteer zowel het vertrekpunt op de seatrand als het eindpunt op de chiprand langs die vector.

## Verwacht effect
- Rustiger totaalbeeld
- Betere symmetrie tussen boven- en onderhelft
- Nettere koppeling van seat naar chip
- Geen visuele overlap van chipmarkers in het drukste 10-handed cashgamescenario

## Buiten scope
- Toernooichips / BBA-variant
- Grijze inactive seats
- Wijziging van seatlayout of tafelvorm
- Wijziging van blinds, straddlebedragen of onderliggende pokerlogica
