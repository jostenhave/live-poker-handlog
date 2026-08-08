# Testrapport – Live Poker Handlog v2.6 RC6

**Testobject:** `Live_Poker_Handlog_v2.6_RC6.html`  
**Changelog:** `CHANGELOG_Live_Poker_Handlog_v2.6_RC6.md`  
**Testinstructies:** `TESTINSTRUCTIES_AI_Live_Poker_Handlog_v2.6_RC6.md`  
**Testdatum:** 30 juli 2026  
**Eindadvies:** **NO GO**

---

## 1. Managementsamenvatting

RC6 bevat aantoonbare verbeteringen in de centrale preflop- en postflopstatus, reguliere en BTN-straddles, de onderste wizardnavigatie, conceptkeuzes, chipnotatie en potregressies. De app start zonder syntax- of startupfout. Cashgamehanden met reeds geldige sessieblinds kunnen van Stap 1 naar Stap 2.

De release candidate is desondanks niet releasewaardig. Drie verplichte acceptatiecriteria falen:

1. **Een nieuwe toernooihand kan na invoer van SB 500 en BB 1.000 niet van Stap 1 naar Stap 2.** De knopstatus blijft disabled door dezelfde eventvolgorde die in RC5a al is vastgesteld.
2. **Een bewaard concept hervat niet op de opgeslagen wizardstap.** Het concept wordt wel correct opgeslagen, maar bij openen wordt de opgeslagen `wizardState.step` tijdens de eerste render overschreven met `review`.
3. **De verplichte Hero-startstackvalidatie verschijnt niet via de zichtbare flow.** De knop `Volgende stap` is al disabled wanneer de stack leeg is, waardoor klikken en daarmee foutmelding, rode markering en focus onmogelijk zijn.

Daarnaast overlappen de BB- en BBA-markers in de gemeten 9-handed toernooivisual nog circa 1,75 px.

De bekende cashgamepotfixtures blijven correct: **€13, €19 en €41**.

---

## 2. Testomgeving en methode

| Onderdeel | Omgeving |
|---|---|
| Besturingssysteem | Linux-container |
| Browser | Chromium 144 headless |
| Viewports | 430 × 800 en gerichte mobiele geometriecontrole |
| JavaScript-engine | Node.js v22.16.0 |
| Syntaxcontrole | `node --check` |
| Browseraansturing | Chrome DevTools Protocol |
| Opslag | In-memory localStorage-testshim wegens sandboxbeperking |
| Code gewijzigd | Nee; uitsluitend een afgeleide testharnasversie met opslagshim |
| Deploy uitgevoerd | Nee |

De bronbuild zelf is niet aangepast. Voor browsertests is alleen de niet-beschikbare `localStorage` in de geïsoleerde browser vervangen door een in-memory equivalent.

---

## 3. Statische analyse

### Geslaagd

- JavaScript-syntaxcontrole met `node --check`.
- RC6-versieconstanten en titel zijn correct.
- Bovenste knop `Vorige stap` is in de uiteindelijke RC6-renderfunctie verwijderd.
- Onderste wizardbalk bevat één knop `Vorige stap` en één knop `Volgende stap`.
- `rc6ForcedActors()` bevat SB, BB en actieve straddlers.
- `rc6BuildPreflopPrefix()` filtert forced actors uit impliciete folds.
- `rc6PriorStatus()` verwerkt eerdere folds en all-ins cumulatief.
- `rc6ActingOrder()` sluit eerdere folds en all-ins uit van latere queues.
- BTN-straddle bepaalt direct SB of BB als eerste actor.
- Conceptdialoog bevat de drie vereiste keuzes.
- Handafronding bevat de modi `1 winnaar` en `Chop` en een afzonderlijke winnaarsectie.
- Chipmarkers worden naar de binnenzijde van het vilt verplaatst.

### Statische risico’s

