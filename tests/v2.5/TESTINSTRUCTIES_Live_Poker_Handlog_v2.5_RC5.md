# Testinstructies — Live Poker Handlog v2.5 RC5

## 1. Testopdracht

Voer een volledige, systematische acceptatie- en regressietest uit op de pot-engine van:

`Live_Poker_Handlog_v2.5_RC5.html`

Test zowel:

- cashgames;
- Regular MTT;
- PKO;
- KO;
- Mystery Bounty.

Test toernooien zowel zonder ante als met big blind ante. Wijzig de broncode niet.

## 2. Verplichte testmethoden

Maak strikt onderscheid tussen:

1. **statische bronanalyse**;
2. **geïsoleerde JavaScript-runtimetests**;
3. **interactieve browsertests**;
4. **niet-uitgevoerde tests**.

Een testcase is alleen geslaagd wanneer het werkelijke resultaat aantoonbaar is vastgesteld.

Gebruik waar mogelijk een geautomatiseerde scenariomatrix die `analyze()` rechtstreeks aanroept. Bereken de verwachte pot onafhankelijk van de productcode.

## 3. Verplichte rapportage per testcase

Leg vast:

- testcase-ID;
- spelvorm;
- toernooivariant;
- tafelgrootte;
- blinds;
- ante;
- straddle(s);
- posities;
- startstacks;
- volledige actiereeks;
- forced contribution per speler;
- vrijwillige bijdrage per speler;
- hoogste gematchte niveau;
- teruggegeven bedrag;
- handmatig berekende verwachte pot;
- werkelijke `finalPot`;
- `heroInvested`;
- `potStart` per street;
- `callAllIn`;
- `unknown`;
- interface-preview;
- uitgebreid rapport;
- verkort rapport;
- status;
- reproduceerbaarheid;
- ernst en hersteladvies bij afkeur.

## 4. Kernregel die bewezen moet worden

Per street moet de engine onderscheid maken tussen:

- forced contributions;
- totale streetbijdrage;
- vrijwillig bereikt actieniveau;
- eigen bijdrage van de laatste aggressor vóór diens laatste raise;
- hoogste vrijwillig bereikte niveau van een andere speler;
- ongecalld overschot.

Forced contributions tellen mee in de pot, maar verhogen zonder vrijwillige actie het matchniveau niet.

## 5. Cashgamebasis — €1/€2

### 5.1 Startpot en openraises

| ID | Scenario | Verwachte pot |
|---|---|---:|
| CG-01 | Alleen SB en BB | €3 |
| CG-02 | BTN raise naar €6, iedereen foldt | €3 |
| CG-03 | CO raise naar €6, iedereen foldt | €3 |
| CG-04 | SB raise naar €6, BB foldt | €3 |
| CG-05 | BB raise naar €6, iedereen foldt | €3 |
| CG-06 | BTN raise naar €6, BB callt | €13 |
| CG-07 | BTN raise naar €6, SB callt, BB foldt | €14 |
| CG-08 | BTN raise naar €6, SB en BB callen | €18 |
| CG-09 | BTN raise naar €6, één niet-blindspeler callt | €15 |
| CG-10 | BTN raise naar €6, twee niet-blindspelers callen | €21 |

### 5.2 3-bets en squeezes

| ID | Scenario | Verwachte pot |
|---|---|---:|
| CG-11 | BTN raise €6, BB 3-bet €20, BTN fold | €13 |
| CG-12 | BTN raise €6, CO call €6, BB squeeze €20, beiden folden | €19 |
| CG-13 | BTN raise €6, BB 3-bet €20, BTN call | €41 |
| CG-14 | BTN raise €6, SB call €6, BB 3-bet €20, BTN fold, SB call | €46 |
| CG-15 | CO raise €6, BTN call €6, BB 3-bet €20, CO call, BTN fold | €47 |
| CG-16 | SB raise €6, BB 3-bet €20, SB fold | €13 |
| CG-17 | BB raise €6, BTN 3-bet €20, BB fold | €13 |

### 5.3 4-bets en hoger

| ID | Scenario | Verwachte pot |
|---|---|---:|
| CG-18 | BTN raise €6, BB 3-bet €20, BTN 4-bet €50, BB fold | €41 |
| CG-19 | BTN raise €6, BB 3-bet €20, BTN 4-bet €50, BB call | €101 |
| CG-20 | CO raise €6, BTN call €6, BB 3-bet €20, CO 4-bet €50, BTN en BB fold | €77 |
| CG-21 | BTN raise €6, BB 3-bet €20, BTN 4-bet €50, BB 5-bet €120, BTN fold | €101 |
| CG-22 | BTN raise €6, BB 3-bet €20, BTN 4-bet €50, BB 5-bet €120, BTN call | €241 |

