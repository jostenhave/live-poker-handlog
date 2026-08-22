# CHANGELOG — Live Poker Handlog v2.7 — Gehele Build 2

**Periode:** Build 2 t/m Build 2.2.1  
**Basis:** geaccepteerde Live Poker Handlog v2.7 Build 1.5  
**Eindpunt:** `Live_Poker_Handlog_v2.7_Build2.2.1.html`  
**Doel:** snelle mobiele actie- en bedraginvoer in de bestaande geleide actionflow.

## Samenvatting

Build 2 heeft de bestaande actor-by-actor bettingflow inhoudelijk behouden, maar de mobiele invoer versneld en verduidelijkt.

De fase levert uiteindelijk:

- duidelijkere actuele actorstatus;
- één-tap Fold/Check/Call behouden;
- bedragzone alleen zichtbaar wanneer nodig;
- autofocus en mobiele numerieke/decimale invoer;
- K/M-snelinvoer zonder lettertoetsenbord;
- Cash: K;
- Toernooi: K/M;
- geen zichtbare B-knop, maar volledige B-parsercompatibiliteit;
- suffixbediening op relevante geld-/chipvelden;
- centrale keyboard/focus/viewport-synchronisatie;
- correcte vijfdelige wizardstatus met deelstappen;
- korte visuele bevestiging bij tafelgestuurde overgangen;
- gedeelde K/M-bediening voor SB/BB/BBA in toernooien;
- verbeterde Hero-startstacklayout;
- fixes voor lege suffixstate en stale blindtargets.

Build 2 heeft de bestaande betting-, pot-, historische en transactionele architectuur niet functioneel herontworpen.

## Actorstatus

De actionflow gebruikt voortaan consequent:

**`Actie bij: <actor>`**

Voorbeelden:

- `Actie bij: CO (Ik)`
- `Actie bij: UTG`
- `Actie bij: UTG (Henkie)` wanneer een gekoppelde villainnaam beschikbaar is.

Visueel:

- actorstatus als compact donkerblauw statuscomponent;
- actorlabel in actorblauw;
- Hero blijft als identiteit teal, maar actorstatus blijft blauw;
- terminologie gelijkgetrokken met de tafeloverlay.

## Eén-tapacties

Bewust behouden:

- Fold = één tap;
- Check = één tap;
- normale Call = één tap;
- daarna direct volgende actor;
- geen extra bevestiging;
- geen modal;
- `Vorige actie` blijft de correctieroute.

## Conditionele bedragzone

Vanaf Build 2:

- bedragzone volledig uit de normale layoutflow zolang geen bedragactie actief is;
- zone verschijnt direct bij relevante:
  - Bet;
  - Raise;
  - expliciete bedrag-All-in;
- bestaande all-insemantiek blijft leidend;
- bekende-stack- of optionele all-inroutes worden niet kunstmatig bedragplichtig gemaakt.

Voor bedragacties blijft gelden:

**actie kiezen → bedrag invoeren → Bevestigen**

## Raise-hulp

Bij Raise wordt expliciet getoond:

**`Vul het totale raisebedrag in, inclusief wat al is ingelegd.`**

Alleen bij Raise.

## Mobiel numeriek toetsenbord

Actionbedragen gebruiken:

- `inputmode="decimal"`;
- Nederlandse decimale komma blijft ondersteund;
- geen alfabetisch toetsenbord nodig voor K/M.

Bij selectie van een bedragactie:

- bedragzone opent;
- waardeveld krijgt focus;
- softwarekeyboard kan direct openen;
- waardeveld wordt in de mobiele viewport gehouden.

## Suffixbediening — functioneel ontwerp

### Cashgame

Zichtbare suffix:

- `K`

Geen:

- M;
- B.

### Toernooi

Zichtbare suffixen:

- `K`;
- `M`.

Geen zichtbare B-knop.

### B-compatibiliteit

De parser blijft B ondersteunen.

Regressievoorbeeld:

`100,25B` → `100250000000`

Bestaande opgeslagen B-waarden blijven geldig.

## Suffixgedrag

Ondersteund:

- `2` + K → `2K`;
- `2,5` + K → `2,5K`;
- `1,5` + M → `1,5M`;
- `2,5K` + M → `2,5M`;
- `2,5M` + K → `2,5K`.

Niet toegestaan:

- lege waarde + suffix;
- dubbele suffixen;
- `1KK`;
- `1KM`;
- `1,5MB`;
- niet-numerieke tekst.

Een bestaande geldige suffix wordt vervangen, niet aangeplakt.

## Fix lege suffixstate

