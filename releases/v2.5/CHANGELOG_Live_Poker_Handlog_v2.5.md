# Changelog — Live Poker Handlog v2.5

Releasedatum: 27 juli 2026

## Status

Definitieve release. Deze versie is functioneel gelijk aan de goedgekeurde release candidate v2.5 RC6. Alleen de versienaam en releaseaanduiding zijn aangepast van `v2.5 RC6` naar `v2.5`.

## Belangrijkste wijzigingen sinds v2.4

### Potberekening

- De pot-engine verwerkt ongecallde 3-bets, squeezes, 4-bets en hogere raises generiek.
- Verplichte bijdragen en vrijwillig bereikte actieniveaus worden per street afzonderlijk bijgehouden.
- Blinds, big blind ante en straddles blijven volledig in de pot, zonder een raise dubbel te tellen.
- Raises vanuit SB en BB worden via de zichtbare interface als totaalbedrag verwerkt.
- Dezelfde kernlogica geldt voor cashgames, Regular MTT, PKO, KO en Mystery Bounty.
- Toernooi-invoer in big blinds en chips levert gelijkwaardige potten op.

### Gegevensbeheer en import

- Selectieve JSON-export voor spelers, sessies en instellingen.
- Importeren via Samenvoegen of Vervangen.
- Vervangen vraagt vooraf expliciet om bevestiging.
- Voor destructieve import wordt automatisch een veiligheidskopie gemaakt.
- De veiligheidskopie is zichtbaar, downloadbaar en herstelbaar.
- Sessieconflicten bij Samenvoegen worden uitsluitend op sessie-ID bepaald.
- Villainverwijzingen en sessie-/handrelaties worden tijdens import gevalideerd.

### Herstel en noodmodus

- Recovery Mode bij beschadigde normale opslag.
- Volledige back-up kan vanuit Recovery Mode worden hersteld.
- Emergency Mode gebruikt afzonderlijke opslag onder `hhl:v12:emergency`.
- Emergency Mode laat de normale database onder `hhl:v12:data` ongemoeid.

### Spelers en invoer

- Spelers uit de spelersbibliotheek kunnen direct aan villains worden gekoppeld.
- Startstacks van Hero en villains worden consistenter weergegeven en verwerkt.
- Cross-street-validatie en impliciete folds na raises zijn verbeterd.
- Bij een onbekende all-inomvang verschijnt een waarschuwing dat de pot mogelijk niet exact kan worden berekend.

### Technisch

- Datamodel gemigreerd naar schema 12.
- Centrale validatie voor import, herstel en tijdelijke verwerking.
- Forced contributions worden direct aan de betreffende speler of positie gekoppeld.
- Appnaam is overal `Live Poker Handlog`.
- HTML-titel en versieaanduiding zijn bijgewerkt naar `v2.5`.

## Teststatus

- Geautomatiseerde en geïsoleerde AI-test: **237 van 237 controles geslaagd**.
- Handmatige browsertests voor toernooipotten in bb en chips, met en zonder big blind ante: geslaagd.
- Import Vervangen, veiligheidskopie en herstel: geslaagd.
- Samenvoegen en sessie-ID-conflicten: geslaagd.
- Recovery Mode en Emergency Mode: geslaagd.
- GitHub Pages-publicatie, PWA-update en offlinegebruik op Android: geslaagd.

## Releaseadvies

**GO — goedgekeurd voor definitieve uitgave als Live Poker Handlog v2.5.**

## Backlog

Kaarten die een gefolde speler toont, later apart vastleggen als `getoond na fold` of `geëxposeerd`, zonder deze speler als showdowndeelnemer te behandelen.
