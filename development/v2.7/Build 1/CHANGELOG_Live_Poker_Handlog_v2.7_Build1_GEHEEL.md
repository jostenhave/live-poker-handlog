# CHANGELOG — Live Poker Handlog v2.7 — Gehele Build 1

**Periode:** Build 1 t/m Build 1.5  
**Eindbasis:** `Live_Poker_Handlog_v2.7_Build1.5.html`  
**Functionele uitgangsbasis:** definitieve Live Poker Handlog v2.6  
**Doel:** nieuw mobile-first UX-/UI-fundament en nieuwe setupflow, met behoud van de bestaande pokerkern.

## Samenvatting

Build 1 heeft de v2.7-gebruikerservaring vanaf sessiestart en handsetup opnieuw ingericht. De bestaande betting-, pot-, opslag- en tafelgeometrie is als functionele basis behouden.

De fase levert uiteindelijk:

- nieuw Dark Mode-georiënteerd visueel fundament;
- technische Dark/Light-themaondersteuning;
- vernieuwde sessiestart;
- nieuwe handsetup via dealer → Hero → villain(s) → eerste vrijwillige actor;
- cumulatieve tafelcontext;
- actieve/inactieve fysieke seats;
- herwerkte blind-, straddle- en BBA-invoer;
- duidelijke Hero-/actorsemantiek;
- herstel van historische terug-/vooruitnavigatie;
- volledige aansluiting van de nieuwe v2.7-setupstappen op de transactionele opgeslagen-handbewerking;
- correcte full-straddle first-actorfallback naar SB of BB.

Build 1.5 vormt de definitieve Build-1-basis voor Build 2.

## UX- en themafundament

### Nieuw

- Dark Mode als primaire visuele basis.
- Centrale themavariabelen voor appcanvas, surfaces, controls, tekst, borders en semantische accentkleuren.
- Technische ondersteuning voor Dark en Light.
- Dark als standaard.
- Light technisch selecteerbaar, maar nog niet definitief gepolijst.
- Mobile-first ontwerp voor portrait smartphones.
- Behoud van royale touch targets en de bestaande tafelafmetingen.

### Visuele semantiek

- primaire interactie / actuele actor: blauw;
- Hero-identiteit: teal;
- SB: geel/goud;
- BB: oranje;
- dealer: goud;
- danger/destructief: rood;
- inactive/disabled: gedempt.

Latere verfijningen binnen Build 1:

- navy/blauwe interface in plaats van de oudere groen-dominante algemene UI;
- Hero kreeg een eigen teal identiteit;
- actuele actor bleef bewust blauw;
- read-only context kreeg een duidelijk niet-invoerachtig uiterlijk;
- label- en sectietekst kregen hogere contrastwaarden;
- tafelvilt werd visueel rustiger;
- actoroverlay werd compacter.

## Sessiestart

### Algemeen

- Nieuwe primaire keuze tussen Cashgame en Toernooi.
- Type-afhankelijke vervolgvelden.
- `Naam/omschrijving` bleef behouden.
- Tafelmodel ingericht voor 6, 8, 9 en 10 seats.
- Sessiescherm verduidelijkt met:
  `Seat = fysieke stoel. Positie kies je per hand.`

### Cashgame

Sessiestart bevat:

- SB;
- BB;
- reguliere straddle;
- eerste straddle open/vast;
- vervolgstraddles open/vast;
- BTN-straddle;
- open of vaste BTN-straddle.

Aangescherpt tijdens de Build-1-correctierondes:

- SB/BB worden niet stilzwijgend met ongewenste defaults gevuld wanneer gebruiker ze zelf moet invoeren;
- handregistratie erft cashgame-SB/BB uit de sessie;
- cashgame-blinds worden tijdens de hand als read-only context getoond;
- straddlehiërarchie is compacter gemaakt;
- vaste straddles worden afgeleid in plaats van opnieuw gevraagd;
- open straddles blijven invoerbaar;
- `firstStraddleFixed` is zonder schemawijziging geïntegreerd.

