# Testinstructies — Live Poker Handlog v2.5

## 1. Doel

Voer een beperkte finalisatie- en releasesmoke uit op:

`Live_Poker_Handlog_v2.5.html`

De definitieve versie is functioneel gelijk aan de goedgekeurde v2.5 RC6. Er zijn geen functionele codewijzigingen aangebracht; alleen de versienaam en releaseaanduiding zijn aangepast.

## 2. Niet opnieuw volledig hertesten

De volledige RC6-acceptatie hoeft niet te worden herhaald, tenzij een afwijking wordt gevonden. RC6 is reeds goedgekeurd op potberekening, import, sessieconflicten, Recovery Mode, Emergency Mode, PWA-update en offlinegebruik.

## 3. Verplichte controles vóór publicatie

### FIN-01 — Bestands- en versiecontrole

Controleer:

- bestandsnaam: `Live_Poker_Handlog_v2.5.html`;
- HTML-titel: `Live Poker Handlog v2.5`;
- zichtbare versie: `v2.5 · 2026-07-27`;
- release notes tonen bovenaan `v2.5`;
- nergens in de zichtbare app staat nog `v2.5 RC6`.

### FIN-02 — Opstartsmoke

Open het HTML-bestand in een browser.

Verwacht:

- app start zonder foutmelding;
- startscherm wordt volledig weergegeven;
- bestaande lokale data wordt geladen;
- navigatie naar Sessies, Hand invoeren, Spelers en Gegevensbeheer werkt.

### FIN-03 — Opslagsmoke

Maak één tijdelijke sessie en één eenvoudige hand, sluit de app en open opnieuw.

Verwacht:

- sessie en hand blijven aanwezig;
- bestaande gegevens zijn niet verwijderd;
- schema blijft 12.

### FIN-04 — Rapportsmoke

Open een bestaande of tijdelijke hand.

Controleer:

- live potpreview wordt weergegeven;
- uitgebreid verslag wordt opgebouwd;
- verkort verslag wordt opgebouwd;
- opnieuw openen/bewerken werkt.

## 4. PWA-releaseprocedure

Bij publicatie naar GitHub Pages:

1. vervang de repositoryversie van `index.html` door `Live_Poker_Handlog_v2.5.html`;
2. wijzig in `service-worker.js` de cachenaam van:

```javascript
const CACHE_NAME = 'live-poker-handlog-v2.5-pwa-1';
```

naar:

```javascript
const CACHE_NAME = 'live-poker-handlog-v2.5-pwa-2';
```

3. commit en push `index.html` en `service-worker.js` samen;
4. controleer in een incognitovenster dat GitHub Pages `v2.5` toont;
5. controleer online dat `service-worker.js` de nieuwe cachenaam bevat;
6. open en ververs de webversie eenmaal;
7. sluit de geïnstalleerde PWA volledig en open opnieuw.

Verwacht:

- website en PWA tonen `v2.5 · 2026-07-27`;
- bestaande `localStorage`-data blijft behouden;
- oude Cache Storage wordt vervangen door de nieuwe cache.

## 5. Offlinecontrole na publicatie

1. sla een tijdelijke sessie op in de geïnstalleerde PWA;
2. sluit de PWA volledig;
3. schakel internet uit;
4. open de PWA opnieuw;
5. controleer dat de app opent en de tijdelijke sessie aanwezig is;
6. schakel internet weer in en open opnieuw.

Verwacht: de app blijft bruikbaar en lokale gegevens blijven aanwezig.

## 6. Acceptatiecriteria

De definitieve release krijgt GO wanneer:

- alle versieaanduidingen correct zijn;
- de opstart- en opslagsmoke slagen;
- de PWA na cacheverhoging de definitieve versie toont;
- geen bestaande lokale gegevens verdwijnen;
- geen nieuwe kritieke of hoge regressie wordt gevonden.

## 7. Bekende testbasis

De definitieve release is gebaseerd op v2.5 RC6, waarvoor het releaseadvies reeds **GO** was. Bij een geslaagde finalisatiesmoke blijft het releaseadvies **GO**.
