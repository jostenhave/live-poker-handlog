# TECHNISCHE REVIEW — Live Poker Handlog v2.6 RC8 Build 13

## Scope en werkwijze

Deze review volgt de aangeleverde technische-reviewprompt: eerst diagnose, geen codewijzigingen. De nadruk ligt op (1) pokerlogica, (2) dataveiligheid, (3) onderhoudbaarheid en (4) robuustheid.

Geteste build:
`Live_Poker_Handlog_v2.6_RC8_Build13_KMB_Mobiele_Invoer_BBA_Sync.html`

Uitgevoerd:
- statische code-inspectie;
- gerichte analyse van `analyze()`, `deriveHandState()`, storage/migratie en import/export;
- uitvoerbare fixtures op de pot-engine-logica;
- vergelijking van de twee conversiepaden `toBase()` en `wzUnitToBase()`.

Niet uitgevoerd:
- volledige browser-E2E-regressie van ieder scherm;
- fysieke Android-interactie buiten de eerder door de gebruiker uitgevoerde acceptatietests.

---

# Algemene indruk

De app bevat inmiddels veel doordachte pokerlogica en meerdere verdedigingslagen voor gegevensbehoud. De eerder problematische potfixtures rond opeenvolgende raises en uncalled bets blijken in de kern goed te werken. De belangrijkste technische zwakte is echter dat de code door opeenvolgende RC-overrides meerdere parallelle implementaties van dezelfde concepten bevat. Dat is niet alleen een stijlprobleem: in Build 13 veroorzaakt die divergentie aantoonbaar een **kritieke potfout wanneer een cashgameactie in BB wordt ingevoerd en de big blind niet €1 is**. Daarnaast blijkt de in de reviewprompt gevraagde afleiding van ontbrekende calls en checked-around-straten niet daadwerkelijk aanwezig te zijn. Mijn oordeel: de codebasis is bruikbaar en op diverse onderdelen sterk, maar **RC8 moet nog niet definitief worden afgesloten voordat de P1-potfout is opgelost en de afleidingsregels expliciet zijn besloten/getest**.

---

# 1. Correctheid van de pokerlogica

## 1.1 FOUT — Cashgameacties in BB worden door `analyze()` verkeerd omgerekend wanneer BB ≠ 1

**Ernst:** kritisch  
**Plek:** `toBase()` rond regel 442; `analyze()` gebruikt deze functie rond regels 495 en 510.  
**Vergelijking:** `wzUnitToBase()` rond regels 918–923 bevat wél een aparte cashgame-BB-conversie.

`toBase()` doet:

```js
function toBase(a,s,bb,pot){
  ...
  if(a.unit==='%')return pot*n/100;
  if(a.unit==='chips')return bb?n/bb:null;
  return n;
}
```

Voor cashgames kan de geleide invoer echter ook `unit === 'bb'` gebruiken. Dan hoort een actie van 3 BB bij blinds €1/€2 te worden omgerekend naar €6. `toBase()` retourneert echter 3.

De wizard/replay gebruikt een andere functie:

```js
if(s.type==='cash')return unit==='bb'?n*bb:n;
```

Die is wél correct.

### Reproduceerbare fixture

Cashgame €1/€2:

- Hero raise naar **3 BB** (= €6)
- BB callt
- SB foldt / blijft als geposte €1 in pot

Correcte pot:
- Hero €6
- BB €6
- SB €1
- **Totaal €13**

Werkelijke `analyze()`-uitkomst:
- Hero €3
- BB €3
- SB €1
- **Totaal €7**

Dit is extra gevaarlijk omdat €1/€1-games de fout volledig maskeren: daar is `3 BB` toevallig ook `€3`.

### Advies

Dit is het eerste punt dat moet worden aangepakt. Niet alleen een testcase toevoegen; de twee conversiepaden moeten uiteindelijk één canonieke conversieregel delen.

---

## 1.2 GOED — De eerder kritieke uncalled-bet/opeenvolgende-raise-fixtures werken

**Plek:** `analyze()` regels 460–547, met name uncalled return regels 532–542.

Gerichte fixtures op dezelfde logica geven:

