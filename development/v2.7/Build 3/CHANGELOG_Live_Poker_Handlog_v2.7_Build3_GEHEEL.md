# CHANGELOG — Live Poker Handlog v2.7 — Gehele Build 3

**Periode:** Build 3 t/m Build 3.1.4  
**Basis:** `Live_Poker_Handlog_v2.7_Build2.2.1.html`  
**Actueel eindpunt:** `Live_Poker_Handlog_v2.7_Build3.1.4.html`  
**Schema:** 12 — ongewijzigd  
**Hoofddoel Build 3:** vernieuwde kaartinvoer en kaartvisuals, gevolgd door gerichte mobiele keyboard-/viewportcorrecties voor de handwizard.

---

## 1. Samenvatting

Build 3 bestaat functioneel uit twee hoofdfasen.

### Fase A — kaarten en kaartpicker

De interactieve kaartweergave is omgebouwd naar één consistente **4-color kaartcomponent** voor Hero, board en villains. De bestaande rank → suit-kaartpicker is mobiel visueel vernieuwd, terwijl kaartopslag, duplicate-cardblocking, sortering, historische kaartbewerking en saved-hand-transacties intact zijn gebleven.

Daarnaast is de gedeelde K/M-bediening bij toernooiblinds visueel exact onder de BB-kolom uitgelijnd.

### Fase B — Android keyboard en viewport

Tijdens de fysieke Android/Chrome-validatie bleek dat de bestaande action amount-editor bij Raise/Bet/bedrag-All-in niet altijd volledig bruikbaar bleef wanneer het numerieke keyboard geopend was. In Build 3.1 t/m 3.1.4 is deze route stapsgewijs **aan de bron geconsolideerd**, zonder een nieuwe parallelle keyboardarchitectuur te introduceren.

Uiteindelijk geldt in Build 3.1.4:

- één centrale focus-/viewportroute voor numerieke actioninvoer;
- de werkelijk gebruikte wizardfooters worden herkend;
- handmatige refocus start een verse `visualViewport`-lifecycle;
- oude concurrerende Build-2 autofocus/smooth-scroll is geneutraliseerd;
- footerpositionering gebruikt een stabiele viewportbaseline;
- tijdens keyboard-open wordt tijdelijk voldoende scrollruimte onderaan gereserveerd;
- het actieve inputveld blijft focus-/bovenkanttarget;
- de volledige amount-editor tot en met **Bevestigen** bepaalt de functionele zichtbaarheidsondergrens.

Build 3.1.4 is technisch gereed voor fysieke Android/Chrome-validatie. De Build-3-fase is pas definitief geaccepteerd nadat de resterende fysieke keyboardtests groen zijn.

---

# DEEL I — Build 3: kaartvisuals en kaartpicker

## 2. Centrale 4-color kaartcomponent

Alle bekende interactieve kaarten gebruiken één vaste suitsemantiek:

- **♠ Schoppen:** donker/zwart kaartvlak;
- **♥ Harten:** rood kaartvlak;
- **♦ Ruiten:** blauw kaartvlak;
- **♣ Klaveren:** groen kaartvlak;
- **? Onbekend/gedeeltelijk onbekend:** neutraal grijs.

Rank en suitsymbool worden wit weergegeven. Schoppen hebben extra contrastrand zodat zij in Dark Mode zichtbaar blijven.

De centrale `cardHTML()`-route wordt gebruikt voor:

- Hero-holecards;
- boardkaarten;
- villain-/showdownkaarten;
- lege kaartslots;
- historische weergaven die dezelfde centrale kaartcomponent gebruiken.

Het eerdere ivoorkleurige bekende-kaartmodel is voor deze interactieve component vervangen.

---

## 3. Centrale suit-kleurbron

Aan de centrale CSS-variabelen zijn toegevoegd:

- `--suit-spade`;
- `--suit-heart`;
- `--suit-diamond`;
- `--suit-club`;
- `--suit-unknown`;
- `--suit-card-text`.

