# CHANGELOG — Live Poker Handlog v2.7 — Build 8 geheel

**Tussenchangelogs niet opgenomen.**

---

## Build 8.x — historical edit, kaart-/veldclassificatie en laatste mobiele correcties

## Build 8.0 — Historical Edit & Field Classification Audit

- Volledige audit van historische veldclassificatie.
- `D26_FIELD_RULES`: 50 canonieke regels bevestigd.
- `D26_FIELD_ALIASES`: 21 aliassen bevestigd.
- Unknown-field-fallback conservatief Klasse C.
- Grote overrideketens in historical render-/editroutes geïdentificeerd.
- Geen codewijziging: audit/nulmeting.

---

## Build 8.2 — historical edit UI-correcties

- Potlood-/editcontrols opnieuw aangesloten op de feitelijke v2.7-stappen.
- Hinttekst bij kaartpicker uitgebreid.
- Historische veldroutes beter afgestemd op actuele v2.7-markup.

## Build 8.2.1 — runout-pickerhint

- De uitgebreide kaartpickerhint ook toegevoegd aan de aparte runout-picker.
- Zuivere tekstcorrectie.

## Build 8.2.2 — attribuut-/structuurmismatches hersteld

- Hero Startstack/Exact-Geschat-potlood gekoppeld aan actuele `data-v27-*` markup.
- Villain identity/note-routes gekoppeld aan actuele v2.7-structuur.
- Bannertekst gecorrigeerd.

## Build 8.2.3 — historische potlood-/stepcorrecties

- Verdere aansluiting van historische controls op de actuele renderer.
- Oude pre-v2.7 selectors/structuur verder uitgefaseerd.

## Build 8.2.4 — kaartlabel/stapnaam/melding

- UI-labels en stapnamen gecorrigeerd.
- Historische meldingen verduidelijkt.
- Light Mode-waarschuwingsweergave verder gecorrigeerd.

## Build 8.2.5 — uitkomst-/thema-togglecorrecties

- Correctie op historische uitkomstvelden.
- Thema-toggle in relevante historical route hersteld.
- Regressie op eerdere 8.2-fixes bewaakt.

## Build 8.2.6 — historische spelerpicker + versielabels

- Historische `Speler en naam`-edit gebruikt gestylede zoekbare lijst in plaats van native select.
- Al gekoppelde speler wordt niet opnieuw selecteerbaar.
- Light Mode correct.
- Drie vaste versieplekken gezamenlijk gecorrigeerd:
  - `APP_VERSION`;
  - `VERSION`;
  - `<title>`.
- Vaste procesregel: alle drie voortaan per build controleren.

## Build 8.2.7 / 8.2.8 — laatste historical edit polish

- Verdere correcties op historical editcontrols, labels en bereikbaarheid.
- Dode oude routes waar passend gemarkeerd voor v2.8-opschoning.

---

## Build 8.3 — uitbreiding Klasse-A-bewerkbaarheid

- Poging om meer Startstack-eenheidsvelden (chips/BB) direct achteraf bewerkbaar te maken.
- Bountyvelden verder in historical bulkroute geïntegreerd.

## Build 8.3.1 — gerichte rollback

- Historical potloden voor Hero-/Villain-startstackeenheid teruggedraaid.
- `heroStackUnit` en `villainStackUnit` niet langer Klasse A.
- Live chips/BB-keuze tijdens normale registratie blijft ongewijzigd.
- Oude apply-/potloodwiring gemarkeerd als `DODE CODE — v2.8`.
- Uitgefaseerd veld `Eigen bounty vóór hand` uit PKO-bulkmodal verwijderd.
- `Bounty gewonnen` en aantal KO's behouden.

---

## Build 8.6.x — historical inline edit / directe Startstackbewerkingen

### Build 8.6
- Historische directe editroutes verder uitgebouwd.
- Read-only versus direct-bewerkbaar onderscheid aangescherpt.

### Build 8.6.3
- Startstack directe historische bewerking transactioneel geïsoleerd:
  - live `data-chip`;
  - live Hero/Villain-stackhandlers
  werden bewust niet hergebruikt tijdens typen.
- Pas bevestigen schrijft de wijziging door.