Een belangrijk Build-2-correctiepunt was dat een leeg bedragveld via blur/formatter intern naar `0` kon normaliseren.

Dit is gecorrigeerd.

Bij leeg veld + K/M geldt:

- zichtbare input blijft `''`;
- interne state blijft exact `''`;
- geen `0`;
- geen `0K`;
- geen `0M`.

De fix is timing-onafhankelijk gemaakt en niet alleen afhankelijk van pointerdown/click.

## Suffixuitrol naar relevante invoervelden

### Toernooi

K/M op relevante chipvelden, waaronder:

- SB;
- BB;
- BBA;
- Hero startstack wanneer unit Chips;
- villain startstack wanneer unit Chips;
- actionbedrag wanneer unit Chips;
- overige relevante zichtbare chipvelden.

Geen suffix bij:

- BB-unit;
- % Pot;
- seats;
- aantallen/countvelden.

### Cash

K op relevante geld-/chipvelden, waaronder:

- editable sessieblinds;
- Hero-startstack;
- villain-startstack;
- cash actionbedrag;
- open straddles;
- open BTN-straddle;
- handmatige pot;
- overige relevante geld/chipvelden.

## Gedeelde toernooi-blindsuffix

Vanaf Build 2.2 gebruiken toernooiblinds niet langer drie afzonderlijke suffixsets.

Voor:

- SB;
- BB;
- BBA

bestaat exact **één gedeelde K/M-control**.

Definitieve plaatsing in Build 2.2.1:

- één aparte regel onder de blindrij;
- visueel uitgelijnd onder de middelste BB-kolom;
- K en M naast elkaar;
- geen B;
- geen horizontale verbreding van ieder blindveld.

### Targetgedrag

De shared control wijzigt alleen:

> het actieve of laatst gefocuste blindveld binnen dezelfde actuele blindgroep.

Binnen één blindgroep:

- focus SB → suffix op SB;
- focus BB → suffix op BB;
- focus BBA → suffix op BBA;
- terug naar BB → suffix daarna weer op BB.

Zonder eerder gekozen veld:

- K/M muteert niets;
- geen impliciete default naar SB, BB of BBA.

## Fix stale blindtarget

Build 2.2 had een major waarbij een laatst gebruikt blindtarget uit een vorige hand/config kon blijven hangen.

Build 2.2.1 maakt de bestaande targetstate contextgebonden.

Gevolg:

- target alleen geldig in dezelfde actuele blindgroep;
- nieuw hand-/configscherm erft geen oud blindtarget;
- vervangen/rerenderen van blindgroep maakt oud target ongeldig;
- zonder verse focus muteert K/M niets;
- geen tweede targetengine of shadow-state toegevoegd.

## BBA-integratie behouden

De gedeelde K/M-control verandert de bestaande BBA-logica niet.

Behouden:

- geldige BB kan BBA automatisch vullen zolang geen handmatige override bestaat;
- handmatige BBA-wijziging zet override;
- latere BB-wijziging overschrijft een handmatig aangepaste BBA niet;
- toggle uit/aan reset volgens de eerder geaccepteerde logica.

## Centrale keyboard/focus/viewportflow

De centrale regel:

> Zolang een bedragactie actief wordt ingevoerd en het numerieke keyboard relevant is, heeft het bijbehorende waardeveld focus en blijft het zichtbaar in de visual viewport.

Dit geldt voor:

- Raise;
- Bet;
- expliciete bedrag-All-in;
- unitwissels;
- suffixactie tijdens actieve bedraginvoer;
- relevante rerenders van de bedragzone.

### Android-timing

Waar beschikbaar gebruikt de flow:

- `window.visualViewport`;
- tijdelijke `resize`-listener;
- scrollcorrectie nadat de softwarekeyboardviewport werkelijk is gekrompen;
- cleanup van de listener;
- fallback voor browsers zonder `visualViewport`.

### Unitwissels

Tijdens actieve bedraginvoer blijft focus gekoppeld aan het waardeveld bij:

- Chips → BB;
- BB → % Pot;
- % Pot → Chips;
- cash-equivalenten.

### Geen focusdwang

Niet automatisch terugfocussen wanneer de gebruiker:

- keyboard bewust sluit;
- een ander veld kiest;
- bedragactie verlaat;
- historische read-onlymodus opent.

## Hero-startstacklayout

Build 2.2 heeft de Hero-startstackrij mobiel verbeterd.

- unitselector `chips` / `BB` compacter;
- `chips` blijft volledig leesbaar;
- numerieke input krijgt meer beschikbare breedte;
- K/M blijven compacte touchcontrols;
- geen horizontale page overflow op 360/375/390 px.

