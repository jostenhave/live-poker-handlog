# AI-testinstructies – Live Poker Handlog v2.6 RC4

## Doel

Voer een volledige functionele, regressie- en technische acceptatietest uit op:

- `Live_Poker_Handlog_v2.6_RC4.html`
- `CHANGELOG_Live_Poker_Handlog_v2.6_RC4.md`

Gebruik RC3 alleen als referentie wanneer dat nodig is om een wijziging te vergelijken. Wijzig geen code.

## Werkwijze

Maak strikt onderscheid tussen:

1. **Statische analyse** – HTML, CSS, JavaScript, state-management, opslag en berekeningen.
2. **Runtime-tests** – interacties die daadwerkelijk in een browser of vergelijkbare runtime zijn uitgevoerd.
3. **Niet-uitvoerbare handmatige tests** – alleen benoemen wanneer ze niet zelfstandig betrouwbaar uitvoerbaar zijn.

Classificeer iedere bevinding als:

- Kritiek
- Hoog
- Middel
- Laag

Vermeld per bevinding:

- testcase;
- verwacht resultaat;
- werkelijk resultaat;
- reproduceerbaarheid;
- impact;
- advies.

## Verplichte testgebieden

### 1. Sessie-instellingen en tafelgrootte

Test voor zowel cashgame als toernooi:

- opties 10-, 9-, 8- en 6-handed;
- benaming `Standaard tafelgrootte`;
- gekozen sessiewaarde wordt default bij een nieuwe hand;
- per hand wijzigen blijft mogelijk;
- `Mijn seat` is niet meer aanwezig op sessieniveau.

### 2. Tafelarchitectuur

Test 10-, 9-, 8- en 6-handed afzonderlijk:

- exact correct aantal seats;
- Seat 1 begint linksboven van de fysieke dealer;
- nummering loopt met de klok mee;
- buttonselectie berekent alle posities correct;
- BTN, SB, BB, Ante en eventuele straddles staan bij de juiste seat;
- geen overlap of afsnijding, met extra aandacht voor 10-handed;
- dealerlabel wordt letter voor letter verticaal getoond;
- Hero-kleur heeft voorrang op blind-/positieaccenten;
- `SB n.v.t.` verwijdert direct het SB-label en grijst de seat uit.

### 3. BBA

Toernooi, blinds 500/1.000:

- BBA aan → ante wordt automatisch 1.000;
- BB wijzigen naar 1.500 → ante wordt automatisch 1.500;
- anteveld is bij actieve BBA niet handmatig wijzigbaar;
- BBA uit → gedrag blijft logisch en valide.

### 4. Hero en villains

- Hero-seat verplicht;
- beide Hero-holecards verplicht;
- Hero-startstack verplicht;
- Exact/Geschat werkt visueel;
- villainstack mag leeg blijven;
- lege villainstack wordt niet als nul geïnterpreteerd;
- villain kan na plaatsing naar een andere vrije seat worden verplaatst;
- Hero-seat en bezette villainseats zijn niet dubbel toewijsbaar;
- naam van Hero (`Ik`) en villain wordt op de tafel getoond.

### 5. Impliciete folds en preflopqueue

9-handed, Hero BTN:

- kies BTN als eerste vrijwillige actor;
- UTG t/m CO worden impliciet gefold;
- deze spelers komen niet terug in de actiequeue;
- BTN raise 3 BB, SB fold, BB call;
- daarna volgt direct het preflopcontrolescherm;
- samenvatting toont automatische folds apart;
- impliciete folds staan niet als gewone acties in het definitieve report.

Herhaal met:

- Hero niet als eerste actor;
- SB n.v.t.;
- cashgame met reguliere straddle;
- volledige straddleketen waarbij SB of BB automatisch eerste actor wordt.

### 6. Actiekaart en betting state

Test minimaal:

- eerste vrijwillige actie: `Vorige actie` zichtbaar maar disabled;
- vanaf de volgende actie: `Vorige actie` actief;
- Fold/Check/Call springen direct door;
- Bet/Raise/All-in vereisen waarde-invoer en bevestiging;
- waardetype Chips/BB/% Pot of €/BB/% Pot correct beschikbaar;
- numeriek toetsenbord mag de actiekaart niet onbruikbaar maken;
- onbekende villainstack laat geldige Fold/Call/Raise/All-in-acties beschikbaar;
- minimumraise, short all-in, raise-rechten en all-inqueue blijven correct.