Voorbeelden:

- vaste eerste straddle €5 → €5 / €10 / €20;
- open eerste straddle €6 met vaste vervolgstraddles → €6 / €12 / €24.

### Toernooi

- Toernooivarianten:
  - Regular;
  - KO;
  - PKO;
  - Mystery.
- BBA blijft hand-specifiek.
- Nieuwe toernooihand start met lege SB/BB/BBA-bedragen.

## Nieuwe handsetupflow

De uiteindelijke Build-1-flow is:

1. Basisgegevens / blinds
2. Dealerbutton kiezen
3. Hero-seat kiezen
4. Hero-info
5. Villain(s) toevoegen?
6. Villain-seat kiezen
7. Villain-info
8. Nog een villain?
9. Eerste vrijwillige actor
10. Bestaande actionflow

### Dealer

- Dealer wordt rechtstreeks op de tafel gekozen.
- Posities worden automatisch uit dealer + seatmapping afgeleid.
- Automatische overgang naar Hero.
- Geen herbouw van de bestaande RC8-geometrie.

### Hero

- Hero-seat wordt rechtstreeks via de tafel gekozen.
- Hero-positie wordt afgeleid; geen dubbele handmatige positiekeuze.
- Hero-info is een eigen deelstap.
- Hero-startstack en kaarten blijven onderdeel van de setup.
- Hero-identiteit wordt visueel teal weergegeven.

### Villains

- Expliciete Ja/Nee-vraag.
- Vrije seat wordt via de tafel gekozen.
- Hero-seat en reeds gebruikte villainseats zijn niet opnieuw selecteerbaar.
- Villainpositie wordt automatisch uit de seat afgeleid.
- Meerdere villains ondersteund.
- Volledige player-libraryfunctionaliteit behouden:
  - bestaande sessiespeler koppelen;
  - speler uit bibliotheek gebruiken;
  - nieuwe/onbekende speler;
  - naam;
  - startstack;
  - kaarten;
  - notitie;
  - nieuwe speler aan bibliotheek toevoegen.
- Villainnamen worden opnieuw gebruikt in plaats van dubbel ingevoerd.

### Eerste vrijwillige actor

- Tafel toont alle tot dan bekende context.
- Alleen pokertechnisch relevante actieve seats zijn selecteerbaar.
- Eén seat-tap levert één transition.
- Aansluiting op bestaande preflop-actionflow.

## Tafelcontext en fysieke seats

Build 1 hergebruikt de bestaande RC8-racetrackgeometry.

Behouden:

- tafelvorm;
- dealeranker;
- seatpositionering;
- touch targets;
- 6/8/9/10-handed mapping;
- chip-/blindmarkerlogica.

Toegevoegd/verfijnd:

- cumulatieve zichtbaarheid van dealer, posities, Hero, villains, blinds, BBA en straddles;
- actieve versus inactieve fysieke seats;
- inactive seats blijven zichtbaar maar zijn niet selecteerbaar;
- SB n.v.t. wordt als hand-specifieke toestand ondersteund;
- selectie- en actorstates zijn beter herkenbaar.

De 6-handed canonieke mapping met LJ blijft behouden.

## Blind- en BBA-gedrag

### Cashgame

- Blinds zijn sessiecontext.
- Tijdens handsetup read-only weergegeven.
- `SB n.v.t.` blijft hand-specifiek.
- Bestaande cash betting-/potconversie blijft behouden.

### Toernooi

Nieuwe hand:

- SB leeg;
- BB leeg;
- BBA-bedrag leeg;
- bestaande BBA-actiefroute behouden.

BBA-regels:

#### BBA uit

- `bbaEnabled = false`;
- BBA-waarde leeg;
- veld disabled;
- geen BBA-marker;
- geen bijdrage aan berekeningen;
- handmatige override-status reset.

#### BBA aan

- bij geldige BB wordt BBA direct uit BB gevuld;
- als BB nog leeg/ongeldig is, blijft BBA leeg;
- eerste geldige BB vult BBA automatisch.

