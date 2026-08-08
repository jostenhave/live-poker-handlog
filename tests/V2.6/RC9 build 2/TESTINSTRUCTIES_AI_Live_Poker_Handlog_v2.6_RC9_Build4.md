# TESTINSTRUCTIES AI — Live Poker Handlog v2.6 RC9 Build 4

## Scope
Migratie naar de strikte PWA-updatearchitectuur. Geen wijziging aan pokerfunctionaliteit.

## Fase A — Build 3 naar Build 4
1. Publiceer Build 4 `index.html`, `service-worker.js` en `pwa-update.json`.
2. Open de bestaande Build 3-PWA.
3. Controleer dat Build 4 uiteindelijk actief wordt en bestaande lokale data behouden blijft.
4. Deze overgang is uitsluitend de architectuurmigratie en geldt nog niet als bewijs van de strikte Later-flow.

## Fase B — vereiste vervolghertest met Build 5
Maak daarna een minimale Build 5-kandidaat:
- Build 5 `index.html` op de server;
- `pwa-update.json` wijst naar Build 5 en een afzonderlijke kandidaat-worker;
- de actieve Build 4 `service-worker.js` blijft bij publicatie van de kandidaat ongewijzigd.

Acceptatiecriteria:
1. Build 4 blijft rechtsboven zichtbaar nadat Build 5 is gepubliceerd.
2. `Nieuwe versie beschikbaar` verschijnt.
3. `Later bijwerken` laat Build 4 actief.
4. Na volledig sluiten/heropenen blijft Build 4 actief en verschijnt de update opnieuw.
5. Pas `Nu bijwerken` registreert de Build 5-kandidaat.
6. Er volgt exact één gecontroleerde reload.
7. Daarna staat Build 5 rechtsboven.
8. Lokale spelers, notities, sessies en handen blijven behouden.
9. Offline openen werkt na de update.

## Releasebesluit
Build 4 alleen: GO als architectuurbaseline, nog GEEN finale PWA-acceptatie.
Build 4 → Build 5 strict-flowtest volledig geslaagd: kandidaat voor RC9 PWA-GO.
