# CHANGELOG — Live Poker Handlog v2.8 — Build 3 geheel

**Hoofdbuild:** v2.8 Build 3  
**Omvat:** Build 3 en alle daaropvolgende Build-3-subbuilds tot en met Build 3.9.2  
**Periode:** 23–26 augustus 2026  
**Laatste Build-3-basis voor Build 4:** `Live_Poker_Handlog_v2.8_Build3.9.2.html`  
**SHA-256 laatste Build-3-output:** `2e7e00e4d30da33fcd0e8a25787d2c233404b2f27ec6065dc1f11d0344050e1b`

## 1. Doel van Build 3

Build 3 stond in het teken van een gecontroleerde technische opschoning van de grote, historisch gegroeide single-file codebasis van Live Poker Handlog v2.8.

Het uitgangspunt was nadrukkelijk niet om de app opnieuw te ontwerpen of functionaliteit te wijzigen. De bestaande runtime moest gelijk blijven, terwijl oude overschreven implementaties, legacy wrappers, dode functiebody's en expliciet gemarkeerde `DODE CODE` systematisch werden onderzocht.

De cleanup is daarom gefaseerd uitgevoerd. Iedere familie kreeg eerst een eigen audit en regressiedekking voordat code mocht worden verwijderd. Hoogrisicogebieden zoals de wizard, historische handbewerking, `rHand`, sessieketens en resultaat-/winnerlogica zijn niet op basis van alleen statische aannames opgeschoond.

In de latere Build-3-subbuilds verschoof het accent van technische cleanup naar gerichte correcties en polish die tijdens de acceptatie van de opgeschoonde code naar voren kwamen.

## 2. Beginstand en auditmethodiek

Build 3 startte vanaf de formeel geaccepteerde Build 2.

Bij de eerste volledige inventarisatie zijn **144 echte `DODE CODE`-markerblokken** vastgesteld en voorzien van stabiele audit-ID's. De markers zijn conservatief verdeeld over functiefamilies:

| Familie | Oorspronkelijke markers | Onderwerp |
|---|---:|---|
| 3B | 12 | laag-/middelrisico parser-, formatter- en bindingscode |
| 3C | 54 | wizard/setup, `wz*` en direct gekoppelde helpers |
| 3D | 16 | `rHand` / pre-guided historische rendering |
| 3E | 23 | `d26*` / historische mutation- en editroutes |
| 3F | 6 | sessieketens rond `newSession` / `rNewSession` |
| 3G | 1 | `editHand` |
| 3H | 32 | overige complexe legacy-/compatibilityroutes |
| **Totaal** | **144** | |

Belangrijke methodische regels gedurende Build 3:

- een marker betekende niet automatisch dat de code veilig verwijderd kon worden;
- eerst werd vastgesteld welke declaratie of assignment werkelijk runtime-effectief was;
- bij overschreven functiebody's werd gecontroleerd of de functienaam/binding later nog nodig was;
- oudere body’s werden alleen verwijderd wanneer runtime-equivalentie aantoonbaar was;
- compatibility- en fallbackroutes bleven bestaan wanneer hun bereikbaarheid of noodzaak niet volledig kon worden uitgesloten;
- geen nieuwe wrappers, eventhandlers of parallelle fixlagen toevoegen om cleanup mogelijk te maken;
- iedere risicofamilie kreeg gerichte fixtures naast de algemene regressieset.

## 3. Build 3.1 — inventarisatie en eerste bewezen cleanupfamilie

Build 3.1 voerde Fase 3A en de eerste afgebakende cleanupfamilie uit.

Alle 144 oorspronkelijke markers zijn geïdentificeerd en van een stabiele audit-ID voorzien. Daarmee ontstond de vaste familiestructuur die voor alle volgende Build-3-rondes is gebruikt.

Bij meerdere overschreven functies bleek de historische functiebody zelf inert, terwijl de top-level binding nog noodzakelijk was omdat latere code opnieuw aan dezelfde naam toewijst. Daarom is waar nodig het patroon toegepast: historische body verwijderen, minimale top-level `var`-binding behouden en de finale runtime-effectieve assignment ongemoeid laten.