Controleer alle scenario’s ook wanneer Hero en Villain van rol wisselen.

## 6. Cashgame met straddles

Gebruik €1/€2.

### 6.1 Reguliere straddle €4

| ID | Scenario | Verwachte pot |
|---|---|---:|
| CG-S01 | Alleen SB, BB en straddle | €7 |
| CG-S02 | Straddler raise naar €12, iedereen foldt | €7 |
| CG-S03 | BTN raise naar €12, straddler foldt | €7 |
| CG-S04 | BTN raise €12, straddler 3-bet €40, BTN fold | €27 |
| CG-S05 | BTN raise €12, straddler 3-bet €40, BTN call | €81 |

### 6.2 Re-straddle

Test minimaal:

- €1/€2/€4/€8 als startpot;
- openraise door eerste straddler;
- openraise door re-straddler;
- 3-bet en fold;
- 4-bet en fold;
- één en meerdere calls;
- short all-in.

### 6.3 Button straddle

Herhaal de volledige straddlematrix met een BTN-straddle van €4.

## 7. Heads-up cashgame

Gebruik €1/€2.

Test:

- walk;
- BTN/SB raise, BB fold;
- BTN/SB raise, BB call;
- BB 3-bet, BTN/SB fold;
- 4-bet en fold;
- 5-bet en fold;
- all-in en call;
- short all-in.

Controleer specifiek dat de geposte SB van BTN/SB geen openraise matcht, maar wel in de pot blijft.

## 8. Toernooivarianten

Voer de onderstaande volledige matrix afzonderlijk uit voor:

1. Regular MTT;
2. PKO;
3. KO;
4. Mystery Bounty.

De potuitkomst moet bij gelijke pokeracties identiek zijn. Bountyvelden mogen de pot niet beïnvloeden.

## 9. Toernooi zonder ante — 500/1.000

### 9.1 Basis

| ID | Scenario | Verwachte pot |
|---|---|---:|
| MTT-01 | Alleen blinds | 1,5 bb |
| MTT-02 | Raise 2,5 bb, iedereen foldt | 1,5 bb |
| MTT-03 | Raise 2,5 bb, BB callt | 5,5 bb |

### 9.2 3-bets en squeezes

| ID | Scenario | Verwachte pot |
|---|---|---:|
| MTT-04 | Raise 2,5 bb, BB 3-bet 8 bb, raiser foldt | 5,5 bb |
| MTT-05 | Raise 2,5 bb, call 2,5 bb, squeeze 8 bb, beiden folden | 8 bb |
| MTT-06 | Raise 2,5 bb, 3-bet 8 bb, raiser callt | 17,5 bb |
| MTT-07 | Raise 2,5 bb, call, 3-bet 8 bb, raiser callt, caller foldt | 19 bb |

### 9.3 4-bets en 5-bets

| ID | Scenario | Verwachte pot |
|---|---|---:|
| MTT-08 | Raise 2,5 bb, 3-bet 8 bb, 4-bet 20 bb, fold | 17,5 bb |
| MTT-09 | Raise 2,5 bb, 3-bet 8 bb, 4-bet 20 bb, call | 41,5 bb |
| MTT-10 | Raise 2,5 bb, 3-bet 8 bb, 4-bet 20 bb, 5-bet 45 bb, fold | 41,5 bb |
| MTT-11 | Raise 2,5 bb, 3-bet 8 bb, 4-bet 20 bb, 5-bet 45 bb, call | 91,5 bb |

### 9.4 Limp- en multiwayscenario’s

| ID | Scenario | Verwachte pot |
|---|---|---:|
| MTT-12 | Limp 1 bb, raise 4 bb, limper en BB folden | 3,5 bb |
| MTT-13 | Raise 2,5 bb, twee calls, squeeze 9 bb, iedereen foldt | 10,5 bb |
| MTT-14 | Raise 2,5 bb, twee calls, squeeze 9 bb, één caller callt | 21,5 bb |

## 10. Toernooi met big blind ante — 500/1.000/1.000

Herhaal MTT-01 t/m MTT-14 met 1 bb BBA.

Voor iedere testcase geldt:

> verwachte pot met BBA = dezelfde pot zonder ante + 1 bb.

Verplichte controlevoorbeelden:

| ID | Scenario | Verwachte pot |
|---|---|---:|
| BBA-01 | Alleen blinds + BBA | 2,5 bb |
| BBA-02 | Raise 2,5 bb, iedereen foldt | 2,5 bb |
| BBA-03 | Raise 2,5 bb, BB 3-bet 8 bb, fold | 6,5 bb |
| BBA-04 | Raise, call, squeeze 8 bb, folds | 9 bb |
| BBA-05 | Raise, 3-bet, 4-bet 20 bb, fold | 18,5 bb |
| BBA-06 | Raise, 3-bet, 4-bet, 5-bet 45 bb, fold | 42,5 bb |