Deze kleurbron wordt gebruikt door:

- `.pcard` / `cardHTML()`;
- de kaartpicker;
- de actuele tafel-/actioncontext via `rc7RoundBCardHTML()`.

De bestaande report-/sharetekstkleuren `.cs/.ch/.cd/.cc/.cq` zijn bewust niet gewijzigd.

---

## 4. Mobiele kaartpicker

De bestaande functionele rank → suit-route is behouden, maar visueel vernieuwd.

### Ranks

- alle bestaande ranks blijven beschikbaar;
- geselecteerde rank krijgt een duidelijke actieve state;
- geblokkeerde ranks blijven zichtbaar maar disabled;
- rankselectie alleen muteert nog geen kaart.

### Suits

De suitrij gebruikt grote full-color touchbuttons:

- ♠ donker/zwart;
- ♥ rood;
- ♦ blauw;
- ♣ groen;
- ? grijs.

De bestaande attributen blijven leidend:

- `data-rank`;
- `data-suit`.

Er is geen tweede picker-eventroute toegevoegd.

### Toegankelijkheid

Toegevoegd/behouden:

- expliciete `aria-labels` op kaartslots;
- bekende kaarten benoemen rank en suit;
- rankbuttons hebben toegankelijke labels;
- suitbuttons hebben namen zoals Schoppen, Harten, Ruiten en Klaveren;
- geblokkeerde opties gebruiken de echte `disabled`-state;
- kleur is niet de enige informatiedrager: rank en suitsymbool blijven zichtbaar.

---

## 5. Lege en onbekende kaarten

- lege kaartslots blijven neutrale donkere invoerposities met `+` en dashed border;
- onbekende of gedeeltelijk onbekende kaarten blijven via de bestaande `?`-semantiek mogelijk;
- onbekende informatie gebruikt een neutraal grijs kaartvlak;
- kaartopslagformaat en schema zijn niet gewijzigd.

---

## 6. Duplicate-card-, displacement- en sorteerlogica behouden

Functioneel ongewijzigd gebleven:

- `d26CardChoiceBlocked()`;
- `d26ApplyExplicitCardChoice()`;
- `d26DecisionForPath()`;
- `d26ApplyDecisionDisplacements()`;
- `setCard()`;
- `usedCards()`;
- `sortPair()`;
- `sortFlop()`.

Hierdoor blijven onder meer behouden:

- reeds gebruikte bekende kaarten worden geblokkeerd;
- bestaande displacementregels blijven leidend;
- Hero- en villain-holecards behouden sortering;
- flopkaarten behouden bestaande sortingsemantiek.

---

## 7. Historische kaartbewerking en saved-hand transaction

De bestaande historische Klasse-B-route blijft leidend:

- `d26ApplyClassBCardEdit()` ongewijzigd;
- `data-historical-command` behouden in de nieuwe picker;
- bestaande confirm-/rollbackarchitectuur behouden;
- pure historische inspectie blijft read-only;
- opgeslagen handen blijven via de bestaande transaction working copy worden bewerkt.

Build 3 introduceert dus geen nieuwe historische kaartmutatieroute.

---

## 8. Actuele tafel-/actioncontext

De kaartweergave in de actuele action-/tafelcontext gebruikt dezelfde centrale suitkleuren als Hero, board, villains en picker.

Hierdoor heeft dezelfde suit in de interactieve app overal dezelfde kleurbetekenis.

---

## 9. K/M-meelifter bij toernooiblinds

De gedeelde K/M-control is uitsluitend visueel gecorrigeerd.

Nieuwe harde uitlijning:

> **linkerrand K = linkerrand BB-invoerveld**

De suffixgrid gebruikt dezelfde 3-koloms structuur/gap als de blindgrid, zodat K/M direct onder de middelste BB-kolom begint.

Niet gewijzigd:

- suffixlogica;
- shared blindtarget;
- lege-statefix;
- interne B-parsercompatibiliteit;
- BBA-autofill;
- handmatige BBA-override.

---

# DEEL II — Build 3.1 t/m 3.1.4: keyboard-/viewportcorrecties

## 10. Aanleiding voor Build 3.1.x

De fysieke Android/Chrome-validatie van Build 3 liet zien dat numerieke actioninvoer niet onder alle keyboardscenario's stabiel zichtbaar bleef.

De correctierondes zijn bewust niet opgelost met toestel-specifieke scrollafstanden of steeds nieuwe helpers. Iedere ronde heeft de **bestaande centrale route** verder gecorrigeerd.

De uiteindelijke architectuur blijft:

```text
v27b21SyncAmountInput()
        ↓
v27b31ApplyViewport()
        ↓
keyboard-/visualViewportmeting
        ↓
footer-/visibilitygeometry
        ↓
bestaande minimale window.scrollBy()
```

---

## 11. Build 3.1 — centrale keyboard-/viewportcoördinatie

Build 3.1 bracht de bestaande mobiele focuslogica onder één centrale coördinator voor de handwizard.

De route behandelt onder andere:

- Raise;
- Bet;
- relevante bedrag-All-in;
- focus na openen van een bedragactie;
- focus na unit-rerender;
- `visualViewport.resize`;
- wizardfooterpositionering;
- minimale scrollcorrectie;
- cleanup bij contextwissel en keyboardclose.

### Waardetypewissels

De bestaande unitroute bleef behouden voor onder andere:

- € / Chips → BB;
- BB → € / Chips;
- BB ↔ % Pot;
- Chips ↔ % Pot.

Na rerender wordt de actuele nieuwe `[data-wz-value]` via dezelfde centrale helper gebruikt.

### K/M

Suffixacties blijven de bestaande suffixroute gebruiken. Na K/M wordt dezelfde centrale focus-/viewporthelper hergebruikt; er is geen aparte suffixscroll toegevoegd.

### Historical read-only

Historical read-only activeert bewust geen:

- autofocus;
- keyboardtrigger;
- automatische viewportscroll;
- keyboardfootercorrectie zonder actieve editinput.

---

## 12. Build 3.1.1 — bronfix footerresolver en handmatige refocus

De fysieke praktijk liet twee bronproblemen zien.

### Verkeerde footerresolver

Build 3.1 zocht alleen naar:

- `.wz-footer`.

De actuele v2.7-flow gebruikte echter:

- `.v27-flow-footer` voor setupstappen;
- `.d1-nav-footer` voor action-/historische navigatiestappen.

De bestaande `v27b31Footer()` is daarom hersteld zodat deze de werkelijk gebruikte footers resolveert.

Er bleef exact één footerresolver.

### Verse lifecycle bij handmatige refocus

Wanneer de gebruiker opnieuw handmatig in hetzelfde bedragveld tikte, kon dezelfde context-key een oude `visualViewport`-watch hergebruiken.

Vanaf Build 3.1.1 geldt `reason:'focus'` als een verse lifecycle-start:

- oude cleanup eerst uitvoeren;
- daarna een nieuwe viewportwatch registreren;
- ook wanneer de context-key gelijk blijft.

Dezelfde lifecycle luistert naar:

- `visualViewport.resize`;
- `visualViewport.scroll`.

Dit ondersteunt ook Android-situaties waarin `offsetTop` verandert.

---

## 13. Build 3.1.2 — consolidatie naar één effectieve scroll-/focuseigenaar

Bij bronanalyse bleek nog een oude Build-2-renderroute actief die zelfstandig:

- focus zette op `[data-wz-value]`;
- een double-rAF-cyclus gebruikte;
- `scrollIntoView({block:'center', behavior:'smooth'})` uitvoerde.

Daarna draaide óók de Build-3.1-route. Raise/Bet had daarmee twee concurrerende focus-/scroll-eigenaren.

### Correctie