In de gecorrigeerde Build 3.1 zijn acht tijdelijke `BEWUST BEHOUDEN — FUNCTIONEEL NOODZAKELIJK`-commentaren en acht bewezen historische functiebodies verwijderd/vervangen door zulke minimale bindings. De runtime-output bleef daarbij gelijk aan de oorspronkelijke Build 3.1.

De 54 wizard/setup-markers uit Fase 3C zijn nog niet experimenteel verwijderd. Eerst moest dedicated fixturedekking beschikbaar zijn voor onder meer nieuwe hand, conceptresume, historical edit, streetovergangen, replay/undo, autosave, runout, actor-/bettingstate en wizardnavigatie.

## 4. Build 3.2.x — Fase 3C: wizard- en setupketens

De Build-3.2-lijn rondde de audit van de grote wizard/setupfamilie af. Deze familie omvatte `wz*`-routes en direct gekoppelde setuphelpers. Omdat deze code niet alleen rendering doet maar ook actorvolgorde, streetstate, autosave, replay en navigatie raakt, is cleanup alleen uitgevoerd na dedicated wizardfixtures.

De formeel geaccepteerde afsluiting was **Build 3.2.2**.

Eindstand na Build 3.2.2:

- Fase 3C volledig afgerond;
- Fase 3D t/m 3H bewust nog niet gestart;
- resterende echte `DODE CODE`-markers: **78**;
- geen functionele wizard-, betting- of actorqueueherontwerp uitgevoerd.

Een belangrijk technisch patroon uit deze fase is daarna als vaste cleanupregel gebruikt: een dode functiebody kan worden verwijderd terwijl de binding zelf behouden moet blijven als latere strict-mode-assignments die naam nog gebruiken.

## 5. Build 3.3 — Fase 3D: `rHand` / pre-guided historische rendering

Build 3.3 onderzocht de volledige `rHand`-familie. De audit omvatte **16 oorspronkelijke audit-ID's**. Deze familie was hoogrisico doordat in de bron meerdere declaraties, assignments, Base-captures en aliasroutes rond `rHand` en `rHandV25` bestonden.

De cleanup mocht daarom niet alleen op state-equivalentie worden beoordeeld. Ook HTML-/DOM-equivalentie was vereist, waaronder classes, data-attributen, blokvolgorde, historische rendering en compatibilitygedrag.

De historische rendering is zo opgeschoond dat alleen bewezen redundante lagen verdwenen en de werkelijk benodigde runtime-/compatibilityroutes bleven bestaan.

## 6. Build 3.4 — Fase 3E: historische `d26*` mutation- en editroutes

Build 3.4 was de risicovolste cleanupfase binnen Build 3. De audit omvatte **23 oorspronkelijke audit-ID's** in de `d26*`-familie.

Dit gebied bevat de transactionele historische bewerkarchitectuur, waaronder historical branch-/modalrouting, Klasse-A/B-veiligheidslagen, historische stack- en identityroutes, resultaat-/potbewerkpaden, save-/cancelgrenzen en mutation guards.

Tijdens de cleanup bleven de bestaande historische principes leidend:

- een opgeslagen hand wordt via de bestaande working copy bewerkt;
- directe veilige edits mogen geen downstream bettingdata herschrijven;
- structurele wijzigingen blijven via de bestaande branch/rebuildroute lopen;
- cancel/rollback en definitieve save blijven gescheiden;
- geen tweede mutationguard, modalroute, pickerhandler of save/cancelroute toevoegen.

Build 3.4 startte met **62** echte markers. Voor Fase 3E waren er 23. Na afhandeling van deze familie resteerden **39** markers voor de nog niet uitgevoerde families.

## 7. Build 3.5 — Fase 3F: sessieketens

Build 3.5 onderzocht de zes oorspronkelijke markers in de sessieketen rond `newSession` en `rNewSession`.

De audit keek naar de volledige keten: `newSession`, `rNewSession`, `saveSession`, `editSession`, `rSession`, navigatie, validatie, persistence en behoud van `session.created`.

Belangrijk uitgangspunt was dat minder wrappers geen doel op zichzelf waren. Alleen bewezen redundante historische sessiecode is verwijderd of geconsolideerd. De effectieve sessieaanmaak-, bewerk-, opslag- en navigatiesemantiek bleef gelijk.

