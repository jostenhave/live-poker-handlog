# Testrapport – Live Poker Handlog v2.6 RC4

**Testobject:** `Live_Poker_Handlog_v2.6_RC4(1).html`  
**Changelog:** `CHANGELOG_Live_Poker_Handlog_v2.6_RC4(1).md`  
**Testinstructies:** `TESTINSTRUCTIES_AI_Live_Poker_Handlog_v2.6_RC4(1).md`  
**Datum:** 29 juli 2026  
**Eindadvies:** **NO GO**

---

## 1. Managementsamenvatting

RC4 kan niet functioneel worden getest, omdat de applicatie bij het opstarten onmiddellijk vastloopt met:

```text
RangeError: Maximum call stack size exceeded
```

Het scherm blijft volledig leeg. De fout ontstaat in de RC4-override van `render()`. Door JavaScript function hoisting verwijst de vermeende verwijzing naar de RC3-functie naar de nieuwe RC4-functie zelf. Hierdoor roept `render()` zichzelf onbeperkt aan.

Hetzelfde foutpatroon komt ook voor bij meerdere andere RC4-overrides, waaronder:

- `newHand`;
- `editHand`;
- `wzSave`;
- `rNewSession`;
- `rSession`;
- `wzTable`;
- `streetText`.

Zelfs wanneer de eerste `render()`-recursie wordt hersteld, zullen meerdere kernflows daarom alsnog recursief vastlopen.

De build is niet bruikbaar en voldoet rechtstreeks aan een **NO GO**-criterium: de volledige applicatie is niet bereikbaar en geen hand kan worden geregistreerd of afgerond.

---

## 2. Testomgeving en methode

| Onderdeel | Omgeving |
|---|---|
| Besturingssysteem | Linux-container |
| Browser | Chromium 144 headless |
| Viewport eerste runtime | 430 × 800 |
| JavaScript-syntax | Node.js `--check` |
| Runtime-injectie | Volledige HTML geladen via `page.set_content()` |
| Code gewijzigd | Nee |
| Deploy uitgevoerd | Nee |

### Uitgevoerd

- changelog gelezen;
- testinstructies gelezen;
- volledige HTML en JavaScript geëxtraheerd;
- JavaScript-syntaxcontrole uitgevoerd;
- browserruntime gestart;
- browserfouten en stacktrace opgevangen;
- RC4-overrides statisch onderzocht;
- regressierisico’s van de aliasconstructie vastgesteld.

### Niet uitgevoerd door de blokker

Alle functionele runtime-tests na het laden van de startpagina konden niet worden uitgevoerd, omdat de applicatie geen DOM-interface rendert.

---

## 3. Resultaat syntaxcontrole

De JavaScript-parser accepteert het bestand:

```text
node --check: geslaagd
```

Dit betekent alleen dat de syntaxis geldig is. De runtime faalt direct door logische recursie.

---

## 4. Kritieke bevinding

## RC4-001 – Applicatie start niet door oneindige `render()`-recursie

**Ernst:** Kritiek  
**Reproduceerbaarheid:** 100%  
**Testcase:** RC4 openen in Chromium

### Verwacht resultaat

De startpagina toont:

- Live Poker Handlog;
- nieuwe sessie;
- spelersbibliotheek;
- instellingen;
- bestaande sessies indien aanwezig.

### Werkelijk resultaat

- leeg scherm;
- geen bruikbare interface;
- browserfout:

```text
RangeError: Maximum call stack size exceeded
    at render
    at render
    at render
    ...
```

### Technische oorzaak

RC4 bevat:

```javascript
const renderRC3 = render;

function render() {
  if (UI.wz) wzAutosave();
  return renderRC3();
}
```

Door function hoisting is de nieuwe RC4-declaratie van `render()` al actief wanneer `renderRC3` wordt toegekend. Daardoor geldt feitelijk:

```javascript
renderRC3 === render
```

De nieuwe functie roept dus zichzelf aan:

```text
render → renderRC3 → render → renderRC3 → ...
```

### Impact