De oude Build-2 action-autofocus/smooth-scrollroute is geneutraliseerd.

De actuele handwizard heeft sindsdien één functionele eigenaar:

- `v27b21SyncAmountInput()` voor focus, context en lifecycle;
- `v27b31ApplyViewport()` voor viewportgeometry, footer en minimale scrollcorrectie.

### Footersemantiek

Normaal waren de footers verschillend:

- `.v27-flow-footer` → sticky;
- `.d1-nav-footer` → fixed.

Tijdens keyboardmodus worden zij functioneel gelijkgetrokken naar fixed-positionering boven de zichtbare keyboardgrens. Bij keyboardclose keert hun normale toestand terug.

### Stabiele viewportbaseline

De keyboardinset gebruikt niet langer uitsluitend de mogelijk meekrimpende `window.innerHeight`, maar de reeds bestaande:

- `v27b31ViewportMaxHeight`.

Hierdoor wordt de keyboardvrije viewport als stabiele referentie gebruikt.

### Scrollgedrag

De keyboardroute gebruikt uitsluitend minimaal noodzakelijke:

```js
window.scrollBy({top: delta, behavior: 'auto'})
```

Geen smooth-scrollroute of nieuw `scrollIntoView()` voor actionbedraginvoer.

---

## 14. Build 3.1.3 — tijdelijke keyboard-scrollruimte

De fysieke P1-test van Build 3.1.2 liet vervolgens zien dat de centrale route de juiste `delta` berekende, maar dat het document niet ver genoeg kón scrollen.

Gemeten was ongeveer:

- benodigde correctie: **312 px**;
- beschikbare maximale scrollruimte: **33 px**.

De fout zat dus niet meer in geometry of scrollberekening, maar in ontbrekende documenthoogte.

### Dynamische tijdelijke bodempadding

Binnen de bestaande `v27b31ApplyViewport()` wordt bij keyboard-open vóór de geometry-rAF extra bodemruimte gereserveerd.

De extra ruimte wordt dynamisch bepaald als:

```text
keyboardExtra = max(0, v27b31ViewportMaxHeight - viewBottom)
```

De normale body-bodempadding blijft behouden en de effectieve waarde is:

```text
normale bodempadding + keyboardExtra
```

### Geen cumulatieve groei

Iedere apply schrijft de volledige absolute padding opnieuw weg. De bestaande inline padding wordt niet steeds opnieuw opgeteld.

Daardoor veroorzaken meerdere `visualViewport`-events geen steeds groter wordende lege ruimte.

### Symmetrische cleanup

De tijdelijke ruimte wordt verwijderd:

- via de normale resetroute;
- via `v27b31ResetFooter()`;
- expliciet in de bestaande cleanup van `v27b21SyncAmountInput()`.

### Gerichte technische meting

In de Chromiumharness groeide de beschikbare `maxScroll` in een P1-achtig scenario ongeveer van:

- **41 px** vóór keyboardruimte
- naar **352 px** mét keyboardruimte.

De tweede apply hield exact dezelfde padding, waarna keyboardclose de normale padding herstelde.

---

## 15. Build 3.1.4 — volledige amount-editor als visibility-target

Na Build 3.1.3 stond het **inputveld** correct boven de vaste footer, maar de knop **Bevestigen** kon nog geheel of gedeeltelijk achter de footer staan.

Fysiek was bijvoorbeeld gemeten:

```text
input.bottom      ≈ 435,46
footer.top        ≈ 447,47
Bevestigen.bottom ≈ 510,86
```

Het inputveld voldeed dus al, maar de volledige functionele editor nog niet.

### Focus-target blijft het inputveld

Ongewijzigd:

- `target` blijft het numerieke inputveld;
- focus blijft aan dat inputveld gekoppeld;
- `input.top` blijft de bovenkantbeveiliging.

### Functionele zichtbaarheidsondergrens uitgebreid