## 8. Fase 3G/3H en resterende complexe markers

Na de dedicated familiebuilds zijn de resterende legacy-/compatibilitymarkers verder onderzocht. Daarbij gold dezelfde conservatieve regel: niet elke oudere naam of wrapper mocht verdwijnen. Compatibilitynamen en fallbackfuncties bleven behouden wanneer zij nog runtime-bereikbaar waren of wanneer hard bewijs voor volledige inertie ontbrak.

Voorbeelden van bewust behouden compatibilitynamen in de uiteindelijke Build-3-lijn zijn onder meer `pushAction`, `addAction`, `quick` en `rStreet`. Ook enkele bounty-/compatibilityhelpers bleven bestaan waar de runtime of fallbackarchitectuur die nog vereiste.

De cleanup verminderde dus niet blind het aantal functienamen, maar verwijderde voornamelijk historische bodies en duplicaten waarvan de effectieve opvolger aantoonbaar vaststond.

## 9. Build 3.8.x — gerichte correcties en UI-polish na cleanup

Na de technische cleanupfasen verschoof Build 3 naar bevindingen uit de handmatige acceptatie. Build 3.8.2 werd expliciet als een andere soort build behandeld: geen verdere brede Fase-3-cleanup, maar een gerichte functionele correctie plus UI-polish.

In deze lijn is de resultaatvalidatie verder aangescherpt, met expliciete regressiebescherming voor reeds herstelde winner-/chopcanonicalisatie. De correcties mochten winner/chopstate, actorqueue en reportsemantiek niet opnieuw modelleren.

Daarnaast is de Home-selectiemodus visueel/interactioneel gepolijst.

Build 3.8.1 bevatte nog **21 echte `DODE CODE`-markers**. De functionele correcties in 3.8.2/3.8.3 waren niet bedoeld als markercleanup. De formele basis voor Build 3.9 was uiteindelijk **Build 3.8.3**.

## 10. Build 3.9 — finale markercleanup en consolidatie

Build 3.9 vormde de technische afsluiting van het oorspronkelijke `DODE CODE`-traject.

De resterende **21 echte markers** zijn afgehandeld:

**21 → 0**

Daarmee bevatte Build 3.9 geen echte `DODE CODE`-markerblokken meer.

Bij meerdere functies zijn historische bodykopieën verwijderd terwijl de noodzakelijke binding plus finale assignment behouden bleven. Voor onder meer de volgende functies is de eindstructuur geverifieerd als één kale binding plus één finale assignment:

- `rc5LiveActors`;
- `rc7RoundAHandleNext`;
- `rc7RoundBInfoBlock`;
- `rc7RoundB2RaiseHint`;
- `rc7F4EnhanceHistoricalField`;
- `rc7F43BountyEditorBlock`.

Niet alles is weggehaald. Onder meer `pushAction`, `addAction`, `quick` en `rStreet` bleven als compatibilitynamen aanwezig.

Voor Build 3.9 is onafhankelijk bevestigd:

- JavaScript-syntax: PASS;
- `DODE CODE`: 0;
- `addEventListener(`: **104**, ongewijzigd;
- geen tijdelijke `window.__RT`;
- geen `console.debug`;
- geen kale `debugger`;
- geen PWA-, schema- of storagewijzigingen.

## 11. Build 3.9.1 — meldingen, validatiefeedback en gebruikerscopy

Na de technische cleanup is de gebruikersfeedback systematisch opgeschoond.

Er is geen tweede meldingsframework geïntroduceerd. De bestaande presentatiekanalen zijn hergebruikt: `toast()` voor echte succesbevestigingen, `.wz-field-error`, `.input-error`, `.warn`, `.status-error`, bestaande `UI.wz.error`, lokale `inlineFeedback(...)` / `clearInlineFeedback(...)` en `UI.systemStatus` voor persistente systeem-/opslagfouten.

Het aantal eventlisteners bleef **104 → 104**.

Foutieve of misleidende groene succesmeldingen zijn vervangen door contextueel juiste feedback. Onder meer:

- speler bestaat al in bibliotheek → neutrale/amber lokale melding;
- dubbele bibliotheeknaam → rode inline validatiefout;
- dubbele sessiespeler → rode inline validatiefout;
- lege spelersnaam → rode inline validatiefout.

