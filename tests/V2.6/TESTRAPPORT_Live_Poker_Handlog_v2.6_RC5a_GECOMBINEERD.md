# Gecombineerd testrapport – Live Poker Handlog v2.6 RC5a

**Testobject:** `Live_Poker_Handlog_v2.6_RC5a.html`  
**Testbasis:** gecombineerde acceptatiecriteria uit RC5 en RC5a  
**Datum:** 29 juli 2026  
**Eindadvies:** **NO GO**

---

## 1. Managementsamenvatting

RC5a herstelt een belangrijk deel van de RC5-releaseblokker:

- de applicatie start correct;
- de overgang van Stap 1 naar Stap 2 is technisch bereikbaar;
- cashgame- en toernooihanden kunnen na een geldige state naar de dealerkeuze;
- invoerfocus blijft tijdens typen behouden;
- nieuwe cashgamesessies tonen lege blindvelden;
- 6-, 8-, 9- en 10-handed tafels passen op een viewport van 360 px;
- de centrale chipformatter en de eerdere cashpotfixtures blijven correct.

De release is desondanks **NO GO**. De live-validatie van `Volgende stap` werkt aantoonbaar één invoergebeurtenis achter:

1. bij een geldige cashgameconfiguratie is de knop actief;
2. na het wissen van SB blijft de knop ten onrechte actief;
3. na het opnieuw invullen van SB wordt de knop juist uitgeschakeld;
4. de knopstatus komt dus niet overeen met de actuele modelstate.

Dit valt rechtstreeks onder de expliciete RC5a-NO-GO-criteria: na geldige invoer mag `Volgende stap` niet disabled blijven.

Daarnaast is een tweede UX-/navigatieprobleem vastgesteld bij het opslaan van een nieuwe cashgamesessie: wanneer de gebruiker vanuit het BB-veld direct op `Sessie starten` klikt, kan de `change`-handler het scherm opnieuw renderen en daarmee de oorspronkelijke klik neutraliseren. Een tweede klik is dan nodig.

Door de kritieke live-validatiefout is een natuurlijke, ononderbroken volledige end-to-endacceptatie van alle RC5-flows niet betrouwbaar. De overige scope is daarom aanvullend statisch, via gecontroleerde browserstate en met geïsoleerde runtimefixtures beoordeeld.

---

## 2. Testomgeving en methode

| Onderdeel | Omgeving |
|---|---|
| Besturingssysteem | Linux-container |
| Browser | Chromium 144 headless |
| Viewports | 360 × 800 en 430 × 800 |
| JavaScript-engine | Node.js v22.16.0 |
| Opslag | In-memory `localStorage`-testshim wegens browserisolatie |
| Code gewijzigd | Nee; uitsluitend testharnas voor opslag |
| Deploy uitgevoerd | Nee |

### Testmethode

Er is strikt onderscheid gemaakt tussen:

1. **Statische analyse**
   - eventlisteners;
   - navigatie-eigenaarschap;
   - wizardstate;
   - conceptmodel;
   - straddles;
   - all-in/runout;
   - kaartselector;
   - report- en potlogica.

2. **Browser-runtime**
   - startup;
   - sessie-invoer;
   - Stap 1-validatie;
   - cash- en toernooiovergang;
   - focusbehoud;
   - BBA;
   - conceptaanmaak;
   - tafelgeometrie.

3. **Gecontroleerde/ geïsoleerde runtime**
   - chipnotatie;
   - potfixtures;
   - tafelgroottes;
   - state-overgangen die door de live-validatiefout niet betrouwbaar via de normale UI bereikbaar waren.

---

## 3. Startup-smoketest

| Controle | Resultaat |
|---|---|
| `node --check` | PASS |
| App start zonder lege pagina | PASS |
| Startscherm zichtbaar | PASS |
| Geen `Maximum call stack exceeded` | PASS |
| Geen `Too much recursion` | PASS |
| Geen uncaught `ReferenceError` | PASS |
| Geen uncaught `TypeError` | PASS |
| Geen uncaught `SyntaxError` | PASS |
| Versie `v2.6 RC5a` zichtbaar | PASS |

---

## 4. Kritieke heracceptatie Stap 1 → Stap 2

## 4.1 Cashgame

### Test

- nieuwe cashgamesessie;
- SB `1`;
- BB `2`;
- nieuwe hand;
- `Volgende stap`;
- dealerkeuze.

### Resultaat

De onderliggende overgang werkt wanneer:

- `UI.draft.sb` en `UI.draft.bb` geldig zijn;
- de knop handmatig of via een correcte refresh actief is.