| Scenario cash €1/€1 | Verwachte pot | Uitkomst |
|---|---:|---:|
| raise 6 → 3-bet 20 → fold | 13 | **13 PASS** |
| raise 6 → call → 3-bet 20 → beide folds | 19 | **19 PASS** |
| raise 6 → call → 3-bet 20 → call + fold | 47 | **47 PASS** |
| BB callt na geposte blind | 13 | **13 PASS** |
| short-stack BB kan slechts tot 10 callen | 21 | **21 PASS** |
| 50%-potbet krijgt iedereen eruit; oncalled deel terug | 9 | **9 PASS** |

De kerncorrectie voor unmatched/uncalled geld werkt dus aantoonbaar in deze gevallen.

---

## 1.3 GOED — Blinds en BBA worden als forced contributions behandeld

**Plek:** `analyze()` regels 472–485.

- SB wordt vooraf gepost tenzij `sbNA`.
- BB wordt altijd gepost.
- De toernooi-ante wordt expliciet als één Big Blind Ante aan de BB-actor toegevoegd.
- Straddles worden preflop als forced contributions toegevoegd.

Dat is conceptueel de juiste basis.

---

## 1.4 GOED — Stackbegrenzing bij calls/all-ins zit in de pot-engine

**Plek:** regels 465, 491–505 en 508–528.

`remaining()` trekt reeds geïnvesteerde bedragen van de bekende startstack af. Calls en raises worden vervolgens met `Math.min(..., remaining)` begrensd. Een short-stack kan daardoor niet méér bijdragen dan zijn resterende stack.

Gerichte short-stackfixture: **PASS**.

---

## 1.5 FOUT / FUNCTIONELE GAP — Ontbrekende calls worden niet afgeleid

**Ernst:** hoog als handmatige registratie incomplete acties mag bevatten.  
**Plek:** `deriveHandState()` rond regel 799 en `analyze()`.

De reviewprompt vraagt expliciet om controle van bijvoorbeeld:

> bet zonder gelogde call terwijl de hand doorloopt → impliciete call.

Die logica bestaat niet.

`deriveHandState()` leidt alleen impliciete **folds** af. `analyze()` verwerkt uitsluitend daadwerkelijk opgeslagen call-acties. Als bijvoorbeeld:

- flop: Hero bet 4
- geen call opgeslagen
- turn wordt toch geregistreerd

dan ziet `analyze()` de flopbet als onbeantwoord en retourneert het unmatched deel aan Hero. De pot voor de turn blijft daardoor te laag.

### Gevolg

De app kan een intern consistente maar pokerinhoudelijk onmogelijke hand opslaan/rapporteren wanneer een call ontbreekt maar de volgende straat wel bestaat.

### Beslispunt

Er zijn twee valide oplossingen:
1. ontbrekende call werkelijk afleiden; of
2. de hand blokkeren en eisen dat de call expliciet wordt ingevoerd.

Wat níet veilig is: de huidige situatie waarin de hand kan doorgaan terwijl de pot-engine de call niet kent.

---

## 1.6 FOUT / FUNCTIONELE GAP — Een lege straat wordt niet als “checked around” afgeleid

**Plek:** `deriveHandState()` regel 799; `streetText()` regel 551.

`streetText()` kan `all check` tonen als er expliciete checkacties zijn. Maar als een straat geen acties bevat en de hand daarna doorgaat, wordt nergens automatisch “checked around” afgeleid.

Dit wijkt af van de functionaliteit die de reviewprompt expliciet vraagt te toetsen.

Ook hier geldt: óf afleiden, óf expliciete registratie afdwingen.

---

## 1.7 RISICO — De impliciete-foldlogica is compact maar moeilijk bewijsbaar

**Plek:** `deriveHandState()` regel 799.

De functie bepaalt impliciete folds door te kijken of na de laatste actie van een speler nog een bekende agressieve actie voorkomt. De implementatie is zeer compact en bevat zelfs een ongebruikte variabele:

```js
const lastAggIndex = ...
```

Dit is geen bewezen fout, maar door de compacte implementatie en het ontbreken van een expliciet betting-state-model is regressiegevaar groot.

Aanbevolen: fixtures voor:
- call → raise → ontbrekende fold;
- bet → call → raise → ontbrekende fold;
- multiway all-in;
- short all-in die de actie niet heropent;
- actie na eerdere all-in/fold moet worden geweigerd.

---