- De RC5a live-validatielistener gebruikt nog steeds `queueMicrotask()` in de capturefase, vóórdat de generieke bubblelistener het model actualiseert.
- `editHand()` roept via de basisfunctie `go('hand')` en daarmee `render()` aan; de render-autosave schrijft `wizardState.step='review'` voordat de conceptwrapper de oorspronkelijke wizardstate kan herstellen.
- `rc5ForwardAllowed()` vereist bij de spelersstap al een geldige Hero-startstack. Daardoor wordt de knop disabled gerenderd en kan de expliciete RC6-validatiehandler niet worden aangeklikt.

---

## 4. Browser-runtime-tests

## 4.1 Startup en navigatie

| Test | Resultaat |
|---|---|
| App opent | PASS |
| Titel `Live Poker Handlog v2.6 RC6` | PASS |
| Versie `v2.6 RC6` zichtbaar | PASS |
| Startscherm zichtbaar | PASS |
| Geen startuprecursie | PASS |
| Geen syntaxfout | PASS |
| Geen bovenste knop `Vorige stap` | PASS |
| Onderste navigatiebalk aanwezig | PASS |
| Cashgame Stap 1 → Stap 2 | PASS |
| Toernooi Stap 1 → Stap 2 | **FAIL** |

### Toernooifixture

Invoer:

- SB: `500`;
- BB: `1.000`;
- BBA actief.

Gemeten model:

```text
BB = 1000
BBA/ante = 1000
```

Gemeten knopstatus:

```text
Volgende stap.disabled = true
```

Klikken op de disabled knop laat de wizard op `config` staan.

---

## 4.2 Conceptbeheer

### Geslaagd

- Kruisje opent het keuzevenster.
- Venster bevat:
  - Concept bewaren;
  - Concept verwijderen;
  - Doorgaan met registreren.
- Concept bewaren keert terug naar de sessie.
- Hand wordt opgeslagen met `status: concept`.
- Concept verwijderen verwijdert de hand.
- Doorgaan met registreren sluit uitsluitend het venster.

### Afgekeurd

Een concept dat op `config` werd opgeslagen bevatte:

```json
{
  "status": "concept",
  "wizardState": {
    "step": "config"
  }
}
```

Na heropenen werd gemeten:

```text
UI.wz.step = review
```

**Verwacht:** `config`.

Concepten hervatten dus niet betrouwbaar op de opgeslagen stap.

---

## 4.3 Reguliere cashgame-straddle

### Eén straddle – UTG €5, eerste vrijwillige actor CO

Gemeten forced actors:

```text
SB, BB, UTG
```

Gemeten impliciete folds bevatten geen SB, BB of UTG-straddler.

Gemeten preflopvolgorde:

```text
CO → BTN → SB → BB → UTG
```

**Resultaat:** PASS.

De straddler blijft actief en handelt expliciet na de latere posities en blinds.

### Twee straddles

Gemeten forced actors bevatten beide straddlers. Beide keren terug in de expliciete actiewachtrij en worden niet als impliciete fold opgeslagen.

**Resultaat:** PASS.

### Report

Prefixfolds worden apart opgeslagen in `preflopPrefix` en niet als normale acties aan `streets.pf` toegevoegd. De reportgenerator verwerkt alleen de expliciete straatacties.

**Resultaat:** PASS, statisch en via statecontrole.

---

## 4.4 BTN-straddle

| Scenario | Gemeten eerste actor | Resultaat |
|---|---|---|
| SB actief | SB | PASS |
| SB n.v.t. | BB | PASS |

De spelersstap gaat bij een BTN-straddle rechtstreeks naar de preflopactie en slaat de keuze van de eerste vrijwillige actor over.

---

## 4.5 Postflopstatus

Teststate bevatte:

- impliciete folds UTG en UTG+1;
- expliciete fold BTN;
- BB all-in;
- overige actieve spelers.

Gemeten flopqueue:

- impliciet en expliciet gefolde spelers ontbreken;
- BB all-in ontbreekt als actor;
- actieve, niet-all-inspelers blijven in de queue.

Gemeten live deelnemers voor winnaarselectie:

- all-inspeler blijft aanwezig;
- gefolde spelers ontbreken.

**Resultaat:** PASS.

---

## 4.6 Startstackvalidatie

**Verwacht bij lege Hero-startstack en klik op `Volgende stap`:**

