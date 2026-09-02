# CHANGELOG — Live Poker Handlog v2.8 Build 4 — GEHEEL

**Hoofdbuild:** v2.8 Build 4  
**Periode:** 26 augustus 2026 t/m 2 september 2026  
**Startbasis:** `Live_Poker_Handlog_v2.8_Build3.9.2.html`  
**Eindbasis voor de v2.8-release:** Build 4.6.2.10, daarna release-integratie naar `v2.8-pwa-2`  
**Datamodel:** schema 12 behouden  
**Storage:** `hhl:v12:data` behouden  
**Karakter:** functionele uitbreiding, UX-/flowherbouw, historische bewerking, reportherbouw, correctie/polish, codecleanup en releaseafronding

---

## 1. Samenvatting

Build 4 vormt de laatste en grootste functionele ontwikkelfase van Live Poker Handlog v2.8. De hoofdlijn begon met registratiegegevens, filteren en sorteren en groeide daarna uit tot een herzien seat-/spelermodel, een nieuwe geleide setupflow, een transactionele historische bewerkingsroute, een opnieuw opgebouwde rapportage- en resultaatpresentatie en een omvangrijke fysieke correctie- en polishronde.

De belangrijkste eindresultaten van Build 4 zijn:

- registratiedatum voor sessies en definitief opgeslagen handen;
- filter- en sorteerfunctionaliteit voor sessies en handen;
- uitgebreid en mobiel geoptimaliseerd filtermodel;
- sessie-Tafelindeling en handgebonden `Tafel & spelers` met fysieke seatgaten;
- centrale positieafleiding vanaf de Button;
- duidelijke scheiding tussen setup, veilige historische wijzigingen en structureel heropbouwen;
- transactionele bewerking van opgeslagen handen;
- veilige historische Hero-/Villain-/boardkaartbewerking, inclusief kaartverdringing;
- herbouwde rapportage vanuit Hero-perspectief;
- consistente showdown-, winnaar-, chop- en resultaatpresentatie;
- vereenvoudigd bounty-model;
- herstel van BBA-bediening, dealer-/forced-betmarkers en minimumraisefeedback;
- expliciete save-validatie voor ontbrekende vereiste boardkaarten;
- broncleanup en verwijdering van verouderde actieve bountycode;
- v2.8-handleidingintegratie en gerichte cashgame-polish;
- releaseklare PWA-identiteit met succesvolle v2.7 → v2.8-update en fresh install.

---

# DEEL A — METADATA, FILTEREN EN SORTEREN

## 2. Build 4 — registratiemetadata

### Sessies

Het bestaande veld `created` is bevestigd als canonieke registratiedatum van een sessie en wordt bij latere sessiebewerking niet overschreven.

Op Home wordt de registratiedatum in lokale Nederlandse notatie getoond.

Oudere sessies zonder `created` blijven geldig en krijgen geen kunstmatig gegenereerde datum.

### Handen

Voor handen is het nieuwe optionele veld `registeredAt` ingevoerd.

Semantiek:

- wordt éénmalig gezet bij de eerste succesvolle definitieve opslag;
- wordt niet al bij het starten van een concept gezet;
- wordt pas vastgelegd nadat de definitieve validatie is geslaagd;
- blijft behouden bij gewone handbewerking;
- blijft behouden bij transactionele/historische bewerking;
- oude handen zonder `registeredAt` worden niet gemigreerd en krijgen geen synthetische datum.

De handenlijst toont datum en tijd van registratie.

---

## 3. Sessiefilters en sortering

Op Home zijn compacte utilitycontrols toegevoegd voor:

- `Filter`;
- `Sorteren`;
- telling van zichtbare sessies.

De filterstate blijft runtime-only en wordt niet aan het datamodel toegevoegd.

### Sessiefiltercriteria

In de Build-4-lijn zijn onder meer ondersteund/verfijnd:

- speltype;
- toernooitype;
- gespeelde tegenstander(s);
- combinaties van filtergroepen.

Voor `Toernooitype` is de oorspronkelijke single-select later vervangen door multi-select:

- Regular;
- PKO;
- KO;
- Mystery.

Binnen één groep geldt **OF**; tussen verschillende groepen geldt **EN**.