## 1.8 PROMPTMISMATCH — De gevraagde automatische PKO-bountyberekening bestaat niet

De reviewprompt vraagt om controle van een PKO-regel waarbij een deel naar het eigen hoofd gaat. In Build 13 is PKO-bounty-informatie echter bewust als **vrije tekst** ingericht. Er is geen automatische `halve bounty → eigen bounty`-berekening gevonden.

Dit is daarom niet zonder meer een codebug. Er moet eerst worden vastgesteld welke functionele specificatie leidend is:

- **huidig appontwerp:** vrije tekst voor PKO/Mystery;
- **reviewprompt:** automatische PKO-bountyberekening.

Zolang dat niet is beslist, zou ik hier geen code aan veranderen.

---

# 2. Dataveiligheid en behoud van spelershistorie

## 2.1 RISICO — Spelershistorie blijft afhankelijk van één browserprofiel tenzij extern geëxporteerd

**Ernst:** praktisch hoog  
**Plek:** `localStorage`, `makeBackup()` regels 711–713.

De app kan nu back-ups maken, maar de primaire database én de interne veiligheidskopie staan beide in browser-localStorage. Ze verdwijnen samen bij bijvoorbeeld:

- apparaatverlies;
- browsergegevens wissen;
- siteopslag wissen;
- bepaalde browser-/OS-cleanups;
- gebruik van een ander browserprofiel/apparaat.

De externe JSON-export beschermt hiertegen, maar die is handmatig.

### Sterk punt

Het feit dat spelers afzonderlijk exporteerbaar zijn is goed: de voor de gebruiker belangrijkste historie kan compact worden veiliggesteld.

### Aanbeveling

Geen cloudarchitectuur nodig om dit sterk te verbeteren. Een eenvoudige, prominente periodieke export van alleen de spelersbibliotheek heeft een zeer hoge opbrengst tegen lage complexiteit.

---

## 2.2 GOED — Replace-import gebruikt staging plus een veiligheidskopie

**Plek:** `buildImportedDatabase()` regels 771, `promoteStaging()` regel 772, `performImport()` 773–790.

Sterke punten:

- import wordt eerst opgebouwd in een aparte staging-database;
- bij destructief vervangen wordt eerst een volledige veiligheidskopie geschreven;
- de actieve `DB` wordt pas vervangen nadat staging is opgebouwd;
- als de actieve persist faalt, wordt de in-memory DB teruggezet;
- mislukte stage wordt apart bewaard.

Voor een localStorage-app is dit een nette transactionele benadering.

---

## 2.3 GOED — Back-ups worden op belangrijke structuurfouten geweigerd

**Plek:** `validateBackup()` 750–766 en `validateBackupRecords()` 723–749.

De app controleert onder meer:

- backup- en schemaversie;
- geldige categorieën;
- arrays/objects op verwachte plekken;
- dubbele/missende IDs;
- sessie/hands/villainstructuur;
- villain-referenties naar spelers binnen dezelfde sessie.

Dit is veel beter dan blind JSON importeren.

---

## 2.4 RISICO — Validatie is vooral structureel, niet semantisch

Een JSON-bestand kan structureel geldig zijn maar inhoudelijk ongeldige pokerdata bevatten, bijvoorbeeld:

- onbekende action types;
- ongeldige unit;
- negatieve/extreme bedragen;
- ontbrekende belangrijke handvelden;
- positie die niet bij de tafelgrootte past.

`validateBackup()` accepteert dat grotendeels, waarna `migrate()` of latere UI-code ermee moet omgaan.

Voor normale eigen back-ups is dit waarschijnlijk acceptabel, maar bij beschadigde of handmatig gewijzigde JSON is het een risico.

---

## 2.5 RISICO — `migrate()` is geen echte versie-voor-versie migratie

**Plek:** regels 148–216.

`migrate()` kijkt niet naar “van schema 8 naar 9, daarna 9 naar 10…”. In plaats daarvan wordt bij iedere load dezelfde set normalisaties uitgevoerd en daarna:

```js
DB.schemaVersion = SCHEMA_VERSION;
```

Voordelen:
- eenvoudig;
- veel normalisaties zijn idempotent.

Nadelen:
- moeilijker te bewijzen dat historische data nooit verkeerd opnieuw wordt gemuteerd;
- toekomstige destructieve migraties zijn riskanter;
- lastiger te testen welke transformatie bij welke versie hoort.