Dan verandert:

```text
UI.wz.step: config → button
```

en verschijnt Stap 2 met dealerbuttonkeuze.

**Onderliggende navigatie:** PASS  
**Live knopvalidatie:** FAIL

## 4.2 Toernooi

### Test

- reguliere toernooisessie;
- SB `500`;
- BB `1.000`;
- BBA actief;
- `Volgende stap`.

### Resultaat

- BBA volgt BB naar `1.000`;
- anteveld is readonly;
- geldige state kan naar de dealerkeuze.

**Onderliggende navigatie:** PASS  
**Live knopvalidatie:** FAIL om dezelfde eventvolgorde als bij cash.

---

## 5. Bevindingen

## RC5a-001 – `Volgende stap` loopt één invoergebeurtenis achter

**Ernst:** Kritiek  
**Reproduceerbaarheid:** 100%  
**Categorie:** Wizardnavigatie / live-validatie

### Testcase

Uitgangssituatie:

```text
SB = 1
BB = 2
Volgende stap = actief
```

Daarna:

1. wis SB;
2. controleer knop;
3. vul SB opnieuw met `1`;
4. controleer knop.

### Verwacht

Na wissen:

```text
Volgende stap = disabled
```

Na opnieuw invullen:

```text
Volgende stap = enabled
```

### Werkelijk

Na wissen:

```text
UI.draft.sb = ""
rc5ForwardAllowed() = false
Volgende stap.disabled = false
```

Na opnieuw invullen:

```text
UI.draft.sb = "1"
rc5ForwardAllowed() = true
Volgende stap.disabled = true
```

De zichtbare knopstatus is dus precies tegengesteld aan de actuele state.

### Technische oorzaak

De RC5a-listener draait in de capturefase:

```javascript
document.addEventListener('input', e => {
  ...
  queueMicrotask(rc5aRefreshForwardButton);
}, true);
```

De generieke handler die `UI.draft` via `setPath()` bijwerkt, draait later in de bubblefase.

In de geteste browseruitvoering wordt de microtask van de capture-listener verwerkt voordat de bubble-handler de modelwaarde heeft bijgewerkt. De knop wordt daardoor gevalideerd tegen de vorige waarde.

### Impact

- geldige invoer kan een disabled knop tonen;
- ongeldige invoer kan een enabled knop tonen;
- de gebruiker kan opnieuw vastlopen op Stap 1;
- gedrag is afhankelijk van invoervolgorde en een volgende gebeurtenis;
- expliciete NO-GO-conditie uit het RC5a-testprotocol.

### Hersteladvies

Kies één van deze robuuste oplossingen:

1. Verplaats de knoprefresh naar dezelfde handler direct ná `setPath()`.
2. Laat de RC5a-listener in de bubblefase draaien.
3. Werk eerst het model expliciet bij en roep daarna synchronisch `rc5aRefreshForwardButton()` aan.
4. Gebruik geen capture-microtaskconstructie voor validatie die afhankelijk is van een bubble-handler.

Voeg een browserfixture toe die zowel state als DOM controleert:

```text
wissen → model ongeldig + knop disabled
invullen → model geldig + knop enabled
```

---

## RC5a-002 – Eerste klik op `Sessie starten` kan verloren gaan

**Ernst:** Middel  
**Reproduceerbaarheid:** reproduceerbaar bij directe overgang vanuit BB-veld  
**Categorie:** Sessie-invoer / UX

### Testcase

1. nieuwe cashgamesessie;
2. vul SB `1`;
3. vul BB `2`;
4. klik direct vanuit het actieve BB-veld op `Sessie starten`.

### Verwacht

De sessie wordt bij de eerste klik opgeslagen en geopend.

### Werkelijk

In de browserruntime bleef het scherm na de eerste klik op `Nieuwe sessie` staan. Na expliciet blur/Tab of een tweede klik werd de sessie wel opgeslagen.

### Vermoedelijke oorzaak

BB gebruikt `data-path-render`. De `change`-handler voert:

```javascript
setPath(...)
render()
save()
```

uit. De volledige rerender vervangt de knop waarop de gebruiker bezig was te klikken. Daardoor kan de oorspronkelijke klik niet meer op het nieuwe element worden afgehandeld.

### Impact

- gebruiker moet soms tweemaal op `Sessie starten` tikken;
- kan worden geïnterpreteerd als niet-werkende knop;
- extra relevant op mobiel.

### Hersteladvies

- gebruik voor tekst-/getalinvoer geen volledige rerender op `change`;
- werk alleen afhankelijke UI-elementen bij;
- of verwerk de actuele veldwaarde in `saveSession()` voordat validatie en opslag plaatsvinden.