### Build 8.6.4
- Verdere correcties op direct-edit controls, save/cancel en historical guards.

---

## Build 8.7 — tafelvisual polish

- Tafelvisual verder afgestemd op mobiele v2.7-layout.
- Geometry-/sizingcorrecties zonder pokerposities opnieuw te ontwerpen.
- Beschermde tafelvisual daarna tijdens 8.8-builds expliciet regressie-bewaakt.

---

## Build 8.8.x — uitgebreide Android keyboard-/viewportcorrectieronde

Deze reeks ontstond uit fysieke tests op Android/Chrome/Gboard. De kernregel werd: **fix aan de effectieve bron, geen parallelle keyboardmanagers of pleisterlagen**.

## Build 8.8.2 — footerpositionering

- Eerste gerichte correctie op wizardfooter bij geopend softwarekeyboard.
- Footer moest bereikbaar zijn zonder invoervelden te overlappen.

## Build 8.8.3 — generieke keyboardclassifier

- Bepaalt welke wizardinputs werkelijk keyboardrelevant zijn.
- TEXTAREA en normale INPUT ondersteund.
- Checkbox/radio/button/etc. uitgesloten.

## Build 8.8.5 — resize/scroll-hercontrole

- Hercontrole bij VisualViewport resize/scroll.
- Gericht op Android-viewport dat tijdens keyboardtransitie meerdere geometriewaarden doorloopt.

## Build 8.8.6 — actuele viewportgeometrie

- Scrollcorrectie gebruikt VisualViewportwaarden van het daadwerkelijke `requestAnimationFrame()`-moment.
- Geen Bounty- of veldspecifieke uitzondering.
- Generieke visibilitylogica behouden.

## Build 8.8.7 — scrollruimte / verdere stabilisatie

- Extra aandacht voor beschikbare scrollruimte wanneer keyboard openstaat.
- Basis voor de latere historical-editdiagnoses.

### DIAG-builds rond 8.8.6/8.8.7
- Tijdelijke gele diagnosepanelen toegevoegd om:
  - viewporthoogte;
  - target;
  - footer;
  - visibilityBottom;
  - delta;
  - scrollY
  fysiek op Android te meten.
- Deze diagnosebuilds waren **geen productwijziging** en horen niet in de uiteindelijke normale buildlijn.

---

## Build 8.8.8 — keyboardcoördinator ook voor editable historical fields

- Brede uitsluiting `v27b21Historical()` uit de keyboardroute verwijderd.
- Historical mode krijgt alleen toegang wanneer daadwerkelijk een editable INPUT/TEXTAREA actief is.
- Action-amountcontext blijft expliciet alleen non-historical.
- Hiermee werd dezelfde centrale keyboardengine bruikbaar voor opgeslagen-handbewerking.

## Build 8.8.9 — expliciete Startstack-companion

- Historical Startstack-editor bevat extra controls tussen input en `Geschat / Exact`.
- `nextElementSibling` bleek daarom geen betrouwbare functionele companion.
- `Geschat / Exact` expliciet gemarkeerd als visibility-companion.
- Centrale viewportengine gebruikt:
  1. confirm;
  2. expliciete companion;
  3. siblingfallback;
  4. target.

## Build 8.8.10 — UX-pariteit historical Startstack

- Historical Startstack krijgt `inputmode="decimal"`.
- Cashgame:
  - K.
- Toernooi in chips:
  - K + M.
- Toernooi in BB:
  - geen K/M.
- Suffixknoppen hebben eigen historical commandroute en muteren alleen het geïsoleerde inputveld.
- Definitieve save blijft via bestaande transactionele apply-route.
- Live stackhandlers niet opnieuw aangekoppeld.

## Build 8.8.11 — dynamische scrollreserve cashgame

- A/B-diagnose toonde kortere historical cashgame-documentflow dan toernooi.
- Dynamische extra scrollreserve toegevoegd binnen de bestaande keyboard-paddingroute.
- Geen vaste px-pleister.
- Geen tweede scrollhandler.
- Alleen bedoeld om voldoende documenthoogte te creëren voor bestaande correctie.