Voor jarenlange betrouwbaarheid zou versiegestuurde migratie op termijn veiliger zijn.

---

## 2.6 RISICO — `migrateObject()` mist een `finally` rond de tijdelijke globale DB-wissel

**Plek:** regel 707.

```js
function migrateObject(input){
  const previous=DB;
  DB=deepClone(input);
  migrate(false);
  const out=deepClone(DB);
  DB=previous;
  return out
}
```

Als `migrate(false)` onverwacht een exception gooit, wordt `DB=previous` niet uitgevoerd. De import wordt dan wel afgebroken, maar de globale in-memory database kan tijdelijk op het staging-object blijven staan.

Dit is geen waarschijnlijk dagelijks probleem, maar het botst met de belofte “actieve gegevens zijn niet gewijzigd” bij foutafhandeling.

---

# 3. Onderhoudbaarheid en uitbreidbaarheid

## 3.1 RISICO — De code bevat zeer veel opeenvolgende overrides van dezelfde functies

De build bevat ongeveer:

- **529 functiedeclaraties**
- **479 unieke functienamen**

Voorbeelden van meervoudige definities:

- `wzAction` — 4×
- `wzReview` — 4×
- `wzTable` — 3×
- `wzConfig` — 3×
- `wzFinish` — 3×
- `rHand` — 3×
- `wzSave` — 3×
- `parseChipValue` — 2×
- `num` — 2×
- `compactK` — 2×
- `chipDisplay` — 2×

Daarnaast worden functies later opnieuw aan andere functies toegewezen.

Dit is het grootste onderhoudbaarheidsrisico van de app.

### Waarom dit niet theoretisch is

De recente K/M/B-problemen waren precies dit type fout: een nieuwe correcte formatter bestond naast oudere routes die nog actief waren.

---

## 3.2 FOUT IN ARCHITECTUUR MET FUNCTIONEEL GEVOLG — Twee basis-conversiefuncties zijn uit elkaar gegroeid

`toBase()` en `wzUnitToBase()` lossen hetzelfde domeinprobleem op, maar verschillend.

- Wizard-state: cash BB → correct `n * bb`
- Pot-engine: cash BB → fout `n`

Dit is het concrete bewijs dat duplicatie inmiddels pokeruitkomsten kan beïnvloeden.

---

## 3.3 RISICO — Pokerlogica en UI-state zijn sterk verweven

Veel wizardfuncties lezen direct uit:

- `UI.draft`
- `UI.wz`
- `currentSession()`

en muteren diezelfde objecten.

Dat maakt een functie moeilijk geïsoleerd testbaar. `analyze()` is juist relatief goed omdat hij bijna puur is; dat model zou vaker gebruikt kunnen worden.

---

## 3.4 SUGGESTIE — Houd één HTML-bestand, maar groepeer intern in canonieke domeinmodules

Voor deze app is een framework of build-stap niet noodzakelijk.

Een onderhoudbare tussenweg:

- `ChipValues` — parse/format/unit conversion;
- `PokerEngine` — pot, stacks, legal actions;
- `HandDerivation` — implicit folds/calls/checks;
- `Storage` — load/save/migrate;
- `Backup` — validate/stage/promote;
- `Wizard` — uitsluitend UI/workflow.

Dat kan nog steeds volledig in één standalone HTML-bestand.

---

## 3.5 SUGGESTIE — Maak pure regressiefixtures onderdeel van iedere build

Minimaal automatisch testen:

- bekende potfixtures 13/19/47;
- €1/€2 cash met actie in BB;
- SB/BB calls;
- multiple straddles;
- short all-ins;
- BBA;
- K/M/B;
- implicit-actiongevallen.

Dit levert waarschijnlijk meer betrouwbaarheid op dan nog meer beschermende UI-code.

---

# 4. Robuustheid bij rare of onvolledige invoer

## 4.1 GOED — Onbekende all-inomvang wordt expliciet als onbetrouwbare pot behandeld

**Plek:** `deriveHandState()` / `saveHand()` en wizardvalidatie.

De app markeert onbekende all-ins, voorkomt op diverse wizardpunten verdergaan en kan een rapport als “pot niet betrouwbaar” markeren. Dit is een sterke keuze: liever expliciet onzeker dan een verzonnen exact bedrag.

