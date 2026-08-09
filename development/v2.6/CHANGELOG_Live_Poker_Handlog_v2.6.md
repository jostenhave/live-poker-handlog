# CHANGELOG — Live Poker Handlog v2.6

**Datum:** 2026-08-09  
**Schema:** 12

## Definitieve release

v2.6 consolideert de functioneel geaccepteerde RC7-basis, de RC8-visuele en chip-/potengineverbeteringen en de RC9-PWA-releasearchitectuur.

### Functioneel
- geleide actie-invoer en betting-state verder gehard;
- Hero-positie en startstack structureel opgenomen;
- all-in-, runout- en historische bewerkingsflow verbeterd;
- rapportage voor winnaars, chops, folds en villaingegevens verbeterd.

### Tafelvisual en bedragen
- verticale racetrack-tafel;
- actieve/inactieve seats;
- cashgame- en toernooimarkers;
- K/M/B-chipnotatie;
- BBA-synchronisatie.

### Potengine
- cashgame-BB-unitconversie gecorrigeerd;
- bestaande ongecallde raise-/potfixtures behouden.

### PWA
- versiegebonden app- en service-workerbestanden;
- update-detectie via `pwa-update.json`;
- kandidaat-worker wordt pas na `Nu bijwerken` geregistreerd;
- actieve worker serveert voor alle navigaties zijn eigen actieve appversie.

### Release-opruiming
- zichtbare RC-/Build-release-notes verwijderd;
- relevante v2.5-RC-wijzigingen geconsolideerd onder v2.5;
- v2.6-RC/Build-wijzigingen geconsolideerd onder v2.6;
- tijdelijke `WIJZIGING`-commentaren verwijderd;
- ontwikkelhistorische RC-/Build-commentaren verwijderd waar dit geen codewijziging vereiste;
- interne functienamen met historische suffixen zijn bewust niet hernoemd: dat zou een functionele refactor zijn en valt buiten deze release.
