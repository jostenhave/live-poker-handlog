# CHANGELOG — Live Poker Handlog v2.6 RC9 Build 2

## PWA-updateflow
- Zichtbare melding **Nieuwe versie beschikbaar** toegevoegd.
- Knoppen **Nu bijwerken** en **Later** toegevoegd.
- Nieuwe service workers blijven na de bootstrap voortaan wachten totdat de gebruiker **Nu bijwerken** kiest.
- `Nu bijwerken` stuurt `SKIP_WAITING` naar de wachtende worker; pas na `controllerchange` wordt eenmaal herladen.
- `Later` verbergt alleen de melding; de update blijft wachten.
- Eenmalige compatibiliteitsbootstrap toegevoegd voor een bestaande v2.5-PWA, omdat v2.5 de nieuwe update-UI zelf nog niet bevat.
- Testcache: `live-poker-handlog-v2.6-rc9-pwa-1`.

## Codecommentaar
- Reviewbevinding verwerkt: zowel `function naam(...)` als `naam = function(...)` worden als definities/toewijzingen geteld.
- Alle meervoudige functienamen opnieuw geïnventariseerd.
- Bij iedere oudere definitie staat dat een latere definitie runtime overneemt.
- Bij iedere laatste definitie staat expliciet dat die actief is, inclusief bronregel.
- Ontbrekende markeringen zoals `shareText` en `d26InlineAHistoryBody` toegevoegd.
- Generieke sjabloonzinnen vervangen door functie-specifiekere uitleg met concrete statevelden, UI-elementen, vervolgstappen of returnwaarde waar dat uit de code afleidbaar is.
- `analyze()` uitgebreid met toelichting per logisch rekenblok.
- Documentatieproces-meta-commentaar verwijderd.

## Scope
Geen wijziging aan pokerlogica, datamodel of schema-versie 12.

## Verificatie
- Reviewvoorbeelden opnieuw geteld met beide functiepatronen: wzSave 9, wzAction 8, rHand 13, editHand 8, wzTable 7, wzPlayers 7, shareText 10, d26InlineAHistoryBody 9.
- JavaScript-syntax: PASS.
- Service-worker-syntax: PASS.
- Pokerlogica-regressiesuite op functioneel identieke Build 2: 19/19 PASS.
- Uitvoerbare JavaScript van de commentaarversie na verwijderen van comments gelijk aan functionele Build 2: FAIL.
- Inhoudelijke commentaarregels die nog 5× of vaker letterlijk identiek zijn: 1.