## Wizardhoofdstappen en deelstappen

De wizard gebruikt exact vijf hoofdstappen:

1. **Basisgegevens**
2. **Tafel & spelers**
3. **Preflop**
4. **Postflop**
5. **Hand afronden**

Nieuwe v2.7-Hero-/villainmicrostappen blijven hoofdstap 2.

### Deelstappen

Stap 1:
- Blinds & tafel

Stap 2:
- Dealerbutton kiezen
- Hero-seat kiezen
- Hero-gegevens
- Villains toevoegen
- Villain-seat kiezen
- Villain-gegevens
- Nog een villain?
- Eerste actor kiezen

Stap 3:
- Acties invoeren
- Preflop controleren

Stap 4:
- Flop · Board invoeren
- Flop · Acties invoeren
- Flop · Controleren
- Turn · Board invoeren
- Turn · Acties invoeren
- Turn · Controleren
- River · Board invoeren
- River · Acties invoeren
- River · Controleren

Stap 5:
- Uitkomst vastleggen

## Progressbar

De progressbar representeert uitsluitend de vijf hoofdstappen.

States:

- completed;
- current;
- future.

Eigenschappen:

- exact vijf segmenten;
- huidige stap visueel sterker;
- eerdere stappen voltooid;
- latere stappen gedempt;
- microsteps wijzigen alleen de deelstaptekst.

Build 2.2 heeft spacing/typografie licht gepolijst zodat titel, deelstap en progressbar als één statusblok lezen.

## Tafelgestuurde overgangsfeedback

Dealer-, Hero-, villainseat- en first-actorselecties kregen korte lokale confirmationfeedback.

Na geldige seatselectie:

1. seat krijgt kort confirmation-state;
2. relevante marker verschijnt;
3. circa 150–250 ms visuele feedback;
4. daarna bestaande transition;
5. volgende deelstap zichtbaar.

Geen toast en geen parallelle transitionengine.

## Historische en transactionele integriteit

Alle Build-2-invoercontrols respecteren de Build-1.5 historische architectuur.

In historical read-only:

- actioncontrols muteren niet;
- suffixknoppen worden niet actief gerenderd;
- geen autofocus;
- geen keyboardtrigger;
- geen autoscroll;
- `Bewerken vanaf deze stap` blijft de enige bewerkroute;
- alleen navigeren muteert working copy niet.

Bij opgeslagen hand:

- Build-2-bedragwijzigingen gebeuren alleen in de transactionele working copy;
- discard houdt origineel intact;
- save commit naar dezelfde hand-ID;
- geen duplicaatrecord.

## Betting- en potregressie

Build 2 heeft de bestaande bettingstate niet functioneel herontworpen.

Behouden:

- legale actieknoppen;
- Raise/Bet/Call/Fold/Check;
- 3-bet;
- 4-bet;
- all-in;
- short all-in;
- raise rights;
- all-in speler komt niet opnieuw aan zet;
- postflop actorflow;
- uncalled raise return.

Belangrijke regressiefixtures:

- raise €6 → 3-bet €20 → fold = **€13**;
- raise €6 → call → 3-bet €20 → folds = **€19**;
- cashgame BB €2, action 4 BB = **€8** base currency.

## Technisch bewust behouden

Tijdens Build 2 t/m 2.2.1 bleven functioneel onaangeroerd:

- `analyze()` / potengine;
- `wzReplayStreet()`;
- `wzLegalActions()`;
- bettingsemantiek van `wzApply()`;
- minimumraisevalidatie;
- side pots;
- RC8-seatgeometry;
- seatmapping;
- card picker;
- report;
- definitieve Light Mode;
- historical D1/D2/D2.6-architectuur;
- transactionele saved-hand editor;
- PWA/service-workerarchitectuur;
- schema 12.

Minimumraisevalidatie blijft bewust gepland voor een latere rest-/techniekbuild.

## Eindstatus Build 2

**Huidig eindpunt van de Build-2-fase: v2.7 Build 2.2.1.**

De functionele fase bevat nu het mobiele action-/bedraginvoerfundament met:

- conditionele bedragzone;
- actorstatus;
- één-tap niet-bedragacties;
- K/M-snelinvoer;
- gedeelde toernooiblindsuffix;
- Android-focus/viewportflow;
- gecorrigeerde wizardstatus;
- behoud van historische en pokertechnische kernlogica.

Definitieve acceptatie van Build 2.2.1 blijft afhankelijk van de voorgeschreven fysieke Android/Chrome-praktijkvalidatie.