### 7. Toon tafel-overlay

- knop `👁 Toon tafel` staat op iedere actiekaart;
- overlay toont actuele seats, namen, Hero, BTN, SB, BB, ante, straddles en huidige actor;
- gefolde spelers zijn uitgegrijsd;
- overlay is niet interactief;
- sluiten keert terug naar exact dezelfde actiekaart;
- geselecteerde actie, waardetype en waarde blijven behouden.

### 8. Postflopflow

Scenario: BTN raise, SB fold, BB call.

Op flop, turn en river:

- alleen BB en BTN blijven actief;
- volgorde is BB → BTN;
- gefolde spelers keren niet terug;
- check/check sluit de straat;
- bet/call sluit de straat;
- bet/fold leidt correct tot einde hand;
- all-inspelers keren niet terug in latere queues;
- pot blijft correct.

### 9. Straatcontrole en correcties

- straatnaam voluit in interface;
- kaartnotatie met gekleurde symbolen;
- Hero als `Ik (positie)`;
- pot correct;
- compacte actielijst;
- Bewerken opent de reguliere actiekaart met huidig actie-, type- en waardedata;
- kleine waardewijziging werkt;
- structurele wijziging herstart vanaf het correcte punt;
- `Straat opnieuw invoeren` wist alleen de gekozen straat en start correct opnieuw.

### 10. Navigatie

- `Vorige stap` gaat één wizardstap terug zonder gegevensverlies;
- `Volgende stap` navigeert weer vooruit binnen reeds bereikte geldige stappen;
- eerdere correctie van holecards of startstack behoudt geldige latere data;
- structurele wijziging van tafelgrootte, button of Hero-seat maakt afhankelijke vervolgstappen niet stilzwijgend ongeldig;
- ✕ sluit de wizard en bewaart een concept.

### 11. Conceptregistratie

- nieuwe hand verschijnt direct als Concept in de sessie;
- tussentijdse wijzigingen worden automatisch opgeslagen;
- sluiten via ✕ bewaart de hand;
- browser sluiten/heropenen bewaart het concept;
- concept hervatten opent de juiste stap met alle data intact;
- definitief afronden verandert status naar Definitief;
- definitieve hand wordt niet dubbel opgeslagen;
- verwijderen en opnieuw openen geven geen corruptie.

### 12. Resultaat en report

Test:

- Hero fold → resultaat automatisch Fold;
- alle villains folden → Hero wint automatisch;
- showdown met één winnaar;
- chop met meerdere winnaars;
- alleen actieve spelers selecteerbaar;
- report gebruikt `Ik (positie)`;
- report gebruikt PF als afkorting;
- kaarten hebben gekleurde tekstsymbolen;
- pot en acties zijn correct.

### 13. Potengine-regressie

Herhaal minimaal de kritieke eerdere scenario’s voor cash en toernooi:

- raise naar 6, 3-bet naar 20, fold;
- raise naar 6, call, 3-bet naar 20, folds;
- raise naar 6, 3-bet naar 20, 4-bet naar 50, fold;
- blinds en BBA blijven volledig in de pot;
- ongecallde inzet wordt correct teruggegeven;
- calls worden door bekende stacks begrensd;
- onbekende stacks veroorzaken geen kunstmatige nulstack.

### 14. Regressie overige functies

Controleer statisch en waar mogelijk runtime:

- sessies;
- spelersbeheer en spelersbibliotheek;
- hand openen/bewerken;
- kaartduplicaatpreventie;
- k-notatie;
- import/export en veiligheidskopie;
- recovery/emergency mode;
- bestaande v2.5-data migreren zonder verlies.

Laat handmatige clipboard-, WhatsApp-, native-share- en afbeelding-deel/downloadtests achterwege, tenzij de onderliggende code aantoonbaar door RC4 is geraakt.

## Op te leveren rapport

Lever een downloadbaar Markdown-rapport met:

1. managementsamenvatting;
2. testomgeving en methode;
3. geslaagde tests;
4. afgekeurde tests;
5. niet-uitgevoerde tests;
6. bevindingen per ernst;
7. technische risico’s;
8. regressiebeoordeling;
9. releaseadvies: **GO / GO onder voorwaarden / NO GO**.