#### Handmatige override

- handmatige BBA-wijziging markeert een override;
- latere BB-wijziging overschrijft die BBA niet;
- BBA uitzetten wist bedrag en override;
- opnieuw aanzetten gebruikt de actuele BB en laat geen oude BBA terugkomen.

Actieve BBA vereist minimaal een geldige waarde van 1.

## Historische navigatie en opgeslagen-handbewerking

### Historische read-onlynavigatie

De nieuwe v2.7-setupstappen zijn aangesloten op het bestaande checkpoint-/trailmodel.

Ondersteunde setupcheckpoints omvatten:

- Basisgegevens;
- dealer;
- Hero;
- Hero-info;
- villainbeslissing;
- villain-seat per villain;
- villain-info per villain;
- nog-een-villain per villain;
- eerste actor.

De oude samengestelde `players`-stap is alleen compatibility-only gebleven en is geen live v2.7-stap.

Bij terugkijken:

- `Eerdere stap bekijken`;
- `← Vorige stap`;
- `Volgende stap →`;
- `Bewerken vanaf deze stap`;
- geen `Automatisch verder`;
- read-only inhoud;
- alleen navigeren muteert handstate niet.

### Transactionele opgeslagen-handbewerking

Build 1.5 hergebruikt de volwassen v2.6 D1/D2/D2.6-architectuur:

- `UI.editTx`;
- geïsoleerde working copy;
- checkpointtrail;
- historische guards;
- gecontroleerde branch/rebuild;
- discard/verwerpen;
- commit pas bij expliciet opslaan.

Daarmee geldt:

- origineel opgeslagen handrecord blijft tijdens bewerken intact;
- verwerpen verwijdert alleen de working copy;
- opslaan behoudt dezelfde hand-ID;
- geen duplicaatrecord;
- eerdere onafhankelijke state blijft bij branch-edit behouden;
- alleen logisch afhankelijke downstreamstate wordt opnieuw opgebouwd.

## Full-straddle-edgecase

De bestaande first-actorlogica blijft bron van waarheid.

Bij een volledige reguliere straddleketen:

- geen parallelle actorberekening;
- `wzEligibleFirstActors()` blijft leidend;
- SB aanwezig → actionflow start direct bij SB;
- `SB n.v.t.` → actionflow start direct bij BB;
- aparte first-actorselectie wordt overgeslagen wanneer alleen de fallbackactor resteert;
- straddlers blijven forced contributors;
- geen kunstmatige folds;
- first-actorcheckpoint blijft historisch bruikbaar.

## Technische en regressieve borging

Gecontroleerd tijdens de Build-1-reeks:

- JavaScript syntax;
- één seat-tap = één transition;
- historische deep equality;
- opgeslagen working-copy-isolatie;
- discard;
- save met behoud hand-ID;
- Hero-/dealerbranch;
- first-actorbranch;
- BBA-autofill/override/reset;
- 6-handed LJ-mapping;
- K/M/B-parsercompatibiliteit;
- cash-potfixtures.

Belangrijke fixtures:

- raise €6 → 3-bet €20 → fold = **€13**;
- raise €6 → call → 3-bet €20 → folds = **€19**;
- `100,25B` → **100250000000**.

## Bewust niet gewijzigd in Build 1

- potengine;
- centrale betting-/actionengine;
- minimumraisevalidatie;
- side pots;
- card picker redesign;
- card rendering redesign;
- report redesign;
- definitieve Light Mode;
- algemene personalisatie/settings;
- PWA-updatearchitectuur;
- service-workerarchitectuur;
- opslagschema 12;
- RC8-seatgeometry.

## Eindstatus Build 1

**Definitieve Build-1-basis: v2.7 Build 1.5.**

Build 1 levert daarmee het geaccepteerde v2.7 UX-/setupfundament waarop Build 2 de mobiele actie- en bedraginvoer verder heeft uitgebouwd.
