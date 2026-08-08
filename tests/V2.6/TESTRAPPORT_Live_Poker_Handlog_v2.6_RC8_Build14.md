# TESTRAPPORT — Live Poker Handlog v2.6 RC8 Build 14

## Eindoordeel
**GO ONDER VOORWAARDE**

De gerichte Build-14-fix voor cashgame-acties in BB is technisch correct geïmplementeerd en slaagt alle uitgevoerde statische controles en geautomatiseerde potfixtures. De bestaande potfixtures 13/19/47 blijven groen. Nieuwe fixtures voor €1/€2 en €2/€5 met BB-invoer slagen eveneens, inclusief postflop.

De enige resterende voorwaarde is de fysieke mobiele acceptatietest uit het testprotocol. In deze testomgeving is geen echte Android/UI-interactie uitgevoerd.

## Geteste bestanden
- `Live_Poker_Handlog_v2.6_RC8_Build14_Cashgame_BB_Unit_Potengine.html`
- `CHANGELOG_Live_Poker_Handlog_v2.6_RC8_Build14.md`
- `TECHNISCH_VOORTGANGSRAPPORT_Live_Poker_Handlog_v2.6_RC8_Build14.md`
- `TESTINSTRUCTIES_AI_Live_Poker_Handlog_v2.6_RC8_Build14.md`

---

## 1. Documentatie en scope

### 1.1 Changelog
**PASS**

Het changelog beschrijft de bedoelde wijziging correct:
- cashgame-BB wordt omgerekend met `bedrag × big blind`;
- `toBase()` wordt gelijkgetrokken met `wzUnitToBase()`;
- toernooi-, K/M/B-, BBA-, tafel- en PWA-logica blijven buiten scope.

### 1.2 Technisch voortgangsrapport
**PASS**

Het rapport benoemt de oorspronkelijke divergentie tussen pot-engine en wizard correct en beperkt de wijziging tot `toBase()`.

### 1.3 Testprotocol
**PASS**

Het protocol test precies de regressiegrens van Build 14:
- cash + BB;
- cash valuta;
- tournament chips;
- consistentie met `wzUnitToBase()`;
- bekende potfixtures;
- preflop en postflop bij BB ≠ 1.

---

## 2. Statische codecontrole

### 2.1 JavaScript-syntax
**PASS**

De volledige JavaScript uit de HTML is met Node.js `--check` gecontroleerd. Geen syntaxfouten.

### 2.2 `toBase()` cash-BB-conversie
**PASS**

Build 14 bevat:

`if(s.type==='cash') return a.unit==='bb' ? n*bb : n;`

Daarmee wordt een cashgameactie in BB nu naar valuta omgerekend.

### 2.3 Cash valuta blijft ongewijzigd
**PASS**

Voor cashacties die reeds in valuta staan, retourneert `toBase()` nog steeds de numerieke waarde zelf.

### 2.4 Tournament chips blijven ongewijzigd
**PASS**

Voor toernooien blijft:

`a.unit === 'chips' ? n / bb : ...`

behouden. De Build-14-fix raakt dus niet de bestaande toernooiconversie.

### 2.5 `% pot`
**PASS**

De `%`-route wordt vóór de cash-BB-route afgehandeld en is inhoudelijk niet gewijzigd.

### 2.6 Consistentie met wizard/replay
**PASS**

`wzUnitToBase()` bevat dezelfde cashregel:

`unit === 'bb' ? n * bb : n`

Daarmee zijn pot-engine en wizard voor deze conversie nu consistent.

---

## 3. Geautomatiseerde runtimefixtures

De daadwerkelijke Build-14-versies van `toBase()`, `actorStackBase()` en `analyze()` zijn uit de HTML gehaald en in Node.js uitgevoerd met gecontroleerde handfixtures. Alleen externe UI-afhankelijkheden die voor deze fixtures niet relevant zijn, zoals straddles, zijn in de harness neutraal gehouden.

| Fixture | Verwacht | Werkelijk | Resultaat |
|---|---:|---:|---|
| €1/€1 raise 6 → 3-bet 20 → fold | €13 | €13 | **PASS** |
| €1/€1 raise 6 → call → 3-bet 20 → folds | €19 | €19 | **PASS** |
| €1/€1 raise 6 → call → 3-bet 20 → call/fold | €47 | €47 | **PASS** |
| €1/€2 raise naar 3 BB → BB call → SB fold | €13 | €13 | **PASS** |
| €2/€5 raise naar 3 BB → BB call → SB fold | €32 | €32 | **PASS** |
| €1/€2 flop: 2 BB bet → call | €11 | €11 | **PASS** |
| €2/€5 flop: 1,5 BB bet → fold, inzet uncalled | €7 | €7 | **PASS** |

### Toelichting postflop €1/€2
De pot start na de blinds op €3. Een flopbet van 2 BB is €4 en de call is €4. Eindpot:

`€3 + €4 + €4 = €11`

Dit bevestigt dat de BB-conversie niet alleen preflop maar ook postflop correct door `analyze()` loopt.

---

## 4. Directe unitconversiefixtures

| Conversie | Verwacht | Werkelijk | Resultaat |
|---|---:|---:|---|
| €1/€2: 3 BB | €6 | €6 | **PASS** |
| €2/€5: 3 BB | €15 | €15 | **PASS** |
| Cash `12,5` valuta | 12,5 | 12,5 | **PASS** |
| Toernooi: 1.500 chips bij BB 500 | 3 BB | 3 BB | **PASS** |
| 50% van pot 20 | 10 | 10 | **PASS** |

---

## 5. Regressiegrens

### Beoordeling
**PASS op statische en geautomatiseerde analyse**

Geen aanwijzing gevonden dat Build 14 inhoudelijk wijzigingen introduceert aan:
- toernooilogica;
- BBA;
- K/M/B-invoer;
- tafelvisual;
- actieve/inactieve seats;
- PWA;
- bestaande uncalled-betlogica.

De bekende 13/19/47-potfixtures blijven groen.

---

## 6. Nog fysiek uit te voeren

De testinstructies verlangen minimaal één fysieke cashgamehand met BB ≠ 1 en een actie ingevoerd in BB.

### Aanbevolen fysieke fixture
Cashgame €1/€2:
1. Hero raise naar **3 BB**;
2. BB call;
3. SB fold;
4. rond de hand af;
5. eindpot moet **€13** zijn.

Dit controleert niet alleen de pot-engine, maar ook de daadwerkelijke mobiele invoerroute en opgeslagen handstate.

---

# Besluit

## GO ONDER VOORWAARDE

De Build-14-correctie voor reviewpunt 1 is **technisch geslaagd**. De fout waarvoor deze build is gemaakt is in de uitgevoerde fixtures niet meer reproduceerbaar en de bekende regressiepotten blijven correct.

Voor volledig **GO** resteert alleen de fysieke mobiele fixture uit het acceptatieprotocol.