- rode foutmelding;
- rode veldmarkering;
- focus op het veld;
- geen stapovergang.

**Werkelijk:**

- knop is al disabled;
- klik wordt niet uitgevoerd;
- geen foutmelding;
- geen rode veldmarkering;
- geen focuswijziging.

**Resultaat:** FAIL.

De RC6-validatiecode bestaat, maar is via de zichtbare gebruikersflow niet bereikbaar.

---

## 4.7 Tafelvisual

### Seatgeometrie

| Tafelgrootte | Seats zichtbaar | Geen horizontale scroll | Resultaat |
|---:|---:|---:|---|
| 6-handed | 6 | Ja | PASS |
| 8-handed | 8 | Ja | PASS |
| 9-handed | 9 | Ja | PASS |
| 10-handed | 10 | Ja | PASS |

### Forced-betmarkers

Cashgame:

- SB zichtbaar;
- BB zichtbaar;
- straddle zichtbaar;
- markers blijven binnen de tafelbox.

Toernooi:

- SB zichtbaar;
- BB zichtbaar;
- BBA zichtbaar.

### BB/BBA-overlap

Gemeten 9-handed rechthoeken:

```text
BB rechts: 324,04 px
BBA links: 322,29 px
```

Overlap: circa **1,75 px**.

**Resultaat:** FAIL op het expliciete criterium dat BB en BBA niet overlappen.

---

## 4.8 Hand afronden

### Geslaagd

- keuze `1 winnaar` zichtbaar;
- keuze `Chop` zichtbaar;
- winnaarselectie wordt als afzonderlijk visueel blok gerenderd;
- bij één winnaar wordt de selectie vervangen door precies één speler;
- bij Chop kunnen meerdere spelers worden geselecteerd;
- `wzSave()` blokkeert Chop met minder dan twee spelers;
- gefolde spelers ontbreken in de kandidaatset;
- all-inspelers blijven selecteerbaar;
- bij één resterende speler wordt de winnaar automatisch afgeleid.

**Resultaat:** PASS.

---

## 4.9 BBA en SB n.v.t.

| Controle | Resultaat |
|---|---|
| BBA volgt BB in model | PASS |
| BB en BBA afzonderlijke markers | PASS, maar geringe overlap |
| SB n.v.t. wijzigt actorlogica | PASS |
| SB ontbreekt uit preflopqueue bij SB n.v.t. | PASS |

---

## 4.10 Potengine-regressie

| Fixture | Verwacht | Gemeten | Resultaat |
|---|---:|---:|---|
| Raise €6, 3-bet €20, fold | €13 | €13 | PASS |
| Raise €6, call, 3-bet €20, folds | €19 | €19 | PASS |
| Raise €6, 3-bet €20, 4-bet €50, fold | €41 | €41 | PASS |

Forced blinds en straddles blijven als financiële bijdragen in de pot aanwezig. De vrijwillige actorqueue wordt afzonderlijk door de betting state bepaald.

**Resultaat:** PASS.

---

## 4.11 Chipnotatie

| Invoer | Verwacht | Gemeten | Resultaat |
|---:|---:|---:|---|
| 999 | `999` | `999` | PASS |
| 1.000 | `1K` | `1K` | PASS |
| 1.500 | `1,5K` | `1,5K` | PASS |
| 85.000 | `85K` | `85K` | PASS |
| 1.000.000 | `1M` | `1M` | PASS |
| 1.250.000 | `1,25M` | `1,25M` | PASS |

**Resultaat:** PASS.

---

## 5. Bevindingen

## RC6-001 – Toernooi blijft geblokkeerd op Stap 1

**Ernst:** Kritiek  
**Reproduceerbaarheid:** 100%

### Testcase

Nieuwe reguliere toernooihand, SB 500 en BB 1.000 invoeren, BBA actief, daarna `Volgende stap`.

### Verwacht

Knop wordt enabled en opent dealerbuttonkeuze in Stap 2.

### Werkelijk

Model bevat geldige blinds en BBA, maar de knop blijft disabled en de wizard blijft op `config`.