---

## 4.2 GOED — Boardstructuur en acties na fold/all-in worden gevalideerd

**Plek:** `boardStructureErrors()` en `validateHandFlow()` regels 800–801.

Voorbeelden:
- turn zonder volledige flop;
- river zonder turn;
- speler met latere actie nadat hij eerder foldde/all-in ging;
- gefolde speler als showdown/winnaar.

Dit voorkomt meerdere logisch onmogelijke handen.

---

## 4.3 RISICO — Geleide review-bewerkingen kunnen bedragen als vrije string terugschrijven

**Plek:** review/edit handlers rond regels 1393–1410 en eerdere review-inputs.

Niet iedere review-route loopt zichtbaar door dezelfde centrale chipvalidatie. In diverse paden wordt `e.target.value` rechtstreeks teruggeschreven naar een action amount.

Omdat `num()` voor een ongeldige waarde uiteindelijk 0 kan opleveren, bestaat risico dat een rare edit niet crasht maar stil als nul in een berekening terechtkomt.

Dit verdient een gerichte runtimefixture voordat het als echte bug wordt bestempeld.

---

## 4.4 RISICO — Extreme numerieke waarden hebben geen duidelijke domeingrens

K/M/B ondersteunt zeer grote chipwaarden. Dat is functioneel nuttig, maar er is geen duidelijke maximumgrens op bedragen/stacks.

JavaScript gebruikt floating-pointgetallen. Tot ongeveer 9 quadriljoen zijn gehele waarden exact representeerbaar; daarboven niet meer. Voor poker is die grens waarschijnlijk praktisch irrelevant, maar een domeinmaximum zou rare/corrupte invoer duidelijker afvangen.

---

# Prioriteitenlijst

## P1 — Eerst oplossen: cashgame BB-unit in pot-engine

**Waarom:** dit geeft aantoonbaar een verkeerde eindpot.  
**Impact:** hoog.  
**Moeite:** laag tot middel.  
**Test:** minimaal €1/€2 en €2/€5, preflop én postflop, met BB-invoer.

---

## P2 — Beslissen en repareren: ontbrekende actie-afleiding

Bepaal expliciet wat de app moet doen bij:

- bet zonder gelogde call terwijl volgende straat bestaat;
- lege straat terwijl hand doorloopt.

Aanbevolen voorkeur voor betrouwbaarheid: **blokkeren tenzij de afleiding ondubbelzinnig is**. Een impliciete fold kan vaak veilig worden afgeleid; een impliciete call is alleen veilig als handcontinuatie dat logisch afdwingt.

---

## P3 — Voeg automatische pure pot-engine-regressietests toe

De pot-engine is te belangrijk om uitsluitend via UI-acceptatie te testen. De reeds bekende fixtures zijn hiervoor zeer geschikt.

---

## P4 — Versterk spelershistorie buiten het apparaat

Een periodieke externe export van de spelersbibliotheek is de eenvoudigste bescherming tegen het praktische hoofdrisico: verlies/wissen van het browserprofiel.

---

## P5 — Daarna onderhoudbaarheidsconsolidatie

Niet ineens de hele app herschrijven. Begin met de stukken waar duplicatie al fouten heeft veroorzaakt:

1. chip parsing/formatting/unit conversion;
2. pot-engine/replay shared conversion;
3. daarna wizard-overrides.

---

# Eindconclusie

## Diagnose: functioneel sterk, maar nog één kritieke pokerfout gevonden

De meest belangrijke positieve uitkomst is dat de eerdere uncalled-bet/raise-problemen in de geteste kernfixtures correct zijn. Backup/import is eveneens substantieel robuuster dan een standaard localStorage-app.

De review heeft echter één nieuwe **kritieke pokerlogica-fout** gevonden: cashgameacties die in BB worden ingevoerd worden in `analyze()` verkeerd behandeld zodra de big blind niet precies 1 valuta-eenheid is. Daarnaast zijn de in de reviewprompt genoemde impliciete call en checked-around-afleiding niet geïmplementeerd.

Daarom zou ik **RC8 nog niet definitief afsluiten** voordat P1 is hersteld en P2 functioneel is besloten en getest.

Geen code is in deze review gewijzigd.