Controleer dat de BBA:

- volledig in de pot blijft;
- geen inzet matcht;
- geen vrijwillig actieniveau verhoogt;
- niet dubbel wordt geteld wanneer de BB later callt of raiset.

## 11. Invoer in chips en big blinds

Voer representatieve scenario’s dubbel uit:

- acties in bb;
- acties in chips.

Voor 500/1.000 moeten bijvoorbeeld gelijk zijn:

- 2,5 bb en 2.500 chips;
- 8 bb en 8.000 chips;
- 20 bb en 20.000 chips;
- 45 bb en 45.000 chips.

Test ook invoer als:

- `2,5`;
- `1,5k`;
- `8k`;
- `20k`;
- `45k`;
- `1.000`.

## 12. All-ins en stackcaps

Test voor cash en alle vier toernooivarianten:

1. openjam, iedereen foldt;
2. short all-in onder een bestaande raise;
3. grotere all-in;
4. short all-in call;
5. meerdere all-ins met verschillende stacks;
6. ongecalld overschot boven de grootste call;
7. all-in vanuit SB;
8. all-in vanuit BB;
9. all-in vanuit straddle;
10. onbekende all-inomvang.

Controleer:

- stackbegrenzing;
- `callAllIn`;
- `unknown`;
- `potReliable`;
- rapportwaarschuwing;
- geen betrouwbare potweergave wanneer de omvang onbekend is.

Leg expliciet vast wanneer een scenario volledige side-potverdeling vereist en buiten het huidige model valt.

## 13. Postflop

Test op flop, turn en river voor cash en toernooi:

- bet, iedereen foldt;
- bet, call;
- bet, raise, fold;
- bet, raise, call;
- bet, raise, re-raise, fold;
- bet, raise, re-raise, call;
- all-in en fold;
- all-in en call;
- percentage-potbet;
- meerdere streets.

Controleer `potStart` voor flop, turn en river.

## 14. Expliciete en impliciete folds

Herhaal minimaal de kernscenario’s:

- met alle folds expliciet ingevoerd;
- met folds weggelaten waar de app deze impliciet verwerkt.

Verwacht:

- dezelfde eindpot;
- eerdere bijdragen blijven meetellen;
- correcte waarschuwing bij impliciete folds.

## 15. Rapportageconsistentie

Controleer per kernscenario:

- preview “Eindpot berekend”;
- uitgebreid verslag;
- verkort verslag;
- resultaatregel;
- showdownregel;
- Hero-investering bij fold;
- handmatige potoverride;
- afbeeldingstekst voor zover uitvoerbaar.

Dezelfde pot moet overal identiek zijn.

## 16. Regressie buiten de pot-engine

Voer minimaal smoke-tests uit op:

- appnaam en versie;
- normale opstart;
- sessie maken;
- hand opslaan en bewerken;
- spelersbibliotheek;
- villainkoppeling;
- export;
- importvalidatie;
- veiligheidskopie;
- herstel;
- Emergency Mode;
- turn-/river-validatie;
- kopiëren;
- WhatsApp;
- afbeelding genereren.

## 17. Ernstclassificatie

- **Kritiek:** verkeerde pot in normale openraise-, 3-bet-, 4-bet- of toernooilijn; gegevensverlies.
- **Hoog:** fout bij straddles, heads-up, all-ins, BBA of een afzonderlijke toernooivariant.
- **Middel:** beperkt grensgeval of inconsistente rapportage.
- **Laag:** visuele of tekstuele afwijking zonder rekenimpact.

## 18. Acceptatiecriteria

RC5 krijgt alleen **GO** wanneer:

- alle historische cashgame- en toernooifouten exact zijn hersteld;
- alle verplichte cashgamescenario’s slagen;
- alle toernooiscenario’s afzonderlijk slagen in Regular, PKO, KO en Mystery Bounty;
- resultaten in chips en bb gelijkwaardig zijn;
- BBA nooit een raise matcht;
- straddles zonder actie geen raise matchen;
- geen kritieke of hoge potfout wordt gevonden;
- preview en rapport consistent zijn;
- niet-uitgevoerde tests expliciet worden vermeld.

## 19. Op te leveren rapport

Lever een downloadbaar Markdown-rapport met:

1. managementsamenvatting;
2. testomgeving;
3. testmethode;
4. volledige scenariomatrix;
5. resultaten per spelvorm;
6. resultaten per toernooivariant;
7. geslaagde tests;
8. afgekeurde tests;
9. niet-uitgevoerde tests;
10. bevindingen met reproduceerstappen;
11. technische analyse;
12. regressiebeoordeling;
13. risico’s en randvoorwaarden;
14. GO / GO onder voorwaarden / NO GO.