Alle typen geselecteerd betekent functioneel geen subtypebeperking. Geen enkel type geselecteerd is een geldige filtertoestand met nul matches.

### `Filter (n)`

De betekenis is tijdens Build 4.1 geharmoniseerd:

- geen actieve beperking → `Filter`;
- actief filter → `Filter (n)`;
- `n` is het aantal daadwerkelijk zichtbare resultaten;
- nul resultaten → `Filter (0)`.

De aparte telling `x van y` blijft beschikbaar.

---

## 4. Handfilters

Binnen een sessie is een vergelijkbaar filter-/sorteermodel toegevoegd voor handen.

Belangrijke elementen:

- filteren op resultaat;
- filteren op Hero-positie;
- selectie van Villains;
- contextuele Alles/Geen-sneltoetsen;
- compacte mobiele filterpresentatie;
- zichtbare handtelling;
- holecards compacter in de handenlijst.

De aanvankelijk toegevoegde filtergroep `Villain-positie` is in Build 4.2.1 weer verwijderd omdat deze semantisch niet de gewenste vraag beantwoordde.

Daarvoor is een centrale betekenis voor **postflop gespeeld tegen** uitgewerkt op basis van stabiele `playerId`, effectieve handpositie, daadwerkelijk bereiken van flop/runout en bestaande foldstate.

---

## 5. Gedeelde transactionele spelersselector

De selectie van spelers binnen filters is omgebouwd naar één gedeelde transactionele dual-listselector.

Kenmerken:

- zoeken binnen de spelerslijst;
- meerdere spelers selecteren;
- working state vóór bevestigen;
- `Gereed` commit;
- sluiten/annuleren zonder ongewenste gedeeltelijke wijzigingen;
- hergebruik van dezelfde selectorarchitectuur voor meerdere filtercontexten.

Hiermee werd voorkomen dat per filter een aparte spelerspickerarchitectuur ontstond.

---

# DEEL B — TAFEL-, SEAT- EN SETUPMODEL

## 6. Build 4.3 — fysiek seatmodel met seatgaten

Build 4.3 introduceerde een belangrijke structurele wijziging: het handmodel gaat niet langer impliciet uit van uitsluitend een aaneengesloten aantal spelers, maar kan werken met de daadwerkelijk actieve fysieke seats.

Daarvoor zijn onder meer ingevoerd:

- sessie-Tafelindeling;
- actieve en inactieve fysieke seats;
- handgebonden snapshot van de tafel;
- ondersteuning voor seatgaten;
- centrale positieafleiding vanaf de Button;
- één gedeelde tafelvisual;
- gedeelde spelerspicker voor verschillende seatcontexten.

De bestaande wizard, opslagstructuur en reviewarchitectuur zijn behouden; er is geen tweede parallel seat- of wizardmodel gebouwd.

---

## 7. Sessie-Tafelindeling

De sessie kan een optionele vaste tafelindeling bevatten.

Een geldige ingevulde sessietafel vereist:

- exact één Hero;
- Hero op een actieve seat.

Een volledig lege tafel blijft eveneens geldig.

`Tafel leegmaken` wist transactioneel:

- Hero-seat;
- speler-seatkoppelingen;
- inactive seats.

De sessietafel gebruikt een tijdelijke seat-contextoverlay in plaats van een permanent groot actieblok.

Sessiegegevens worden pas bij `Gereed` gecommit; annuleren laat de opgeslagen sessie intact.

---

## 8. Handsetup `Tafel & spelers`

De geleide handsetup is geconsolideerd naar:

1. Basisgegevens;
2. Tafel & spelers;
3. Button kiezen;
4. Hero-gegevens;
5. Villain-gegevens — optioneel;
6. Eerste vrijwillige actor;
7. actie-invoer.

`Tafel & spelers` is de centrale plek voor:

- Hero-seat wanneer nog onbekend;
- actieve/inactieve seats voor deze hand;
- Villain koppelen;
- hand-specifieke Villain loskoppelen;
- hand-inactieve seat herstellen.

Stacks, holecards, bounty en notities worden niet in de tafelcontext beheerd maar in de eigen Hero-/Villain-gegevensstappen.