---

## 6. Lege blindvelden

Nieuwe cashgamesessies tonen:

```text
SB = ""
BB = ""
```

en niet `0`.

| Controle | Resultaat |
|---|---|
| Nieuwe SB leeg | PASS |
| Nieuwe BB leeg | PASS |
| Centrale formatter behoudt leeg | PASS |
| Ingevulde waarden opslaan | PASS na blur/tweede klik |
| Direct eerste-klikgedrag | FAIL, zie RC5a-002 |

---

## 7. Sessies en tafelgroottes

### Statisch en runtime gecontroleerd

Sessiemodellen:

- 6 seats;
- 8 seats;
- 9 seats;
- 10 seats.

Per hand:

- dynamisch vanaf 2-handed;
- maximaal sessietafelmodel;
- geen waarde boven het sessiemaximum.

### Resultaat

| Controle | Resultaat |
|---|---|
| 6/8/9/10 als sessiekeuze | PASS |
| 2 t/m sessiemaximum per hand | PASS |
| Geen overschrijding sessiemaximum | PASS |
| Positiemapping 2/6/8/9/10 | PASS, statisch |
| 10-handed positiearray | PASS |

---

## 8. Tafelvisual op 360 px

Browsergeometrie:

| Tafel | Seats | Linkerste rand | Rechterste rand | Horizontale scroll |
|---:|---:|---:|---:|---:|
| 6-handed | 6 | 53,4 px | 328,1 px | Nee |
| 8-handed | 8 | 53,4 px | 337,4 px | Nee |
| 9-handed | 9 | 53,4 px | 343,5 px | Nee |
| 10-handed | 10 | 47,3 px | 343,5 px | Nee |

Viewportbreedte:

```text
360 px
```

### Resultaat

- exact aantal seats: PASS;
- geen afsnijding rechts: PASS;
- geen horizontale scroll: PASS;
- 10-handed blijft binnen viewport: PASS;
- dealerlabel wordt verticaal opgebouwd: PASS, statisch;
- Hero-accent heeft CSS-voorrang: PASS, statisch.

Volledige actuele overlaystate na een complete hand kon door RC5a-001 niet natuurlijk end-to-end worden geaccepteerd.

---

## 9. BBA

| Controle | Resultaat |
|---|---|
| BBA actief → ante volgt BB | PASS |
| BB `1.000` → ante `1.000` | PASS |
| Ante readonly | PASS |
| Focus blijft tijdens BB-invoer | PASS |
| Knopstatus na BB-invoer | FAIL door RC5a-001 |

---

## 10. Conceptregistratie

Bij starten van een nieuwe hand wordt direct een sessiehand aangemaakt met:

```json
{
  "status": "concept",
  "wizardStep": "config"
}
```

### Geslaagd

- concept direct aangemaakt;
- conceptmodel in sessie aanwezig;
- wizardstate wordt opgeslagen;
- sluitdialoog met bewaren/verwijderen/doorgaan statisch aanwezig.

### Niet volledig end-to-end geaccepteerd

- bewaren en hervatten vanaf drie verschillende stappen;
- browser sluiten en heropenen;
- definitief afronden zonder duplicaat.

Deze tests vereisen een betrouwbare natuurlijke voortgang door de wizard. Gecontroleerde state-inspectie toont dat de benodigde opslagvelden aanwezig zijn, maar dat is geen volledige acceptatie.

---

## 11. Cashgame-straddles

### Statisch aanwezig

Stap 1 ondersteunt volgens de sessiekaders:

- geen straddle;
- reguliere straddle;
- meerdere reguliere straddles;
- vaste eerste straddle;
- open eerste straddle;
- vaste vervolgstraddles;
- open vervolgstraddles;
- vaste BTN-straddle;
- open BTN-straddle.

Forced contributions worden via `handStraddles()` in pot- en tafelstate opgenomen.

### Beoordeling

| Scenario | Resultaat |
|---|---|
| Geen straddle beschikbaar | PASS, statisch |
| Reguliere straddle beschikbaar | PASS, statisch |
| Aantal binnen spelersmaximum | PASS, statisch |
| Vaste bedragen verdubbelen | PASS, geïsoleerde logica |
| Open bedragvelden | PASS, statisch |
| Lege open bedragen blokkeren | PASS, statisch |
| BTN-straddle volgens sessie | PASS, statisch |
| Markers op juiste seat | DEELS PASS, state/logica |
| Volledige zichtbare end-to-endflow | Niet volledig uitgevoerd |

---

## 12. Chipformattering