Bij action amount-invoer wordt contextgebonden gekeken naar de editor waarin het actuele inputveld zit:

- `.wz-value`; of
- `.wz-allin-box`.

Binnen uitsluitend diezelfde editor wordt `[data-wz-confirm]` gezocht.

Wanneer aanwezig geldt:

```text
visibilityBottom = max(input.bottom, Bevestigen.bottom)
```

De bestaande centrale `delta`-/`window.scrollBy()`-route gebruikt vervolgens deze ondergrens.

Hierdoor wordt alleen de minimaal benodigde extra afstand gescrold om:

- bedragveld;
- relevante unit-/suffixcontrols;
- **Bevestigen**;
- vaste footer

tegelijk bruikbaar te houden.

### Fallback

Wanneer geen relevante editor of bevestigingsknop binnen dezelfde targetcontext wordt gevonden, blijft het bestaande input-only gedrag gelden.

Er wordt geen globale eerste knop met tekst `Bevestigen` gezocht.

---

# DEEL III — Integriteit en regressiegrenzen

## 16. Pokerlogica bewust niet gewijzigd

Gedurende Build 3 t/m Build 3.1.4 zijn de volgende kernfuncties beschermd gebleven:

- `analyze()`;
- `wzReplayStreet()`;
- `wzLegalActions()`;
- `wzApply()`.

Daarmee zijn niet onderdeel van deze buildfase:

- nieuwe bettingsemantiek;
- potenginewijzigingen;
- minimumraisevalidatie;
- side-potlogica;
- actievolgordewijzigingen.

De eerder geaccepteerde pot-/actionregressiebasis uit Build 1/2 blijft leidend.

---

## 17. Kaartlogica beschermd tijdens keyboardcorrecties

Vanaf Build 3.1 zijn de Build-3-kaartfuncties inhoudelijk behouden, waaronder:

- `cardHTML()`;
- `rPicker()`;
- `d26CardChoiceBlocked()`;
- `d26ApplyExplicitCardChoice()`;
- `d26ApplyClassBCardEdit()`;
- `setCard()`;
- `sortPair()`;
- `sortFlop()`.

De keyboardcorrecties hebben de 4-color-card-, picker-, duplicate- of historical-cardarchitectuur dus niet gewijzigd.

---

## 18. Tafelgeometry en report/share beschermd

Ongewijzigd gehouden:

- RC8-tafelgeometry;
- canonical seatmapping;
- 6-handed LJ-semantiek;
- `rc8SeatGeometry()`;
- `rc8CanonicalPositions()`;
- report-/sharestructuur;
- `shareText()`.

Ook de bestaande report-/share suittekstkleuren zijn buiten de Build-3-kaartconsolidatie gehouden.

---

## 19. Historical editing en saved-handarchitectuur beschermd

Build 3 wijzigt niet de bestaande:

- historical checkpoint-/trailnavigatie;
- read-only inspectie;
- A/B/C-classificatiearchitectuur;
- D2 branch/rebuild;
- `UI.editTx` working copy;
- discard zonder bronmutatie;
- expliciete save op hetzelfde hand-ID.

Kaartwijzigingen blijven binnen de bestaande Class-B-route lopen.

---

## 20. Schema en PWA

Ongewijzigd gedurende de volledige Build-3-fase:

- `SCHEMA_VERSION = 12`;
- opslagkey `hhl:v12:data`;
- PWA-/service-workerarchitectuur;
- updatepromptarchitectuur uit v2.6 RC9.

Er is in Build 3 geen publieke PWA-releaseproceswijziging uitgevoerd.

---

# DEEL IV — Technische validatie

## 21. Build 3 kaart-/pickerchecks

Automatisch groen gecontroleerd:

- JavaScript-syntax;
- vier bekende suits als full-color kaarten;
- witte rank/suit;
- onbekende kaart grijs;
- centrale suitkleurbron;
- alle ranks aanwezig;
- `data-rank` / `data-suit` behouden;
- rank-active state;
- duplicate-block op reeds gebruikte kaart;
- normale kaartcommit;
- één suitclick → exact één centrale kaartcommit;
- Hero-sortering;
- kaart- en pickerlayout zonder horizontale overflow op 360/375/390 px;
- K-linkerrand = BB-linkerrand op 360/375/390 px.

---

## 22. Keyboard-/viewportchecks 3.1.x

Gericht technisch groen gecontroleerd:

- effectieve footerklassen worden gevonden;
- keyboardfooter staat boven gekrompen visual viewport;
- keyboardclose verwijdert tijdelijke footerstate;
- tweede handmatige focus met dezelfde context krijgt verse lifecycle/listeners;
- oude Build-2 action-smooth-scroll is niet meer eigenaar;
- actuele DOM-input wordt na unitrerender gebruikt;
- stale input wordt niet hergebruikt;
- K/M blijft via dezelfde centrale route werken;
- historical read-only activeert geen keyboardroute;
- tijdelijke bodempadding groeit niet cumulatief;
- cleanup herstelt normale bodempadding;
- extra documenthoogte levert voldoende `maxScroll` voor de bestaande delta;
- editorvisibility gebruikt contextgebonden `Bevestigen` binnen dezelfde amount-editor;
- fallback naar input-only wanneer geen editorcontext aanwezig is;
- geen tweede `scrollBy()`-/`scrollIntoView()`-route toegevoegd.

---

# DEEL V — Bewust buiten Build 3

## 23. Niet meegenomen

Bewust buiten de gehele Build-3-scope gehouden:

- `newSession` / KO-bounty keyboardcoördinatie;
- overige app-wide numerieke sessievelden die nog niet door de handwizardcoördinator lopen;
- minimumraisevalidatie;
- side pots;
- bredere pokerlogicawijzigingen;
- Build-4-resultaat-/afrondingsfunctionaliteit;
- definitieve Light Mode;
- settings-/personalisatie-uitwerking;
- brede technische refactor van oude overrideketens;
- volledige opschoning van dode CSS/selectors;
- algemene listener-/helperdebt;
- app-wide keyboardarchitectuur buiten de handwizard.

Deze punten horen bij latere functionele of technische/restbuilds.

---

# 24. Eindstatus Build 3

**Actueel technisch eindpunt:** `v2.7 Build 3.1.4`.

De Build-3-fase levert daarmee functioneel:

1. één consistente 4-color kaartcomponent;
2. vernieuwde mobiele rank → suit-kaartpicker;
3. behoud van bestaande duplicate-, displacement-, sorteer- en historical kaartlogica;
4. uniforme suitkleuren in interactieve tafel-/actioncontext;
5. exact onder BB uitgelijnde gedeelde K/M-bediening;
6. geconsolideerde centrale keyboard-/viewportflow voor numerieke actioninvoer in de handwizard;
7. correcte footerresolutie en verse lifecycle bij handmatige refocus;
8. één effectieve action focus-/scrolleigenaar;
9. stabiele viewportbaseline voor keyboardinset;
10. dynamische tijdelijke scrollcapaciteit tijdens keyboard-open;
11. zichtbaarheid van de volledige amount-editor tot en met **Bevestigen** boven de vaste footer.

### Acceptatiestatus

De bron en gerichte automatische/harnesscontroles zijn technisch groen. De resterende acceptatiepoort is de **fysieke Android/Chrome-praktijkvalidatie**, te beginnen met de eerste Raise in P1 en daarna unit-switches, Bet, bedrag-All-in en de overige eerder vastgestelde keyboardtests.

Daarom geldt op dit moment:

> **TECHNISCH GO VOOR FYSIEKE VALIDATIE — Build 3 nog niet definitief afgesloten.**

Niet claimen dat alle keyboardproblemen app-wide zijn opgelost; de correcties van Build 3.1.x zijn bewust beperkt tot de bestaande handwizardcontext.
