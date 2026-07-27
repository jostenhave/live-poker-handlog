# Live Poker Handlog v2.5 RC3

**Status:** Release Candidate 3  
**Datum:** 26 juli 2026  
**Technische basis:** v2.5 RC1, aangevuld met de bekende RC2-correcties en de daarna vastgestelde RC3-scope.

---

## Doel van RC3

RC3 is een geïntegreerde herstel- en verbeterbuild. De nadruk ligt op:

- veilige opslag, import en herstel;
- betrouwbare scheiding van normale opslag en Emergency Mode;
- betere validatie van back-upbestanden;
- bruikbare interne veiligheidskopieën;
- verbeterde koppeling met de spelersbibliotheek;
- consistente naamgeving en begrijpelijkere interface-teksten.

RC3 bevat geen nieuwe functionele uitbreidingen die voor v2.6 zijn gereserveerd.

---

## Kritieke en hoge correcties

### Emergency Mode volledig gescheiden

- Emergency Mode gebruikt een afzonderlijke opslaglocatie.
- Tijdens Emergency Mode wordt niet naar de normale database geschreven.
- Beschadigde hoofdopslag blijft behouden voor herstel of analyse.
- Opslag, migratie en initialisatie gebruiken de actieve opslagcontext.
- Tijdelijke validatie en migratie mogen de actieve database niet wijzigen.

### Importvalidatie aangescherpt

Back-upbestanden worden vóór import uitgebreider gecontroleerd op:

- geldige hoofdstructuur;
- ondersteunde back-up- en schemaversie;
- geldige metadata en categorieën;
- correcte recordtypen;
- ontbrekende of dubbele identifiers;
- ongeldige `null`-records;
- geldige sessie-, speler- en handstructuren;
- verwijzingen tussen spelers, sessies, handen en villains;
- overeenstemming tussen metadata en aanwezige gegevens.

### Transactionele import versterkt

- Import wordt eerst in een tijdelijke gegevensset opgebouwd.
- De tijdelijke gegevensset wordt gemigreerd en gevalideerd voordat de actieve data wordt vervangen.
- De actieve database wordt pas gewijzigd nadat alle controles zijn geslaagd.
- Bij een fout blijven de actieve gegevens ongewijzigd.

---

## Gegevensbeheer en herstel

### Interne veiligheidskopie

Bij een vervangende import wordt vooraf automatisch een volledige interne veiligheidskopie gemaakt.

In Gegevensbeheer kan de gebruiker:

- zien wanneer de laatste veiligheidskopie is gemaakt;
- de veiligheidskopie downloaden;
- de vorige gegevens terugzetten;
- voorafgaand aan herstel een bevestiging geven.

Vóór het terugzetten wordt eerst opnieuw een veiligheidskopie van de actuele gegevens gemaakt.

### Duidelijkere back-upbestandsnamen

De bestandsnaam vermeldt welke categorieën zijn opgenomen, bijvoorbeeld:

```text
Live_Poker_Handlog_backup_2026-07-26_spelers_sessies-en-handen_instellingen.json
```

Ondersteunde categorieaanduidingen:

- `spelers`
- `sessies-en-handen`
- `instellingen`

### Begrijpelijkere importteksten

- Technische termen zoals *staging* zijn uit de gebruikersinterface verwijderd.
- De toelichting beschrijft in gewone taal dat de app het bestand eerst controleert en de actieve gegevens pas daarna aanpast.

---

## Spelersbibliotheek

### Bibliotheekspelers direct selecteerbaar bij villains

Bij het registreren van een villain kan de gebruiker kiezen uit:

- spelers die al aan de huidige sessie zijn gekoppeld;
- overige spelers uit de spelersbibliotheek.

Wanneer een overige bibliotheekspeler wordt geselecteerd:

- wordt deze automatisch aan de sessie toegevoegd;
- wordt de villain aan dezelfde speler gekoppeld;
- blijven algemene spelersnotities behouden;
- worden dubbele vermeldingen voorkomen.

Deze werking geldt voor cashgames en toernooisessies.

---

## Interface en terminologie

### Checkbox-uitlijning

- Export- en importcheckboxes zijn compact en consistent uitgelijnd.
- Checkbox en label staan direct naast elkaar.
- De algemene breedte-instelling voor invoervelden wordt niet meer op deze checkboxes toegepast.

### Pokerterminologie

Zichtbare validatiemeldingen gebruiken voortaan:

- **turn card** in plaats van *turnboard*;
- **river card** in plaats van *riverboard*.

Voorbeeld:

> De river card is ingevuld zonder turn card.

### Consistente appnaam

De appnaam is overal gewijzigd naar:

> **Live Poker Handlog**

Niet meer gebruikt:

- Live Poker HandLog;
- HandLog;
- verkorte varianten van de appnaam.

De controle omvat onder meer:

- HTML-titel;
- appkop;
- versie-informatie;
- release notes;
- meldingen;
- back-upbestandsnamen;
- zichtbare gegevensbeheer-teksten.

---

## Behouden functionaliteit

De bestaande functionaliteit uit v2.4 en v2.5 RC1 moet ongewijzigd blijven, waaronder:

- cashgames en toernooitypen;
- sessie- en spelersbeheer;
- handregistratie voor alle streets;
- Quick Log;
- straddles;
- big blind ante;
- potberekening;
- stacks in bb en chips;
- all-ins en calls;
- showdownregistratie;
- impliciete folds;
- rapportage en delen als tekst of afbeelding;
- bountyregistratie;
- release notes;
- migratie van oudere gegevensschema's.

---

## Nog te testen

RC3 is nog geen definitieve release. Gerichte tests zijn vereist voor:

1. Emergency Mode en behoud van beschadigde opslag;
2. alle import- en exportcombinaties;
3. vervangende import en interne veiligheidskopie;
4. terugzetten en downloaden van de veiligheidskopie;
5. ongeldige en beschadigde back-upbestanden;
6. speler-ID-remapping en sessieconflicten;
7. bibliotheekspelers bij villainselectie;
8. regressie van potberekening en rapportage;
9. PWA-installatie, offline gebruik en updategedrag binnen GitHub Pages.

---

## Bekende scopegrens

Nieuwe gebruiksverbeteringen uit de praktijktest met Peter worden niet in RC3 opgenomen. Deze worden functioneel uitgewerkt voor v2.6, waaronder de mogelijke geleide invoermethode langs resterende spelers.