---

## 9. Sessietafel gebruiken of niet

In Basisgegevens blijft de keuze:

`Tafelindeling sessie gebruiken? Ja / Nee`

Gedrag:

- zonder geldige sessietafel is de keuze niet actief;
- bij `Ja` wordt een handsnapshot van de sessietafel gemaakt;
- bij `Nee` wordt een onafhankelijke handtafel opgebouwd;
- de handwizard muteert de sessietafel niet;
- een informatieve tafelpreview is read-only.

Daarmee zijn sessieconfiguratie en handconfiguratie expliciet van elkaar gescheiden.

---

## 10. Hero-flow

Als Hero uit de sessietafel bekend is:

- wordt deze rechtstreeks in de handsnapshot gebruikt;
- is geen nieuwe Hero-seatkeuze nodig;
- de sessie-Hero wordt in de hand structureel beschermd.

Als Hero nog onbekend is:

- `Waar zit Hero?` opent;
- een actieve seat kan direct worden gekozen;
- dezelfde stap schakelt daarna door naar normale seatbeheercontext.

Een handmatig gekozen Hero kan via `Hero wijzigen` opnieuw worden gekozen.

Wanneer de nieuwe Hero-seat al een hand-specifieke Villain bevat, gebeurt dit niet stilzwijgend: eerst volgt expliciete bevestiging.

---

## 11. Villain koppelen

De seatkoppeling is bewust een identiteitsactie, geen volledig spelersdetailformulier.

Het koppelvenster bevat:

- spelerselectie;
- naam;
- gedeelde zoekpicker;
- optionele opslag van nieuwe naam in de spelersbibliotheek.

Niet in dit scherm:

- startstack;
- holecards;
- bounty;
- notities.

Die gegevens blijven in de latere Villain-gegevensstap.

Bij het selecteren van een bestaande bibliotheekspeler blijft `playerId` de stabiele identiteit en mag dezelfde speler niet dubbel aan twee seats in dezelfde hand worden gekoppeld.

---

## 12. Button en positieafleiding

Button wordt pas gekozen nadat de actieve seats vaststaan.

Alle posities worden centraal afgeleid uit:

- `activeSeats`;
- `buttonSeat`.

Seatgaten blijven daarbij intact.

De positievolgorde wordt dus niet meer geconstrueerd door fysieke stoelnummers contigu te veronderstellen.

Een belangrijke regressiecorrectie in Build 4.3.1 zorgde ervoor dat historische handen met echte seatgaten bij openen/bewerken hun bestaande `positionBySeat` niet meer konden verliezen of laten herschrijven door de legacy contiguë route.

---

# DEEL C — REVIEW EN OPGESLAGEN HANDEN BEWERKEN

## 13. Restrictiegrens

De definitieve grens tussen vrije setup en historische/reviewmodus is vastgelegd op het moment dat:

- de eerste vrijwillige actor daadwerkelijk wordt gekozen; en
- het preflopscherm wordt geopend.

Vóór die grens:

- `Vorige` en `Volgende` zijn gewone setupnavigatie;
- setupvelden zijn rechtstreeks wijzigbaar.

Na die grens:

- structurele eerdere stappen zijn read-only;
- veilige velden kunnen via potlood worden aangepast;
- structurele wijzigingen lopen via `Bewerken vanaf deze stap`.

---

## 14. `Bewerken vanaf deze stap`

De structurele branchroute is aangepast zodat downstream data niet al wordt weggegooid enkel doordat de gebruiker de bewerkmodus opent.

Nieuwe invariant:

- editmode maakt de betreffende setupstap eerst bewerkbaar;
- oorspronkelijke working copy blijft beschikbaar;
- pas bij daadwerkelijk gewijzigde structurele data en doorgaan wordt rebuild/invalidation toegepast;
- zonder inhoudelijke wijziging blijven bestaande acties en downstream data behouden.

Daarmee werd een belangrijke destructieve UX-val verwijderd.

---

## 15. Transactionele opgeslagen-handbewerking

Opgeslagen handen worden in een working copy bewerkt via `UI.editTx`.

Kern:

- originele opgeslagen hand blijft intact tijdens bewerken;
- meerdere wijzigingen kunnen in één transactie worden gecombineerd;
- expliciet opslaan commit de working copy;
- verlaten zonder opslaan kan volledig rollbacken;
- `Wijzigingen opslaan` is de definitieve commitgrens.

Deze transactiearchitectuur geldt ook voor veilige historische bewerkingen.

---

## 16. Historische navigatie bij veilige wijzigingen

Een belangrijke eindinvariant van Build 4:

Zolang de gebruiker **niet** expliciet `Bewerken vanaf deze stap` kiest, moeten `Vorige stap` en `Volgende stap` bruikbaar blijven door de volledige opgeslagen hand.

Dit geldt ook nadat:

- Hero-holecards zijn gewijzigd;
- Villain-holecards zijn gewijzigd;
- een kaart een latere boardkaart heeft verdrongen;
- meerdere veilige wijzigingen op verschillende stappen zijn gecombineerd.

De structurele branchroute blijft daarvan gescheiden.

---

## 17. Historische Villain-detailroute

In de 4.6.2-correctieronde is een Villain-specifiek navigatieprobleem opgelost.

Oorzaak:

- de tijdelijke Villain-detailindex beïnvloedde de checkpoint-ID van de bovenliggende `v27VillainMore`-stap;
- daardoor kon de bestaande forwardtrail worden afgekapt.

Herstel:

- parent-index wordt expliciet bewaard;
- bij `Gereed`/`Annuleren` wordt de oudercontext hersteld;
- tijdelijke Villain-detailstappen worden niet als gewone historische checkpoints geregistreerd;
- geen tweede trail- of routerarchitectuur toegevoegd.

Resultaat: veilige Villain-kaartbewerkingen blokkeren historische forwardnavigatie niet meer.

---

# DEEL D — KAARTBEWERKING EN BOARDVALIDATIE

## 18. Veilige historische kaartbewerking

Hero-, Villain- en boardkaarten kunnen historisch via de bestaande kaartpicker worden aangepast binnen de veilige editroute.

De kaartlogica gebruikt een centrale prioriteit en voorkomt dubbele kaarten.

Wanneer een nieuwe Hero-/Villainkaart al op het board ligt, kan die boardkaart worden verdrongen.

De verdrongen boardpositie wordt vervolgens vrijgemaakt zodat de gebruiker deze later in dezelfde transactie opnieuw kan invullen.

---

## 19. Tijdelijke boardgaps

Een tijdelijke boardgap is tijdens historische kaartbewerking toegestaan wanneer deze aantoonbaar het gevolg is van een geldige kaartverdringing.

Dit is uitsluitend een **tijdelijke edittoestand**.

De definitieve opgeslagen hand moet nog steeds structureel geldig zijn.

Hiermee werd voorkomen dat een veilige kaartwijziging meteen werd afgewezen voordat de gebruiker de vrijgekomen boardkaart kon herstellen.

---

## 20. Rollback van Villain-kaartbewerking

Een regressie in `Terugdraaien` na Villain-kaartverdringing is opgelost.

Naast herstel van de oorspronkelijke handstate worden nu ook de volledige pickercontexten opgeruimd:

- `UI.picker`;
- `UI.pickRank`;
- `UI.cardGroup`;
- tijdelijke Klasse-B-cardstate.

Hierdoor kan de kaartpicker na rollback direct opnieuw worden gebruikt.

---

## 21. Definitieve save-validatie board

Build 4.6.2 introduceerde gerichte feedback wanneer een oorspronkelijk vereiste boardkaart na historische bewerking nog ontbreekt.

De vereiste boardlengte wordt contextueel bepaald:

### Historische hand
De oorspronkelijk opgeslagen hand bepaalt welke straten vereist zijn.

### Nieuwe hand
De actuele review-/eindstreet bepaalt wat vereist is:

- preflop → 0 boardkaarten;
- flop → 3;
- turn → 4;
- river → 5.

Hierdoor worden legitiem niet gespeelde latere straten niet onterecht verplicht.

Voor ontbrekende kaarten zijn concrete meldingen ingevoerd voor:

- flop;
- turn;
- river;
- combinaties daarvan.