### TIMING-DIAG 8.8.11
- Intermitterend gedrag bleef fysiek zichtbaar.
- Timingtrace legde vast:
  - focus;
  - VisualViewport resize/scroll;
  - ApplyViewport;
  - ResetFooter;
  - footerstyle;
  - keyboardOpen;
  - bodypadding.
- Diagnose wees uit dat goede runs soms juist met `keyboardOpen=false` en natuurlijke footerpositie werkten, terwijl foute runs handmatig `style.bottom` kregen.

## Build 8.8.12 — definitieve broncorrectie footer/keyboard

### Viewportcontract
Viewport-meta uitgebreid met:

`interactive-widget=resizes-content`

### Footer
- Handmatige reconstructie van layout-vs-visual-viewport via `footer.style.bottom = footerOffset` verwijderd.
- Fixed wizardfooter blijft normaal `bottom: 0`.
- Browser krijgt expliciet opdracht de contentviewport aan het softwarekeyboard aan te passen.

### Behouden
De centrale VisualViewport-route blijft verantwoordelijk voor:
- keyboardpadding;
- scrollreserve;
- actieve veldzichtbaarheid;
- companion-zichtbaarheid;
- scrollcorrectie.

### Fysieke acceptatie
Na de wijziging zijn zowel:
- historical cashgame Startstack;
- historical toernooi Startstack in chips

meerdere keren met geopend/gesloten Gboard getest. De footer bleef correct zichtbaar, K/K-M bleef beschikbaar en `Geschat / Exact` bleef boven het keyboard.

**Build 8.8.12 is daarmee de huidige geaccepteerde normale build.**

---

# 11. Overkoepelende technische keuzes in v2.7

## 11.1 Bronfix boven pleisterlaag
Tijdens v2.7 is expliciet als vaste werkwijze vastgelegd:

- zoek eerst de effectieve/laatste declaratie;
- herstel de oorzaak aan de bron;
- voeg geen tweede eventhandler/helper/override toe als de bestaande route geschikt is;
- kleine build = kleine diff;
- dode code alleen markeren of opruimen wanneer dat binnen scope valt.

## 11.2 Overrideketens
De codebase bevat historische functie- en CSS-overrides. Tijdens v2.7 is structureel gecontroleerd welke declaratie werkelijk effectief is voordat een fix wordt uitgevoerd.

## 11.3 Mobiel eerst
De Android/Chrome-ervaring is leidend:
- numeriek/decimaal keyboard waar mogelijk;
- actieve invoer zichtbaar;
- relevante companioncontrols zichtbaar;
- footer bereikbaar;
- geen onnodige focuswissels.

## 11.4 Historical edit blijft transactioneel
Ook na uitbreiding van de bewerkbaarheid blijft gelden:
- opgeslagen origineel blijft ongewijzigd tot definitief opslaan;
- directe inline edits muteren niet ongemerkt de live draft;
- branch/rebuild blijft gebruikt wanneer pokerinhoud downstream gevolgen kan hebben.

## 11.5 Versiebeheer
Per build moeten voortaan gezamenlijk worden gecontroleerd:
- `APP_VERSION`;
- zichtbare `VERSION`;
- `<title>`.

---

# 12. Huidige eindstatus

**Actuele ontwikkelbuild:** `Live Poker Handlog v2.7 Build 8.8.12`

Belangrijkste geaccepteerde eindresultaten:
- nieuwe v2.7 mobile-first setupflow;
- Dark + Light Mode;
- mobiele suffix-/numerieke invoer;
- vernieuwde report-/shareweergave;
- verbeterde historical editing;
- minimumraisevalidatie;
- gepolijste tafelvisual;
- Android/Gboard-compatible keyboard/footer/viewportgedrag;
- historical Startstack-edit met cash K en toernooi K/M;
- geen tijdelijke DIAG-instrumentatie in de normale build.

---

# 13. Niet als productbuild beschouwen

Tijdens het ontwikkeltraject zijn meerdere **DIAG**- en **TIMING-DIAG**-bestanden gebruikt om Android/Chrome/Gboard fysiek te meten. Deze waren bewust:
- read-only;
- tijdelijk;
- niet bedoeld als functionele release;
- niet de basis voor vervolgbuilds zodra de diagnose was afgerond.

De normale ontwikkellijn eindigt voor deze ronde daarom bij **Build 8.8.12**.