De wijziging betrof presentatie en copy; er is geen nieuwe pokerlogica geïntroduceerd.

## 12. Build 3.9.2 — mobiele tekstselectiepolicy

Build 3.9.2 vormde de laatste Build-3-subbuild vóór Build 4.

De mobiele tekstinteractie is aangescherpt om ongewenste browsertekstselectie tijdens invoer- en bewerkflows te voorkomen. In invoer-/bewerkcontexten wordt algemene browsertekstselectie onderdrukt, terwijl normale tekstinteractie behouden blijft voor `input`, `textarea`, `select`, contenteditable velden en report-/tekstcontexten waar selecteren juist gewenst is.

Dit voorkomt met name ongewenste long-press-/selectie-effecten tijdens mobiele bediening zonder echte tekstvelden onbruikbaar te maken. Deze policy werd later in Build 4.1 expliciet opnieuw beschermd toen nieuwe filter-/sorteercontexten werden toegevoegd.

## 13. Functioneel bewust ongewijzigd gedurende Build 3

De Build-3-lijn was in de kern een cleanup- en stabilisatietraject. Tenzij een latere gerichte subbuild dit expliciet corrigeerde, bleven de volgende onderdelen buiten de cleanup:

- betting engine;
- potberekening;
- all-inlogica;
- minimumraise-/legal-actionsemantiek;
- actorqueue;
- street closure;
- winner-/chopstate;
- schema;
- storage;
- import/export;
- PWA/service worker/updateflow;
- registratiemetadata;
- filters;
- Handleiding-openroute;
- releasearchitectuur.

De centrale technische les van Build 3 was dat “overschreven” niet automatisch “dood” betekent. Bij de bestaande single-file architectuur kunnen bindings, aliascaptures en compatibilityroutes nog functioneel noodzakelijk zijn, ook als een oudere functiebody nooit rechtstreeks wordt uitgevoerd.

## 14. Eindstand Build 3

Aan het einde van Build 3:

- de oorspronkelijke 144 gemarkeerde legacy-/dead-code-locaties waren systematisch geïnventariseerd;
- de grote wizard-, `rHand`-, historische `d26*`- en sessiefamilies waren afzonderlijk geaudit;
- bewezen dode historische bodies en duplicaten waren verwijderd;
- noodzakelijke bindings en compatibilityroutes waren behouden;
- het aantal echte `DODE CODE`-markers was teruggebracht naar **0**;
- de eventarchitectuur bleef op **104 `addEventListener(`-registraties**;
- gebruikersfeedback was contextueel verbeterd;
- mobiele tekstselectie tijdens invoer/bewerken was gepolijst;
- `APP_VERSION` bleef `v2.7`;
- `PWA_VERSION_ID` bleef `v2.7-pwa-4`;
- `SCHEMA_VERSION` bleef `12`;
- de PWA-/storagearchitectuur bleef ongewijzigd.

De laatste Build-3-output was:

`Live_Poker_Handlog_v2.8_Build3.9.2.html`

SHA-256:

`2e7e00e4d30da33fcd0e8a25787d2c233404b2f27ec6065dc1f11d0344050e1b`

Deze exacte Build 3.9.2 is vervolgens als bouwbasis gebruikt voor **v2.8 Build 4**.

## 15. Samenvatting voor ontwikkelarchief

Build 3 heeft de technische schuld uit de v2.7-basis niet met een grote refactor weggegooid, maar gecontroleerd afgebouwd:

1. eerst volledige inventarisatie;
2. daarna cleanup per risicofamilie;
3. dedicated regressietests vóór hoogrisicoverwijderingen;
4. bindings behouden wanneer alleen de body dood was;
5. compatibility behouden wanneer bereikbaarheid niet volledig kon worden uitgesloten;
6. resterende markers naar nul;
7. daarna gerichte functionele en UX-polish;
8. finale Build 3.9.2 als stabiele basis voor de functionele Build-4-lijn.

Dit document is het geconsolideerde technische changelog van de gehele Build-3-lijn. Losse subbuildchangelogs blijven uitsluitend relevant als detail-/auditbron.