Dezelfde definitieve validatie wordt gebruikt vanuit zowel het einde van de wizard als de X-/sluitmodal.

Een niet-gerelateerde validatiefout wordt niet overschreven door een boardmelding.

---

# DEEL E — BBA, TAFELMARKERS EN BETTINGFEEDBACK

## 22. BBA-toggle hersteld

Build 4.4 herstelde in Basisgegevens voor toernooien:

- SB;
- BB;
- BBA;
- `Big Blind Ante actief`;
- `SB n.v.t.`.

Gedrag:

- nieuwe MTT-hand: BBA standaard aan;
- uitzetten wist de actieve ante via de bestaande centrale route;
- BB wijzigen terwijl BBA bewust uit staat activeert BBA niet opnieuw;
- opnieuw aanzetten gebruikt de bestaande BB→BBA-sync;
- cashgame gebruikt geen BBA-toggle.

Er is geen tweede BBA-state geïntroduceerd.

---

## 23. Dealer-marker

De gele D-marker gebruikt overal `buttonSeat` als enige dealerbron.

De marker is daardoor consistent zichtbaar in:

- setup;
- actiontable;
- review;
- `Actuele tafelsituatie`;
- postflop.

Er is geen parallel `dealerSeat`-veld toegevoegd.

---

## 24. Forced-betmarkers

SB-/BB-/BBA-/straddlemarkers zijn beperkt tot:

- setup;
- preflop.

Vanaf flop verdwijnen deze visuele forced-betmarkers.

Onderliggende blind-, ante-, straddle-, contribution-, pot- en reportdata blijven volledig intact.

De D-marker blijft postflop wel zichtbaar.

---

## 25. Minimumraisefeedback

De minimumraisevalidatie is inhoudelijk en tekstueel aangescherpt.

Definitieve meldingsvorm:

### Chips
`Minimumraise is [raisegrootte] ([minimum totaal] totaal).`

### BB
`Minimumraise is [raisegrootte] bb ([minimum totaal] bb totaal.`

Daarmee wordt expliciet onderscheid gemaakt tussen de minimale raisegrootte en het minimale totale doelbedrag.

---

# DEEL F — RESULTAAT EN REPORT

## 26. Resultaat vanuit Hero-perspectief

De resultaatsemantiek is opnieuw opgebouwd vanuit Hero.

Hoofdregels:

- Hero wint exclusief → `Ik win · pot ...`;
- Hero verliest → `Ik verlies · inleg ...`;
- Hero fold → `Ik verlies`;
- Hero in chop → `Chop`.

Een aparte duplicerende winnaarregel voor Hero wordt vermeden.

Winnaar/chop wordt uitsluitend gebaseerd op opgeslagen resultaat-/winnerstate en niet afgeleid uit kaarten of actiepatroon.

---

## 27. Showdown

De showdownpresentatie is geharmoniseerd tussen:

- in-app report;
- gekopieerde tekst;
- gedeelde tekst;
- reportafbeelding.

De centrale showdownbron telt uitsluitend spelers die:

- daadwerkelijk onderdeel van de handactie zijn;
- showdown hebben bereikt;
- niet eerder zijn gefold.

Daardoor tellen niet-meespelende maar nog actieve tafelposities niet mee.

---

## 28. Positievolgorde

Spelers worden in reports consistent geordend volgens:

`SB → BB → UTG → UTG+1 → UTG+2 → LJ → HJ → CO → BTN`

Deze volgorde is losgekoppeld van toevallige array-/seatvolgorde.

---

## 29. Resultaatsectie

De hiërarchie is gestandaardiseerd naar:

1. `RESULTAAT`;
2. optioneel `Showdown · X spelers`;
3. primaire Hero-uitkomst;
4. aanvullende showdownspelers.

`OPMERKINGEN` staat als globale sectie ná resultaat:

`ACTIES → RESULTAAT → OPMERKINGEN`

---

## 30. Reportafbeelding — layout

De reportcanvas is verder verfijnd:

- `SPELER INFO` gebruikt een 35/65-verdeling Hero/Villains;
- dubbele/semiotisch onnodige separators zijn verwijderd;
- noodzakelijke grenzen rond tussenblokken blijven bestaan;
- primaire resultaattekst is compacter;
- resultaatbadge/iconen zijn proportioneel verkleind;
- choplabels wrappen zo veel mogelijk als complete `Naam (positie)`-eenheid;
- aanvullende showdownspelers zijn links uitgelijnd met de Resultaatsectie;
- lange namen krijgen een vaste ruimte vóór de kaartenzone.

---

## 31. Vaste showdown-kaartzone

Voor aanvullende showdownspelers is een vaste tweekaartszone aan de rechterzijde ingevoerd.

Regels:

- één bekende kaart gebruikt altijd kaartpositie 1;
- twee kaarten gebruiken vaste positie 1 + 2;
- naamwrap en kaartdrawing gebruiken dezelfde centrale geometrie.

Hierdoor verschuiven kaarten niet meer afhankelijk van de lengte van de spelersnaam.

---

# DEEL G — BOUNTYMODEL

## 32. Vereenvoudiging

De definitieve Build-4-lijn hanteert:

**Bounty-informatie wordt niet meer vóór de hand per Hero of Villain vastgelegd.**

### KO
- vaste bountywaarde op sessieniveau;
- handresultaat registreert aantal gewonnen bounties.

### PKO
- geen pre-hand Hero-/Villainbounty;
- handresultaat gebruikt vrije omschrijving voor gewonnen bounty.

### Mystery Bounty
- geen pre-hand Hero-/Villainbounty;
- handresultaat gebruikt vrije omschrijving.

---

## 33. Historische bountybewerking

Op `Hand afronden` is historische bountybewerking hersteld voor:

- KO;
- PKO;
- Mystery.

Ook een lege of nulwaarde blijft bewerkbaar via het potlood.

Uniform rapportlabel:

`Bounty gewonnen`

---

## 34. Verouderde pre-hand bountycode

In de 4.6.2-correctieronde is de runtime-effectieve oude pre-hand bountysystematiek verwijderd.

Onder meer verdwenen uit actieve routes:

- `ownBounty`;
- Villain pre-hand bounty;
- oude invoercontrols en compatibiliteitsweergaven die deze waarden opnieuw konden laten lekken.

Er is geen datamigratie uitgevoerd; legacydata mag opgeslagen blijven maar wordt niet meer als actief invoermodel gebruikt.

---

# DEEL H — AFWERKING EN CODECLEANUP

## 35. Build 4.6 / 4.6.1 — commentcleanup

Na functionele acceptatie van Build 4.5.2.4 is een conservatieve broncleanup uitgevoerd.

Doel:

- buildhistorische `WIJZIGING ...`-comments verwijderen;
- technische toelichting behouden;
- comments Nederlandstalig, tijdloos en onderhoudsgericht maken;
- geen functionele code wijzigen.

Na comment-/whitespace-normalisatie is de cleanup functioneel equivalent bevonden aan de fysiek geaccepteerde functionele basis.

De centrale listenerarchitectuur bleef op 104 `addEventListener(`-aanroepen.

---

## 36. Fysieke correctieronde Build 4.6.2.x

Na de eindregressie en fysieke Android-test zijn uitsluitend aantoonbare releaseblokkers/correcties opgelost.

Belangrijkste punten:

- F2-01: geldige kaartverdringing mag tijdelijk boardgap creëren;
- F2-02: uniform `Bounty gewonnen`;
- F2-03: obsolete pre-hand bountycode verwijderd;
- F2-04: Villain cardpicker rollback volledig opgeschoond;
- F2-05: Villain-detailroute kapt historische forwardtrail niet meer af;
- F2-06: duidelijke savefeedback bij ontbrekende vereiste boardkaarten;
- boardvalidatie houdt onderscheid tussen vereiste en legitiem niet gespeelde straten.

Diagnostische tussenbuilds zijn niet als productfunctionaliteit behouden; zij dienden uitsluitend om runtime-effectieve oorzaken te bewijzen.

---

# DEEL I — LAATSTE UX-POLISH

## 37. Cashgame-blinds

In Build 4.6.2.10 is uitsluitend voor cashgame-SB/BB de K-sneltoets verwijderd.

Niet gewijzigd:

- bedragparser;
- blindwaarden;
- K/M-invoer op andere plekken waar grote chipbedragen wel praktisch zijn;
- toernooi-chipinvoer;
- pot-/bettinglogica.

---

## 38. Handleidinglink

De oude JavaScript-route via `window.open(...)` is vervangen door een echte HTML-link naar de vaste runtime-PDF:

`./docs/Gebruikershandleiding Live Poker Handlog.pdf`

Met:

- `target="_blank"`;
- `rel="noopener noreferrer"`.

Doel: betrouwbaar openen in een nieuwe browsercontext, ook vanuit de geïnstalleerde PWA.

Dit is fysiek getest en geaccepteerd.

---

# DEEL J — RELEASE-INTEGRATIE NA BUILD 4.6.2.10

## 39. Definitieve v2.8-identiteit

Na de genummerde Build-4-lijn is de release-identiteit afgerond:

- zichtbare versie: `v2.8 · 2026-09-02`;
- `APP_VERSION='v2.8'`;
- schema blijft 12;
- storage blijft `hhl:v12:data`;
- PWA-releasekandidaat uiteindelijk `v2.8-pwa-2`.

De tweede PWA-revisie was nodig om twee releasecorrecties betrouwbaar naar reeds geladen v2.8-installaties te kunnen distribueren:

- herstel van de releasedatum achter de zichtbare versie;
- opschoning van de runtime release notes zodat alleen definitieve versie-entries zichtbaar zijn.

---

## 40. Release notes

De runtime release notes zijn opgeschoond naar uitsluitend definitieve versies:

`v2.8 → v2.7 → v2.6 → v2.5 → v2.4 → v2.3`

Build-, RC-, ronde- en fasehistorie is niet langer gebruikerszichtbaar.

De technische buildhistorie blijft juist in dit soort changelogs vastgelegd.

---

## 41. PWA-releasebestandenset

De definitieve v2.8-PWA gebruikt als samenhangende release:

- `index.html`;
- `app-v2.8.html`;
- `service-worker-v2.8-pwa-2.js`;
- `pwa-update.json`;
- `manifest.webmanifest`;
- bestaande icon assets;
- `docs/Gebruikershandleiding Live Poker Handlog.pdf`;
- Word-bron van de v2.8-handleiding.

De service worker gebruikt een versiegebonden cache en behoudt het bestaande expliciete updateconcept:

- update detecteren activeert niets automatisch;
- `Later bijwerken` houdt actieve versie ongemoeid;
- `Nu bijwerken` registreert en activeert de kandidaat;
- maximaal één bewaakte reload.

---

# DEEL K — TEST- EN ACCEPTATIESTATUS

## 42. Automatische regressie

Build 4.6.1 is na cleanup als geheel automatisch getest:

- **30/30 PASS**;
- **0 runtime errors**.

Latere gerichte boardvalidatie op Build 4.6.2.9:

- **15/15 PASS**;
- runtime boardmatrix: **16 scenario's PASS**.

De technische pre-releaseaudit van de releasecandidate:

- **21 PASS / 0 FAIL**.

---

## 43. Fysieke Android-acceptatie

Fysiek geaccepteerd zijn onder meer:

- basisopstart en Home;
- Dark/Light;
- forced bets en actor order;
- preflopmarkers;
- BBA-toggle;
- dealer-marker;
- minimumraisefeedback;
- all-in/runout;
- Hero win/loss/chop;
- reportopbouw en reportafbeelding;
- sorteren/filteren;
- registratiedatum;
- historische veilige kaartbewerking;
- kaartverdringing en rollback;
- veilige navigatie door opgeslagen hand;
- bountyflows;
- board-savevalidatie;
- backup/import;
- finish/saveflow;
- handleidingroute.

---

## 44. Live PWA-releaseacceptatie

De definitieve `v2.8-pwa-2` is op GitHub Pages fysiek/live getest.

### Update vanaf bestaande v2.7

Bevestigd:

- v2.7 detecteert v2.8;
- `Later bijwerken` houdt v2.7 actief;
- sluiten/heropenen houdt v2.7 actief zolang niet expliciet wordt bijgewerkt;
- `Nu bijwerken` activeert v2.8;
- geen update-loop;
- bestaande sessies blijven behouden;
- bestaande handen blijven behouden en toegankelijk.