- applicatie start niet;
- geen sessies bereikbaar;
- geen conceptregistratie;
- geen handregistratie;
- geen instellingen;
- geen spelersbeheer;
- geen import/export;
- geen recovery-interface;
- geen acceptatietest mogelijk.

### Advies

Gebruik geen functie-declaratie met dezelfde naam na het vastleggen van een alias in dezelfde scope.

Robuuste opties:

1. Geef de oorspronkelijke functie vóór de override een unieke naam in de bron.
2. Gebruik een functiewrapper zonder dezelfde gehoiste functienaam, bijvoorbeeld een toegewezen functie-expressie.
3. Integreer de RC4-wijziging rechtstreeks in de bestaande functie in plaats van een overrideketen.
4. Voeg minimaal een automatische browser-smoketest toe die controleert dat `#app` na `load()` niet leeg is en geen uncaught errors bevat.

---

## 5. Overige kritieke recursierisico’s

Hetzelfde constructiepatroon staat op meerdere plaatsen.

### 5.1 `newHand`

```javascript
const newHandRC3 = newHand;

function newHand() {
  newHandRC3();
  ...
}
```

**Risico:** `newHandRC3` verwijst naar de nieuwe `newHand()`, waardoor klikken op “Nieuwe hand” recursief vastloopt.

### 5.2 `editHand`

```javascript
const editHandRC4Base = editHand;

function editHand(id) {
  editHandRC4Base(id);
  ...
}
```

**Risico:** openen of hervatten van een hand loopt recursief vast.

### 5.3 `wzSave`

```javascript
const wzSaveRC3 = wzSave;

function wzSave() {
  UI.draft.status = 'definitive';
  return wzSaveRC3();
}
```

**Risico:** definitief opslaan van een hand loopt recursief vast.

### 5.4 `rNewSession`

```javascript
const rNewSessionRC3 = rNewSession;

function rNewSession() {
  return rNewSessionRC3()...
}
```

**Risico:** renderen van het scherm Nieuwe sessie loopt recursief vast.

### 5.5 `rSession`

```javascript
const rSessionRC3 = rSession;

function rSession() {
  let h = rSessionRC3();
  ...
}
```

**Risico:** openen van een sessie loopt recursief vast.

### 5.6 `wzTable`

```javascript
const wzTableRC3 = wzTable;

function wzTable(mode='pos') {
  let html = wzTableRC3(mode);
  ...
}
```

**Risico:** iedere tafelweergave, inclusief de overlay, loopt recursief vast.

### 5.7 `streetText`

```javascript
const streetTextRC3 = streetText;

function streetText(...) {
  let t = streetTextRC3(...);
  ...
}
```

**Risico:** controleschermen en reports lopen recursief vast.

### Beoordeling

Dit is geen geïsoleerde fout in één functie. De RC4-overridearchitectuur is structureel onveilig en moet als geheel worden herzien.

---

## 6. Statisch beoordeelde RC4-wijzigingen

Onderstaande wijzigingen zijn in de bron herkenbaar, maar konden niet betrouwbaar runtime worden geaccepteerd.

| Onderdeel | Statisch aanwezig | Runtime |
|---|---:|---:|
| 10-handed coördinaten | Ja | Niet uitvoerbaar |
| 10-handed posities | Ja | Niet uitvoerbaar |
| Conceptstatus | Ja | Niet uitvoerbaar |
| Wizardstate opslaan | Ja | Niet uitvoerbaar |
| Concept hervatten | Ja | Niet uitvoerbaar |
| Vorige stap | Ja | Niet uitvoerbaar |
| Sluitknop ✕ | Ja | Niet uitvoerbaar |
| Vorige actie | Ja | Niet uitvoerbaar |
| Toon tafel-overlay | Ja | Niet uitvoerbaar |
| Villainseat wijzigen | Ja | Niet uitvoerbaar |
| BBA-ante readonly | Ja | Niet uitvoerbaar |
| Prefixfolds postflop uitsluiten | Ja | Niet uitvoerbaar |
| Postflop actieve spelers filteren | Ja | Niet uitvoerbaar |
| Straat opnieuw invoeren | Ja | Niet uitvoerbaar |
| Gekleurde kaarttekst | Ja | Niet uitvoerbaar |