| Invoer | Verwacht | Gemeten | Resultaat |
|---:|---:|---:|---|
| 850 | `850` | `850` | PASS |
| 1.000 | `1K` | `1K` | PASS |
| 1.500 | `1,5K` | `1,5K` | PASS |
| 85.250 | `85,25K` | `85,25K` | PASS |
| 1.000.000 | `1M` | `1M` | PASS |
| 1.250.000 | `1,25M` | `1,25M` | PASS |

---

## 13. Potengine-regressie

De potengine is volgens het RC5a-changelog niet gewijzigd. De kritieke cashfixtures zijn opnieuw geïsoleerd uitgevoerd.

| Fixture | Verwacht | Gemeten | Resultaat |
|---|---:|---:|---|
| Raise €6, 3-bet €20, fold | €13 | €13 | PASS |
| Raise €6, call, 3-bet €20, folds | €19 | €19 | PASS |
| Raise €6, 3-bet €20, 4-bet €50, fold | €41 | €41 | PASS |

---

## 14. Statische beoordeling overige gecombineerde RC5-scope

| Onderdeel | Beoordeling |
|---|---|
| Vijf wizardhoofdstappen | Aanwezig |
| Stapnaam en `Stap x van 5` | Aanwezig |
| Automatische dealer/Hero/first-actorprogressie | Aanwezig |
| Impliciete preflopfolds | Aanwezig |
| Postflop actieve spelersfilter | Aanwezig |
| Hero-all-in uit stack | Aanwezig |
| Villain-all-in bekend/onbekend | Aanwezig |
| Automatische runout | Aanwezig |
| Winnaar/chop | Aanwezig |
| Chop minimaal twee spelers | Aanwezig |
| Doorlopende kaartselector | Aanwezig |
| Dubbele kaartpreventie | Aanwezig |
| Actuele tafeloverlay | Aanwezig |
| Conceptdialogen | Aanwezig |
| Reportgenerator | Aanwezig |
| Import/export en safety backup | Behouden |
| Recovery/Emergency Mode | Behouden |

Statische aanwezigheid geldt niet als volledige functionele acceptatie.

---

## 15. Niet volledig uitgevoerde tests

Door de releaseblokker niet betrouwbaar natuurlijk end-to-end uitgevoerd:

- volledige reguliere toernooihand tot report;
- vroeg einde preflop;
- vroeg einde flop;
- alle vier all-in-/runoutscenario’s;
- winnaar Hero;
- winnaar Villain;
- chop met twee spelers;
- chop met drie spelers;
- kaartselector volledig via zichtbare klikflow;
- concept hervatten vanaf drie afzonderlijke stappen;
- volledige cashgame-straddleflows tot preflop;
- overlay na folds en all-ins;
- import via native bestandskiezer;
- echte browserrestart met persistente originopslag.

Clipboard, WhatsApp, native share en afbeelding delen/downloaden zijn conform instructie buiten de handmatige test gehouden.

---

## 16. Regressiebeoordeling

### Positief

- startup blijft hersteld;
- Stap 1 → Stap 2-functie bestaat en werkt bij correcte knopstate;
- lege blindvelden hersteld;
- BBA blijft correct;
- tafelgeometrie is verbeterd;
- potengine blijft stabiel;
- chipnotatie blijft correct;
- conceptmodel is behouden.

### Negatief

De oplossing voor live-validatie is technisch onjuist gepositioneerd in de eventcyclus. Daardoor is de oorspronkelijke blokkade niet betrouwbaar opgelost: de knop kan na geldige invoer nog steeds disabled zijn.

---

## 17. Releaseadvies

# NO GO

RC5a mag niet worden vrijgegeven.

De onderliggende Stap 1 → Stap 2-overgang is hersteld, maar de zichtbare knopstatus is niet betrouwbaar gekoppeld aan de actuele invoer. Het RC5a-testprotocol noemt expliciet als NO-GO-conditie:

```text
Volgende stap blijft na geldige invoer disabled.
```

Dat scenario is reproduceerbaar.

### Verplicht herstel voor een volgende RC

1. Verplaats de live-validatie ná de modelupdate.
2. Verwijder de capture-microtaskafhankelijkheid.
3. Voeg automatische browserfixtures toe voor:
   - geldig → enabled;
   - ongeldig → disabled;
   - opnieuw geldig → enabled;
   - focus blijft behouden;
   - klik opent Stap 2.
4. Herstel het verloren-eerste-klikprobleem bij `Sessie starten`.
5. Voer daarna de volledige gecombineerde RC5/RC5a-suite opnieuw uit.