### Correctie-update pwa-1 → pwa-2

Bevestigd:

- kandidaat wordt gevonden;
- `Nu bijwerken` werkt;
- zichtbare versie wordt `v2.8 · 2026-09-02`;
- definitieve release notes zijn correct;
- geen reload-loop.

### Fresh install

Via een schone Firefox-context op Android:

- app start direct als v2.8;
- PWA kan nieuw worden geïnstalleerd;
- starten vanuit geïnstalleerde PWA werkt;
- versie is correct.

### Handleiding

Vanuit browser én geïnstalleerde Android-PWA:

- handleiding opent;
- PDF is bereikbaar;
- opent in afzonderlijke browsercontext;
- PWA blijft actief/intact.

### PWA-metadata

Bevestigd:

`pwa-update.json`:
- `versionId = v2.8-pwa-2`;
- `versionLabel = v2.8`;
- worker = `./service-worker-v2.8-pwa-2.js`.

Manifest, iconen en actieve service worker zijn gecontroleerd en geaccepteerd.

---

# DEEL L — BEWUST NIET IN BUILD 4 / v2.8

## 45. Doorgeschoven

Niet onderdeel gemaakt van v2.8:

- volwaardige main-pot/side-potberekening en verdeling;
- grotere IndexedDB-/storagearchitectuurwijziging;
- verdere optimalisatie van volledige rerender bij selectorsearch;
- bredere dead-codeverwijdering waarvan inertie niet volledig runtime-bewezen was;
- hardening van ambigu invoerformaat zoals `1.500`.

Deze punten behoren tot de v2.9/backlog en zijn geen open releaseblokkers voor v2.8.

---

# 46. Eindstatus Build 4

Build 4 is volledig afgerond en vormt de functionele basis van de definitief vrijgegeven **Live Poker Handlog v2.8**.

De ontwikkellijn heeft de app uitgebreid van Build 3.9.2 naar een release met:

- registratiemetadata;
- filteren en sorteren;
- fysiek seat-/tafelmodel;
- transactionele historische bewerking;
- veilige kaartbewerking;
- herbouwde reports;
- vereenvoudigd bountymodel;
- gerichte betting-/tafelpolish;
- robuuste definitieve validatie;
- releaseklare PWA-updatearchitectuur.

**Definitieve releasedatum:** 02-09-2026  
**Definitieve zichtbare versie:** `v2.8 · 2026-09-02`  
**Definitieve PWA-revisie:** `v2.8-pwa-2`  
**Schema:** 12  
**Storage:** `hhl:v12:data`

---

## 47. Belangrijkste bronchangelogs die in deze consolidatie zijn verwerkt

Onder meer:

- `CHANGELOG_Live_Poker_Handlog_v2.8_Build4.md`
- `CHANGELOG_Live_Poker_Handlog_v2.8_Build4.1.md`
- `CHANGELOG_Live_Poker_Handlog_v2.8_Build4.2.md`
- `CHANGELOG_Live_Poker_Handlog_v2.8_Build4.2.1.md`
- `CHANGELOG_Live_Poker_Handlog_v2.8_Build4.3.1.md`
- `CHANGELOG_Live_Poker_Handlog_v2.8_Build4.3.2.md`
- Build-4.3.2.x correctie-/testdocumentatie
- `CHANGELOG_Live_Poker_Handlog_v2.8_Build4.4.md`
- Build-4.4.1.1 minimumraisecorrectie
- Build-4.5/4.5.2.x report- en resultaatcorrecties
- `CHANGELOG_Live_Poker_Handlog_v2.8_Build4.5.2.4.md`
- `CHANGELOG_Live_Poker_Handlog_v2.8_Build4.6.md`
- `CHANGELOG_Live_Poker_Handlog_v2.8_Build4.6.1.md`
- Build-4.6.2.x correctiechangelogs en diagnosebevindingen
- `CHANGELOG_Live_Poker_Handlog_v2.8_Build4.6.2.10.md`
- technische pre-releaseaudit en fysieke/live releaseacceptatie.