---

## 7. Aanvullend technisch risico – fragiele HTML-stringvervanging

RC4 wijzigt sessieschermen door reeds gerenderde HTML met `String.replace()` te bewerken.

Voorbeeld:

```javascript
function rNewSession() {
  return rNewSessionRC3()
    .replace(...)
}
```

Een van de zoekstrings bevat templatebron zoals `${Number(d.tableSeats)===9...}`. Die broncode staat na het renderen niet meer in de HTML-string. Daardoor kan de vervanging stilzwijgend niets doen.

### Mogelijke impact na herstel van de recursie

- 8- en 6-handed ontbreken mogelijk nog in Nieuwe sessie;
- labels of opties worden niet vervangen;
- schermen verschillen afhankelijk van exacte whitespace of markup;
- toekomstige wijzigingen breken de vervanging zonder foutmelding.

### Advies

Bouw de gewenste opties en labels rechtstreeks in de renderfunctie op. Vermijd broncode-achtige stringvervangingen op gegenereerde HTML.

---

## 8. Afgekeurde en geblokkeerde testgebieden

| Testgebied | Resultaat |
|---|---|
| Applicatie opstarten | FAIL |
| Sessie-instellingen | Geblokkeerd |
| 10-/9-/8-/6-handed runtime | Geblokkeerd |
| Tafelarchitectuur | Geblokkeerd |
| BBA-interactie | Geblokkeerd |
| Hero/villains | Geblokkeerd |
| Impliciete folds | Geblokkeerd |
| Actiekaart | Geblokkeerd |
| Toon tafel-overlay | Geblokkeerd |
| Postflopflow | Geblokkeerd |
| Correctieflow | Geblokkeerd |
| Navigatie | Geblokkeerd |
| Conceptregistratie | Geblokkeerd |
| Resultaat/report | Geblokkeerd |
| Potengine-runtime | Geblokkeerd |
| Mobiele UX | Geblokkeerd |
| Opslag/reload | Geblokkeerd |

De bestaande potenginecode is nog aanwezig, maar een releaseacceptatie kan niet uitsluitend op geïsoleerde functietests worden gebaseerd wanneer de applicatie zelf niet start.

---

## 9. Regressiebeoordeling

RC4 introduceert een volledige startupregressie ten opzichte van RC3.

RC3 kon worden geladen en de centrale bettingfixtures konden worden uitgevoerd. RC4 rendert geen interface. Daarmee zijn alle bestaande functies feitelijk onbereikbaar, waaronder:

- sessies;
- spelersbeheer;
- spelersbibliotheek;
- handen;
- reports;
- import/export;
- veiligheidskopie;
- Recovery Mode;
- Emergency Mode.

---

## 10. Vereiste herstelactie vóór RC5

1. Verwijder het gehoiste alias-/overridepatroon uit alle RC4-functies.
2. Controleer minimaal:
   - `render`;
   - `newHand`;
   - `editHand`;
   - `wzSave`;
   - `rNewSession`;
   - `rSession`;
   - `wzTable`;
   - `streetText`.
3. Vervang fragiele HTML-stringvervanging door directe renderlogica.
4. Voeg een geautomatiseerde startupsmo​ketest toe:
   - geen uncaught JavaScript error;
   - `#app` bevat zichtbare inhoud;
   - startpagina heeft minimaal één actieve knop.
5. Voer daarna het volledige RC4-testprotocol opnieuw uit; de huidige functionele resultaten kunnen niet worden overgenomen.

---

## 11. Releaseadvies

# NO GO

RC4 mag niet worden vrijgegeven of handmatig geaccepteerd.

De applicatie is door een reproduceerbare startupfout volledig onbruikbaar. Omdat hetzelfde recursiepatroon in meerdere kernfuncties aanwezig is, is een gerichte reparatie van alleen `render()` onvoldoende. De RC4-overridearchitectuur moet integraal worden gecorrigeerd en opnieuw worden getest.
