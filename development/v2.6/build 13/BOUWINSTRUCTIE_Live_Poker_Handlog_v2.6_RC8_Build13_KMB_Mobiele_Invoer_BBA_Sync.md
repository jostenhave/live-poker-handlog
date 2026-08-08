# BOUWINSTRUCTIE — Live Poker Handlog v2.6 RC8 Build 13

## Basis
Build 12 is de functionele basis. Build 12D is uitsluitend diagnostische referentie en wordt niet doorgebouwd.

## Doelen
1. Maak K/M/B op Android daadwerkelijk handmatig invoerbaar zonder lange reeksen nullen.
2. Herstel directe zichtbare BBA-synchronisatie met BB wanneer BBA actief is.

## Diagnose waarop deze build rust
Build 12D toont dat de dedicated parser/modelroute B correct verwerkt wanneer B kan worden ingevoerd. Voorbeeld: `200,55B` resulteert in ruwe modelwaarde `200550000000`. Het resterende invoerprobleem is het mobiele `inputmode="decimal"`-toetsenbord.

## Mobiele K/M/B-invoer
Voor uitsluitend de dedicated toernooivelden SB, BB en BBA:
- vervang `inputmode="decimal"` door `inputmode="text"`;
- voeg `autocapitalize="characters"`, `autocomplete="off"` en `spellcheck="false"` toe;
- behoud de bestaande dedicated K/M/B-parser en formatter;
- geen `type="number"` gebruiken.

Toegestane voorbeelden blijven:
`1000`, `1K`, `1,5K`, `100M`, `100,25M`, `1B`, `100,25B`, en equivalente punt-/kleine-lettervarianten.

## BBA-synchronisatie
Wanneer BBA actief is:
- `UI.draft.ante` moet exact gelijk worden aan de numerieke BB-modelwaarde;
- de zichtbare BBA-input moet onmiddellijk dezelfde compact geformatteerde waarde tonen;
- BBA blijft readonly zolang BBA actief is.
Bij activeren van de BBA-toggle moet de actuele BB direct naar model én zichtbaar BBA-veld worden gekopieerd.

## Niet wijzigen
Geen wijziging aan:
- K/M/B-factoren;
- tafelgeometrie;
- actieve/inactieve seats;
- chipmarkers/BB-BBA-geometrie;
- potengine;
- guided action/replay;
- cashgame-invoer.

## Acceptatie
Fysiek Android:
1. toetsenbord biedt letters zodat `B` handmatig typbaar is;
2. `100,25B` blijft `100,25B`;
3. BB `200,55B` vult bij actieve BBA direct `200,55B`;
4. na focuswissel, Volgende/Terug en Tafel & spelers blijven waarden behouden.
