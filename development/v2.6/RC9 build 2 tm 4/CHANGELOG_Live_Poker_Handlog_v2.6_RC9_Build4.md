# CHANGELOG — Live Poker Handlog v2.6 RC9 Build 4

Datum: 2026-08-08

## Doel
RC9 Build 4 introduceert de strikte, expliciete PWA-updatearchitectuur.

## Kernwijzigingen
- De actieve appversie blijft uit de cache van de actieve service worker komen.
- Een nieuwere versie wordt gedetecteerd via `pwa-update.json`.
- Het detecteren van een update registreert nog géén nieuwe kandidaat-service-worker.
- `Later bijwerken` sluit alleen de melding; de actieve versie blijft ongewijzigd, ook na volledig sluiten en opnieuw openen.
- Pas `Nu bijwerken` registreert de kandidaat-worker, activeert deze via `SKIP_WAITING` en voert één gecontroleerde reload uit.
- `pwa-update.json` wordt altijd online/no-store opgehaald en niet uit de app-shellcache.
- Pokerlogica, datamodel en schema 12 zijn niet gewijzigd.

## Migratie
Build 4 bevat een eenmalige automatische migratie vanuit RC9 Build 2/3. Dit is nodig omdat Build 3 zelf nog network-first navigatie gebruikt. De strikte updateflow wordt daarom pas volledig geaccepteerd met een volgende minimale kandidaatbuild (Build 5).

## Bekend aandachtspunt
De tijdelijke migratielogica vanuit RC9 Build 2/3 is gemarkeerd met `AANDACHTSPUNT` en moet bij de definitieve schone v2.6-release opnieuw worden beoordeeld.