### Oorzaak

De live-validatielistener draait in de capturefase en plant een microtask. De generieke invoerlistener actualiseert het model pas in de bubblefase. De knopvalidatie leest daardoor nog de vorige waarde.

### Hersteladvies

- Actualiseer eerst het model en daarna de knopstatus in één handler.
- Of lees de actuele zichtbare inputwaarden rechtstreeks in `rc5aRefreshForwardButton()`.
- Voeg een browsertest toe voor 500/1.000 → enabled → Stap 2.

---

## RC6-002 – Concept hervat niet op opgeslagen stap

**Ernst:** Hoog  
**Reproduceerbaarheid:** 100%

### Testcase

Concept bewaren op `config` en daarna opnieuw openen.

### Verwacht

`UI.wz.step === 'config'`.

### Werkelijk

`UI.wz.step === 'review'`.

### Oorzaak

De basis-`editHand()` zet de wizard op `review` en roept `go('hand')` aan. De render-autosave overschrijft daarbij de bestaande `wizardState` voordat de conceptwrapper deze kan herstellen.

### Hersteladvies

- Lees en clone `wizardState` vóór de basisrender.
- Onderdruk autosave tijdens conceptinitialisatie.
- Herstel de wizardstate vóór de eerste render.
- Test concepten op minimaal config, spelers en action.

---

## RC6-003 – Verplichte startstackvalidatie is onbereikbaar

**Ernst:** Hoog  
**Reproduceerbaarheid:** 100%

### Testcase

Hero-holecards ingevuld, Hero-startstack leeg, klik `Volgende stap`.

### Verwacht

Foutmelding, rode markering, focus, geen overgang.

### Werkelijk

De knop is disabled; klikken is onmogelijk en geen foutfeedback verschijnt.

### Oorzaak

`rc5ForwardAllowed()` neemt de startstack al op in de enabled/disabled-berekening. De latere expliciete validatiehandler kan daardoor niet worden uitgevoerd.

### Hersteladvies

Laat de knop op de spelersstap aanklikbaar wanneer de gebruikersactie nodig is om veldvalidatie te tonen, of toon de fout al live zodra de gebruiker probeert door te gaan via een niet-disabled validatiepad.

---

## RC6-004 – BB en BBA overlappen nog licht

**Ernst:** Middel  
**Reproduceerbaarheid:** 100% in gemeten 9-handed viewport

### Testcase

9-handed toernooi, SB 500, BB/BBA 1.000.

### Verwacht

BB- en BBA-markers volledig gescheiden.

### Werkelijk

Markers overlappen circa 1,75 px.

### Hersteladvies

Vergroot de horizontale afstand of plaats BBA op een afzonderlijke verticale offset. Controleer dit op 360, 390, 430 en 560 px.

---

## 6. Niet-uitgevoerde handmatige tests

Conform instructie niet handmatig getest:

- clipboard;
- WhatsApp-deeplink;
- native share;
- afbeelding delen/downloaden.

Niet volledig op een fysiek mobiel apparaat uitgevoerd:

- werkelijk soft-keyboardgedrag;
- visuele beoordeling bij verschillende Android- en iOS-browserchrome;
- native focus- en scrollgedrag na startstackfout;
- langdurige opslag/reload buiten de in-memory browserharnasomgeving.

---

## 7. Releaseadvies

# NO GO

RC6 mag niet worden vrijgegeven.

De directe releaseblokker is dat een nieuwe toernooihand na geldige blindinvoer niet van Stap 1 naar Stap 2 kan. Daarnaast voldoen concepthervatting en startstackvalidatie niet aan de expliciete acceptatiecriteria.

### Verplicht voor de volgende RC

1. Live knopvalidatie na toernooiblindinvoer corrigeren.
2. Conceptstate vóór de eerste render herstellen zonder overschrijven.
3. Startstackvalidatie via een aanklikbare gebruikersflow bereikbaar maken.
4. BB/BBA-markerafstand vergroten.
5. Daarna het volledige RC6-protocol opnieuw uitvoeren, inclusief concepten op drie stappen.
